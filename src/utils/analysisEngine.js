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
    if (!apiKey) {
      console.warn("No Gemini API Key found. Using fallback.");
      return generateFallbackAnalysis(data);
    }

    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use flash-1.5 for speed and vision support
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare inputs
    const imagePart = data.imagePreview ? {
      inlineData: {
        data: data.imagePreview.split(',')[1],
        mimeType: data.imagePreview.split(',')[0].split(':')[1].split(';')[0]
      }
    } : null;

    const systemPrompt = `You are a Senior Product Strategist, UX Researcher, and Startup Advisor.
Your job is to generate highly specific, actionable, and realistic insights for the following product.

STRICT RULES:
1. NO GENERIC ADVICE. Every statement must be tailored to the EXACT product and audience.
2. Use the product name ("${data.productName}"), industry ("${data.category}"), and target audience ("${data.targetMarket.join(', ')}") in every section.
3. Avoid vague phrases like "improve UX". Explain exactly HOW and WHAT to change.
4. Think like a real consultant, focusing on costs, adoption friction, and user behavior.
5. If an image is provided, analyze it deeply to detect usage environment, product type, and visual quality. Use these signals to enhance the analysis.

CONTEXT:
Product Name: ${data.productName}
Core Goal: ${data.goal}
Industry: ${data.category} ${data.customIndustry ? `(${data.customIndustry})` : ''}
Target Users: ${data.targetMarket.join(', ')} ${data.customAudience ? `(Focus: ${data.customAudience})` : ''}
Description: ${data.description || 'N/A'}
Problem: ${data.problemStatement || 'N/A'}
Competitors: ${data.competitors || 'N/A'}
Features: ${data.keyFeatures || 'N/A'}
Monetization: ${data.monetization || 'N/A'}
Platform: ${data.platform || 'N/A'}

Return a structured JSON object strictly matching this 10-Phase schema:
{
  "problem_definition": {
    "title": "Problem Definition", "tagline": "Defining the boundaries",
    "scope": "Explain the exact scope of solving ${data.problemStatement}", 
    "constraints": ["Industry-specific constraint 1", "..."],
    "coreProblem": "The unique structural reason why ${data.targetMarket[0]} struggles today.",
    "hmw": ["Specific How Might We question 1", "..."],
    "keyInsights": ["Non-generic professional insight 1", "..."], 
    "actionItems": [{"action": "Specific task", "timeline": "e.g. Week 1"}]
  },
  "user_segmentation": {
    "title": "User Segmentation", "tagline": "Identifying value clusters",
    "segments": [{"name": "Specific persona name", "description": "Behavioral description", "value": "Strategic value"}],
    "targetArchetype": "Detailed behavioral profile",
    "keyInsights": ["Insight about user behavior"],
    "actionItems": [{"action": "Task", "timeline": "Week 2"}]
  },
  "empathy_mapping": {
    "title": "Empathy Mapping", "tagline": "Visualizing attitudes",
    "thinks": ["Specific thought relating to ${data.productName}"],
    "feels": ["Specific visceral emotion"],
    "says": ["Quotable user statement"],
    "does": ["Actionable behavior"],
    "keyInsights": ["Psychological trigger insight"],
    "actionItems": [{"action": "Task", "timeline": "Week 3"}]
  },
  "pain_point_analysis": {
    "title": "Pain Point Analysis", "tagline": "Quantifying struggle",
    "pains": [{"issue": "Detailed friction point", "impact": "Critical/High", "frequency": "Daily/Initial"}],
    "rootCauses": ["Structural or technical reason for pain"],
    "keyInsights": ["Friction discovery"],
    "actionItems": [{"action": "Task", "timeline": "Week 3"}]
  },
  "competitive_analysis": {
    "title": "Competitive Analysis", "tagline": "Landscape Mapping",
    "competitors": [{"name": "Specific rival or alternative", "advantage": "Their moat", "vulnerability": "Why ${data.productName} wins"}],
    "uniqueMoat": "Sustainable advantage for ${data.productName}",
    "keyInsights": ["Market gap discovery"],
    "actionItems": [{"action": "Task", "timeline": "Ongoing"}]
  },
  "ideation": {
    "title": "Ideation", "tagline": "Solution paths",
    "concepts": [{"name": "Feature group", "description": "Actionable capability", "impact": "High"}],
    "blueSkyIdea": "Ambitious 5-year vision",
    "keyInsights": ["Innovation trigger"],
    "actionItems": [{"action": "Task", "timeline": "Week 4"}]
  },
  "feature_prioritization": {
    "title": "Feature Prioritization", "tagline": "Path to value",
    "matrix": {"must": ["Vital MVP feature"], "should": ["Engagement feature"], "could": ["Delight feature"], "wont": ["Postponed feature"]},
    "complexityVsValue": "Trade-off analysis",
    "keyInsights": ["Focus insight"],
    "actionItems": [{"action": "Task", "timeline": "Week 5"}]
  },
  "user_journey_mapping": {
    "title": "User Journey", "tagline": "Visualizing experience",
    "steps": [{"step": "Phase", "action": "User task", "emotion": "Pos/Neg/Neu", "insight": "Opportunity"}],
    "magicMoment": "The exact instant the value clicks",
    "keyInsights": ["Retention trigger"],
    "actionItems": [{"action": "Task", "timeline": "Week 6"}]
  },
  "prototyping_strategy": {
    "title": "Prototyping", "tagline": "Path to learning",
    "focus": "Validation goal",
    "lowFi": ["Specific sketch/wireframe type"],
    "highFi": ["Tech stack recommendation for prototype"],
    "keyFlow": "Most critical user path",
    "keyInsights": ["Learning goal"],
    "actionItems": [{"action": "Task", "timeline": "Week 7"}]
  },
  "validation_feedback": {
    "title": "Validation & Feedback", "tagline": "Real-world signals",
    "kpis": [{"metric": "Relevant KPI name", "target": "Specific numeric target e.g. 40%+"}],
    "testPlan": "Detailed experimental setup",
    "fallbackPlan": "Strategic pivot if metrics fail",
    "keyInsights": ["Success signal"],
    "actionItems": [{"action": "Task", "timeline": "Ongoing"}]
  }
}

IMPORTANT: Return ONLY the JSON object. No markdown, no prose. Ensure numerical data for KPIs.`;

    const promptParts = [systemPrompt];
    if (imagePart) promptParts.push(imagePart);

    const result = await model.generateContent(promptParts);
    const responseText = result.response.text().replace(/```json|```/g, '').trim();
    const aiData = JSON.parse(responseText);

    return {
      metadata: {
        productName: data.productName,
        category: data.category,
        generatedAt: new Date().toISOString(),
      },
      phases: PHASE_KEYS.reduce((acc, key) => {
        acc[key] = {
          ...PHASE_COLORS[key],
          emoji: getEmojiForKey(key),
          ...aiData[key]
        };
        return acc;
      }, {})
    };
  } catch (err) {
    console.error("AI Generation failed:", err);
    return generateFallbackAnalysis(data);
  }
}

