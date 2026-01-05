import { Code2, Bot, Settings, Megaphone } from 'lucide-react';
import { ServiceData, ServiceCategory, CaseStudy, BlogPost, Founder, PortfolioItem, Testimonial, FAQ, WorkflowStep } from './types';

export const COMPANY_NAME = "Tera Industries";
export const CONTACT_EMAIL = "hello@teraindustries.com";

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  // Services is handled via dropdown in Layout
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

// Detailed Workflows
export const SOFTWARE_WORKFLOW: WorkflowStep[] = [
  {
    title: "Discovery & Planning",
    duration: "1-2 Days",
    description: "Deep dive into your business needs, target audience, and technical requirements. We map out the complete project scope and timeline.",
    deliverables: ["Requirements Document", "Project Roadmap", "Technical Architecture"],
    tools: ["Figma", "Miro", "Notion"]
  },
  {
    title: "Design & Prototyping",
    duration: "3-5 Days",
    description: "Create wireframes and high-fidelity designs. Build interactive prototypes for user testing and feedback.",
    deliverables: ["Wireframes", "UI/UX Design", "Interactive Prototype"],
    tools: ["Figma", "Adobe XD", "Framer"]
  },
  {
    title: "Development Sprint",
    duration: "2-6 Weeks",
    description: "Agile development with weekly check-ins. Clean, scalable code following industry best practices.",
    deliverables: ["Working Software", "API Documentation", "Unit Tests"],
    tools: ["React", "Next.js", "Node.js", "PostgreSQL"]
  },
  {
    title: "Testing & QA",
    duration: "3-5 Days",
    description: "Comprehensive testing across devices and browsers. Performance optimization and security audits.",
    deliverables: ["Test Reports", "Bug Fixes", "Performance Metrics"],
    tools: ["Cypress", "Jest", "Lighthouse"]
  },
  {
    title: "Deployment & Launch",
    duration: "1-2 Days",
    description: "Production deployment with CI/CD pipelines. DNS configuration and SSL setup.",
    deliverables: ["Live Application", "Deployment Documentation", "Monitoring Setup"],
    tools: ["Vercel", "AWS", "GitHub Actions"]
  }
];

export const ROBOTICS_WORKFLOW: WorkflowStep[] = [
  {
    title: "Site Audit & Feasibility",
    duration: "1 Day On-Site",
    description: "Physical site visit to assess automation opportunities. Video documentation and bottleneck identification.",
    deliverables: ["Site Assessment Report", "Video Documentation", "ROI Projections"],
    tools: ["Measurement Tools", "Video Equipment", "CAD Software"]
  },
  {
    title: "Solution Design & Simulation",
    duration: "1-2 Weeks",
    description: "Design custom robotics solution. Create digital twin for virtual testing and optimization.",
    deliverables: ["3D CAD Models", "Digital Twin", "Simulation Results", "Bill of Materials"],
    tools: ["SolidWorks", "ROS", "Gazebo", "MATLAB"]
  },
  {
    title: "Hardware Procurement",
    duration: "2-4 Weeks",
    description: "Source and procure robotic arms, sensors, controllers, and custom components.",
    deliverables: ["Hardware Components", "Custom End-Effectors", "Safety Equipment"],
    tools: ["Supplier Network", "Custom Fabrication"]
  },
  {
    title: "Programming & Integration",
    duration: "2-3 Weeks",
    description: "Develop control software, integrate sensors and vision systems, PLC handshaking.",
    deliverables: ["Control Software", "Vision System", "Safety Protocols", "HMI Interface"],
    tools: ["ROS", "Python", "OpenCV", "PLC Programming"]
  },
  {
    title: "Installation & Calibration",
    duration: "3-5 Days",
    description: "On-site installation, mechanical mounting, electrical connections, and precision calibration.",
    deliverables: ["Installed System", "Calibration Report", "Safety Documentation"],
    tools: ["Installation Tools", "Calibration Equipment", "Safety Gear"]
  }
];

export const MECHANICAL_WORKFLOW: WorkflowStep[] = [
  {
    title: "Requirement Analysis",
    duration: "1-2 Days",
    description: "Understand design constraints, functional requirements, manufacturing capabilities, and budget.",
    deliverables: ["Requirements Document", "Constraint Analysis", "Material Recommendations"],
    tools: ["Client Meetings", "Technical Specifications"]
  },
  {
    title: "Concept Design",
    duration: "3-5 Days",
    description: "Create multiple design concepts, sketch layouts, and preliminary 3D models for review.",
    deliverables: ["Concept Sketches", "3D Concepts", "Design Comparison"],
    tools: ["SolidWorks", "Fusion 360", "Hand Sketches"]
  },
  {
    title: "Detailed 3D Modeling",
    duration: "1-2 Weeks",
    description: "Develop detailed 3D CAD models with all components, assemblies, and technical specifications.",
    deliverables: ["3D CAD Models", "Assembly Drawings", "BOM", "GD&T Specifications"],
    tools: ["SolidWorks", "Creo", "AutoCAD"]
  },
  {
    title: "Engineering Analysis",
    duration: "3-7 Days",
    description: "FEA structural analysis, thermal simulations, CFD if required, and optimization studies.",
    deliverables: ["Analysis Reports", "Stress Results", "Optimization Recommendations", "Safety Factors"],
    tools: ["ANSYS", "HyperMesh", "SolidWorks Simulation"]
  },
  {
    title: "Prototype Development",
    duration: "1-3 Weeks",
    description: "Rapid prototyping using 3D printing or CNC machining for physical validation.",
    deliverables: ["Physical Prototype", "Fit & Function Tests", "Design Validation Report"],
    tools: ["3D Printers", "CNC Machines", "Measurement Tools"]
  }
];

