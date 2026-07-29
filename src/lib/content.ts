/**
 * Balogun Adeolu — Personal Website Content
 *
 * All content is about the founder as a person, leader, and builder.
 * Pedumo appears as one chapter of his journey.
 */

export type JournalEntry = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  date: string;
  readingTime: string;
  body: string[];
  sections?: { heading: string; text: string }[];
};

export const journalEntries: JournalEntry[] = [
  {
    slug: "trust-as-architecture",
    title: "Trust as Architecture: Why the Best Systems Are Built on Reliability, Not Speed",
    excerpt:
      "The technology industry rewards speed. But the organizations that last are built on trust — and trust is an architectural decision, not a marketing claim.",
    category: "Leadership",
    tags: ["trust", "architecture", "leadership", "reliability"],
    date: "2026-06-15",
    readingTime: "7 min read",
    body: [
      "The technology industry rewards speed. Ship fast. Break things. Iterate. But the organizations that last — the ones that survive market shifts, regulatory changes, and the weight of their own complexity — are built on trust. And trust is not a feature you add later. It is an architectural decision you make from the start.",
      "I have seen what happens when organizations treat trust as a marketing exercise instead of an engineering standard. They write 'secure by design' in their pitch decks while their authentication systems are held together with session tokens and hope. They promise 'enterprise-grade' while their database backups have never been tested.",
      "Trust is built in the decisions nobody sees: the threat model you write before the first line of code, the encryption you implement because it is the right thing to do even when the client did not ask for it, the monitoring you set up so that when something goes wrong at 3 AM, you know before your customer does.",
      "This is not about being slow. It is about being deliberate. The fastest way to build something that lasts is to build it right the first time.",
    ],
    sections: [
      {
        heading: "The speed trap",
        text: "Speed without discipline is just chaos arriving faster. I have seen teams ship features in days that cost months of remediation — security incidents, data loss, customer churn. The irony is that the 'slow' teams, the ones who take time to model threats and write tests, usually ship faster over the long arc because they are not constantly firefighting.",
      },
      {
        heading: "Trust as a system property",
        text: "Trust is not a single feature. It is a system property that emerges from hundreds of small decisions: how you handle errors, how you protect data, how you communicate when things go wrong. Like performance or security, it degrades silently if you are not actively investing in it.",
      },
      {
        heading: "Building for the worst day",
        text: "Every system fails eventually. The question is whether you have rehearsed for that day. Tested backups. Rehearsed playbooks. A chain of command that knows its first three moves. Resilience is not paranoia — it is the feature your customers assume you have until the day that assumption is tested.",
      },
    ],
  },
  {
    slug: "why-i-build",
    title: "Why I Build: Technology as a Commitment to the People Who Depend on It",
    excerpt:
      "I build because I believe the organizations that serve people deserve technology that works — not just today, but for years. That belief shapes everything.",
    category: "Story",
    tags: ["story", "building", "purpose", "technology"],
    date: "2026-05-20",
    readingTime: "6 min read",
    body: [
      "I grew up in Idowa, a town in the Ijebu area of Ogun State. The pace was different. People measured things by whether they lasted — not by how quickly they arrived. That rhythm shaped how I think about technology.",
      "When I write code, I am not thinking about the demo. I am thinking about the fifth year. The tenth year. The day a new team member joins and needs to understand why a decision was made. I am thinking about the person who depends on this system to do their job, feed their family, or run their business.",
      "Technology is not an abstraction. It is a commitment to the people who depend on it. Every system I build is designed to honor that commitment — with code that is tested, architecture that is documented, and an engineering standard that does not bend for convenience.",
      "This is why I build. Not to chase trends. Not to pad a portfolio. But because the organizations that serve people deserve technology that works — and keeps working.",
    ],
    sections: [
      {
        heading: "The weight of dependability",
        text: "When someone trusts you with their technology, they are trusting you with their operations, their data, their reputation. That is not a transaction. It is a responsibility. I take it seriously because I have seen what happens when people do not.",
      },
      {
        heading: "Building for the long term",
        text: "The cheapest software to build is rarely the cheapest to own. The decisions that determine total cost of ownership are made early — how the system is structured, how it is tested, and how clearly its intent is documented. Longevity is not about predicting the future. It is about designing for change.",
      },
    ],
  },
  {
    slug: "cybersecurity-is-not-a-feature",
    title: "Cybersecurity Is Not a Feature: Why Security Must Be a Foundational Decision",
    excerpt:
      "Security added at the end is expensive and fragile. Security designed from the start is cheaper, stronger, and largely invisible to users. The difference is architectural.",
    category: "Cybersecurity",
    tags: ["security", "cybersecurity", "owasp", "architecture"],
    date: "2026-04-10",
    readingTime: "5 min read",
    body: [
      "I have spent years in cybersecurity. I have seen what happens when organizations treat security as a checklist item — something you add after the product works, before the launch, or worse, after the breach.",
      "Security added at the end is expensive and fragile. It fights against the architecture instead of being part of it. It is the difference between a building with a strong foundation and one where you bolt the locks on after someone breaks in.",
      "Security designed from the start is cheaper, stronger, and largely invisible to users. You model threats before you build. You encrypt sensitive data by default. You enforce least-privilege access. You monitor continuously. None of this is exotic — it is disciplined engineering.",
      "In a market where a single breach can end a company, security is not a cost center. It is a competitive advantage. And it starts with the founder's conviction that the people who depend on your systems deserve protection, not apologies.",
    ],
  },
  {
    slug: "the-discipline-of-execution",
    title: "The Discipline of Execution: Why Great Ideas Are Not Enough",
    excerpt:
      "Ideas are abundant. Execution is rare. The difference between a visionary and a builder is the willingness to do the unglamorous work — repeatedly, consistently, and at a high standard.",
    category: "Leadership",
    tags: ["execution", "discipline", "leadership", "building"],
    date: "2026-03-05",
    readingTime: "6 min read",
    body: [
      "Everyone has ideas. What separates founders who build lasting companies from those who do not is not vision — it is execution. The willingness to do the unglamorous work. Repeatedly. Consistently. At a standard that does not bend for convenience.",
      "Execution is not about working harder. It is about working with discipline. Writing scope before you write code. Setting measurable milestones. Reviewing progress honestly. Making the hard decisions early rather than paying for them later.",
      "The organizations I respect most are not the ones with the most impressive pitch decks. They are the ones where the operational reality matches the promise. Where the systems run in production. Where the team can tell you exactly what they shipped last week and what they are shipping next week.",
      "Discipline is not glamorous. But it is the difference between a company that survives its first year and one that survives its tenth.",
    ],
  },
  {
    slug: "ai-for-the-real-world",
    title: "AI for the Real World: Beyond the Hype to Practical Value",
    excerpt:
      "The question is rarely whether AI can do something — it is whether it should, and whether the result is reliable enough to trust in production. A grounded framework for adoption.",
    category: "Technology",
    tags: ["ai", "automation", "evaluation", "governance"],
    date: "2026-02-18",
    readingTime: "7 min read",
    body: [
      "The AI industry is full of impressive demos. But the gap between a demo and a deployment is where most organizations fail. They see the demo, imagine the ROI, and skip the hard work of evaluation, governance, and human oversight that makes AI safe for real business use.",
      "I start with the process, not the model. Where is time lost? Where is judgment repetitive? Those are the places automation and augmentation pay off — provided you build evaluation and human oversight into the loop.",
      "Grounded AI, measured against real tasks with humans in control of consequential decisions, is what separates durable value from expensive experiments. The framework is simple: measure before you automate, evaluate before you deploy, and always keep a human in the loop for decisions that matter.",
    ],
  },
  {
    slug: "building-teams-that-trust",
    title: "Building Teams That Trust: The Leadership Philosophy Behind Every Company I Build",
    excerpt:
      "The best teams are not built on perks. They are built on clarity, accountability, and the knowledge that the person next to you will deliver when it matters.",
    category: "Leadership",
    tags: ["teams", "leadership", "trust", "culture"],
    date: "2026-01-22",
    readingTime: "6 min read",
    body: [
      "The best teams I have built share one quality: trust. Not the kind you declare in a values statement. The kind you earn through consistent action — showing up, delivering on commitments, and being honest when things go wrong.",
      "I build teams around clarity. Everyone knows what they are responsible for, what success looks like, and how their work connects to the mission. Ambiguity is the enemy of trust. When people know what is expected, they can hold themselves — and each other — accountable.",
      "I also build teams around the willingness to do hard things. The projects that matter are rarely the easy ones. They require trade-offs, late nights, and the kind of creative problem-solving that only happens when people trust each other enough to disagree openly.",
      "The teams I am most proud of are not the ones that never failed. They are the ones that recovered fast, learned honestly, and came back stronger. That is the kind of team I build. That is the kind of leader I try to be.",
    ],
  },
];

