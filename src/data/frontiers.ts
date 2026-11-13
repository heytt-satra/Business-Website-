export type Division = {
  slug: string;
  name: string;
  short: string;
  field: string;
  tagline: string;
  description: string;
  mechanism: string;
  challenge: string;
  application: string;
  topics: string[];
  project: string;
  color: string;
  visual: string;
};

export const divisions: Division[] = [
  {
    slug: "nuclear-systems",
    name: "Nuclear Physics & Nuclear Engineering",
    short: "Nuclear systems",
    field: "Energy",
    tagline: "Power, at the heart of matter.",
    description:
      "Exploring the physics of the nucleus, the behavior of plasmas, and the engineering systems that could turn nuclear energy into reliable power.",
    mechanism:
      "Fission splits heavy nuclei; fusion combines light nuclei. Both release binding energy, but require very different machines. Magnetic-confinement fusion uses fields to guide charged particles while heating and sustaining a plasma. Converting that energy into electricity also requires a complete thermal and power-conversion system.",
    challenge:
      "A sustained plasma is only one part of a plant. Neutron damage, fuel handling, heat extraction, radiation monitoring, maintainability, and safe shutdown must be designed together. TERA has no reactor, plasma experiment, or demonstrated energy output.",
    application:
      "Potential directions include low-carbon electricity, industrial heat, and radiation diagnostics. Each requires independent safety analysis and an evidence-based comparison with existing energy systems.",
    topics: [
      "Nuclear and quantum foundations",
      "Fission and reactor safety",
      "Fusion and plasma physics",
      "Radiation science",
      "Nuclear materials",
      "Reactor monitoring",
    ],
    project: "tera-fusion",
    color: "#84baff",
    visual: "fusion",
  },
  {
    slug: "semiconductor-systems",
    name: "Semiconductors & Microelectronics",
    short: "Semiconductor systems",
    field: "Intelligence",
    tagline: "The physical foundation of intelligence.",
    description:
      "From the behavior of electrons in a crystal to the architecture of an entire compute system: a connected view of microelectronics.",
    mechanism:
      "Doping, interfaces, and electric fields control how charge moves through semiconductor devices. Lithography patterns those devices into circuits. Advanced packaging connects logic and memory, making the distance data travels as important as the speed of an individual transistor.",
    challenge:
      "Smaller features do not remove thermal limits or manufacturing variability. Yield, power delivery, interconnect resistance, verification, and access to fabrication all constrain an architecture. No TERA silicon or hardware benchmark is claimed.",
    application:
      "Efficient scientific computing, resilient industrial control, specialized AI accelerators, and sensor interfaces are candidate applications. Useful performance must be measured on complete workloads, including memory and cooling.",
    topics: [
      "Semiconductor physics",
      "Advanced CMOS and VLSI",
      "Lithography and fabrication",
      "Electronic materials",
      "Advanced packaging",
      "Heterogeneous architectures",
    ],
    project: "tera-silicon",
    color: "#b0c8da",
    visual: "silicon",
  },
  {
    slug: "biological-engineering",
    name: "Synthetic Biology & Biotechnology",
    short: "Biological engineering",
    field: "Life",
    tagline: "Understanding life. Expanding possibility.",
    description:
      "Studying biological systems as complex, adaptive networks, with computational tools that connect molecular mechanisms to responsible engineering.",
    mechanism:
      "Genetic information influences proteins, metabolism, and cellular behavior through interacting regulatory networks. Computational and systems biology build models of those relationships. Engineered changes must then be evaluated in controlled experiments because biological context can overwhelm a simple prediction.",
    challenge:
      "Living systems vary across cells and environments. Reproducibility, containment, off-target effects, consent, and long-term consequences matter as much as computational accuracy. This site offers no therapeutic guidance or experimental protocols.",
    application:
      "Research directions include sustainable biomanufacturing, biological sensing, regenerative research, and closed-loop life-support studies. Medical applications require extensive validation and appropriate oversight.",
    topics: [
      "Molecular and cell biology",
      "Genetics and biochemistry",
      "Genomic engineering",
      "Computational and systems biology",
      "Bioinformatics",
      "Regenerative research and space biotechnology",
    ],
    project: "tera-bio",
    color: "#b4d3b1",
    visual: "bio",
  },
  {
    slug: "artificial-intelligence",
    name: "AI & Autonomous Intelligence",
    short: "Artificial intelligence",
    field: "Intelligence",
    tagline: "Intelligence that extends discovery.",
    description:
      "Investigating machine intelligence as a tool for understanding difficult systems, guiding experiments, and supporting human judgment.",
    mechanism:
      "Learning systems infer patterns from examples or interactions. Language and multimodal models provide flexible interfaces; reinforcement learning studies decisions through feedback. Scientific agents combine models with tools, but their proposals still need provenance, testing, and human review.",
    challenge:
      "An answer that sounds plausible can be wrong. Distribution shift, unreliable tool use, biased data, interpretability, and alignment complicate industrial deployment. Autonomy should be bounded by permissions and reversible actions.",
    application:
      "Candidate applications include literature synthesis, simulation assistance, laboratory planning, and robotic perception. Evaluation should reward calibrated uncertainty, reproducibility, and safe failure, rather than fluent output alone.",
    topics: [
      "Machine and deep learning",
      "Reinforcement learning",
      "Generative AI and LLMs",
      "Multimodal systems and agents",
      "Embodied intelligence",
      "AI safety and alignment",
    ],
    project: "tera-intelligence",
    color: "#9bafff",
    visual: "intelligence",
  },
  {
    slug: "quantum-systems",
    name: "Quantum Physics & Quantum Computing",
    short: "Quantum systems",
    field: "Matter",
    tagline: "New possibilities in quantum behavior.",
    description:
      "Exploring information, sensing, and communication at the scale where quantum mechanics governs what can be measured and controlled.",
    mechanism:
      "Qubits encode information in quantum states. Gates change those states and measurements produce classical outcomes. Entanglement enables correlations that differ from classical ones; useful algorithms must exploit them in a way that survives noise and readout.",
    challenge:
      "Decoherence, imperfect control, error-correction overhead, cryogenic integration, and scaling remain central challenges. A quantum processor is not a universal replacement for a classical computer, and advantage depends on the task.",
    application:
      "Research directions include molecular simulation, specialized algorithms, precision sensing, and quantum networking. Photonic links and classical control electronics are critical dependencies, not peripheral details.",
    topics: [
      "Quantum mechanics and information",
      "Processors and algorithms",
      "Quantum error correction",
      "Quantum communication",
      "Precision sensing",
      "Quantum materials and photonics",
    ],
    project: "tera-quantum",
    color: "#c3a8e8",
    visual: "quantum",
  },
  {
    slug: "space-systems",
    name: "Space Technology & Infrastructure",
    short: "Space systems",
    field: "Space",
    tagline: "A sustained presence beyond Earth.",
    description:
      "Considering the infrastructure that turns a space mission from a single expedition into a maintainable system.",
    mechanism:
      "Spacecraft combine structures, power, thermal control, propulsion, communication, and guidance. Orbital mechanics constrains where they can go; mass, radiation, and limited repair access constrain how they are built. Infrastructure adds interfaces for servicing and reuse.",
    challenge:
      "Debris, launch mass, radiation, thermal cycling, life-support reliability, and operational governance must be addressed. Resource use and manufacturing in space should be judged against the complexity of bringing equipment from Earth.",
    application:
      "Concepts include autonomous satellites, orbital science platforms, serviceable stations, lunar utilities, and deep-space mission architectures. These are system studies, not announced missions.",
    topics: [
      "Satellites and spacecraft",
      "Orbital communication and servicing",
      "Orbital manufacturing",
      "Lunar infrastructure",
      "Planetary exploration",
      "Habitation and settlement systems",
    ],
    project: "tera-orbital",
    color: "#85b8dc",
    visual: "orbital",
  },
  {
    slug: "aerospace-propulsion",
    name: "Rocket Science & Aerospace Engineering",
    short: "Aerospace & propulsion",
    field: "Space",
    tagline: "The engineering of reaching further.",
    description:
      "Connecting propulsion, structures, aerodynamics, and flight control to explore reliable transport through atmosphere and space.",
    mechanism:
      "A rocket accelerates by expelling mass. Chamber conditions, nozzle geometry, propellant properties, and vehicle mass shape performance. Aerodynamics and thermal protection dominate different parts of flight, while guidance and control keep the vehicle within its operating envelope.",
    challenge:
      "Higher performance can introduce thermal stress, combustion instability, difficult materials, and complex maintenance. Reuse adds inspection and fatigue requirements. No engine firing, flight hardware, or launch capability is represented here.",
    application:
      "Candidate directions include reusable transportation, autonomous flight, efficient spacecraft propulsion, and advanced aerospace manufacturing. Mission requirements must guide propulsion choice rather than a single performance metric.",
    topics: [
      "Fluid dynamics and aerodynamics",
      "Propulsion concepts",
      "Thermal protection",
      "Guidance, navigation and control",
      "Aerospace structures",
      "Reusable launch and manufacturing",
    ],
    project: "tera-propulsion",
    color: "#e2b58f",
    visual: "propulsion",
  },
  {
    slug: "advanced-materials",
    name: "Materials Science & Engineering",
    short: "Advanced materials",
    field: "Matter",
    tagline: "Every frontier has a material limit.",
    description:
      "Exploring the connection between atomic structure, manufacturing history, and the properties that an engineered system can actually use.",
    mechanism:
      "Composition, crystal structure, defects, and microstructure determine how a material carries heat, charge, and stress. Computation can screen candidate structures, but synthesis and characterization are needed to establish what can be manufactured reliably.",
    challenge:
      "A useful property in an ideal simulation may disappear with defects, interfaces, corrosion, or repeated loading. Scale-up, scarce inputs, joining methods, and repairability can be decisive even when laboratory performance looks promising.",
    application:
      "High-temperature structures, radiation-resistant components, electronic materials, and recyclable composites are candidate directions. Superconductors and metamaterials require careful attention to the conditions under which their properties hold.",
    topics: [
      "Crystallography and metallurgy",
      "Nanomaterials and ceramics",
      "Composites and polymers",
      "Metamaterials",
      "Electronic and superconducting materials",
      "AI-led computational discovery",
    ],
    project: "tera-materials",
    color: "#d5cbb5",
    visual: "materials",
  },
  {
    slug: "energy-power-systems",
    name: "Advanced Energy Systems",
    short: "Energy & power systems",
    field: "Energy",
    tagline: "Power is a system, not a source.",
    description:
      "Considering generation, storage, power conversion, and distribution as one interconnected engineering challenge.",
    mechanism:
      "Electricity systems must balance production and demand across time and location. Power electronics control conversion, storage shifts energy in time, and thermal systems manage heat. Electrochemistry, grid controls, and infrastructure choices influence the whole network.",
    challenge:
      "Intermittency, transmission constraints, mineral supply, lifecycle impacts, and resilience cannot be solved by a single technology. Hydrogen, geothermal, batteries, and superconducting power each have distinct efficiency and infrastructure tradeoffs.",
    application:
      "Research directions include industrial microgrids, long-duration storage, renewable integration, advanced geothermal, and power systems for remote or orbital environments.",
    topics: [
      "Grids and distribution",
      "Power electronics",
      "Batteries and electrochemistry",
      "Hydrogen and geothermal",
      "Solar and thermal systems",
      "Space power infrastructure",
    ],
    project: "tera-fusion",
    color: "#c8d99c",
    visual: "energy",
  },
  {
    slug: "frontier-technologies",
    name: "Emerging & Transformational Technologies",
    short: "Frontier technologies",
    field: "Intelligence",
    tagline: "Where disciplines become possibilities.",
    description:
      "An open research space for ideas that cross established boundaries, from autonomous instruments to new ways of processing information.",
    mechanism:
      "Robotics couples sensing, computation, and actuation. Photonic and neuromorphic systems explore alternatives to conventional information processing. Digital twins connect observations with simulations; their usefulness depends on the fidelity and limits of the model.",
    challenge:
      "Integration often dominates component performance. Physical safety, uncertain environments, model drift, validation, and manufacturing readiness determine whether a promising idea can leave the laboratory. Programmable matter remains highly speculative.",
    application:
      "Candidate applications include autonomous manufacturing, scientific HPC, extreme-environment robotics, optical interconnects, computational chemistry, and biohybrid research systems.",
    topics: [
      "Industrial and humanoid robotics",
      "Photonic and neuromorphic computing",
      "Brain-computer interfaces",
      "Molecular engineering and chemistry",
      "Digital twins and autonomous labs",
      "Biohybrid systems and space resources",
    ],
    project: "tera-robotics",
    color: "#c5c8ce",
    visual: "robotics",
  },
];