export const BRANDING_WORKFLOW: WorkflowStep[] = [
  {
    title: "Brand Discovery Call",
    duration: "1-2 Hours",
    description: "Deep conversation about your business, target audience, competition, and brand aspirations.",
    deliverables: ["Discovery Notes", "Competitor Analysis", "Target Audience Profile"],
    tools: ["Video Call", "Miro Board", "Market Research"]
  },
  {
    title: "Brand Strategy Development",
    duration: "3-5 Days",
    description: "Define brand positioning, messaging framework, tone of voice, and visual direction.",
    deliverables: ["Brand Strategy Document", "Messaging Framework", "Visual Mood Board"],
    tools: ["Strategic Frameworks", "Pinterest", "Figma"]
  },
  {
    title: "Visual Identity Design",
    duration: "1-2 Weeks",
    description: "Logo design, color palette, typography system, and supporting brand elements.",
    deliverables: ["Logo Variations", "Color Palette", "Typography System", "Brand Guidelines"],
    tools: ["Adobe Illustrator", "Figma", "Photoshop"]
  },
  {
    title: "Content Production",
    duration: "1-3 Weeks",
    description: "Filming, photography, copywriting, graphic design, and video editing for launch assets.",
    deliverables: ["Video Content", "Photography", "Written Copy", "Graphics Package"],
    tools: ["Cameras", "Adobe Premiere", "After Effects", "Photoshop"]
  },
  {
    title: "Digital Presence Setup",
    duration: "1 Week",
    description: "Website launch, social media profiles, LinkedIn optimization, and Google Business setup.",
    deliverables: ["Live Website", "Social Profiles", "LinkedIn Page", "Google Business"],
    tools: ["Next.js", "Social Platforms", "SEO Tools"]
  }
];

