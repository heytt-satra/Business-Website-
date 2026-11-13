export type Article = {
  slug: string;
  section: "research" | "insights";
  category: string;
  title: string;
  summary: string;
  visual: string;
  divisions: string[];
  sections: { title: string; body: string }[];
  source?: { name: string; url: string };
};
export const articles: Article[] = [
  {
    slug: "beyond-the-plasma",
    section: "research",
    category: "Engineering explainer",
    title: "Fusion is more than a plasma problem.",
    summary:
      "From confinement to a maintainable power plant: the interfaces that determine whether energy can become electricity.",
    visual: "fusion",
    divisions: [
      "nuclear-systems",
      "advanced-materials",
      "energy-power-systems",
    ],
    sections: [
      {
        title: "Start at the boundary of the system",
        body: "Fusion combines light nuclei and releases energy when the resulting nuclei are more tightly bound. The scientific question of sustaining a reacting plasma is different from the engineering question of operating a power plant. A useful plant must also supply its own equipment, extract heat, manage fuel, and deliver power through a complete conversion cycle. A favorable result inside one boundary does not establish performance at another.",
      },
      {
        title: "The wall is part of the machine",
        body: "Charged particles can be influenced by magnetic fields, but neutrons cannot be confined in the same way. They transfer energy to surrounding structures and change material properties over time. Plasma-facing surfaces also face severe heat loads. The choice of a material is therefore tied to coolant design, inspection access, remote replacement, and expected component life.",
      },
      {
        title: "Availability changes the equation",
        body: "A device that produces power intermittently must still be maintained and integrated with the wider electricity system. Service intervals, replacement methods, fuel-cycle requirements, and the energy used by supporting systems affect practical value. These factors should be included before extrapolating a physics result into a commercial promise.",
      },
      {
        title: "The TERA concept study",
        body: "TERA FUSION is a fictional systems study, not an experiment. Its proposed workflow is to define the energy boundary, map component interfaces, expose uncertain assumptions, and compare alternative maintenance strategies. No reactor performance, energy gain, or operating schedule is claimed.",
      },
    ],
    source: {
      name: "US Department of Energy · Nuclear fusion reactions",
      url: "https://www.energy.gov/science/doe-explainsnuclear-fusion-reactions",
    },
  },
  {
    slug: "the-cost-of-moving-data",
    section: "research",
    category: "Architecture explainer",
    title: "The hidden cost of moving data.",
    summary:
      "Why memory, packaging, and power delivery belong in the same conversation as compute.",
    visual: "silicon",
    divisions: [
      "semiconductor-systems",
      "artificial-intelligence",
      "energy-power-systems",
    ],
    sections: [
      {
        title: "Arithmetic is only one step",
        body: "A processor needs data before it can do useful work. Reading memory, moving values through interconnects, synchronizing devices, and writing results all consume time and energy. A workload can therefore be limited by movement rather than the number of arithmetic units available. Peak throughput is not a complete description of a machine.",
      },
      {
        title: "Locality is an architectural choice",
        body: "Caches, memory hierarchy, and workload scheduling try to keep useful data close to the units that need it. Advanced packaging and heterogeneous integration offer other ways to shorten connections or combine different devices. Those choices introduce tradeoffs in thermal density, yield, power delivery, and software complexity. A shorter connection is valuable only when the surrounding system can use it.",
      },
      {
        title: "Evaluate the workload, not the slogan",
        body: "An architecture study should specify model size, numerical precision, memory use, communication patterns, and batch assumptions. It should measure an entire task, including data preparation and output, under stated power and cooling conditions. Different workloads can reverse the apparent ranking of two designs.",
      },
      {
        title: "A concept without invented benchmarks",
        body: "TERA SILICON proposes an evaluation framework around those tradeoffs. It does not claim a fabricated chip, proprietary process, or measured advantage. The next useful artifact would be a reproducible simulator and an explicit set of workloads, followed by evidence that model assumptions match a physical implementation.",
      },
    ],
  },
  {
    slug: "autonomous-discovery-loop",
    section: "research",
    category: "Concept study",
    title: "Closing the loop on scientific discovery.",
    summary:
      "A human-supervised architecture connecting predictions, experiments, and evidence.",
    visual: "intelligence",
    divisions: [
      "artificial-intelligence",
      "advanced-materials",
      "biological-engineering",
      "frontier-technologies",
    ],
    sections: [
      {
        title: "A loop with distinct responsibilities",
        body: "An autonomous discovery concept contains several different functions: generating a hypothesis, selecting a test, operating an instrument, interpreting a measurement, and updating a model. Combining them into one interface can hide their different failure modes. An articulate hypothesis is not evidence, and a completed tool call is not proof of a valid experiment.",
      },
      {
        title: "Choose measurements that reduce uncertainty",
        body: "A useful planning system should ask what observation would distinguish competing explanations. Optimizing only for the highest predicted result can repeatedly select a narrow region of a model. Including uncertainty and the cost of a test can make the next measurement more informative. The objective and assumptions should remain visible to a human researcher.",
      },
      {
        title: "Keep a chain of evidence",
        body: "Each prediction should be linked to its inputs, model version, assumptions, and resulting measurements. Calibration, failed runs, and negative results belong in that record. Without provenance, a model can learn from corrupted observations or appear to improve because evaluation data leaked into its training process.",
      },
      {
        title: "Bound autonomy before expanding it",
        body: "The TERA concept assigns instruments explicit operating envelopes and keeps consequential changes behind human review. Simulation and reversible steps come first. This is an architecture proposal for research support, not a deployed laboratory or a claim that scientific judgment can be automated away.",
      },
    ],
  },
  {
    slug: "designing-for-orbit",
    section: "research",
    category: "Engineering explainer",
    title: "Designing for a place without a repair shop.",
    summary:
      "Power, heat, radiation, and servicing in a sustained orbital presence.",
    visual: "orbital",
    divisions: [
      "space-systems",
      "frontier-technologies",
      "aerospace-propulsion",
    ],
    sections: [
      {
        title: "The environment writes the requirements",
        body: "An orbital system must tolerate launch loads, vacuum, radiation, and thermal cycling. It also moves through an environment where debris and operational coordination matter. Requirements should describe the mission and service life before a structure or module is chosen. An attractive rendering cannot resolve those constraints.",
      },
      {
        title: "Power and heat cannot be separated",
        body: "Electrical equipment turns much of its input into heat. In vacuum, a spacecraft cannot rely on air carrying that heat away; it must move heat internally and radiate it to space. Solar arrays, storage, radiators, orientation, and operational schedules therefore interact. A more capable payload can impose costs elsewhere in the spacecraft.",
      },
      {
        title: "Serviceability is a design decision",
        body: "Connectors, standard interfaces, inspection targets, and access paths determine whether a robot or crew could replace a failed component. Modularity can help, but interfaces also add mass and failure opportunities. A serviceable design needs a credible logistics chain, not only a removable panel.",
      },
      {
        title: "What this concept leaves open",
        body: "TERA ORBITAL explores these interfaces as a fictional infrastructure study. It has no launch date or operational hardware. Debris mitigation, governance, transport economics, and the energy needed to sustain operations remain part of the question rather than details to defer.",
      },
    ],
  },
  {
    slug: "quantum-without-the-shortcuts",
    section: "research",
    category: "Science explainer",
    title: "Quantum computing, without the shortcuts.",
    summary:
      "What quantum states make possible, and why noise changes the engineering problem.",
    visual: "quantum",
    divisions: [
      "quantum-systems",
      "semiconductor-systems",
      "frontier-technologies",
    ],
    sections: [
      {
        title: "A different model of information",
        body: "A quantum computation prepares a state, applies controlled transformations, and measures an outcome. Superposition and entanglement give the model capabilities different from classical computation. They do not mean that every possible answer can simply be read out. An algorithm must make useful information accessible through measurement.",
      },
      {
        title: "Noise is not a finishing detail",
        body: "Interactions with the environment and imperfect operations can destroy information needed by a computation. Error correction encodes logical information across physical resources and uses additional measurements to diagnose certain errors. That introduces control, connectivity, and resource overhead beyond the raw count of physical qubits.",
      },
      {
        title: "Useful advantage depends on the task",
        body: "The relevant comparison is between complete ways of solving a specified problem. Input preparation, repeated measurements, classical processing, and error management all belong in the accounting. Some applications may be more natural for quantum simulation or sensing than for a general-purpose computing service.",
      },
      {
        title: "The engineering interfaces",
        body: "TERA QUANTUM is a concept portfolio examining the link between quantum devices, photonic connections, and classical control. It reports no processor performance. The goal of a credible study would be to make error budgets and operating assumptions explicit before claiming practical value.",
      },
    ],
  },
  {
    slug: "progress-is-an-interface-problem",
    section: "insights",
    category: "Frontier analysis",
    title: "Progress is an interface problem.",
    summary:
      "The most difficult part of a frontier technology often lies between its disciplines.",
    visual: "materials",
    divisions: [
      "advanced-materials",
      "energy-power-systems",
      "artificial-intelligence",
    ],
    sections: [
      {
        title: "The component is not the system",
        body: "A material can survive an impressive temperature and still be difficult to join, inspect, or manufacture. A model can produce a strong benchmark and still fail when connected to an industrial workflow. A power source can look attractive in isolation while depending on infrastructure that does not yet exist. In each case, an interface changes what success means.",
      },
      {
        title: "Make dependencies visible early",
        body: "A useful concept map connects a proposed capability to the conditions it needs. A fusion design needs materials and maintenance access. A compute architecture needs software, packaging, and cooling. An orbital platform needs transport and operations. These connections are more informative than placing ten impressive technologies beside one another.",
      },
      {
        title: "Design a testable next question",
        body: "Instead of asking whether an entire future is possible, identify the next uncertainty that can be reduced. Can a thermal model match measured behavior? Does a controller fail safely outside its training conditions? Can a proposed interface be assembled and inspected? Such questions produce evidence even when the larger vision remains uncertain.",
      },
      {
        title: "A direction for TERA",
        body: "The TERA ecosystem is organized around these relationships. Its concepts are invitations to understand interdependence, not proof that a single organization has mastered every field. The useful ambition is to make the engineering questions more precise.",
      },
    ],
  },
  {
    slug: "human-agency-by-design",
    section: "insights",
    category: "Human futures",
    title: "Capability begins with agency.",
    summary:
      "A human-centered lens for assistive machines, neural interfaces, and augmentation concepts.",
    visual: "human",
    divisions: ["biological-engineering", "frontier-technologies"],
    sections: [
      {
        title: "Begin with the person using it",
        body: "Assistive technology should be shaped by the priorities of the people who use it. A dramatic demonstration does not tell us whether a device is comfortable, maintainable, affordable, or useful in ordinary life. The definition of capability should include choice: the ability to adapt a tool, understand it, and stop using it.",
      },
      {
        title: "An interface is also a relationship",
        body: "A device that senses movement or neural activity raises questions about control and information. Users need clear ways to understand what is collected, correct unintended actions, and retain meaningful consent. Reliability and privacy are not optional refinements to a more exciting capability; they influence whether that capability is usable.",
      },
      {
        title: "Separate horizons",
        body: "Advanced prosthetics, assistive robotics, neural interfaces, and regenerative biotechnology have different mechanisms and evidence requirements. Grouping them under human augmentation does not make them equally mature. Clinical effectiveness and long-term safety cannot be inferred from an engineering concept or a simulation.",
      },
      {
        title: "What the vision commits to",
        body: "TERA HUMAN is a fictional future vision guided by accessibility, user control, repairability, and independent validation. It offers no treatment or promise of enhancement. A responsible next step would begin with participatory design and a clear account of which claims remain untested.",
      },
    ],
  },
  {
    slug: "a-horizon-is-not-a-deadline",
    section: "insights",
    category: "Civilization essay",
    title: "A horizon is not a deadline.",
    summary:
      "How to think ambitiously about civilization without turning speculation into a delivery promise.",
    visual: "orbital",
    divisions: [
      "space-systems",
      "aerospace-propulsion",
      "energy-power-systems",
    ],
    sections: [
      {
        title: "Different kinds of possibility",
        body: "Some ideas extend existing engineering. Others depend on unresolved research or entirely new infrastructure. Still others are useful mainly as thought experiments. A clear account of the future should preserve those distinctions. Placing them on one timeline does not establish a schedule or a predictable sequence.",
      },
      {
        title: "Distance changes the problem",
        body: "As missions extend beyond Earth, communication delays, transport energy, exposure, and dependence on resupply change what can be done. Infrastructure that works near Earth may not scale to other planets, much less other stars. The challenge is not only building a faster vehicle; it is sustaining a complete system under different constraints.",
      },
      {
        title: "The value of a far horizon",
        body: "A speculative scenario can help reveal assumptions. What would independent repair require? Which resources would need to be recycled? How should distant communities retain agency? These are useful questions even when the scenario itself has no demonstrated engineering path.",
      },
      {
        title: "Read the journey as a map of questions",
        body: "TERA’s six-stage civilization journey moves from established foundations to explicitly speculative extragalactic horizons. It contains no dates because no evidence supports such a schedule. Its purpose is to connect present engineering questions with increasingly distant possibilities while keeping the uncertainty visible.",
      },
    ],
  },
];
