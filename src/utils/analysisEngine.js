import { generateFromOpenRouter } from './openrouter';
import { generateFromGemini } from './gemini';

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
  try {
    const orKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    console.log("OPENROUTER KEY:", orKey ? "Present" : "Missing");
    console.log("GEMINI KEY:", geminiKey ? "Present" : "Missing");

    const hasKeys = (orKey && orKey !== 'undefined') || (geminiKey && geminiKey !== 'undefined');

    if (!hasKeys) {
      console.warn("[AI ENGINE] Fallback mode active.");
      return generateFallbackAnalysis(data);
    }

    let allPhaseData = {};
    let sessionContext = ""; 
    
    for (const key of PHASE_KEYS) {
      try {
        console.log("PHASE:", key); 
        
        if (key !== PHASE_KEYS[0]) {
          console.log("[STABILITY] Throttling 5s...");
          await new Promise(resolve => setTimeout(resolve, 5000));
        }

        const result = await runPhaseWithRetry(key, data, sessionContext);
        allPhaseData[key] = result;
        
        if (result && result.keyInsights) {
          sessionContext += `\n[${key.toUpperCase()}] Insights: ${result.keyInsights.join(". ")}`;
        }
      } catch (err) {
        console.error(`[AI FAILURE] ${key}:`, err);
        allPhaseData[key] = {
          ...getErrorState(key),
          tagline: "AI GENERATION FAILED",
          keyInsights: [err.message || "API Error", "Please retry."],
        };
      }
    }

    return {
      metadata: { productName: data.productName, generatedAt: new Date().toISOString() },
      phases: PHASE_KEYS.reduce((acc, key) => {
        acc[key] = { ...PHASE_COLORS[key], emoji: getEmojiForKey(key), ...allPhaseData[key] };
        return acc;
      }, {})
    };
  } catch (err) {
    return generateFallbackAnalysis(data);
  }
}

const runPhaseWithRetry = async (phaseKey, masterData, previousContext, attempt = 1) => {
  const MAX_ATTEMPTS = 3;
  try {
    return await runPhase(phaseKey, masterData, previousContext);
  } catch (err) {
    const isRateLimit = err.message?.includes("429") || err.message?.includes("quota") || err.message?.includes("limit");
    if (isRateLimit && attempt < MAX_ATTEMPTS) {
      const waitTime = (attempt === 1 ? 15000 : 30000); // Wait 15s then 30s
      console.warn(`[RETRY] Rate limit for ${phaseKey}. Waiting ${waitTime/1000}s...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return runPhaseWithRetry(phaseKey, masterData, previousContext, attempt + 1);
    }
    throw err;
  }
};

const runPhase = async (phaseKey, masterData, previousContext = "") => {
  const directive = getStrategicAnchor(phaseKey, masterData);
  const schema = getSchemaForPhase(phaseKey);
  const prompt = `PHASE: ${phaseKey}\nCONTEXT: ${JSON.stringify(masterData)}\nPREVIOUS: ${previousContext}\nDIRECTIVE: ${directive}\nSCHEMA: ${JSON.stringify(schema)}`;

  try {
    return await generateFromOpenRouter(prompt);
  } catch (err) {
    return await generateFromGemini(prompt);
  }
};

function getStrategicAnchor(key, masterData) {
  const anchors = {
    problem_definition: "Frame the problem space. Use 'How Might We' format.",
    user_segmentation: "Identify 3 distinct behavioral personas.",
    empathy_mapping: "Deep dive into the 4 quadrants (Says, Does, Thinks, Feels).",
    pain_point_analysis: "Quantify friction. Identify root causes.",
    competitive_analysis: "Analyze the competitive vacuum and unique moat.",
    ideation: "Generate 3 disruptive concepts.",
    feature_prioritization: "Draft a technical roadmap. Rank by Impact vs. Feasibility.",
    user_journey_mapping: "Detail the chronological journey.",
    prototyping_strategy: "Design a verification mechanism.",
    validation_feedback: "Architect the feedback loops and KPIs."
  };
  return anchors[key] || "Strategic analysis.";
}

function getSchemaForPhase(key) {
  const base = { title: "String", tagline: "String", keyInsights: ["String"], actionItems: [{action: "String", timeline: "String"}] };
  const schemas = {
    problem_definition: { ...base, scope: "String", hmw: ["String"] },
    user_segmentation: { ...base, segments: [{name: "String", value: "String"}] },
    empathy_mapping: { ...base, thinks: ["String"], feels: ["String"] },
    pain_point_analysis: { ...base, pains: [{issue: "String", impact: "String"}], rootCauses: ["String"] },
    competitive_analysis: { ...base, competitors: [{name: "String", advantage: "String"}], uniqueMoat: "String" },
    ideation: { ...base, concepts: [{name: "String", impact: "String"}], blueSkyIdea: "String" },
    feature_prioritization: { ...base, matrix: {must: ["String"], should: ["String"]}, complexityVsValue: "String" },
    user_journey_mapping: { ...base, steps: [{step: "String", action: "String"}], magicMoment: "String" },
    prototyping_strategy: { ...base, focus: "String", lowFi: ["String"], keyFlow: "String" },
    validation_feedback: { ...base, kpis: [{metric: "String", target: "String"}], testPlan: "String" }
  };
  return schemas[key] || base;
}

function getEmojiForKey(key) {
  const emojis = { problem_definition: '🎯', user_segmentation: '👥', empathy_mapping: '🤝', pain_point_analysis: '⚡', competitive_analysis: '⚔️', ideation: '💡', feature_prioritization: '⚖️', user_journey_mapping: '🗺️', prototyping_strategy: '🛠️', validation_feedback: '✓' };
  return emojis[key] || '◎';
}

function getErrorState(key) {
  return { title: key.toUpperCase(), tagline: "ERROR", keyInsights: ["API Error"], actionItems: [] };
}

function generateFallbackAnalysis(data) {
  return {
    metadata: { productName: data.productName || 'Analysis', generatedAt: new Date().toISOString() },
    phases: PHASE_KEYS.reduce((acc, key) => {
      acc[key] = { ...PHASE_COLORS[key], emoji: getEmojiForKey(key), title: key.toUpperCase(), tagline: "UNAVAILABLE", keyInsights: ["API Key missing or quota exceeded."], actionItems: [] };
      return acc;
    }, {})
  };
}