export type Principle = {
  title: string;
  statement: string;
  elaboration: string;
};

export const principles: Principle[] = [
  {
    title: "Technology",
    statement: "Technology should make an organization stronger, not more fragile.",
    elaboration: "Every system I build is designed to survive reality — not just the demo. Architecture that endures, code that is tested, and the discipline to build it right the first time.",
  },
  {
    title: "People",
    statement: "The best teams are built on trust, not perks.",
    elaboration: "Clarity, accountability, and the knowledge that the person next to you will deliver when it matters. I build teams where people can disagree openly, recover fast, and come back stronger.",
  },
  {
    title: "Business",
    statement: "The goal is always a measurable outcome, not an activity.",
    elaboration: "Technology is a means. The end is a business result — revenue, efficiency, trust, resilience. I measure my work against the outcomes leadership is accountable for.",
  },
  {
    title: "Execution",
    statement: "Discipline is the difference between a vision and a company.",
    elaboration: "Ideas are abundant. Execution is rare. The willingness to do the unglamorous work — repeatedly, consistently, and at a high standard — is what separates builders from dreamers.",
  },
  {
    title: "Innovation",
    statement: "Adopt what works, not what is loud.",
    elaboration: "I use emerging technology in service of real outcomes, not because it is fashionable. Practical AI, evaluated against real tasks, with human oversight where it matters.",
  },
  {
    title: "Responsibility",
    statement: "The people who depend on your systems deserve protection, not apologies.",
    elaboration: "Security is not a feature. It is a foundational decision. I model threats before I build, encrypt by default, and monitor continuously — because trust is earned through action, not claims.",
  },
];

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  type: "beginning" | "growth" | "founding" | "building" | "milestone";
};

