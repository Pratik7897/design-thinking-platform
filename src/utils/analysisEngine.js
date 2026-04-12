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
    console.log("API KEY:", apiKey); // Mandatory debug log

    if (!apiKey || apiKey === 'undefined' || apiKey === '') {
      console.warn("[AI ENGINE] CRITICAL: VITE_OPENROUTER_API_KEY is missing or undefined. The system is now running in 'Safe Fallback Mode' with generic strategic data. To enable real AI insights, please add your API key to your environment variables (Local .env or Vercel Dashboard).");
      return generateFallbackAnalysis(data);
    }

    let allPhaseData = {};
    let sessionContext = ""; // For context evolution
    
    // Process phases sequentially to enable context evolution
    for (const key of PHASE_KEYS) {
      try {
        console.log("PHASE:", key); 
        const result = await runPhase(key, data, sessionContext);
        allPhaseData[key] = result;
        
        // Update context for next phase (Context Evolution)
        if (result && result.keyInsights) {
          sessionContext += `\n[${key.toUpperCase()}] Insights: ${result.keyInsights.join(". ")}`;
        }
        
        console.log(`[AI SUCCESS] ${key}`);
      } catch (err) {
        console.error(`[AI FAILURE] Phase: ${key}`, err);
        allPhaseData[key] = {
          ...getErrorState(key),
          tagline: "AI GENERATION FAILED",
          keyInsights: [err.message || "Unknown API Error", "Please retry."],
        };
      }
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
const runPhase = async (phaseKey, masterData, previousContext = "") => {
  const directive = getStrategicAnchor(phaseKey, masterData);
  const schema = getSchemaForPhase(phaseKey);
  
  // MANDATORY: Log Phase and Prompt for user verification
  console.log("PHASE:", phaseKey);
  
  const prompt = `
  PHASE_ID = ${phaseKey}
  ROLE: You are working ONLY on ${phaseKey.toUpperCase()}.
  MISSION: Each phase must produce completely different output. Do NOT repeat yourself.

  PRODUCT CONTEXT:
  Name: ${masterData.productName}
  Industry: ${masterData.category}
  Goal: ${masterData.goal}
  Target Market: ${masterData.targetMarket?.join(', ') || 'General'}

  STRATEGIC DIRECTIVE:
  ${directive}

  PREVIOUS PHASE CONTEXT (BUILD UPON BUT DO NOT REPEAT):
  ${previousContext || "None"}

  STRICT RULES:
  1. This is the ${phaseKey.toUpperCase()} phase.
  2. Include this unique marker exactly in your "tagline" field: [PID:${phaseKey}]
  3. Ensure insights are specialized, actionable, and 100% unique to this stage.
  4. Return JSON ONLY matching the requested structure.

  RETURN JSON ONLY matching this schema:
  ${JSON.stringify(schema)}
  `;

  console.log("PROMPT:", prompt);
  
  const responseData = await generateFromOpenRouter(prompt);
  console.log(`RESPONSE FOR ${phaseKey}:`, responseData);
  
  return responseData;
};

function getStrategicAnchor(key, masterData) {
  const anchors = {
    problem_definition: "Frame the problem space. Use 'How Might We' format. Do NOT suggest features yet. Focus on pain discovery and scope constraints.",
    user_segmentation: "Identify 3 distinct behavioral personas. Map their unique drivers and barriers. Focus on human psychology, not just demographics.",
    empathy_mapping: `Deep dive into the 4 quadrants (Says, Does, Thinks, Feels). Focus on the emotional tension points users face with ${masterData.productName}.`,
    pain_point_analysis: "Quantify friction. Identify the 'High-Stakes' pain points where users currently lose time or money. Differentiate symptoms from root causes.",
    competitive_analysis: "Analyze the competitive vacuum. Where do giants fail? Focus on your 'Unfair Advantage' and unique strategic positioning.",
    ideation: "Generate 3 disruptive concepts. Focus on the 'Big Idea'. Go beyond incremental features into transformative solutions.",
    feature_prioritization: "Draft a technical roadmap. Rank by Impact vs. Feasibility. Define the 'Must-Have' core for an MVP.",
    user_journey_mapping: "Detail the chronological journey from discovery to 'Aha! Moment'. Focus on the transition between stages.",
    prototyping_strategy: "Design a verification mechanism. What is the smallest thing we can build to prove the value? Define low-fi and high-fi targets.",
    validation_feedback: "Architect the feedback loops. Define numeric success KPIs and a fallback 'Pivot' strategy if initial assumptions fail."
  };
  return anchors[key] || "Analyze this phase with specialized strategic depth.";
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
    tagline: "PHASE GENERATION UNAVAILABLE", 
    keyInsights: [
      "The strategy engine was unable to process this specific phase.",
      "Consider re-running the analysis or checking your network status."
    ], 
    actionItems: [{action: "Restart Analysis Pipeline", timeline: "TBD"}] 
  };
}

function generateFallbackAnalysis(data) {
  const mockInsights = [
    `Analyze ${data.productName} through a deep human-centric lens to identify hidden value.`,
    "Focus on iterative refinement and rapid prototyping to validate market assumptions.",
    "Prioritize features based on the MoSCoW framework for strategic alignment."
  ];

  return {
    metadata: { 
      productName: data.productName || 'Analysis', 
      category: data.category || 'Strategy',
      generatedAt: new Date().toISOString(),
      engine: "Strategy Fallback Engine" 
    },
    phases: PHASE_KEYS.reduce((acc, key) => { 
      acc[key] = { 
        ...PHASE_COLORS[key], 
        emoji: getEmojiForKey(key),
        title: key.replace(/_/g, ' ').toUpperCase(),
        tagline: `Strategic Framework for ${data.productName}`,
        keyInsights: mockInsights,
        actionItems: [
          { action: "Review core business objectives", timeline: "Week 1" },
          { action: "Initiate stakeholder interviews", timeline: "Week 2" }
        ],
        // Add some structural fields for common phases to avoid empty space
        scope: "Comprehensive market entry and product scaling.",
        segments: [{name: "Primary Audience", description: "Core user group seeking solutions.", value: "High"}],
        kpis: [{metric: "User Acquisition", target: "10k Growth"}]
      }; 
      return acc; 
    }, {})
  };
}
