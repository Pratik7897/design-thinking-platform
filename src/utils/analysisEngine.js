import { generateFromOpenRouter } from './openrouter';

const PHASE_KEYS = [
  'problem_definition',
  'user_segmentation',
  'empathy_mapping',
  'pain_point_analysis',
  'competitive_analysis',
  'ideation',
  'feature_prioritization',
  'user_journey_mapping',
  'prototyping_strategy',
  'validation_feedback'
];

const PHASE_COLORS = {
  problem_definition: { primary: '#1E293B', dark: '#0F172A', light: '#334155', text: '#FFFFFF' },
  user_segmentation: { primary: '#475569', dark: '#1E293B', light: '#64748B', text: '#FFFFFF' },
  empathy_mapping: { primary: '#64748B', dark: '#334155', light: '#94A3B8', text: '#FFFFFF' },
  pain_point_analysis: { primary: '#94A3B8', dark: '#64748B', light: '#CBD5E1', text: '#0F172A' },
  competitive_analysis: { primary: '#D4AF37', dark: '#B8860B', light: '#E5C76B', text: '#0F172A' },
  ideation: { primary: '#334155', dark: '#0F172A', light: '#475569', text: '#FFFFFF' },
  feature_prioritization: { primary: '#0F172A', dark: '#000000', light: '#1E293B', text: '#FFFFFF' },
  user_journey_mapping: { primary: '#E5C76B', dark: '#D4AF37', light: '#F5F5DC', text: '#0F172A' },
  prototyping_strategy: { primary: '#71717A', dark: '#3F3F46', light: '#A1A1AA', text: '#FFFFFF' },
  validation_feedback: { primary: '#18181B', dark: '#09090B', light: '#27272A', text: '#FFFFFF' },
};

/**
 * Main Analysis Orchestrator
 * Fully migrated to OpenRouter (DeepSeek-V3) for production stability
 */
export async function generateAnalysis(data) {
  try {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) return generateFallbackAnalysis(data);

    console.log("[AI ENGINE] Initiating 10-Phase DeepSeek Strategy Pipeline...");

    // Process in batches (5+5) to manage server-side load effectively
    const batch1 = PHASE_KEYS.slice(0, 5);
    const batch2 = PHASE_KEYS.slice(5);
    
    let allPhaseData = {};

    for (const batch of [batch1, batch2]) {
      const results = await Promise.all(batch.map(async (key) => {
        try {
          console.log(`[AI PROVIDER] OpenRouter`);
          console.log(`[AI PHASE] ${key.toUpperCase()}`);
          return { key, data: await runPhase(key, data) };
        } catch (err) {
          console.error(`[AI ERROR] Phase ${key} failed:`, err);
          return { key, data: null };
        }
      }));
      
      results.forEach(r => { if (r.data) allPhaseData[r.key] = r.data; });
    }

    return {
      metadata: {
        productName: data.productName,
        category: data.category,
        generatedAt: new Date().toISOString(),
        engine: "DeepSeek-V3 (via OpenRouter)"
      },
      phases: PHASE_KEYS.reduce((acc, key) => {
        const aiResult = allPhaseData[key];
        acc[key] = {
          ...PHASE_COLORS[key],
          emoji: getEmojiForKey(key),
          ...(aiResult || getErrorState(key))
        };
        return acc;
      }, {})
    };
  } catch (err) {
    console.error("[AI FATAL] Pipeline Collapse:", err);
    return generateFallbackAnalysis(data);
  }
}

/**
 * Individual Phase Generator
 * Enforces JSON Schema and Phase Isolation
 */
const runPhase = async (phaseKey, masterData) => {
  const directive = getStrategicAnchor(phaseKey);
  const schema = getSchemaForPhase(phaseKey);
  
  const prompt = `
  PHASE: "${phaseKey.toUpperCase()}"
  PRODUCT: ${masterData.productName} (${masterData.category})
  GOAL: ${masterData.goal}
  AUDIENCE: ${masterData.targetMarket.join(', ')}

  STRATEGIC DIRECTIVE:
  ${directive}

  STRICT RULES:
  1. Generate ONLY phase-specific output for this product.
  2. Do NOT repeat text from other phases.
  3. Reference "${masterData.productName}" explicitly 2-3 times.
  4. Ensure insights are actionable, not generic.

  RETURN JSON ONLY matching this schema:
  ${JSON.stringify(schema)}
  `;

  return await generateFromOpenRouter(prompt);
};