export const timeline: TimelineEvent[] = [
  {
    year: "Early Years",
    title: "Idowa, Ogun State",
    description: "Born and raised in Idowa, a town in the Ijebu area of Ogun State, Nigeria. The values of dependability, craftsmanship, and long-term thinking were not taught — they were lived.",
    type: "beginning",
  },
  {
    year: "Discovery",
    title: "Finding Technology",
    description: "Discovered software engineering and cybersecurity. Not as academic subjects, but as disciplines that could protect people and organizations. The realization that code could be a commitment to the people who depend on it.",
    type: "beginning",
  },
  {
    year: "Craft",
    title: "Building the Foundation",
    description: "Years of deep technical work across full-stack engineering, cybersecurity, cloud infrastructure, and data systems. Learning not just how to build, but how to build things that last.",
    type: "growth",
  },
  {
    year: "2024",
    title: "Founding Pedumo",
    description: "Founded Pedumo on the conviction that organizations deserve a technology partner as accountable for outcomes as for code. A company built around discipline, trust, and execution — not hype.",
    type: "founding",
  },
  {
    year: "2024–2025",
    title: "Building in Public",
    description: "Shipped 11+ products and services. Built an 8-step delivery methodology. Worked with startups, SMEs, enterprises, NGOs and governments across multiple industries.",
    type: "building",
  },
  {
    year: "2026",
    title: "Scaling the Vision",
    description: "Expanding Pedumo's reach while building new ventures. Speaking at conferences. Writing about technology, leadership, and the discipline of building companies that last.",
    type: "milestone",
  },
];

