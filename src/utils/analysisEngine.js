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

export async function generateAnalysis(data) {
  console.log("[INIT] Starting AI Pipeline for:", data.productName);
  
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.warn("[STOP] API Key missing. Rendering fallback UI.");
    return generateFallbackAnalysis(data, "API Key Required. Please check environment variables.");
  }

  let allPhaseData = {};
  let sessionContext = ""; 
  
  for (const key of PHASE_KEYS) {
    try {
      console.log(`[EXEC] Running Phase: ${key}`);
      
      // Execute with NO retry loop - fail fast and clean
      const result = await runPhase(key, data, sessionContext);
      
      // Clean result data (transform objects to strings for UI)
      const cleanResult = sanitizeResult(key, result);
      allPhaseData[key] = cleanResult;
      
      // Evolve context for uniqueness
      if (cleanResult && cleanResult.keyInsights) {
        sessionContext += `\n[${key.toUpperCase()}] ${cleanResult.keyInsights.join(". ")}`;
      }
      
      console.log(`[SUCCESS] Phase ${key} completed.`);
    } catch (err) {
      console.error(`[FATAL ERROR] ${key} failed:`, err.message);
      allPhaseData[key] = getErrorState(key, err.message);
      // If a phase fails, we continue with the next one to avoid blank screens
    }
  }

  return {
    metadata: { 
      productName: data.productName, 
      category: data.category,
      generatedAt: new Date().toISOString() 
    },
    phases: PHASE_KEYS.reduce((acc, key) => {
      acc[key] = { ...PHASE_COLORS[key], emoji: getEmojiForKey(key), ...allPhaseData[key] };
      return acc;
    }, {})
  };
}

async function runPhase(phaseKey, masterData, previousContext) {
  const directive = getStrategicAnchor(phaseKey, masterData);
  const schema = getSchemaForPhase(phaseKey);
  
  const prompt = `
    PHASE: ${phaseKey.toUpperCase()}
    PRODUCT: ${masterData.productName}
    INDUSTRY: ${masterData.category}
    GOAL: ${masterData.goal}
    
    PREVIOUS INSIGHTS: ${previousContext || "Initial Phase"}
    
    DIRECTIVE: ${directive}
    
    STRICT RULES:
    1. Do NOT repeat or overlap with PREVIOUS INSIGHTS.
    2. Focus ONLY on ${phaseKey.toUpperCase()} intent.
    3. Return exactly in this JSON format: ${JSON.stringify(schema)}
  `;

  return await generateFromOpenRouter(prompt);
}

function sanitizeResult(key, data) {
  // Convert any nested objects or arrays of objects into clean UI-ready strings
  if (data.kpis && Array.isArray(data.kpis)) {
    data.kpis = data.kpis.map(k => typeof k === 'object' ? `${k.metric}: ${k.target}` : k);
  }
  if (data.actionItems && Array.isArray(data.actionItems)) {
    data.actionItems = data.actionItems.map(item => 
      typeof item === 'object' ? { action: item.action, timeline: item.timeline } : { action: item, timeline: "N/A" }
    );
  }
  return data;
}

function getStrategicAnchor(key, masterData) {
  const anchors = {
    problem_definition: "Deep dive into RATIONAL and EMOTIONAL pain points. Identify the root conflict. Use 'How Might We'.",
    user_segmentation: "Define 3 non-generic target personas with specific behavioral traits and unmet needs.",
    empathy_mapping: "Map the 'Internal Monologue' vs 'External Action'. What do they feel that they don't say?",
    pain_point_analysis: "Quantify the friction. Identify 'High-Stakes' technical or social barriers.",
    competitive_analysis: "Locate the 'Strategic Gap' where existing incumbents are too rigid to compete.",
    ideation: "Generate 3 disruptive, mutually exclusive concepts. Avoid incrementalism.",
    feature_prioritization: "Identify the 20% of features that deliver 80% of the emotional value.",
    user_journey_mapping: "Detail the journey from 'Ignorance' to 'Champion Status'. Highlight the Aha! Moment.",
    prototyping_strategy: "Design a high-fidelity experiment to prove validity with minimal code.",
    validation_feedback: "Define 3 numeric KPIs (e.g. 'Viral Coefficient > 1.2') and a specific pivot trigger."
  };
  return anchors[key] || "Strategic depth analysis.";
}

function getSchemaForPhase(key) {
  const base = { title: "String", tagline: "String", keyInsights: ["String"], actionItems: [{action: "String", timeline: "String"}] };
  const schemas = {
    problem_definition: { ...base, scope: "String", hmw: ["String"] },
    user_segmentation: { ...base, segments: [{name: "String", description: "String"}] },
    empathy_mapping: { ...base, thinks: ["String"], feels: ["String"] },
    pain_point_analysis: { ...base, pains: [{issue: "String", impact: "String"}], rootCauses: ["String"] },
    competitive_analysis: { ...base, competitors: [{name: "String", vulnerability: "String"}], uniqueMoat: "String" },
    ideation: { ...base, concepts: [{name: "String", description: "String"}] },
    feature_prioritization: { ...base, must: ["String"], should: ["String"] },
    user_journey_mapping: { ...base, steps: [{step: "String", action: "String"}] },
    prototyping_strategy: { ...base, focus: "String", keyFlow: "String" },
    validation_feedback: { ...base, kpis: ["String"], testPlan: "String" }
  };
  return schemas[key] || base;
}

function getEmojiForKey(key) {
  const emojis = { problem_definition: '🎯', user_segmentation: '👥', empathy_mapping: '🤝', pain_point_analysis: '⚡', competitive_analysis: '⚔️', ideation: '💡', feature_prioritization: '⚖️', user_journey_mapping: '🗺️', prototyping_strategy: '🛠️', validation_feedback: '✓' };
  return emojis[key] || '◎';
}

function getErrorState(key, errorMsg) {
  return { 
    title: key.replace(/_/g, ' ').toUpperCase(), 
    tagline: "AI TEMPORARILY UNAVAILABLE", 
    keyInsights: [errorMsg || "Connection timeout or quota exceeded.", "Please click 'RETRY' above."], 
    actionItems: [{action: "Manual Strategy Review", timeline: "NOW"}] 
  };
}

function generateFallbackAnalysis(data, warning) {
  return {
    metadata: { productName: data.productName || 'Analysis', generatedAt: new Date().toISOString() },
    phases: PHASE_KEYS.reduce((acc, key) => {
      acc[key] = { 
        ...PHASE_COLORS[key], 
        emoji: getEmojiForKey(key), 
        title: key.toUpperCase(), 
        tagline: "ACTION REQUIRED", 
        keyInsights: [warning || "Please check your credentials."], 
        actionItems: [] 
      };
      return acc;
    }, {})
  };
}
