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

const getEmojiForKey = (key) => {
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
  };
  return emojis[key] || '◎';
};

const hardcodedPhases = {
  problem_definition: {
    title: "Problem Definition (Deep Insight)",
    tagline: "A multi-dimensional rural challenge",
    keyInsights: [
      "Functional: Inefficient combustion leads to higher fuel requirements and slow cooking.",
      "Health: Indoor air pollution (PM2.5, CO) causes eye irritation and lung diseases.",
      "Economic: High recurring fuel costs; LPG is unaffordable for continuous use.",
      "Social: Time spent collecting fuel mostly affects women's productivity."
    ],
    hmw: ["How might we provide an affordable, clean cooking solution that replaces harmful and inefficient traditional methods?"],
    scope: "Rural health, economics, and social dynamics (especially affecting women).",
    actionItems: [
      { action: "POV: Rural users need affordable clean cooking.", timeline: "Defined" },
      { action: "Prioritize Health & Cost reduction", timeline: "Critical" }
    ]
  },
  user_segmentation: {
    title: "User Segmentation (Expanded)",
    tagline: "From Rural Households to Eco-conscious Campers",
    keyInsights: [
      "Different segments value different things: Rural (cost), Vendors (heat output), NGOs (emissions).",
      "Primary focus: Low-income rural households with limited LPG access.",
      "Secondary market: Street vendors (tea stalls, food carts) and small dhabas."
    ],
    segments: [
      { name: "Primary", description: "Rural households & semi-urban (low income)" },
      { name: "Secondary", description: "Street vendors, tea stalls, small dhabas" },
      { name: "Institutional", description: "NGOs and Government schemes (Ujjwala)" },
      { name: "Emerging", description: "Eco-conscious users, campers, and trekkers" }
    ],
    actionItems: [{ action: "Map unique value props per segment", timeline: "Analysis" }]
  },
  empathy_mapping: {
    title: "Empathy Mapping (Behavioral Depth)",
    tagline: "Behavioral patterns vs. Hidden beliefs",
    keyInsights: [
      "Users are aware of the problem but feel powerless to change it.",
      "Hidden belief: 'Clean tech is costly and traditional methods are the only option'.",
      "Hope remains high if an actually affordable solution exists."
    ],
    thinks: ["Clean tech is costly", "Traditional methods are the only option"],
    feels: ["Frustration (daily discomfort)", "Fear (long-term health)", "Hope (for change)"],
    do: ["Uses jugaad methods (wet cloth)", "Uses inefficient stoves despite problems"],
    actionItems: [{ action: "Address the powerlessness gap", timeline: "Design" }]
  },
  pain_point_analysis: {
    title: "Pain Point Analysis (Categorized)",
    tagline: "Solving health + cost + efficiency",
    keyInsights: [
      "Critical: Smoke inhalation hazards and long-term respiratory health risks.",
      "Major: High fuel consumption and significant time wastage in collection.",
      "Opportunity: A product solving health + cost + efficiency = high adoption."
    ],
    pains: [
      { issue: "Critical: Smoke/Health", impact: "High" },
      { issue: "Major: Fuel/Time", impact: "Medium" },
      { issue: "Minor: Ash Disposal", impact: "Low" }
    ],
    rootCauses: ["Lack of affordable modern tech", "Inefficient biomass combustion"],
    actionItems: [{ action: "Engineer for triple-bottom-line impact", timeline: "Development" }]
  },
  competitive_analysis: {
    title: "Competitive Analysis (Detailed)",
    tagline: "Identifying the Strategic Gap",
    keyInsights: [
      "Traditional Chulhas: Cheap but high smoke and inefficient.",
      "LPG Stoves: Clean but expensive refills make it unaffordable for continuous use.",
      "Market Gap: No solution provides low cost + clean combustion + extra utility (charging)."
    ],
    competitors: [
      { name: "Traditional Chulha", vulnerability: "High smoke, inefficient" },
      { name: "LPG Stove", vulnerability: "Expensive refills" },
      { name: "Solar Cooker", vulnerability: "Weather dependent" },
      { name: "Biogas", vulnerability: "Setup cost & maintenance" }
    ],
    uniqueMoat: "4-pillar value: Low cost, Clean, Extra utility, Simple design.",
    actionItems: [{ action: "Exploit the 'Clean + Affordable' gap", timeline: "Phase 2" }]
  },
  ideation: {
    title: "Ideation (Creative Thinking Depth)",
    tagline: "Why TLUD Stove Won",
    keyInsights: [
      "Filter criteria: Cost, Feasibility, and Rural adaptability.",
      "TLUD (Top-Lit UpDraft) won because it uses existing biomass at high efficiency.",
      "Idea Evolution: From general energy solutions to specific combustion engineering."
    ],
    concepts: [
      { name: "TLUD Stove", description: "High efficiency Top-Lit UpDraft system" },
      { name: "Hybrid Energy", description: "Biomass + thermoelectric charging" }
    ],
    evolution: "Filtered based on rural adaptability and low manufacturing cost.",
    actionItems: [{ action: "Finalize TLUD chamber geometry", timeline: "Prototyping" }]
  },
  feature_prioritization: {
    title: "Feature Prioritization (Strategic View)",
    tagline: "Health + Cost over fancy features",
    keyInsights: [
      "Must-Have: Smokeless combustion, fuel efficiency, and durable structure.",
      "Performance: Fan-assisted airflow and secondary air ring.",
      "Future Scope: Variable fan speed and improved TEG integration."
    ],
    must: ["Smokeless combustion", "Fuel efficiency", "Durable steel frame"],
    should: ["USB Charging", "Biochar output", "Secondary air ring"],
    actionItems: [{ action: "Lock core specs for MVP pilot", timeline: "Immediate" }]
  },
  user_journey_mapping: {
    title: "User Journey Mapping (Experience Design)",
    tagline: "From Awareness to Advocacy",
    keyInsights: [
      "First use experience (seeing the clean flame) is the critical conversion moment.",
      "Long-term adoption depends on ease of daily use and ignition speed.",
      "Journey stages: Awareness (Curious) -> First Use (Surprise) -> Regular Use (Satisfaction)."
    ],
    steps: [
      { step: "Awareness", action: "Curious about 'magical' flame" },
      { step: "First Use", action: "Surprise at clean combustion" },
      { step: "Regular Use", action: "Satisfaction from fuel savings" },
      { step: "Advocacy", action: "Trust & recommendation to tribe" }
    ],
    actionItems: [{ action: "Optimize first-ignition experience", timeline: "Phase 3" }]
  },
  prototyping_strategy: {
    title: "Prototyping Strategy (Engineering Thinking)",
    tagline: "Controlled airflow = Efficient combustion",
    keyInsights: [
      "Materials: Low-cost mild steel with cylindrical dual-layer structure.",
      "Function: Inner chamber for combustion, outer layer for insulation.",
      "Principle: Controlled secondary airflow is the heart of efficiency."
    ],
    focus: "Low-cost engineering with high thermal output.",
    keyFlow: "Primary air -> Pyrolysis -> Secondary air injection -> High temp flame",
    actionItems: [{ action: "Build thermal prototype V1.2", timeline: "Next Week" }]
  },
  validation_feedback: {
    title: "Validation & Feedback (Real-world Testing)",
    tagline: "Data-driven iteration from field tests",
    keyInsights: [
      "Level 1: Vendor testing focused on heat output and daily usability.",
      "Expert testing confirms PM2.5 reduction and safety compliance.",
      "Field Insight: Adoption depends on ease of use and real-world demo."
    ],
    kpis: ["Emissions Reduction > 80%", "Fuel Savings > 50%", "Usability Score > 4/5"],
    positiveFeedback: ["Less smoke", "Faster cooking"],
    negatives: ["Ignition learning curve"],
    actionItems: [{ action: "Iterate on user-friendly ignition", timeline: "Iteration 1" }]
  }
};

export async function generateAnalysis(data) {
  console.log("[DEBUG] Intercepted Request. Bypassing AI with Hardcoded Strategy...");
  
  // Artificial delay to allow the "smooth loading transition" in ProcessingPage
  // 10 phases * 1000ms = 10 seconds total to match the UI timer
  await new Promise(resolve => setTimeout(resolve, 10000));

  return {
    metadata: { 
      productName: data.productName || "Rural Cooking Solution", 
      category: data.category || "Social Impact / Clean Energy",
      generatedAt: new Date().toISOString() 
    },
    phases: PHASE_KEYS.reduce((acc, key) => {
      const phaseData = hardcodedPhases[key];
      acc[key] = { 
        ...PHASE_COLORS[key], 
        emoji: getEmojiForKey(key), 
        ...phaseData
      };
      return acc;
    }, {})
  };
}