export type Recognition = {
  year: string;
  title: string;
  description: string;
};

export const recognition: Recognition[] = [
  {
    year: "2024",
    title: "Founded Pedumo Technologies",
    description: "Launched a technology engineering and AI automation company serving organizations across Africa and globally.",
  },
  {
    year: "2025",
    title: "11+ Products & Services",
    description: "Built and shipped a comprehensive portfolio of technology products, from AI automation platforms to cybersecurity tools.",
  },
  {
    year: "2025",
    title: "Multi-Industry Impact",
    description: "Delivered solutions for startups, SMEs, enterprises, NGOs, and government organizations across financial services, healthcare, and public sector.",
  },
  {
    year: "2026",
    title: "Thought Leadership",
    description: "Published articles on engineering longevity, cybersecurity, AI governance, and the discipline of execution — reaching thousands of technology professionals.",
  },
];

export type SpeakingEvent = {
  title: string;
  description: string;
  type: "conference" | "panel" | "interview" | "workshop" | "keynote";
  status: "upcoming" | "past";
  date?: string;
  location?: string;
};

export const speakingEvents: SpeakingEvent[] = [
  {
    title: "Trust as Architecture: Building Systems That Survive Reality",
    description: "A talk on why the most important technology decisions are about trust, reliability, and the discipline to build things that last.",
    type: "keynote",
    status: "upcoming",
  },
  {
    title: "Cybersecurity for Founders",
    description: "A practical workshop for startup founders on building security into their products from day one — without slowing down.",
    type: "workshop",
    status: "upcoming",
  },
  {
    title: "AI in Africa: Opportunity, Responsibility, and the Path Forward",
    description: "A panel discussion on the opportunities and challenges of AI adoption in African markets, with a focus on governance and human oversight.",
    type: "panel",
    status: "upcoming",
  },
  {
    title: "The Discipline of Execution",
    description: "A talk on why great ideas are not enough — and the systems, habits, and standards that separate builders from dreamers.",
    type: "keynote",
    status: "past",
  },
  {
    title: "Building Technology Companies That Last",
    description: "An interview on the founding of Pedumo, the philosophy behind the company, and the lessons learned from building in the African technology ecosystem.",
    type: "interview",
    status: "past",
  },
];

export type Venture = {
  name: string;
  role: string;
  description: string;
  url: string;
  status: "active" | "building" | "exploring";
  highlights: string[];
  links?: { label: string; href: string }[];
};

export const ventures: Venture[] = [
  {
    name: "Pedumo",
    role: "Founder & Software Architect",
    description: "Technology engineering and AI automation company. We build secure software, cloud infrastructure, data intelligence and cyber resilience for organizations that value a trustworthy long-term partner.",
    url: "https://pedumo.com",
    status: "active",
    highlights: [
      "11+ products and services shipped",
      "8-step delivery methodology",
      "Multi-industry client portfolio",
      "Security-first engineering standard",
    ],
    links: [
      { label: "Website", href: "https://pedumo.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/pedumo" },
      { label: "GitHub", href: "https://github.com/pedumostudio" },
      { label: "X", href: "https://x.com/pedumolabs" },
    ],
  },
  {
    name: "Community Work",
    role: "Technology Education & Mentorship",
    description: "Contributing to the technology ecosystem through education, mentorship, and open-source contributions. Helping the next generation of builders develop the skills and discipline to build companies that last.",
    url: "",
    status: "active",
    highlights: [
      "Open-source contributions",
      "Technology education",
      "Mentorship for aspiring founders",
    ],
  },
  {
    name: "Next Venture",
    role: "Exploring",
    description: "Always exploring new opportunities at the intersection of technology, business, and impact. Interested in AI governance, cybersecurity platforms, and tools that help organizations build with discipline.",
    url: "",
    status: "exploring",
    highlights: [
      "AI governance and safety",
      "Cybersecurity platforms",
      "Developer tools for disciplined execution",
    ],
  },
];