export type Project = {
  slug: string;
  name: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  unknown: string;
  applications: string;
  divisions: string[];
  visual: string;
  status: "Concept Exploration" | "Research Direction" | "Future Vision";
};
export const projects: Project[] = [
  {
    slug: "tera-fusion",
    name: "TERA FUSION",
    title: "Containing a star. Engineering a system.",
    description:
      "A concept study of plasma confinement and the infrastructure around a future fusion power plant.",
    problem:
      "A fusion reaction alone does not produce a useful electricity system. Heat, fuel, maintenance, and safety must work together.",
    approach:
      "Map the interfaces between magnetic confinement, plasma control, neutron-resistant materials, heat extraction, and the power cycle. Compare design choices through transparent assumptions and system-level energy accounting.",
    unknown:
      "Component lifetime, steady operation, fuel-cycle closure, and plant economics remain unresolved in this concept.",
    applications:
      "Potential future electricity and high-temperature industrial heat, subject to technical and economic validation.",
    divisions: [
      "nuclear-systems",
      "advanced-materials",
      "energy-power-systems",
    ],
    visual: "fusion",
    status: "Concept Exploration",
  },
  {
    slug: "tera-silicon",
    name: "TERA SILICON",
    title: "Move less data. Unlock more compute.",
    description:
      "An architecture study of specialized compute, memory proximity, and heterogeneous integration.",
    problem:
      "Moving data can constrain a system as strongly as arithmetic throughput.",
    approach:
      "Explore how memory hierarchy, chiplet interconnects, packaging, and workload-specific hardware influence total energy use. Define evaluation around complete scientific and industrial workloads.",
    unknown:
      "Fabrication access, thermal density, packaging yield, software compatibility, and workload generality need evidence.",
    applications:
      "Scientific simulation, efficient inference, and industrial edge systems.",
    divisions: [
      "semiconductor-systems",
      "artificial-intelligence",
      "energy-power-systems",
    ],
    visual: "silicon",
    status: "Research Direction",
  },
  {
    slug: "tera-intelligence",
    name: "TERA INTELLIGENCE",
    title: "A collaborator for difficult questions.",
    description:
      "A research direction for bounded AI systems that assist scientific reasoning and industrial decisions.",
    problem:
      "Scientific work spans papers, simulations, instruments, and judgment. Connecting these tools does not automatically make their conclusions reliable.",
    approach:
      "Design assistants around traceable evidence, reproducible tool calls, uncertainty reporting, and human approval at consequential boundaries. Separate proposing an experiment from permission to execute it.",
    unknown:
      "Reliable long-horizon reasoning, robustness under distribution shift, and evaluation of novel hypotheses remain open.",
    applications:
      "Literature analysis, simulation planning, quality inspection, and decision support.",
    divisions: [
      "artificial-intelligence",
      "semiconductor-systems",
      "frontier-technologies",
    ],
    visual: "intelligence",
    status: "Research Direction",
  },
  {
    slug: "tera-quantum",
    name: "TERA QUANTUM",
    title: "Control the fragile. Study the possible.",
    description:
      "A concept portfolio spanning quantum computation, precision sensing, and communication.",
    problem:
      "Fragile quantum states must interact with noisy control, measurement, and networking hardware.",
    approach:
      "Compare architectures by error budgets, control requirements, and task-specific value. Treat classical electronics and photonic interfaces as parts of the quantum system.",
    unknown:
      "Error-correction overhead, scalable interconnection, useful algorithmic advantage, and practical operating costs are unresolved.",
    applications:
      "Research in molecular simulation, precision metrology, and specialized communication.",
    divisions: [
      "quantum-systems",
      "semiconductor-systems",
      "frontier-technologies",
    ],
    visual: "quantum",
    status: "Concept Exploration",
  },
  {
    slug: "tera-bio",
    name: "TERA BIO",
    title: "Model living complexity.",
    description:
      "A computational biotechnology direction centered on responsible modeling and biological understanding.",
    problem:
      "Biological behavior emerges from interacting processes that are difficult to predict from a single measurement.",
    approach:
      "Combine curated biological data, mechanistic models, and uncertainty-aware prediction. Concept studies consider how to test a model while respecting containment, consent, and oversight.",
    unknown:
      "Transfer across biological contexts, reproducibility, long-term effects, and safe translation require substantial validation.",
    applications:
      "Biomanufacturing analysis, biological sensing concepts, and regenerative research support.",
    divisions: ["biological-engineering", "artificial-intelligence"],
    visual: "bio",
    status: "Research Direction",
  },
  {
    slug: "tera-orbital",
    name: "TERA ORBITAL",
    title: "Infrastructure for the next horizon.",
    description:
      "An orbital infrastructure concept exploring serviceable modules, distributed power, and autonomous maintenance.",
    problem:
      "Space infrastructure must operate with limited resupply, harsh radiation, and difficult repair access.",
    approach:
      "Study modular interfaces, robotic inspection, thermal rejection, power distribution, and lifecycle logistics as a unified architecture. Prioritize debris mitigation and responsible operations.",
    unknown:
      "Launch economics, service reliability, shielding mass, governance, and closed-loop resource use remain central uncertainties.",
    applications:
      "Conceptual orbital research platforms, servicing infrastructure, and pathways to lunar utilities.",
    divisions: [
      "space-systems",
      "aerospace-propulsion",
      "energy-power-systems",
      "frontier-technologies",
    ],
    visual: "orbital",
    status: "Future Vision",
  },
  {
    slug: "tera-propulsion",
    name: "TERA PROPULSION",
    title: "Reach further. Return reliably.",
    description:
      "A propulsion concept study connecting engine design with vehicle reuse and maintainability.",
    problem:
      "A transport system must balance performance with structural margins, inspection, and repeated use.",
    approach:
      "Compare propulsion choices within explicit mission envelopes. Couple thermal models, control limits, material behavior, and maintenance assumptions instead of optimizing thrust in isolation.",
    unknown:
      "Combustion stability, fatigue life, inspection methods, and manufacturing repeatability require physical validation.",
    applications:
      "Reusable transport concepts, spacecraft maneuvering, and autonomous flight research.",
    divisions: [
      "aerospace-propulsion",
      "advanced-materials",
      "artificial-intelligence",
    ],
    visual: "propulsion",
    status: "Concept Exploration",
  },
  {
    slug: "tera-materials",
    name: "TERA MATERIALS",
    title: "Discover what the future can be made of.",
    description:
      "A direction for computational materials discovery with synthesis and lifecycle constraints built in.",
    problem:
      "The space of possible compositions is enormous, while promising predictions often fail during manufacture.",
    approach:
      "Combine physics-based simulation with statistical screening, then prioritize candidates by uncertainty, manufacturability, resource needs, and measurable performance.",
    unknown:
      "Model transferability, defect sensitivity, synthesis feasibility, and durability in real operating environments remain open.",
    applications:
      "High-temperature parts, electronic materials, radiation-resistant structures, and circular manufacturing.",
    divisions: [
      "advanced-materials",
      "artificial-intelligence",
      "nuclear-systems",
    ],
    visual: "materials",
    status: "Research Direction",
  },
  {
    slug: "tera-robotics",
    name: "TERA ROBOTICS",
    title: "Capability where access is difficult.",
    description:
      "A concept for supervised autonomous systems in industrial, scientific, and extreme environments.",
    problem:
      "Unstructured conditions, intermittent communication, and physical risk make autonomy harder than a controlled demonstration.",
    approach:
      "Study perception, manipulation, planning, and fail-safe control together. Use simulation to explore failure modes and retain human intervention for uncertain or consequential actions.",
    unknown:
      "Reliable generalization, dexterity, power demand, maintainability, and safe human interaction need validation.",
    applications:
      "Inspection, laboratory assistance, remote maintenance, and future orbital servicing.",
    divisions: [
      "frontier-technologies",
      "artificial-intelligence",
      "space-systems",
    ],
    visual: "robotics",
    status: "Concept Exploration",
  },
  {
    slug: "tera-human",
    name: "TERA HUMAN",
    title: "Technology in service of human agency.",
    description:
      "A human-centered vision for assistive interfaces, augmentation, and regenerative research.",
    problem:
      "Technologies that extend capability can also create barriers, privacy risks, or dependencies if people are not involved in their design.",
    approach:
      "Explore prosthetics, neural interfaces, assistive robotics, and human-machine collaboration around accessibility, consent, repairability, and user control. Keep regenerative biotechnology as a separate research horizon.",
    unknown:
      "Long-term safety, biocompatibility, clinical effectiveness, affordability, and equitable access require independent evidence.",
    applications:
      "Assistive control, accessible tools, sensory support, and extreme-environment habitation concepts. No medical benefit is promised.",
    divisions: [
      "biological-engineering",
      "frontier-technologies",
      "artificial-intelligence",
    ],
    visual: "human",
    status: "Future Vision",
  },
];

