export interface TeamMember {
    name: string;
    role: string;
    photo: string;
    funFact: string;
    linkedinUrl: string;
}

export const team: TeamMember[] = [
    {
        name: "Arjun Mehta",
        role: "Founder & CEO",
        photo: "/team/arjun.jpg",
        funFact: "Wrote his first line of code at age 12",
        linkedinUrl: "https://linkedin.com",
    },
    {
        name: "Priya Sharma",
        role: "Head of Design",
        photo: "/team/priya.jpg",
        funFact: "Obsessed with Swiss typography and matcha",
        linkedinUrl: "https://linkedin.com",
    },
    {
        name: "Rohan Patel",
        role: "Lead Engineer",
        photo: "/team/rohan.jpg",
        funFact: "Has deployed on every major cloud provider",
        linkedinUrl: "https://linkedin.com",
    },
    {
        name: "Sara Khan",
        role: "AI & Automation Lead",
        photo: "/team/sara.jpg",
        funFact: "Built her first chatbot before ChatGPT existed",
        linkedinUrl: "https://linkedin.com",
    },
];