export const SERVICES: ServiceData[] = [
  {
    id: ServiceCategory.SOFTWARE,
    title: "Software Services",
    shortDescription: "Custom web, mobile, and AI solutions built for scale and performance.",
    fullDescription: "We engineer robust digital ecosystems. From high-performance SaaS platforms to custom AI automation, our software services are designed to streamline operations and drive digital transformation for modern enterprises.",
    icon: Code2,
    subServices: [
      {
        title: "Websites & Landing Pages",
        description: "High-conversion sites optimized for performance and SEO.",
        tools: ["React", "Next.js", "WordPress", "Webflow"]
      },
      {
        title: "Mobile Applications",
        description: "Native and cross-platform apps providing seamless user experiences.",
        tools: ["Flutter", "React Native", "Swift", "Kotlin"]
      },
      {
        title: "Web Apps & SaaS",
        description: "Scalable cloud-based applications for complex business logic.",
        tools: ["Node.js", "Django", "Firebase", "AWS"]
      },
      {
        title: "AI & Automation",
        description: "Intelligent workflows to reduce manual effort and increase efficiency.",
        tools: ["LangChain", "OpenAI API", "TensorFlow", "Python"]
      }
    ],
    workflow: ["Client Brief", "Wireframe & Design", "Agile Development", "QA Testing", "Deployment", "Maintenance"],
    detailedWorkflow: SOFTWARE_WORKFLOW,
    outOfBox: ["SaaS MVP Launch Pack", "E-commerce Starter", "Corporate Portal"],
    targetAudience: ["Tech Startups", "SMEs", "E-commerce Brands"],
    colorTheme: 'blue'
  },
  /* ROBOTICS SERVICE - COMMENTED OUT FOR FUTURE USE
  {
    id: ServiceCategory.ROBOTICS,
    title: "Robotics Services",
    shortDescription: "End-to-end automation engineering for factories and warehouses.",
    fullDescription: "Bridging the gap between hardware and intelligence. We provide comprehensive robotics solutions ranging from feasibility audits to full-scale deployment of autonomous systems in industrial environments.",
    icon: Bot,
    subServices: [
      {
        title: "Consulting & Audits",
        description: "Feasibility studies, ROI calculations, and safety compliance checks.",
        tools: ["Feasibility Reports", "Safety Standards"]
      },
      {
        title: "Design & Simulation",
        description: "Digital twins, path planning, and custom end-effector design.",
        tools: ["ROS", "Gazebo", "SolidWorks"]
      },
      {
        title: "Integration & Programming",
        description: "Sensor fusion, PLC handshakes, and fleet management setup.",
        tools: ["C++", "Python", "PLC"]
      },
      {
        title: "Deployment & Testing",
        description: "On-site installation, calibration, and operator training.",
        tools: ["Field Testing", "Calibration Rigs"]
      }
    ],
    workflow: ["Pain Point ID", "Simulation Proof", "Hardware Design", "Programming", "Deployment", "Support"],
    detailedWorkflow: ROBOTICS_WORKFLOW,
    outOfBox: ["RaaS (Robots as a Service)", "Drone Inspection Kits", "EduKits"],
    targetAudience: ["Factories", "Warehouses", "R&D Labs"],
    colorTheme: 'blue'
  },
  */
  /* MECHANICAL SERVICE - COMMENTED OUT FOR FUTURE USE
  {
    id: ServiceCategory.MECHANICAL,
    title: "Mechanical Services",
    shortDescription: "Precision CAD design, FEA analysis, and manufacturing support.",
    fullDescription: "Turning concepts into tangible reality. Our mechanical engineering division specializes in rigorous analysis and design for manufacturing, ensuring your hardware is built to last and perform under pressure.",
    icon: Settings,
    subServices: [
      {
        title: "Design Services",
        description: "2D CAD drafting, 3D modeling, and assembly design.",
        tools: ["SolidWorks", "Fusion 360", "AutoCAD"]
      },
      {
        title: "Analysis (FEA/CFD)",
        description: "Structural, thermal, and fluid flow simulations to validate designs.",
        tools: ["ANSYS", "HyperMesh", "CATIA"]
      },
      {
        title: "Prototyping",
        description: "Rapid prototyping via 3D printing and CNC machining.",
        tools: ["3D Printing", "CNC"]
      },
      {
        title: "Manufacturing Support",
        description: "Process planning, vendor management, and quality control.",
        tools: ["DFM", "Cost Estimation"]
      }
    ],
    workflow: ["Requirement Analysis", "CAD Design", "Simulation (FEA)", "Prototyping", "Manufacturing", "QC & Delivery"],
    detailedWorkflow: MECHANICAL_WORKFLOW,
    outOfBox: ["Prototype-in-a-Week", "DFM Audit"],
    targetAudience: ["Product Companies", "Manufacturing Units", "Hardware Startups"],
    colorTheme: 'blue'
  },
  */
  {
    id: ServiceCategory.BRANDING,
    title: "Branding & Content",
    shortDescription: "Strategic storytelling and digital growth for technical businesses.",
    fullDescription: "We translate complex technical value into compelling market narratives. Our branding division understands the nuances of B2B sales cycles and creates content that establishes authority and trust.",
    icon: Megaphone,
    subServices: [
      {
        title: "Brand Strategy",
        description: "Positioning, visual identity, and core messaging for B2B.",
        tools: ["Brand Audit", "Identity Kits"]
      },
      {
        title: "Content Creation",
        description: "Technical blogs, whitepapers, video production, and case studies.",
        tools: ["Adobe Suite", "Davinci Resolve"]
      },
      {
        title: "Digital Marketing",
        description: "SEO, LinkedIn growth, and targeted lead generation.",
        tools: ["Google Ads", "LinkedIn Sales Nav"]
      },
      {
        title: "Community Building",
        description: "Founder events, webinars, and engagement strategies.",
        tools: ["Newsletters", "Virtual Events"]
      }
    ],
    workflow: ["Discovery", "Strategy", "Asset Creation", "Launch", "Analytics", "Optimization"],
    detailedWorkflow: BRANDING_WORKFLOW,
    outOfBox: ["Launch-in-a-Box", "Personal Brand Accelerator", "Video Packs"],
    targetAudience: ["Tech Founders", "B2B Service Providers", "Startups"],
    colorTheme: 'blue'
  }
];

export const FOUNDERS: Founder[] = [
  {
    id: 1,
    name: "Heytt Satra",
    role: "Founder & Tech Lead",
    title: "CS & Business Systems Engineer",
    background: "CS & Business Systems Engineer",
    bio: "Heytt bridges the gap between code and business logic. With a background in freelance web development and content creation, he leads the Software and Branding verticals at Tera Industries. His passion for building digital solutions that drive real business results has helped numerous startups and SMEs transform their operations.",
    linkedin: "https://www.linkedin.com/in/heytt-satra/",
    image: "/images/heytt-satra.png",
    expertise: ["Software Architecture", "AI/ML", "Business Strategy", "Content Creation"],
    skills: [
      { name: "Full-Stack Development", level: 95 },
      { name: "AI & Automation", level: 90 },
      { name: "Business Development", level: 85 },
      { name: "Content Strategy", level: 88 }
    ]
  },
  /* MANAS - COMMENTED OUT FOR FUTURE USE
  {
    id: 2,
    name: "Manas",
    role: "Co-Founder & Engineering Lead",
    title: "Mechanical Engineer",
    background: "Mechanical Engineer",
    bio: "Manas brings hardware to life. A veteran of college rover teams, he specializes in mechanical design, analysis, and robotics integration. He oversees the Robotics and Mechanical verticals, ensuring physical systems perform as perfectly as the code that drives them.",
    linkedin: "#",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    expertise: ["Mechanical Design", "Robotics", "CAD/CAM", "Manufacturing"],
    skills: [
      { name: "CAD Design", level: 95 },
      { name: "FEA Analysis", level: 90 },
      { name: "Robotics Integration", level: 92 },
      { name: "Manufacturing", level: 88 }
    ]
  }
  */
];