export const stages = [
  {
    roman: "I",
    name: "Planetary civilization",
    status: "Established foundations",
    title: "Build a more capable Earth.",
    body: "Reliable energy, sustainable industry, scientific computing, and resilient infrastructure. Progress begins with improving life on the planet we already share.",
    needs: "Grid resilience · Industrial AI · Circular materials",
    division: "energy-power-systems",
  },
  {
    roman: "II",
    name: "Orbital civilization",
    status: "Emerging engineering",
    title: "Make orbit a place to work.",
    body: "Serviceable stations, reusable transport, and robotic maintenance could support a more sustained orbital presence. Debris, cost, and governance set real limits.",
    needs: "Reusable transport · Orbital power · Robotic servicing",
    division: "space-systems",
  },
  {
    roman: "III",
    name: "Multi-planetary civilization",
    status: "Long-term concept",
    title: "Create systems that can stay.",
    body: "Lunar and Martian infrastructure would need dependable power, resource handling, radiation protection, and maintainable habitation. Independence from Earth is a far harder goal than arrival.",
    needs: "Life support · Local resources · Radiation protection",
    division: "biological-engineering",
  },
  {
    roman: "IV",
    name: "Solar system civilization",
    status: "Far-future scenario",
    title: "Connect a distributed frontier.",
    body: "Autonomous industry and exploration across the solar system would require robust operations across immense distances and long communication delays. This is a scenario, not a roadmap with dates.",
    needs: "Deep-space propulsion · Autonomy · Distributed logistics",
    division: "aerospace-propulsion",
  },
  {
    roman: "V",
    name: "Interstellar civilization",
    status: "Theoretical horizon",
    title: "Confront the distances between stars.",
    body: "Interstellar travel faces extreme energy, duration, shielding, and communication constraints. Proposed propulsion approaches do not establish a practical path for human settlement.",
    needs: "Energy limits · Mission duration · Information delay",
    division: "space-systems",
  },
  {
    roman: "VI",
    name: "Intergalactic horizons",
    status: "Explicit speculation",
    title: "Ask beyond the engineering horizon.",
    body: "Extragalactic civilization is an imaginative thought experiment. Cosmic distances and physical limits separate it from feasible engineering. No demonstrated transport or settlement technology is implied.",
    needs: "Cosmological distances · Physical limits · Open questions",
    division: "frontier-technologies",
  },
];

