/**
 * Design Thinking Analysis Engine
 * Generates comprehensive product analysis based on user input
 */

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
  problem_definition: { primary: '#2563EB', dark: '#1E40AF', light: '#DBEAFE', text: '#FFFFFF' },
  user_segmentation: { primary: '#4F46E5', dark: '#3730A3', light: '#E0E7FF', text: '#FFFFFF' },
  empathy_mapping: { primary: '#7C3AED', dark: '#5B21B6', light: '#EDE9FE', text: '#FFFFFF' },
  pain_point_analysis: { primary: '#DC2626', dark: '#991B1B', light: '#FEE2E2', text: '#FFFFFF' },
  competitive_analysis: { primary: '#D97706', dark: '#92400E', light: '#FEF3C7', text: '#FFFFFF' },
  ideation: { primary: '#DB2777', dark: '#9D174D', light: '#FCE7F3', text: '#FFFFFF' },
  feature_prioritization: { primary: '#059669', dark: '#065F46', light: '#D1FAE5', text: '#FFFFFF' },
  user_journey_mapping: { primary: '#0891B2', dark: '#155E75', light: '#CFFAFE', text: '#FFFFFF' },
  prototyping_strategy: { primary: '#475569', dark: '#1E293B', light: '#F1F5F9', text: '#FFFFFF' },
  validation_feedback: { primary: '#65A30D', dark: '#3F6212', light: '#ECFCCB', text: '#FFFFFF' },
}

function generatePersonas(data) {
  const category = data.category || 'General'
  const catLower = category.toLowerCase()
  const productName = data.productName || 'the product'
  const targetMarket = data.targetMarket || 'general consumers'

  return [
    {
      name: 'Alex Chen',
      age: '28-35',
      role: 'Early Adopter',
      avatar: '👨‍💻',
      description: `A forward-thinking individual who actively seeks out innovative solutions in the ${catLower} space. Highly engaged with finding better ways to solve daily challenges.`,
      goals: [`Successfully integrate ${productName} into their routine`, `Reduce time wasted on outdated ${catLower} tools`, 'Be the first among peers to adopt a superior solution'],
      pains: [`Current ${catLower} solutions are too complex, fragmented, or lack efficiency`, `Struggling to find an all-in-one approach like ${productName} promises`, 'High cost of maintaining existing alternatives'],
      behaviors: ['Extensively reads reviews before purchasing', `Participates actively in ${catLower} online communities`, 'Strongly influences peers\' purchasing decisions'],
    },
    {
      name: 'Maria Santos',
      age: '35-45',
      role: 'Pragmatic Professional',
      avatar: '👩‍🏫',
      description: `A results-driven user within the ${targetMarket} demographic focused on practical outcomes. Values reliability and ease-of-use above all else when evaluating ${productName}.`,
      goals: [`Solve specific, immediate pain points with ${productName}`, 'Justify the investment with clear, measurable ROI', `Experience a minimal learning curve when switching to ${productName}`],
      pains: ['Complex onboarding processes lead to frustration', `Unclear value proposition from other brands in the ${catLower} industry`, 'Lack of reliable, human customer support when things go wrong'],
      behaviors: ['Focuses strictly on measurable, tangible results', 'Heavily relies on product demos and real-world testing', 'Values strong peer recommendations over marketing'],
    },
    {
      name: 'Jordan Lee',
      age: '22-28',
      role: 'Budget-Conscious Explorer',
      avatar: '🧑‍🎨',
      description: `A younger demographic exploring solutions in the ${catLower} space. Price-sensitive but highly motivated by unique value, strong aesthetics, and community backing.`,
      goals: [`Find an affordable yet powerful alternative to mainstream ${catLower} products`, `Grow alongside ${productName} as their personal needs evolve`, 'Stand out by leveraging an innovative, modern tool'],
      pains: ['Premium pricing of legacy competitors feels utterly unjustified', 'Feature gaps or poor design in cheaper market alternatives', `Overwhelming and confusing choices in the ${catLower} market`],
      behaviors: ['Compares multiple options extensively across review platforms', 'Highly influenced by social media trust signals and trends', 'Seeks community validation before committing to a purchase'],
    },
  ]
}

