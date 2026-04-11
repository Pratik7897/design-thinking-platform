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
]

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
}

export async function generateAnalysis(data) {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return generateFallbackAnalysis(data);

    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // EXPLICITLY target 'v1' endpoint as requested by user
    const modelOptions = { model: "gemini-1.5-flash-latest" };
    const requestOptions = { apiVersion: "v1" };
    const model = genAI.getGenerativeModel(modelOptions, requestOptions);

    console.log("AI ENGINE: Using model gemini-1.5-flash-latest (API v1)");

    // 1. EXTRACT VISUAL CONTEXT
    let visualContext = "No visual data provided.";
    if (data.imagePreview) {
      try {
        visualContext = await analyzeVisualContext(model, data.imagePreview);
      } catch (err) {
        console.warn("Visual analysis failed:", err);
      }
    }

    // 2. GENERATE PHASES
    const batches = [PHASE_KEYS.slice(0, 5), PHASE_KEYS.slice(5)];
    let allPhaseData = {};

    for (const batch of batches) {
      const results = await Promise.all(batch.map(async (key) => {
        try {
          console.log(`AI PIPELINE: Generating Phase -> ${key.replace(/_/g, ' ').toUpperCase()}`);
          const result = await generatePhase(model, key, data, visualContext);
          return { key, data: result };
        } catch (err) {
          console.error(`AI PIPELINE: Phase ${key} failed:`, err);
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
        visualInsight: visualContext,
        modelUsed: "gemini-1.5-flash-latest (v1)"
      },
      phases: PHASE_KEYS.reduce((acc, key) => {
        const aiResult = allPhaseData[key];
        acc[key] = {
          ...PHASE_COLORS[key],
          emoji: getEmojiForKey(key),
          ...(aiResult || getFallbackPhase(key, data))
        };
        return acc;
      }, {})
    };
  } catch (err) {
    console.error("Master Analysis failed:", err);
    return generateFallbackAnalysis(data);
  }
}

async function analyzeVisualContext(model, imageBase64) {
  const prompt = `Analyze this product image for a Senior Strategist report. 
  Extract purely technical and environmental cues. 
  1. Product Form Factor 
  2. Usage Context 
  3. Visual Quality signals 
  4. 3 Observations. 
  Be specific and technical.
  [ENTROPY_SEED: ${Date.now()}]`;

  const imagePart = {
    inlineData: {
      data: imageBase64.split(',')[1],
      mimeType: imageBase64.split(',')[0].split(':')[1].split(';')[0]
    }
  };
  const result = await model.generateContent([prompt, imagePart]);
  return result.response.text().trim();
}

async function generatePhase(model, phaseKey, masterData, visualContext) {
  const phaseSpecificDirectives = {
    problem_definition: "STRATEGIC ANCHOR: Focus EXCLUSIVELY on boundary setting, scope constraints, and the 'structural why' behind the user friction. Do NOT mention features or solutions.",
    user_segmentation: "STRATEGIC ANCHOR: Focus EXCLUSIVELY on behavioral psychology, volume of segments, and value clusters. Do NOT repeat the problem statement.",
    empathy_mapping: "STRATEGIC ANCHOR: Focus EXCLUSIVELY on the sensory experience—visceral thoughts, feelings, and direct quotes. Avoid analytical jargon.",
    pain_point_analysis: "STRATEGIC ANCHOR: Focus EXCLUSIVELY on quantifying the struggle. Root causes vs immediate symptoms. Friction density.",
    competitive_analysis: "STRATEGIC ANCHOR: Focus EXCLUSIVELY on market moats, vulnerability mapping, and the 'unsolved gaps' of rivals.",
    ideation: "STRATEGIC ANCHOR: Focus EXCLUSIVELY on divergent thinking. Blue-sky concepts and high-impact feature groups. Do NOT discuss constraints here.",
    feature_prioritization: "STRATEGIC ANCHOR: Focus EXCLUSIVELY on the 'Value vs Complexity' trade-off and the MoSCoW framework.",
    user_journey_mapping: "STRATEGIC ANCHOR: Focus EXCLUSIVELY on the step-by-step chronology and the 'Magic Moment' where value clicks.",
    prototyping_strategy: "STRATEGIC ANCHOR: Focus EXCLUSIVELY on the validation technicality. Wireframe types and the MVP tech stack.",
    validation_feedback: "STRATEGIC ANCHOR: Focus EXCLUSIVELY on measurable KPIs and feedback loops. Specific numeric targets required."
  };

  const phasePrompt = `YOU ARE A SENIOR PRODUCT STRATEGIST.
  CURRENT PHASE: "${phaseKey.toUpperCase()}"
  PRODUCT: ${masterData.productName}
  CONTEXT: ${visualContext}
  GLOBAL GOAL: ${masterData.goal}

  INSTRUCTION:
  ${phaseSpecificDirectives[phaseKey]}

  STRICT UNIQUENESS RULES:
  1. Generate output ONLY for this specific phase.
  2. DO NOT repeat analysis from any other phase.
  3. Reference "${masterData.productName}" and its specific industry contexts.
  4. Your output must be completely different in reasoning from other phases.
  5. BE DEEP AND HIGH-ENTROPY. No generic text.

  RETURN ONLY A CLEAN JSON OBJECT (no markdown, no prose) matching this specific schema:
  ${JSON.stringify(getSchemaForPhase(phaseKey))}

  [NONCE_SEED: ${Math.random().toString(36).substring(7)}]
  [TIMESTAMP: ${Date.now()}]`;

  const result = await model.generateContent(phasePrompt);
  const text = result.response.text().replace(/```json|```/g, '').trim();
  
  try {
    return JSON.parse(text.replace(/,(\s*[}\]])/g, '$1'));
  } catch (e) {
    console.error(`JSON Parse error in ${phaseKey}:`, text);
    throw e;
  }
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
  return schemas[key];
}

function getEmojiForKey(key) {
  const emojis = { problem_definition: '🎯', user_segmentation: '👥', empathy_mapping: '🤝', pain_point_analysis: '⚡', competitive_analysis: '⚔️', ideation: '💡', feature_prioritization: '⚖️', user_journey_mapping: '🗺️', prototyping_strategy: '🛠️', validation_feedback: '✓' };
  return emojis[key] || '◎';
}

function getFallbackPhase(key, data) {
  return { title: key.replace(/_/g, ' ').toUpperCase(), tagline: "Strategic Analysis", keyInsights: ["Evaluate user needs.", "Audit competitors."], actionItems: [{action: "Perform research", timeline: "Week 1"}] };
}

function generateFallbackAnalysis(data) {
  return {
    metadata: { productName: data.productName || 'Analysis', generatedAt: new Date().toISOString() },
    phases: PHASE_KEYS.reduce((acc, key) => { acc[key] = { ...PHASE_COLORS[key], emoji: getEmojiForKey(key), ...getFallbackPhase(key, data) }; return acc; }, {})
  };
}