function getEmojiForKey(key) {
  const emojis = {
    problem_definition: '🎯',
    user_segmentation: '👥',
    empathy_mapping: '🤝',
    pain_point_analysis: '⚡',
    competitive_analysis: '⚔️',
    ideation: '💡',
    feature_prioritization: '⚖️',
    user_journey_mapping: '🗺️',
    prototyping_strategy: '🛠️',
    validation_feedback: '✓'
  }
  return emojis[key] || '◎'
}

function generateFallbackAnalysis(data) {
  const productName = data.productName || 'the product'
  const category = data.category || 'the market'
  const targetMarket = (data.targetMarket && data.targetMarket.length > 0) ? data.targetMarket[0] : 'target audiences'

  return {
    metadata: {
      productName,
      category,
      generatedAt: new Date().toISOString(),
    },
    phases: PHASE_KEYS.reduce((acc, key) => {
      acc[key] = {
        ...PHASE_COLORS[key],
        title: key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        emoji: getEmojiForKey(key),
        tagline: 'Strategic data analysis',
        keyInsights: [`Define specific objectives for ${productName} within the ${category} industry.`, `Ensure solutions are tailored for ${targetMarket}.`],
        actionItems: [{ action: 'Conduct initial research', timeline: 'Week 1' }]
      };
      
      // Add a few custom fields for fallbacks to avoid crashes
      if (key === 'validation_feedback') {
        acc[key].kpis = [
          { metric: 'User Activation', target: '40%+' },
          { metric: 'Retention Rate', target: '25% after 30 days' }
        ];
      }
      
      return acc;
    }, {})
  }
}