function generatePainPoints(data) {
  const productName = data.productName || 'this product'
  const category = data.category || 'this space'
  const targetMarket = data.targetMarket || 'users'

  return [
    { severity: 'High', point: `Existing ${category} solutions are inefficient, time-consuming, or overly complicated for ${targetMarket}` },
    { severity: 'High', point: `Users struggle to find a single, cohesive solution that addresses ALL their needs around what ${productName} solves` },
    { severity: 'Medium', point: `The cost of premium ${category} alternatives creates a significant barrier to entry` },
    { severity: 'Medium', point: `Poor onboarding and lack of clear documentation mean users never reach their "aha moment" with typical ${category} products` },
    { severity: 'Medium', point: `Friction introducing ${productName} into their existing established daily workflows or environments` },
    { severity: 'Low', point: 'The user experience and interface of competing solutions feels outdated or clunky' },
    { severity: 'Low', point: 'Customer support and community resources are inadequate for emerging use-cases' },
  ]
}

function generateProblemStatement(data) {
  const productName = data.productName || 'this product'
  const category = data.category || 'the market'
  const targetMarket = data.targetMarket || 'users'

  return {
    pov: `${targetMarket} who need to effectively leverage ${category} solutions require a seamless, intuitive, and comprehensive experience because current alternatives are fragmented, costly, and fail to deliver consistent value.`,
    hmw: [
      `How might we make ${productName} so intuitive that new users feel successful and empowered from day one?`,
      `How might we differentiate ${productName} beyond basic features to create genuine emotional resonance in the ${category} market?`,
      `How might we build a passionate community around ${productName} that accelerates organic adoption?`,
      `How might we price and package ${productName} to capture value across multiple segments of ${targetMarket}?`,
    ],
    coreChallenge: `The core challenge is to bridge the gap between what ${targetMarket} actually need and what the current ${category} market provides — delivering ${productName}'s unique value in the simplest, most delightful way possible.`,
    kpis: [
      { metric: 'User Activation Rate', target: '>60% within first week of use', type: 'Onboarding' },
      { metric: 'Market Penetration', target: `25% growth among ${targetMarket}`, type: 'Growth' },
      { metric: 'Net Promoter Score (NPS)', target: '>50 within 3 months', type: 'Satisfaction' },
      { metric: 'Customer Acquisition Cost (CAC)', target: '<1/3 of Lifetime Value', type: 'Unit Economics' },
      { metric: 'Churn/Abandonment Rate', target: '<5% monthly reduction', type: 'Retention' },
    ],
  }
}

