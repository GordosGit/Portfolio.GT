export type PlaybookEntry = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  whenToUseIt: string;
  steps: { label: string; text: string }[];
};

export const playbook: PlaybookEntry[] = [
  {
    slug: "1-3-1-decision-framework",
    category: "Decision Framework",
    title: "The 1-3-1 Decision Framework",
    summary:
      "A structure for navigating roadblocks and escalations under pressure — without stalling the room or forcing a single answer through unexamined.",
    whenToUseIt:
      "Unexpected system failures, blocked timelines, or any moment where a team needs a decision fast and stakeholders need to trust how you got there.",
    steps: [
      {
        label: "1 Problem",
        text: "Define the root issue clearly enough that every stakeholder is working from the exact same context — no one is quietly solving a different version of the problem."
      },
      {
        label: "3 Options",
        text: "Present three real, out-of-the-box paths forward — scope tweaks, architectural pivots, alternative workflows — rather than a single recommendation dropped on the table. It respects everyone's time and shows proactive ownership instead of just raising an alarm."
      },
      {
        label: "1 Recommendation",
        text: "Recommend the strongest path forward with clear reasoning, so the room gets both the option space and a confident point of view."
      }
    ]
  },
  {
    slug: "monsters-into-teddy-bears",
    category: "Operating Philosophy",
    title: "Breaking Monsters into Teddy Bears",
    summary:
      "My default response to intimidating complexity, scope creep, or a blank slate: isolate the core requirements, strip out the emotional charge, and map a clear execution path in smaller, digestible steps.",
    whenToUseIt:
      "A vague ask, an overwhelming backlog, or any moment a problem feels bigger than it actually is once it's actually broken apart.",
    steps: [
      {
        label: "Isolate",
        text: "Separate the actual requirement from the anxiety around it — most \"monsters\" are a few real constraints wrapped in a lot of noise."
      },
      {
        label: "De-charge",
        text: "Remove the emotional weight from the problem before trying to solve it. A calm problem is a solvable problem."
      },
      {
        label: "Map",
        text: "Lay out the smaller, concrete steps that lead to a clear execution path — so the team can act with confidence, not just understand the problem a little better."
      }
    ]
  },
  {
    slug: "fact-based-conflict-resolution",
    category: "Alignment Framework",
    title: "Fact-Based Conflict Resolution & Alignment",
    summary:
      "A framework for resolving client or team friction — unrealistic timelines, feature creep, competing priorities — by grounding the conversation in root needs instead of surface-level demands.",
    whenToUseIt:
      "Stakeholder disagreements, scope disputes, or any negotiation where the surface-level ask isn't actually the real issue.",
    steps: [
      {
        label: "Uncover the why",
        text: "Shift the conversation from surface-level demands to the underlying business or operational need driving them."
      },
      {
        label: "Manage expectations openly",
        text: "Facilitate a transparent, eye-opening conversation where both sides understand trade-offs, feasibility, and technical reality — no one gets surprised later."
      },
      {
        label: "Identify alternative paths",
        text: "Focus on creative gap closure: phased releases, alternative technical approaches, or scope adjustments that get everyone most of what they actually need."
      }
    ]
  }
];