export const relationships = [
  {
    a: "artificial-intelligence",
    b: "semiconductor-systems",
    label: "Intelligence needs physical compute",
    detail:
      "Model architecture and chip architecture jointly determine memory traffic, power demand, and usable throughput.",
  },
  {
    a: "artificial-intelligence",
    b: "biological-engineering",
    label: "Models meet living complexity",
    detail:
      "Learning systems can help organize biological data, but uncertainty and experimental validation remain essential.",
  },
  {
    a: "nuclear-systems",
    b: "advanced-materials",
    label: "Energy meets material limits",
    detail:
      "Heat flux and neutron exposure connect fusion system design to the microstructure and lifetime of its components.",
  },
  {
    a: "quantum-systems",
    b: "frontier-technologies",
    label: "Quantum information meets photonics",
    detail:
      "Optical interfaces can connect quantum systems, while coupling losses and noise constrain the network.",
  },
  {
    a: "frontier-technologies",
    b: "space-systems",
    label: "Autonomy enables remote maintenance",
    detail:
      "Robotic inspection and servicing become especially valuable where human access is costly or hazardous.",
  },
  {
    a: "energy-power-systems",
    b: "semiconductor-systems",
    label: "Compute is an energy system",
    detail:
      "Power conversion, cooling, and the electrical grid are part of the infrastructure of computing.",
  },
  {
    a: "biological-engineering",
    b: "space-systems",
    label: "Life support closes the loop",
    detail:
      "Biological and physicochemical processes offer different tradeoffs for recycling resources in long-duration habitats.",
  },
  {
    a: "artificial-intelligence",
    b: "advanced-materials",
    label: "Discovery becomes a feedback loop",
    detail:
      "Models propose candidates; autonomous instruments could test them; measured results update the models.",
  },
];