function generateIdeas(data) {
  const productName = data.productName || 'this product'
  const category = data.category || 'industry'

  const features = [
    { name: 'Smart Onboarding Experience', priority: 'Critical', effort: 'Medium', impact: 'Very High', description: `Personalized flow that adapts to target users' specific goals with ${productName}` },
    { name: 'Intelligent Insights & Feedback', priority: 'High', effort: 'High', impact: 'Very High', description: `Automated recommendations optimizing how users interact with ${category} workflows` },
    { name: 'Seamless Ecosystem Integration', priority: 'High', effort: 'Medium', impact: 'High', description: `Frictionless connections to top resources and adjacent tools in the ${category} ecosystem` },
    { name: 'Community & Peer Collaboration', priority: 'High', effort: 'High', impact: 'High', description: 'Shared spaces, feedback loops, and user-to-user networking capabilities' },
    { name: 'Mobile/Portable First Design', priority: 'High', effort: 'Medium', impact: 'High', description: `Ensuring ${productName} delivers full, uncompromised value regardless of where the user is` },
    { name: 'Advanced Effectiveness Tracking', priority: 'Medium', effort: 'High', impact: 'High', description: `Customizable metrics allowing users to see exactly how much time/money ${productName} saves them` },
    { name: 'Quick-Start Templates', priority: 'Medium', effort: 'Low', impact: 'Medium', description: `Curated best-practice workflows tailored specifically for ${data.targetMarket || 'new users'}` },
    { name: 'Open Integration Platform', priority: 'Medium', effort: 'Very High', impact: 'High', description: 'Robust hooks for custom third-party integrations and expansions' },
    { name: 'Resilient Offline Mode', priority: 'Low', effort: 'High', impact: 'Medium', description: `Full functionality of ${productName} without connectivity, syncing smartly when available` },
    { name: 'Premium Customization Tier', priority: 'Low', effort: 'High', impact: 'Medium', description: 'Bespoke aesthetic and functional options tailored for high-end or enterprise clients' },
    { name: 'Achievement & Reward System', priority: 'Low', effort: 'Medium', impact: 'Medium', description: 'Milestones and tracking to drive continuous engagement and habit formation' },
  ]

  const strategies = [
    { approach: 'Product-Led Growth', description: `Lead with a frictionless entry model that showcases ${productName}'s core value immediately, letting the experience drive conversion.` },
    { approach: 'Community-Led Expansion', description: `Build a passionate user base around ${category} innovation that evangelizes the product organically and reduces acquisition costs.` },
    { approach: 'Premium-First Targeting', description: `Focus aggressively on early-adopters within ${data.targetMarket || 'the market'} who are willing to pay a premium for a superior, polished experience.` },
    { approach: 'Vertical Specialization', description: `Go incredibly deep solving problems for one specific niche using ${productName} before expanding to the broader ${category} market.` },
  ]

  const usps = [
    `${productName} is the definitive solution uniquely combining unparalleled ease-of-use with advanced ${category} capabilities.`,
    `A best-in-class user experience that significantly reduces time-to-value compared to legacy alternatives.`,
    `Intelligent architecture tailored specifically for the needs and frustrations of ${data.targetMarket || 'modern consumers'}.`,
    `Transparent, straightforward value without the hidden complications of traditional competitors.`,
    `Designed from the ground up to respect user time, privacy, and workflow logic.`,
  ]

  return { features, strategies, usps }
}

function generatePrototypePlan(data) {
  const productName = data.productName || 'this product'

  const mvpFeatures = [
    { feature: 'Core Value Proposition Engine', description: `The absolute essential functionality that delivers on ${productName}'s primary promise`, mustHave: true },
    { feature: 'Frictionless Entry & Setup', description: `Secure, dead-simple onboarding specifically crafted for ${data.targetMarket || 'users'}`, mustHave: true },
    { feature: 'Intuitive First-Run Experience', description: 'Guided flow leading users directly to their first major success milestone', mustHave: true },
    { feature: 'Usage Analytics & Telemetry', description: 'Tracking key user actions to measure genuine engagement and locate friction points', mustHave: true },
    { feature: 'Responsive Cross-Format UI', description: 'Flawless visual and functional experience across all required platforms from day one', mustHave: true },
    { feature: 'Direct Feedback Channel', description: 'In-app or direct support gateway for early adopters to report critical issues', mustHave: false },
    { feature: 'Basic Social/Sharing Loops', description: 'Allowing users to share their results or experience for organic social proof', mustHave: false },
  ]

  const roadmap = [
    { phase: 'Phase 1', title: 'Foundation & MVP', items: ['Build core value mechanics', `Onboard initial beta group from ${data.targetMarket || 'target audience'}`, `Stress test ${productName} heavily`, 'Patch critical friction points'] },
    { phase: 'Phase 2', title: 'Iteration & Launch', items: ['Public launch with early-bird incentives', 'Aggressively implement top user requests', 'Spin up referral and ambassador programs', 'Reach stabilization of core metrics'] },
    { phase: 'Phase 3', title: 'Scale & Expand', items: ['Introduce premium upgrades or accessories', 'Deploy power-user specific enhancements', `Expand marketing footprint within ${data.category || 'the market'}`, 'Target sustainable profitability'] },
  ]

  const pricingOptions = [
    { model: 'Freemium / Base + Upgrades', description: `Free/low-cost accessible tier for ${productName} with premium add-ons for heavy users`, pros: ['Massive top-of-funnel', 'Viral potential', 'Fast market penetration'], cons: ['Lower initial unit revenue', 'High support overhead'] },
    { model: 'Premium Direct Strategy', description: `Positioning ${productName} as a high-end, premium investment with white-glove support`, pros: ['High initial margins', 'Filters out low-intent users', 'Strong brand perception'], cons: ['Slower volume growth', 'Higher customer acquisition costs'] },
    { model: 'Usage/Consumable Based', description: `Low barrier to start, scales continuously seamlessly with the value delivered by ${productName}`, pros: ['Perfectly aligns cost with user value', 'Incredibly sticky once adopted'], cons: ['Revenue can be lumpy and hard to forecast'] },
  ]

  return { mvpFeatures, roadmap, pricingOptions }
}