export const CASE_STUDIES: CaseStudy[] = [
  // SOFTWARE
  {
    id: "cs-soft-1",
    title: "E-Commerce Platform Rebuild",
    client: "FreshMart Online",
    clientType: "Grocery Delivery Startup",
    category: ServiceCategory.SOFTWARE,
    summary: "Rebuilding a legacy PHP site into a high-performance Next.js platform.",
    challenge: "FreshMart was losing 75% of traffic due to 8s load times on their legacy PHP site. The platform was mobile-unfriendly, causing a significant drop in conversions.",
    solution: "We executed a complete rebuild using Next.js for SSR and performance. Integrated Stripe for payments and Redis for real-time inventory management.",
    impact: ["Page load reduced to 1.2s", "Mobile conversions up 340%", "₹2.5Cr GMV in first 3 months"],
    tools: ["Next.js", "React", "Node.js", "AWS"],
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200",
    testimonial: "The new platform transformed our business. Orders tripled within the first month."
  },
  {
    id: "cs-soft-2",
    title: "AI-Powered CRM",
    client: "PropertyPro Realty",
    clientType: "Real Estate Agency",
    category: ServiceCategory.SOFTWARE,
    summary: "Automating lead scoring and follow-ups with custom AI agents.",
    challenge: "Manual lead tracking in spreadsheets resulted in lost opportunities and inconsistent follow-ups.",
    solution: "Developed a custom CRM using Python and Django, integrating LangChain for AI lead scoring and automated WhatsApp follow-ups.",
    impact: ["89% faster lead response", "42% increase in conversions", "Saved 15 hours/week per agent"],
    tools: ["Python", "Django", "LangChain", "OpenAI"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    testimonial: "Our agents are closing deals 40% faster. The AI lead scoring is incredibly accurate."
  },
  {
    id: "cs-soft-3",
    title: "Fleet Management SaaS",
    client: "LogiTrack Systems",
    clientType: "Logistics Company",
    category: ServiceCategory.SOFTWARE,
    summary: "Real-time vehicle tracking and route optimization dashboard.",
    challenge: "No real-time visibility of 200+ vehicles led to fuel waste and manual dispatch inefficiencies.",
    solution: "Built a real-time tracking dashboard with React and Google Maps API, using TensorFlow for predictive route optimization.",
    impact: ["23% fuel savings (₹45L/yr)", "98% on-time deliveries", "30% more deliveries per vehicle"],
    tools: ["React", "Firebase", "TensorFlow", "Flutter"],
    imageUrl: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=1200",
    testimonial: "ROI achieved in 4 months. The route optimization alone paid for the entire system."
  },
  /* ROBOTICS CASE STUDIES - COMMENTED OUT FOR FUTURE USE
  // ROBOTICS
  {
    id: "cs-robo-1",
    title: "Warehouse Automation",
    client: "MegaStock Distributors",
    clientType: "FMCG Warehouse",
    category: 'robotics',
    summary: "Collaborative robot arm integration for automated palletizing.",
    challenge: "Manual palletizing was limited to 350 boxes/hour and caused frequent worker injuries and overtime costs.",
    solution: "Integrated a Universal Robots UR10 with a custom vision system and gripper for automated, safety-compliant palletizing.",
    impact: ["850 boxes/hour throughput", "Zero injuries in 6 months", "₹18L annual labor savings"],
    tools: ["Universal Robots", "ROS", "OpenCV", "PLC"],
    imageUrl: "https://images.unsplash.com/photo-1565514020176-dbf2277e3c97?auto=format&fit=crop&q=80&w=1200",
    testimonial: "The robot paid for itself in 11 months. Our workers now handle quality control instead of heavy lifting."
  },
  {
    id: "cs-robo-2",
    title: "Quality Inspection Line",
    client: "CircuitCraft Manufacturing",
    clientType: "PCB Manufacturer",
    category: 'robotics',
    summary: "Vision-based automated inspection system for electronics.",
    challenge: "Manual visual inspection had an 8% defect pass-through rate and was the bottleneck of production.",
    solution: "Deployed an industrial camera array with a custom CNN model to detect defects in real-time on the conveyor.",
    impact: ["0.3% defect rate", "4x faster inspection", "₹32L annual rework savings"],
    tools: ["TensorFlow", "Industrial Cameras", "Edge AI"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    testimonial: "Defect complaints from customers dropped 94%. Our reputation has never been better."
  },
  {
    id: "cs-robo-3",
    title: "AgriBot Sprayer",
    client: "GreenGrow Farms",
    clientType: "Hydroponic Farm",
    category: 'robotics',
    summary: "Autonomous mobile robot for precision pesticide spraying.",
    challenge: "Manual spraying resulted in uneven coverage, chemical waste, and health risks for workers.",
    solution: "Built a custom autonomous mobile robot using ROS Navigation and computer vision for precision nozzle control.",
    impact: ["60% chemical reduction", "8 hours labor saved daily", "18% improved crop yield"],
    tools: ["ROS Navigation", "Custom Hardware", "GPS"],
    imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1200",
    testimonial: "The robot works while we sleep. Our crop yield improved 18% with less chemicals."
  },
  // MECHANICAL
  {
    id: "cs-mech-1",
    title: "Packaging Machine Design",
    client: "SnackBox Industries",
    clientType: "Food Packaging",
    category: 'mechanical',
    summary: "Custom semi-automatic packaging machine design and fabrication.",
    challenge: "Off-the-shelf machines were too expensive (₹80L) and didn't fit their specific product dimensions.",
    solution: "Designed a custom machine in SolidWorks, performed structural analysis, and managed local fabrication.",
    impact: ["65% cost savings vs off-the-shelf", "450 packs/hour rate", "Perfect product fit"],
    tools: ["SolidWorks", "ANSYS", "CNC"],
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=1200",
    testimonial: "They understood our unique needs and delivered a machine that big manufacturers couldn't."
  },
  {
    id: "cs-mech-2",
    title: "Heat Exchanger Opt.",
    client: "ChemFlow Industries",
    clientType: "Chemical Plant",
    category: 'mechanical',
    summary: "CFD analysis and redesign of industrial heat exchangers.",
    challenge: "Equipment overheating caused 30% energy waste and frequent shutdown maintenance.",
    solution: "Utilized ANSYS Fluent for CFD analysis to redesign fins and improve coolant flow dynamics.",
    impact: ["28% energy reduction", "Operating temp down 15°C", "Zero shutdowns in 8 months"],
    tools: ["ANSYS Fluent", "CFD", "Thermal Analysis"],
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=1200",
    testimonial: "The thermal analysis revealed issues our team missed for years. Energy bills dropped immediately."
  },
  {
    id: "cs-mech-3",
    title: "IoT Device Prototype",
    client: "SmartSense Tech",
    clientType: "IoT Startup",
    category: 'mechanical',
    summary: "Rapid prototyping of consumer electronics housing.",
    challenge: "Needed a functional physical prototype for an investor demo with a strict 3-week deadline.",
    solution: "Executed rapid prototyping using SLA 3D printing and post-processing for a production-grade finish.",
    impact: ["Delivered in 3 weeks", "Secured ₹3Cr funding", "Production-ready design"],
    tools: ["Fusion 360", "SLA 3D Printing", "Prototyping"],
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
    testimonial: "They turned our sketches into a stunning prototype in record time. Investors were blown away."
  },
  */
  // BRANDING
  {
    id: "cs-brand-1",
    title: "SaaS Brand Launch",
    client: "CloudKompass",
    clientType: "B2B SaaS",
    category: ServiceCategory.BRANDING,
    summary: "Complete brand identity and go-to-market strategy.",
    challenge: "Generic name and zero market presence for a new product launching in 45 days.",
    solution: "Developed full brand identity, logo, website, and executed a 60-day content blitz on LinkedIn.",
    impact: ["2,400 LinkedIn followers pre-launch", "150 demo requests", "Featured in industry press"],
    tools: ["Figma", "Adobe CC", "LinkedIn"],
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
    testimonial: "We looked like a million-dollar company from day one. The content strategy brought us serious leads."
  },
  {
    id: "cs-brand-2",
    title: "Factory Tour Series",
    client: "PrecisionWorks",
    clientType: "Manufacturing Shop",
    category: ServiceCategory.BRANDING,
    summary: "Video content series showcasing manufacturing capabilities.",
    challenge: "Outdated reputation and no digital presence were causing them to lose clients to modern competitors.",
    solution: "Produced a high-quality 12-part 'Factory Tour' video series and case study blog campaign.",
    impact: ["45k video views", "8 new enterprise clients", "₹1.2Cr in new contracts"],
    tools: ["Premiere Pro", "Davinci Resolve", "Drone Photography"],
    imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1200",
    testimonial: "The videos showcased our capabilities better than any sales pitch. Clients come to us now."
  },
  {
    id: "cs-brand-3",
    title: "Founder Branding",
    client: "Rajesh Malhotra",
    clientType: "Tech CEO",
    category: ServiceCategory.BRANDING,
    summary: "Personal branding acceleration for a tech executive.",
    challenge: "Great product but invisible founder; competitors were dominating share of voice.",
    solution: "Implemented a 90-day thought leadership program including ghostwriting and podcast bookings.",
    impact: ["4,200 new connections", "3 podcast features", "Keynote speaking invitation"],
    tools: ["Ghostwriting", "PR Outreach", "Social Strategy"],
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
    testimonial: "I went from unknown to industry voice. My LinkedIn posts now generate inbound leads for the company."
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Software
  { id: "p1", title: "MediSchedule", clientType: "Healthcare", category: ServiceCategory.SOFTWARE, serviceTags: ["App Dev", "UI/UX"], description: "Hospital appointment booking app.", imageUrl: "https://picsum.photos/seed/p1/600/400" },
  { id: "p2", title: "FinTrack Pro", clientType: "FinTech", category: ServiceCategory.SOFTWARE, serviceTags: ["Dashboard", "React"], description: "Expense management dashboard for SMEs.", imageUrl: "https://picsum.photos/seed/p2/600/400" },
  { id: "p3", title: "EduLearn", clientType: "EdTech", category: ServiceCategory.SOFTWARE, serviceTags: ["Platform", "Video"], description: "Online course marketplace.", imageUrl: "https://picsum.photos/seed/p3/600/400" },
  { id: "p4", title: "RestoBiz POS", clientType: "Hospitality", category: ServiceCategory.SOFTWARE, serviceTags: ["POS", "Cloud"], description: "Restaurant point-of-sale system.", imageUrl: "https://picsum.photos/seed/p4/600/400" },
  { id: "p5", title: "FitSync", clientType: "Wellness", category: ServiceCategory.SOFTWARE, serviceTags: ["Mobile", "IoT"], description: "Gym management and member app.", imageUrl: "https://picsum.photos/seed/p5/600/400" },
  /* ROBOTICS PORTFOLIO ITEMS - COMMENTED OUT FOR FUTURE USE
  // Robotics
  { id: "p6", title: "AutoSort 3000", clientType: "Logistics", category: 'robotics', serviceTags: ["Automation", "Vision"], description: "Parcel sorting system for couriers.", imageUrl: "https://picsum.photos/seed/p6/600/400" },
  { id: "p7", title: "WeldBot", clientType: "Manufacturing", category: 'robotics', serviceTags: ["Robotic Arm", "Welding"], description: "Automated welding cell.", imageUrl: "https://picsum.photos/seed/p7/600/400" },
  { id: "p8", title: "DroneInspect", clientType: "Infrastructure", category: 'robotics', serviceTags: ["Drone", "AI"], description: "Autonomous drone for tower inspection.", imageUrl: "https://picsum.photos/seed/p8/600/400" },
  { id: "p9", title: "PickPlace Cobot", clientType: "Assembly", category: 'robotics', serviceTags: ["Cobot", "Integration"], description: "Assembly line pick-and-place.", imageUrl: "https://picsum.photos/seed/p9/600/400" },
  { id: "p10", title: "AgriBot Rover", clientType: "Agriculture", category: 'robotics', serviceTags: ["Mobile Robot", "GPS"], description: "Field monitoring robot.", imageUrl: "https://picsum.photos/seed/p10/600/400" },
  // Mechanical
  { id: "p11", title: "CustomJig", clientType: "Auto Parts", category: 'mechanical', serviceTags: ["Fixtures", "CNC"], description: "Manufacturing fixture for auto parts.", imageUrl: "https://picsum.photos/seed/p11/600/400" },
  { id: "p12", title: "HVAC Opt", clientType: "Industrial", category: 'mechanical', serviceTags: ["CFD", "Thermal"], description: "Industrial cooling system redesign.", imageUrl: "https://picsum.photos/seed/p12/600/400" },
  { id: "p13", title: "ProtoSeries", clientType: "Consumer Goods", category: 'mechanical', serviceTags: ["Prototyping", "3D Print"], description: "Consumer product development.", imageUrl: "https://picsum.photos/seed/p13/600/400" },
  { id: "p14", title: "ConveyorUp", clientType: "Logistics", category: 'mechanical', serviceTags: ["Design", "Fabrication"], description: "Material handling system improvement.", imageUrl: "https://picsum.photos/seed/p14/600/400" },
  { id: "p15", title: "PressureVessel", clientType: "Chemical", category: 'mechanical', serviceTags: ["FEA", "Safety"], description: "Safety compliance testing.", imageUrl: "https://picsum.photos/seed/p15/600/400" },
  */
  // Branding
  { id: "p16", title: "TechNova", clientType: "Software", category: ServiceCategory.BRANDING, serviceTags: ["Rebrand", "Identity"], description: "Complete brand overhaul.", imageUrl: "https://picsum.photos/seed/p16/600/400" },
  { id: "p17", title: "Launch Video", clientType: "Product", category: ServiceCategory.BRANDING, serviceTags: ["Video", "Social"], description: "Product announcement content series.", imageUrl: "https://picsum.photos/seed/p17/600/400" },
  { id: "p18", title: "Founder Series", clientType: "Executive", category: ServiceCategory.BRANDING, serviceTags: ["Strategy", "PR"], description: "Executive thought leadership program.", imageUrl: "https://picsum.photos/seed/p18/600/400" },
  { id: "p19", title: "Event Coverage", clientType: "Events", category: ServiceCategory.BRANDING, serviceTags: ["Photo", "Video"], description: "Startup conference documentation.", imageUrl: "https://picsum.photos/seed/p19/600/400" },
  { id: "p20", title: "Social Audit", clientType: "B2B", category: ServiceCategory.BRANDING, serviceTags: ["Audit", "Strategy"], description: "90-day content transformation.", imageUrl: "https://picsum.photos/seed/p20/600/400" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Sharma",
    role: "CEO",
    company: "FreshMart Online",
    quote: "The team delivered our e-commerce platform in 6 weeks. Sales tripled immediately.",
    rating: 5,
    projectType: "Software Development",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t2",
    name: "Vikram Patel",
    role: "Operations Head",
    company: "MegaStock Distributors",
    quote: "The inventory management system they built transformed our operations. Best investment we made.",
    rating: 5,
    projectType: "Software Development",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t3",
    name: "Anil Desai",
    role: "Founder",
    company: "TechVentures",
    quote: "Their software solutions transformed our business operations completely. Highly recommend their team.",
    rating: 5,
    projectType: "Software Solutions",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t4",
    name: "Neha Gupta",
    role: "CMO",
    company: "CloudKompass",
    quote: "We looked like a million-dollar company from day one. The brand strategy brought serious leads.",
    rating: 5,
    projectType: "Branding",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t5",
    name: "Rajesh Kulkarni",
    role: "CTO",
    company: "SmartSense Tech",
    quote: "They turned our concept into a working prototype in 3 weeks. We secured funding at our first pitch.",
    rating: 5,
    projectType: "Software Development",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t6",
    name: "Sanjay Mehta",
    role: "Managing Director",
    company: "Mehta Enterprises",
    quote: "Tera Industries' software solutions saved us lakhs in operational costs. Incredible ROI.",
    rating: 5,
    projectType: "Software Solutions",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t7",
    name: "Kavita Singh",
    role: "Product Head",
    company: "EduTech Innovations",
    quote: "Their integrated approach to software and branding gave our product launch the momentum it needed.",
    rating: 5,
    projectType: "Integrated Product",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t8",
    name: "Arjun Reddy",
    role: "Business Owner",
    company: "Reddy Solutions",
    quote: "The branding transformation completely changed how customers perceive our business.",
    rating: 5,
    projectType: "Branding & Content",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

export const FAQS: FAQ[] = [
  { id: "f1", category: "General", question: "How much does a typical project cost?", answer: "Project costs vary widely based on scope. Small web projects might start at ₹50k, while complex robotics integration can range from ₹5L to ₹50L+. We provide transparent, itemized quotes after our initial consultation." },
  { id: "f2", category: "General", question: "What's the average project timeline?", answer: "Web/Brand projects typically take 4-8 weeks. Robotics/Mechanical projects range from 8-16 weeks depending on hardware lead times and complexity." },
  { id: "f3", category: "General", question: "Do you work with startups?", answer: "Yes! We specialize in working with startups and SMEs. We understand budget constraints and focus on high-impact, scalable solutions." },
  { id: "f4", category: "Process", question: "Can you handle projects remotely?", answer: "Software and Branding work is 100% remote-friendly. For Robotics/Mechanical, we may need site visits for installation/measurement, but design work happens at our lab in Mumbai." },
  { id: "f5", category: "Process", question: "What happens if we need changes?", answer: "We work in agile sprints with regular check-ins to incorporate feedback early. Post-launch changes are handled via maintenance contracts or ad-hoc support." },
  { id: "f6", category: "Support", question: "Do you provide ongoing support?", answer: "Absolutely. We offer AMC (Annual Maintenance Contracts) for robotics/software to ensure uptime and performance." },
  { id: "f7", category: "General", question: "Which industries do you specialize in?", answer: "Our core strengths are in Manufacturing, Logistics, B2B SaaS, and DeepTech/IoT." },
  { id: "f8", category: "Quality", question: "How do you ensure project quality?", answer: "We use industry-standard testing (Unit Tests for code, FEA/CFD for hardware, Simulation for robots) before any deployment." },
  { id: "f9", category: "General", question: "Can we see examples of past work?", answer: "Yes, please check our Case Studies page for detailed breakdowns of our recent projects." },
  { id: "f10", category: "Process", question: "What do I need to get a quote?", answer: "Just a brief description of your problem! We'll help you scope the solution during our discovery call." }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Why Startups Are Ditching WordPress for Headless CMS",
    excerpt: "Speed, security, and scalability—why the shift to Next.js is inevitable for Indian startups.",
    category: "Software Development",
    date: "Nov 15, 2024",
    readTime: "8 min",
    author: "Heytt Satra",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p>In the fast-paced digital landscape of 2025, speed is currency. For Indian startups looking to scale, the traditional WordPress monolith is becoming a bottleneck.</p>
        <h3>The Headless Revolution</h3>
        <p>Headless CMS architecture decouples the backend content management from the frontend presentation layer. This allows us to use powerful frameworks like Next.js to deliver lightning-fast, secure, and scalable user experiences.</p>
        <h3>Performance Gains</h3>
        <ul>
          <li><strong>Load Time:</strong> Sub-second page loads compared to 3-5s on WP.</li>
          <li><strong>Security:</strong> No exposed database or admin panel on the frontend.</li>
          <li><strong>Scalability:</strong> CDNs like Vercel handle traffic spikes effortlessly.</li>
        </ul>
        <p>We recently migrated a client from WP to a Next.js + Contentful stack, resulting in a 40% drop in bounce rate and a significant boost in SEO rankings.</p>
      </>
    )
  },
  /* ROBOTICS BLOG POST - COMMENTED OUT FOR FUTURE USE
  {
    id: "blog-2",
    title: "Automating Mumbai's SMEs for Under ₹10 Lakhs",
    excerpt: "Debunking the myth that robotics is only for billion-dollar factories.",
    category: "Robotics & Automation",
    date: "Nov 10, 2024",
    readTime: "10 min",
    author: "Manas",
    imageUrl: "https://images.unsplash.com/photo-1565514020176-dbf2277e3c97?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p>The perception that automation requires a multi-crore budget is outdated. With the rise of cobots and modular automation, SMEs in Mumbai can now automate key processes for a fraction of the cost.</p>
        <h3>The ₹10L Opportunity</h3>
        <p>For under ₹10 Lakhs, you can automate:</p>
        <ul>
          <li>Simple Pick & Place operations</li>
          <li>Quality Inspection using Vision Systems</li>
          <li>Palletizing at end-of-line</li>
        </ul>
        <p>We successfully deployed a vision-based sorting system for a local plastics manufacturer that paid for itself in just 8 months through labor savings and reduced rejection rates.</p>
      </>
    )
  },
  */
  /* MECHANICAL BLOG POST - COMMENTED OUT FOR FUTURE USE
  {
    id: "blog-3",
    title: "3D Printing vs CNC: A Prototyping Guide",
    excerpt: "How to choose the right manufacturing method for your next hardware iteration.",
    category: "Mechanical Engineering",
    date: "Oct 28, 2024",
    readTime: "7 min",
    author: "Manas",
    imageUrl: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p>Speed vs Precision. It's the classic engineering trade-off. Knowing when to switch from additive (3D Printing) to subtractive (CNC) manufacturing can save your startup weeks of development time.</p>
        <h3>Rule of Thumb</h3>
        <ul>
          <li><strong>Use 3D Printing (SLA/FDM)</strong> for: Form checks, fit testing, and complex geometries that are impossible to machine.</li>
          <li><strong>Use CNC</strong> for: Structural testing, final material validation, and tight tolerances (+/- 0.01mm).</li>
        </ul>
      </>
    )
  },
  */
  {
    id: "blog-4",
    title: "The Founder's Guide to LinkedIn Growth",
    excerpt: "How to go from 0 to 5,000 meaningful connections in 90 days.",
    category: "Digital Marketing",
    date: "Nov 05, 2024",
    readTime: "12 min",
    author: "Heytt Satra",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p>In B2B, people buy from people. Your personal brand is your company's biggest asset. I spent the last quarter analyzing what works on LinkedIn, and the results were clear: Authenticity wins.</p>
        <h3>The 90-Day Sprint</h3>
        <p>Consistency is key. Posting 3x a week about your specific niche—sharing failures, not just wins—builds trust. We helped a SaaS founder grow their network by 400% simply by documenting their build-in-public journey.</p>
      </>
    )
  },
  {
    id: "blog-5",
    title: "AI Agents vs Chatbots",
    excerpt: "Why simple decision trees are dead and autonomous agents are the future.",
    category: "AI & Automation",
    date: "Nov 01, 2024",
    readTime: "9 min",
    author: "Heytt Satra",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p>Traditional chatbots are frustrating. They get stuck in loops. AI Agents, powered by LLMs like GPT-4 and frameworks like LangChain, can actually <em>do</em> things.</p>
        <h3>Action-Oriented AI</h3>
        <p>An agent doesn't just answer "What is the price?"; it can look up your inventory, calculate shipping, and draft an invoice. We are currently implementing agents that handle Tier-1 support tickets completely autonomously.</p>
      </>
    )
  },
  /* INDUSTRY 4.0 / MECHANICAL BLOG POST - COMMENTED OUT FOR FUTURE USE
  {
    id: "blog-6",
    title: "Predictive Maintenance: Saving ₹50L Annually",
    excerpt: "Using IoT sensors to predict machine failure before it happens.",
    category: "Industry 4.0",
    date: "Oct 20, 2024",
    readTime: "8 min",
    author: "Manas",
    imageUrl: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p>Downtime kills profitability. Predictive maintenance uses vibration and thermal sensors to detect anomalies in motors and bearings weeks before catastrophic failure.</p>
        <p>For a chemical plant client, avoiding a single unplanned shutdown saved them an estimated ₹50 Lakhs in lost production and emergency repair costs.</p>
      </>
    )
  },
    */
  /* FEA / MECHANICAL BLOG POST - COMMENTED OUT FOR FUTURE USE
  {
    id: "blog-7",
    title: "FEA Explained for Non-Engineers",
    excerpt: "Why we simulate stress tests digitally before cutting a single piece of metal.",
    category: "Engineering Analysis",
    date: "Oct 15, 2024",
    readTime: "10 min",
    author: "Manas",
    imageUrl: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p>Finite Element Analysis (FEA) is like a crystal ball for hardware. It tells us where a part will break under load. By optimizing designs digitally, we reduce material costs and weight without compromising safety.</p>
      </>
    )
  },
  */
  {
    id: "blog-8",
    title: "Case Study Videos That Convert",
    excerpt: "Our framework for B2B testimonials that feel authentic, not scripted.",
    category: "Content Marketing",
    date: "Nov 12, 2024",
    readTime: "11 min",
    author: "Heytt Satra",
    imageUrl: "https://images.unsplash.com/photo-1574717432724-27c967256f7d?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p>Text testimonials are good. Video is gold. But most corporate videos are boring. Our approach focuses on the "Hero's Journey" of the client—the problem they faced, the guide (us) they met, and the success they achieved.</p>
      </>
    )
  },
  {
    id: "blog-9",
    title: "The Hidden ROI of UI Design",
    excerpt: "How a simple interface tweak increased conversion rates by 127%.",
    category: "Business Strategy",
    date: "Oct 05, 2024",
    readTime: "9 min",
    author: "Heytt Satra",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p>Design isn't just about looking pretty; it's about function. By simplifying the checkout flow and adding clear trust signals, we helped a client more than double their conversion rate overnight.</p>
      </>
    )
  },
  {
    id: "blog-10",
    title: "Mumbai's Manufacturing Revolution 2025",
    excerpt: "Why this is the year SMEs must automate or risk irrelevance.",
    category: "Industry Trends",
    date: "Nov 18, 2024",
    readTime: "13 min",
    author: "Manas",
    imageUrl: "https://images.unsplash.com/photo-1565514020176-dbf2277e3c97?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p>With the China+1 strategy gaining momentum, Indian manufacturing is in the spotlight. But with rising labor costs in Maharashtra, automation is no longer optional—it's a survival requirement.</p>
      </>
    )
  }
];