function getStrategicAnchor(key) {
  const anchors = {
    problem_definition: "Define the core problem. Focus on scope, constraints, and 'How Might We' questions. Do not suggest solutions yet.",
    user_segmentation: "Divide the market into behavioral segments and value clusters. Identify the primary hero persona.",
    empathy_mapping: "Deep dive into the user's sensory experience (Thinks, Feels, Says, Does) specifically regarding ${masterData.productName}.",
    pain_point_analysis: "Quantify the friction. Separate symptoms from root causes. Focus on emotional and functional obstacles.",
    competitive_analysis: "Map the landscape. Focus on rival vulnerabilities and your sustainable competitive advantage (Moat).",
    ideation: "Synthesize high-impact concept groups and a 5-year 'Blue Sky' vision for the product.",
    feature_prioritization: "Draft a MoSCoW matrix. Balance technical complexity against user value.",
    user_journey_mapping: "Detail the step-by-step chronology of use. Pinpoint the 'Magic Moment' where value clicks.",
    prototyping_strategy: "Design a validation pathway. Define the technical stack (High-fi) and core user flow to test.",
    validation_feedback: "Architect the growth engine. Define 2-3 specific KPIs with numeric targets and a strategic pivot/fallback plan."
  };
  return anchors[key] || "Analyze this phase with high strategic depth.";
}

function getSchemaForPhase(key) {
  const base = { title: "String", tagline: "String", keyInsights: ["String"], actionItems: [{action: "String", timeline: "String"}] };
  const schemas = {
    problem_definition: { ...base, scope: "String", coreProblem: "String", hmw: ["String"] },
    user_segmentation: { ...base, segments: [{name: "String", description: "String", value: "String"}], targetArchetype: "String" },
    empathy_mapping: { ...base, thinks: ["String"], feels: ["String"], says: ["String"], does: ["String"] },
    pain_point_analysis: { ...base, pains: [{issue: "String", impact: "String", frequency: "String"}], rootCauses: ["String"] },
    competitive_analysis: { ...base, competitors: [{name: "String", advantage: "String", vulnerability: "String"}], uniqueMoat: "String" },
    ideation: { ...base, concepts: [{name: "String", description: "String", impact: "String"}], blueSkyIdea: "String" },
    feature_prioritization: { ...base, matrix: {must: ["String"], should: ["String"], could: ["String"], wont: ["String"]}, complexityVsValue: "String" },
    user_journey_mapping: { ...base, steps: [{step: "String", action: "String", emotion: "Pos/Neg/Neu", insight: "String"}], magicMoment: "String" },
    prototyping_strategy: { ...base, focus: "String", lowFi: ["String"], highFi: ["String"], keyFlow: "String" },
    validation_feedback: { ...base, kpis: [{metric: "String", target: "String"}], testPlan: "String", fallbackPlan: "String" }
  };
  return schemas[key] || base;
}

function getEmojiForKey(key) {
  const emojis = { problem_definition: '🎯', user_segmentation: '👥', empathy_mapping: '🤝', pain_point_analysis: '⚡', competitive_analysis: '⚔️', ideation: '💡', feature_prioritization: '⚖️', user_journey_mapping: '🗺️', prototyping_strategy: '🛠️', validation_feedback: '✓' };
  return emojis[key] || '◎';
}

function getErrorState(key) {
  return { 
    title: key.replace(/_/g, ' ').toUpperCase(), 
    tagline: "AI GENERATION FAILED", 
    keyInsights: ["Connection error with deepseek engine.", "Please retry this generation phase."], 
    actionItems: [{action: "Restart Analysis", timeline: "Immediate"}] 
  };
}

function generateFallbackAnalysis(data) {
  return {
    metadata: { productName: data.productName || 'Analysis', engine: "Static Fallback" },
    phases: PHASE_KEYS.reduce((acc, key) => { acc[key] = { ...PHASE_COLORS[key], emoji: getEmojiForKey(key), ...getErrorState(key) }; return acc; }, {})
  };
}