function generateTestingPlan(data) {
  const productName = data.productName || 'this product'
  const targetMarket = data.targetMarket || 'the target demographic'

  const assumptions = [
    { assumption: `Users in ${targetMarket} will actually switch from their current solutions to ${productName}`, priority: 'Critical', method: 'Concept testing and willingness-to-pay interviews' },
    { assumption: `The core onboarding flow of ${productName} achieves a 60%+ completion rate without manual help`, priority: 'Critical', method: 'Drop-off analytics + recorded observation sessions' },
    { assumption: `Users can independently extract key value from ${productName} within their first 5 minutes of use`, priority: 'High', method: 'Moderated, unguided user testing sessions (n=10-15)' },
    { assumption: `The long-term durability and quality meets the high expectations of the ${data.category || 'market'}`, priority: 'High', method: 'Longitudinal beta testing over a 30-day period' },
    { assumption: 'Word-of-mouth will naturally drive >20% of new customer acquisition', priority: 'Medium', method: 'Referral source tracking and post-purchase surveys' },
    { assumption: 'Specific Feature X is fundamentally more important to conversion than Feature Y', priority: 'Medium', method: 'Feature-gates and Kano surveys with 50+ engaged respondents' },
  ]

  const testingMethods = [
    { method: 'Deep-Dive Interviews', timeline: 'Weeks 1-2', participants: `10-15 ${targetMarket} profiles`, goal: `Validate true pain points and confirm ${productName} solves them` },
    { method: 'Friction Testing', timeline: 'Weeks 2-3', participants: '8-12 objective users', goal: 'Identify UX/UI friction, confusion, and interface navigation issues' },
    { method: 'Closed Beta Launch', timeline: 'Month 2', participants: '50-100 highly engaged early adopters', goal: 'Gather real-world, unscripted usage data and product-market fit signals' },
    { method: 'A/B Value Testing', timeline: 'Month 3+', participants: 'Split traffic allocations', goal: 'Optimize marketing messaging, pricing models, and key conversion funnels' },
    { method: 'Sentiment Tracking', timeline: 'Monthly', participants: 'Active user base', goal: 'Track NPS to identify what creates promoters versus detractors' },
  ]

  const risks = [
    { risk: `Initial adoption by ${targetMarket} is slower than projected`, level: 'High', mitigation: 'Launch with guaranteed warm beta cohort; offer extensive white-glove onboarding to ensure early wins' },
    { risk: `A major competitor in the ${data.category || 'space'} copies ${productName}'s key differentiating angle`, level: 'High', mitigation: 'Focus relentlessly on building an uncopyable moat through community, brand loyalty, and deep ecosystem integration' },
    { risk: 'Technical limits or supply chain bottlenecks during sudden scaling', level: 'Medium', mitigation: 'Stress test all systems and vendors at 10x expected capacity prior to any public launch pushes' },
    { risk: 'Users sign up but abandon after one use (High Day-1 Churn)', level: 'High', mitigation: 'Implement robust lifecycle communication, proactive nurturing, and clear in-app success milestones' },
  ]

  return { assumptions, testingMethods, risks }
}

