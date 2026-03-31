/**
 * Design Thinking Analysis Engine
 * Generates comprehensive product analysis based on user input
 */

const PHASE_COLORS = {
  empathize: { primary: '#FFD966', dark: '#E6BC3A', light: '#FFF3C4', text: '#7A5F00' },
  define: { primary: '#FF9B85', dark: '#E67D66', light: '#FFE8E3', text: '#7A2C1A' },
  ideate: { primary: '#E975BA', dark: '#CC5A9E', light: '#FCE4F4', text: '#6B1A52' },
  prototype: { primary: '#5B7FB0', dark: '#3D6095', light: '#DDE6F5', text: '#1E3A5F' },
  test: { primary: '#4DBFB5', dark: '#32A49A', light: '#D6F5F3', text: '#14524E' },
  refine: { primary: '#A8B5C4', dark: '#7A8FA2', light: '#E8EDF2', text: '#3A4A56' },
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
      productName: data.productName,
      category: data.category,
      currentStage: data.currentStage,
      targetMarket: data.targetMarket,
      generatedAt: new Date().toISOString(),
    },
    phases: {
      empathize: {
        ...PHASE_COLORS.empathize,
        title: 'Empathize',
        emoji: '🤝',
        tagline: 'Understanding users and their needs',
        personas: generatePersonas(data),
        painPoints: generatePainPoints(data),
        empathyMap: {
          thinks: [`Is ${productName} actually worth my time and financial investment?`, `Will this reliably solve my specific struggles with ${category.toLowerCase()}?`, 'Can I trust this brand to support me long-term?'],
          feels: [`Deeply frustrated with the fragmented state of current ${category.toLowerCase()} solutions`, `Cautiously optimistic about the potential of a better way with ${productName}`, 'Anxious about experiencing buyer\'s remorse or adoption friction'],
          says: [`"I just need something related to ${category.toLowerCase()} that actually works reliably"`, '"Why is every existing product in this space so complicated or limited?"', '"I wish there was one cohesive tool that finally does it all"'],
          does: [`Researches ${productName} and alternatives extensively before committing`, 'Relies heavily on peer reviews, unboxings, and community social proof', 'Often sticks with the "Devil they know" due to the high mental cost of switching'],
        },
        keyInsights: [
          `Potential buyers of ${productName} aren't just looking for another ${category.toLowerCase()} option — they want a measurable improvement to their daily routine.`,
          `Your biggest competitor isn't just other ${category.toLowerCase()} brands, but users choosing to stick with their current familiar habits.`,
          `When switching to a new solution like ${productName}, establishing immediate emotional trust is critical for early adoption.`,
          `The initial unboxing and first-use experience of ${productName} will overwhelmingly dictate long-term user retention.`,
          `If ${targetMarket} push back on the pricing of ${productName}, it means they don't yet fully grasp its unique value proposition.`,
        ],
        actionItems: [
          { action: `Conduct 10 dedicated user interviews with individuals matching the ${targetMarket} demographic`, timeline: 'Week 1-2' },
          { action: `Create a validated empathy map for ${productName} heavily grounded in actual field data, not assumptions`, timeline: 'Week 2' },
          { action: `Establish robust feedback channels that are visible to users from day one of the ${productName} beta`, timeline: 'Launch' },
        ],
      },
      define: {
        ...PHASE_COLORS.define,
        title: 'Define',
        emoji: '🎯',
        tagline: 'Synthesizing insights into clear problem statements',
        ...generateProblemStatement(data),
        valueProposition: `${productName} directly empowers ${targetMarket} who struggle with outdated ${category.toLowerCase()} methods by providing a seamless, intelligent solution that delivers measurable results immensely faster than any legacy alternative.`,
        marketOpportunity: {
          tam: `Total Addressable Market: Exceptionally large and rapidly growing footprint in the broader ${category} landscape.`,
          sam: `Serviceable Addressable Market: Laser focus on the specific ${targetMarket} vertical where ${productName}'s differentiation is absolute strongest.`,
          som: `Serviceable Obtainable Market: Aggressively target 0.5-2% of the SAM in Year 1 as an initial highly realistic capture target for ${productName}.`,
        },
        keyInsights: [
          `The problem is starkly defined: ${targetMarket} currently lack a single, reliable ${category.toLowerCase()} solution that delivers without heavy compromises.`,
          `The market timing for ${productName} is ideal, as awareness of poor legacy alternatives is peaking among consumers.`,
          `To succeed, ${productName}'s core value proposition must pass the 'So what?' test instantly when presented to fresh eyes.`,
          `Hitting product-market fit for ${productName} requires hitting strict baseline performance metrics tied to real business outcomes.`,
          `There is highly visible white space to position ${productName} as a specialized, premium solution rather than fighting in a race to the bottom.`,
        ],
        actionItems: [
          { action: `Validate the core ${productName} Problem-of-View statement with 5+ deeply entrenched potential customers`, timeline: 'Week 2-3' },
          { action: `Finalize and document the strict success KPIs for ${productName} before writing code or manufacturing`, timeline: 'Week 1' },
          { action: `Map the precise competitive landscape of ${category.toLowerCase()} and weaponize your unique differentiation angle`, timeline: 'Week 2' },
        ],
      },
      ideate: {
        ...PHASE_COLORS.ideate,
        title: 'Ideate',
        emoji: '💡',
        tagline: 'Generating creative solutions and possibilities',
        ...generateIdeas(data),
        keyInsights: [
          `The highest-impact features for ${productName} are precisely those that eliminate the most tedious work for ${targetMarket} — start extremely smart.`,
          `Organic Product-Led Growth for ${productName} acts as a massive force multiplier if you embed an inherent viral or sharing loop.`,
          `In the crowded ${category.toLowerCase()} arena, being completely flawless at a single dimension beats being mediocre at ten different features.`,
          `The best marketing narrative for ${productName} will intrinsically connect its technical specs to a specific, highly emotional outcome for the user.`,
          `Positioning ${productName} exclusively for ${targetMarket} early on creates infinitely stronger traction than trying to please everyone.`,
        ],
        actionItems: [
          { action: `Rigorously prioritize ${productName} features using a strict effort/impact matrix with the core team`, timeline: 'Week 2' },
          { action: `Build rapid interactive prototypes for the explicit top 3 differentiating ideas required to test the ${category} market`, timeline: 'Week 3-4' },
          { action: `Identify and perfectly script the single "WOW moment" that ${productName} MUST deliver to a user within their first 5 minutes`, timeline: 'Week 1' },
        ],
      },
      prototype: {
        ...PHASE_COLORS.prototype,
        title: 'Prototype',
        emoji: '🛠️',
        tagline: 'Creating tangible representations and launch plans',
        ...generatePrototypePlan(data),
        techStack: {
          frontend: ['Modern Web / Tactile UI', 'Responsive Frameworks', 'Lightning-Fast Load Speeds', 'Fluid Interactive Animations'],
          backend: ['Robust Data Engine', 'Scalable Cloud DBs', 'Real-Time Sync Infrastructure', 'Bank-Grade Security Protocols'],
          infrastructure: ['Global Edge Delivery', 'Automated CI/CD Pipelines', 'Resilient Load Balancing', 'Deep Telemetry & Monitoring'],
        },
        keyInsights: [
          `The MVP for ${productName} must indeed be minimum to validate early assumptions, but absolutely not a minimum excuse to ship something broken.`,
          `Your prototype testing should hyper-focus on exactly how smoothly ${productName} integrates into ${targetMarket}'s existing environments.`,
          `Price-resistance testing for ${productName} is just as critical as feature testing—and should commence during the prototype phase.`,
          `Choosing a highly flexible architecture for ${productName} now will actively prevent catastrophic rewrite costs as your footprint scales.`,
          `Mapping the hyper-specific user journey during ${productName} prototype sessions will reliably expose the invisible friction points.`,
        ],
        actionItems: [
          { action: `Draft high-fidelity wireframes or CADs for absolutely all core ${productName} experiences before deeply committing resources`, timeline: 'Week 2-3' },
          { action: `Execution of a hard pricing validation experiment leveraging 20 authentic profiles from ${targetMarket}`, timeline: 'Week 3' },
          { action: `Establish an unbreakable staging environment and deployment pipeline to ensure ${productName} iterations fly smoothly`, timeline: 'Week 1-2' },
        ],
      },
      test: {
        ...PHASE_COLORS.test,
        title: 'Test',
        emoji: '✓',
        tagline: 'Validating assumptions through real-world feedback',
        ...generateTestingPlan(data),
        successCriteria: [
          `60%+ of beta testers effectively complete their first intended workflow with ${productName} without requiring manual intervention`,
          `An NPS score solidly above 40 after users have spent their first 30 days integrating ${productName}`,
          `20%+ of trial users eagerly commit to full purchase or subscription of ${productName} within 90 days`,
          `Less than 10% abandonment rate globally in the first 60 days of active ${productName} usage`,
          `3+ organic, unprompted referrals or social shares originating from every 10 highly active users`,
        ],
        keyInsights: [
          `Test your riskiest assumptions regarding ${productName} first — primarily whether ${targetMarket} will actually break their existing habits to use it.`,
          `Deep qualitative user interviews will expose precisely WHY users cherish or abandon ${productName}; the quantitative dashboard just tells you how many.`,
          `A/B testing the positioning of ${productName} is only useful once you have locked in a concrete hypothesis concerning user motivation.`,
          `Mastering exactly why users abandon ${productName} in early stages is significantly more lucrative than analyzing why they briefly signed up.`,
          `Overjoyed early adopters in the ${category.toLowerCase()} community will inevitably become your most lethal marketing weaponry.`,
        ],
        actionItems: [
          { action: `Recruit exactly 15 razor-targeted interview candidates heavily active in ${category.toLowerCase()} just prior to launch`, timeline: 'Week 1' },
          { action: `Embed behavioral analytics tracking before absolutely any public user lays eyes on ${productName}`, timeline: 'Week 1-2' },
          { action: `Formulate an irrefutable hypothesis for every single A/B test run on ${productName} to ensure actionable learnings`, timeline: 'Ongoing' },
        ],
      },
      refine: {
        ...PHASE_COLORS.refine,
        title: 'Refine',
        emoji: '🔄',
        tagline: 'Iterating based on insights for continuous improvement',
        ...generateRefinementPlan(data),
        uxImprovements: [
          `Streamline the initial setup flow of ${productName} to slash user cognitive overwhelm by roughly 40%`,
          `Integrate progressive disclosure for incredibly advanced features, ensuring the central ${category.toLowerCase()} utility takes precedence`,
          `Deploy immediate skeleton loading states or tactile feedback to massively elevate the perceived performance of ${productName}`,
          `Bake highly contextual help logic organically into the UI to permanently reduce the volume of beginner support tickets`,
          `Implement lightning-fast shortcuts entirely designed to accommodate power users scaling their throughput with ${productName}`,
        ],
        keyInsights: [
          `The absolute highest-performing teams operating in ${category.toLowerCase()} ship improvements weekly based strictly on field feedback, not internal whims.`,
          `Do not attempt to optimize the tertiary features of ${productName} that users naturally ignore — ruthlessly strip them out instead.`,
          `Core reliability and sheer speed of ${productName} will statistically always possess a higher ROI ceiling than tacking on new features.`,
          `The foundational structural decisions made to accommodate the first 100 users of ${productName} will actively dictate how easily you hit 100,000.`,
          `The overarching long-term vision for ${productName} should radically inspire the team, but the immediate iteration sprint must be brutally metric-driven.`,
        ],
        actionItems: [
          { action: `Institute unbreakable weekly product rituals for ${productName}: harsh metric reviews, targeted user interviews, and team retrospectives`, timeline: 'Month 1+' },
          { action: `Publish a highly transparent public product roadmap to perfectly align expectations and weaponize community engagement around ${productName}`, timeline: 'Month 2' },
          { action: `Implement a formal, unforgiving quarterly strategic review explicitly chained to ${productName}'s core OKRs`, timeline: 'Quarter 1' },
        ],
      },
    },
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

    const prompt = `You are a world-class Product Manager and Design Thinking coach.
Generate a highly specific, creative, and insightful Product Analysis JSON.
Product: ${data.productName}
Category: ${data.category}
Target Market: ${data.targetMarket}
Description: ${data.description || 'N/A'}

Return ONLY a JSON object EXACTLY matching this schema:
{
  "empathize": {
    "personas": [{ "name": "", "age": "", "role": "", "avatar": "", "description": "", "goals": [""], "pains": [""], "behaviors": [""] }, {"name": "Persona 2", ...}],
    "painPoints": [{ "severity": "High/Medium/Low", "point": "" }],
    "empathyMap": { "thinks": [""], "feels": [""], "says": [""], "does": [""] },
    "keyInsights": ["", "", "", "", ""],
    "actionItems": [{ "action": "", "timeline": "" }]
  },
  "define": {
    "pov": "", "hmw": ["", "", "", ""], "coreChallenge": "",
    "kpis": [{ "metric": "", "target": "", "type": "" }],
    "valueProposition": "",
    "marketOpportunity": { "tam": "", "sam": "", "som": "" },
    "keyInsights": ["", "", "", "", ""],
    "actionItems": [{ "action": "", "timeline": "" }]
  },
  "ideate": {
    "features": [{ "name": "", "priority": "Critical", "effort": "High", "impact": "High", "description": "" }],
    "strategies": [{ "approach": "", "description": "" }],
    "usps": ["", "", "", "", ""],
    "keyInsights": ["", "", "", "", ""],
    "actionItems": [{ "action": "", "timeline": "" }]
  },
  "prototype": {
    "mvpFeatures": [{ "feature": "", "description": "", "mustHave": true }],
    "roadmap": [{ "phase": "", "title": "", "items": ["", "", ""] }],
    "pricingOptions": [{ "model": "", "description": "", "pros": [""], "cons": [""] }],
    "techStack": { "frontend": [""], "backend": [""], "infrastructure": [""] },
    "keyInsights": ["", "", "", "", ""],
    "actionItems": [{ "action": "", "timeline": "" }]
  },
  "test": {
    "assumptions": [{ "assumption": "", "priority": "Critical/High/Medium", "method": "" }],
    "testingMethods": [{ "method": "", "timeline": "", "participants": "", "goal": "" }],
    "risks": [{ "risk": "", "level": "High/Medium/Low", "mitigation": "" }],
    "successCriteria": ["", "", "", "", ""],
    "keyInsights": ["", "", "", "", ""],
    "actionItems": [{ "action": "", "timeline": "" }]
  },
  "refine": {
    "iterationPriorities": [{ "priority": 1, "area": "", "description": "", "impact": "High/Medium", "effort": "High/Medium" }],
    "longTermVision": { "year1": "", "year2": "", "year3": "", "vision": "" },
    "uxImprovements": ["", "", "", "", ""],
    "keyInsights": ["", "", "", "", ""],
    "actionItems": [{ "action": "", "timeline": "" }]
  }
}
If any fields do not strictly apply, creatively invent realistic scenarios for this specific product. Ensure the output is valid JSON.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const aiData = JSON.parse(text);

    return {
      metadata: {
        productName: data.productName,
        category: data.category,
        currentStage: data.currentStage,
        targetMarket: data.targetMarket,
        generatedAt: new Date().toISOString(),
      },
      phases: {
        empathize: { ...PHASE_COLORS.empathize, title: 'Empathize', emoji: '🤝', tagline: 'Understanding users and their needs', ...aiData.empathize },
        define: { ...PHASE_COLORS.define, title: 'Define', emoji: '🎯', tagline: 'Synthesizing insights into clear problem statements', ...aiData.define },
        ideate: { ...PHASE_COLORS.ideate, title: 'Ideate', emoji: '💡', tagline: 'Generating creative solutions and possibilities', ...aiData.ideate },
        prototype: { ...PHASE_COLORS.prototype, title: 'Prototype', emoji: '🛠️', tagline: 'Creating tangible representations and launch plans', ...aiData.prototype },
        test: { ...PHASE_COLORS.test, title: 'Test', emoji: '✓', tagline: 'Validating assumptions through real-world feedback', ...aiData.test },
        refine: { ...PHASE_COLORS.refine, title: 'Refine', emoji: '🔄', tagline: 'Iterating based on insights for continuous improvement', ...aiData.refine },
      }
    };
  } catch (err) {
    console.error("AI Generation failed:", err);
    return generateFallbackAnalysis(data);
  }
}