function generateRefinementPlan(data) {
  const productName = data.productName || 'this product'
  const category = data.category || 'the market'

  const iterationPriorities = [
    { priority: 1, area: 'Onboarding & First-Use Polish', description: `Aggressively reduce time-to-value for ${productName} based entirely on observed drop-off metrics`, impact: 'Very High', effort: 'Medium' },
    { priority: 2, area: 'Deepening Core Functionality', description: `Expand the capabilities of the most-used features of ${productName} based strictly on power-user feedback`, impact: 'High', effort: 'High' },
    { priority: 3, area: 'End-to-End Reliability', description: 'Ensure flawless performance, zero-crash stability, and robust edge-case handling', impact: 'High', effort: 'High' },
    { priority: 4, area: 'Ecosystem Expansion', description: `Deepen integrations and compatibility with other popular tools in the ${category} space`, impact: 'High', effort: 'High' },
    { priority: 5, area: 'Advanced Personalization', description: 'Introduce smart workflows that adapt dynamically to individual user behavior patterns', impact: 'Medium', effort: 'Very High' },
    { priority: 6, area: 'Enterprise / Power-User Tier', description: 'Deploy advanced compliance, team management, and bespoke scaling capabilities required for B2B', impact: 'Medium', effort: 'Very High' },
  ]

  const longTermVision = {
    year1: `${productName} cements itself as the go-to breakout tool for early adopters, achieving strong product-market fit and a fiercely loyal initial user base.`,
    year2: `${productName} expands aggressively into adjacent demographics, launches premium enterprise/pro tiers, and builds a thriving, self-sustaining partner ecosystem.`,
    year3: `${productName} establishes itself as the absolute category leader in ${category}, evolving into a platform that sets the standard for competitors to follow.`,
    vision: `A future where ${productName} is synonymous with excellence and innovation in ${category}, trusted universally by ${data.targetMarket || 'users'} as the pinnacle of what a solution should be.`,
  }

  return { iterationPriorities, longTermVision }
}

function generateFallbackAnalysis(data) {
  const productName = data.productName || 'the product'
  const category = data.category || 'the market'
  const targetMarket = data.targetMarket || 'target audiences'

  return {
    metadata: {
      productName,
      category,
      generatedAt: new Date().toISOString(),
    },
    phases: {
      problem_definition: {
        ...PHASE_COLORS.problem_definition,
        title: 'Problem Definition',
        emoji: '🎯',
        tagline: 'Defining the boundaries of the challenge',
        scope: `Analyze the ${category} space to identify underserved needs for ${targetMarket}.`,
        constraints: ['Market saturation', 'Technical feasibility', 'User adoption friction'],
        coreProblem: `Existing ${category} solutions are too complex for ${targetMarket}.`,
        hmw: [`How might we simplify the core ${productName} experience?`, 'How might we reduce onboarding time?'],
        keyInsights: [`${targetMarket} value simplicity over feature density.`, `The ${category} market is currently fragmented.`],
        actionItems: [{ action: 'Conduct stakeholder interviews', timeline: 'Week 1' }]
      },
      user_segmentation: {
        ...PHASE_COLORS.user_segmentation,
        title: 'User Segmentation',
        emoji: '👥',
        tagline: 'Identifying high-value user clusters',
        segments: [
          { name: 'Busy Professionals', description: 'Seeking efficiency and speed.', value: 'High' },
          { name: 'Casual Explorers', description: 'Aesthetic and trend-driven.', value: 'Medium' }
        ],
        targetArchetype: 'The Efficiency-Seeker',
        keyInsights: ['Segment A represents 40% of the market.', 'Segment B is growing rapidly.'],
        actionItems: [{ action: 'Define detailed user personas', timeline: 'Week 2' }]
      },
      empathy_mapping: {
        ...PHASE_COLORS.empathy_mapping,
        title: 'Empathy Mapping',
        emoji: '🤝',
        tagline: 'Visualizing user attitudes and behaviors',
        thinks: [`Is ${productName} worth it?`, 'Will this solve my pain?'],
        feels: ['Frustrated with current tools', 'Optimistic about new solutions'],
        says: ['"I need a better way to do this."', '"The current tools are too slow."'],
        does: ['Searches for reviews', 'Asks peers for recommendations'],
        keyInsights: ['Users feel overwhelmed by current options.', 'Trust is built through peer validation.'],
        actionItems: [{ action: 'Validate empathy map with users', timeline: 'Week 2' }]
      },
      pain_point_analysis: {
        ...PHASE_COLORS.pain_point_analysis,
        title: 'Pain Point Analysis',
        emoji: '⚡',
        tagline: 'Quantifying the user\'s struggle',
        pains: [
          { issue: 'High cost of alternatives', impact: 'High', frequency: 'Constant' },
          { issue: 'Steep learning curve', impact: 'Medium', frequency: 'Initial' }
        ],
        rootCauses: ['Outdated legacy systems', 'Lack of user-centric design'],
        keyInsights: ['Cost is the primary barrier.', 'Workflow friction causes churn.'],
        actionItems: [{ action: 'Map pain points to feature solutions', timeline: 'Week 3' }]
      },
      competitive_analysis: {
        ...PHASE_COLORS.competitive_analysis,
        title: 'Competitive Analysis',
        emoji: '⚔️',
        tagline: 'Mapping the landscape of alternatives',
        competitors: [
          { name: 'Legacy Leader', advantage: 'Brand recognition', vulnerability: 'Slow to innovate' },
          { name: 'Niche Player', advantage: 'Deep features', vulnerability: 'Expensive' }
        ],
        uniqueMoat: `Superior UX and lower latency for ${productName}.`,
        keyInsights: ['Competitors are ignoring the low-end market.', 'Digital transformation is a key driver.'],
        actionItems: [{ action: 'Monitor competitor feature releases', timeline: 'Ongoing' }]
      },
      ideation: {
        ...PHASE_COLORS.ideate,
        title: 'Ideation',
        emoji: '💡',
        tagline: 'Generating disruptive solution paths',
        concepts: [
          { name: 'Gamified Interaction', description: 'Drive engagement through rewards.', impact: 'High' },
          { name: 'Social Integration', description: 'Leverage peer networks.', impact: 'Medium' }
        ],
        blueSkyIdea: `An AI-first ${category} oracle that predicts user needs.`,
        keyInsights: ['Simple ideas often have the highest impact.', 'Cross-industry inspiration is vital.'],
        actionItems: [{ action: 'Prototype the top 3 concepts', timeline: 'Week 4' }]
      },
      feature_prioritization: {
        ...PHASE_COLORS.feature_prioritization,
        title: 'Feature Prioritization',
        emoji: '⚖️',
        tagline: 'Defining the path to value',
        matrix: {
          must: ['Core Value Flow', 'Security'],
          should: ['Analytics', 'Custom Themes'],
          could: ['Social Sharing'],
          wont: ['Legacy Support']
        },
        complexityVsValue: 'Highest value lies in the core workflow automation.',
        keyInsights: ['Avoid feature bloat in the MVP.', 'Prioritize based on user pain severity.'],
        actionItems: [{ action: 'Finalize the MVP feature list', timeline: 'Week 3' }]
      },
      user_journey_mapping: {
        ...PHASE_COLORS.user_journey_mapping,
        title: 'User Journey Mapping',
        emoji: '🗺️',
        tagline: 'Visualizing the end-to-end experience',
        steps: [
          { step: 'Awareness', action: 'Sees an ad', emotion: 'Neu', insight: 'First touchpoint' },
          { step: 'Conversion', action: 'Signs up', emotion: 'Pos', insight: 'Aha moment' }
        ],
        magicMoment: 'The moment the first result is generated.',
        keyInsights: ['Friction is highest during setup.', 'Personalization increases retention.'],
        actionItems: [{ action: 'Polish the conversion flow', timeline: 'Week 5' }]
      },
      prototyping_strategy: {
        ...PHASE_COLORS.prototyping_strategy,
        title: 'Prototyping Strategy',
        emoji: '🛠️',
        tagline: 'Minimum viable paths to learning',
        focus: 'Validating the core interaction model.',
        lowFi: ['Paper sketches', 'Lo-fi wireframes'],
        highFi: ['Interactive Figma prototype', 'React-based MVP'],
        keyFlow: 'Onboarding -> First Success',
        keyInsights: ['Rapid iteration prevents costly rebuilds.', 'Feedback should be gathered early.'],
        actionItems: [{ action: 'Build the clickable prototype', timeline: 'Week 4-5' }]
      },
      validation_feedback: {
        ...PHASE_COLORS.validation_feedback,
        title: 'Validation & Feedback',
        emoji: '✓',
        tagline: 'Closing the loop with real-world signals',
        kpis: [
          { metric: 'Activation Rate', target: '>40%' },
          { metric: 'Retention Rate', target: '>20% after 30 days' }
        ],
        testPlan: 'Run a closed beta with 50 targeted users.',
        fallbackPlan: 'Pivot to the secondary segment if acquisition is slow.',
        keyInsights: ['Success is measured by behavior, not praise.', 'Negative feedback is the most valuable.'],
        actionItems: [{ action: 'Schedule beta user interviews', timeline: 'Ongoing' }]
      }
    }
  }
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
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `You are a world-class Product Strategy Consultant and Design Thinking expert.
Generate a deep, professional, and highly structured Product Analysis JSON for a product in the ${data.category} space.

Product Context:
Name: ${data.productName}
Description: ${data.description || 'N/A'}
Problem Statement: ${data.problemStatement || 'N/A'}
Target Audience: ${data.targetMarket}
Competitors: ${data.competitors || 'N/A'}
Key Features: ${data.keyFeatures || 'N/A'}
Monetization: ${data.monetization || 'N/A'}
Platform: ${data.platform || 'Cross-platform'}

Return ONLY a JSON object EXACTLY matching this 10-Phase schema:
{
  "problem_definition": {
    "title": "Problem Definition", "tagline": "Defining the boundaries of the challenge",
    "scope": "", "constraints": [""], "coreProblem": "", "hmw": ["", "", ""],
    "keyInsights": [""], "actionItems": [{"action": "", "timeline": ""}]
  },
  "user_segmentation": {
    "title": "User Segmentation", "tagline": "Identifying high-value user clusters",
    "segments": [{"name": "", "description": "", "value": "High/Med/Low"}],
    "targetArchetype": "", "keyInsights": [""], "actionItems": [{"action": "", "timeline": ""}]
  },
  "empathy_mapping": {
    "title": "Empathy Mapping", "tagline": "Visualizing user attitudes and behaviors",
    "thinks": [""], "feels": [""], "says": [""], "does": [""],
    "keyInsights": [""], "actionItems": [{"action": "", "timeline": ""}]
  },
  "pain_point_analysis": {
    "title": "Pain Point Analysis", "tagline": "Quantifying the user's struggle",
    "pains": [{"issue": "", "impact": "Critical/High/Med", "frequency": ""}],
    "rootCauses": [""], "keyInsights": [""], "actionItems": [{"action": "", "timeline": ""}]
  },
  "competitive_analysis": {
    "title": "Competitive Analysis", "tagline": "Mapping the landscape of alternatives",
    "competitors": [{"name": "", "advantage": "", "vulnerability": ""}],
    "uniqueMoat": "", "keyInsights": [""], "actionItems": [{"action": "", "timeline": ""}]
  },
  "ideation": {
    "title": "Ideation", "tagline": "Generating disruptive solution paths",
    "concepts": [{"name": "", "description": "", "impact": "High"}],
    "blueSkyIdea": "", "keyInsights": [""], "actionItems": [{"action": "", "timeline": ""}]
  },
  "feature_prioritization": {
    "title": "Feature Prioritization", "tagline": "Defining the path to value",
    "matrix": {"must": [""], "should": [""], "could": [""], "wont": [""]},
    "complexityVsValue": "", "keyInsights": [""], "actionItems": [{"action": "", "timeline": ""}]
  },
  "user_journey_mapping": {
    "title": "User Journey Mapping", "tagline": "Visualizing the end-to-end experience",
    "steps": [{"step": "", "action": "", "emotion": "Pos/Neg/Neu", "insight": ""}],
    "magicMoment": "", "keyInsights": [""], "actionItems": [{"action": "", "timeline": ""}]
  },
  "prototyping_strategy": {
    "title": "Prototyping Strategy", "tagline": "Minimum viable paths to learning",
    "focus": "", "lowFi": [""], "highFi": [""], "keyFlow": "",
    "keyInsights": [""], "actionItems": [{"action": "", "timeline": ""}]
  },
  "validation_feedback": {
    "title": "Validation & Feedback", "tagline": "Closing the loop with real-world signals",
    "kpis": [{"metric": "", "target": ""}], "testPlan": "", "fallbackPlan": "",
    "keyInsights": [""], "actionItems": [{"action": "", "timeline": ""}]
  }
}

Ensure the analysis is based on established frameworks like MoSCoW, Lean Startup, and Human-Centered Design.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const aiData = JSON.parse(text);

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
  } catch (err) {
    console.error("AI Generation failed:", err);
    return generateFallbackAnalysis(data);
  }
}
