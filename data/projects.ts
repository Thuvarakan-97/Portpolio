
type Project = {
  name: string;
  description: string;
  period: string;
  technologies: string[];
  images: string[];
  link?: string;
};

export const projects: Project[] = [
  
  {
    name: "Customer Portal Project",
    description:
      "Developed a portal for managing customer profiles, shipments, and transactions for a shipping company, with a focus on seamless user experience and data management.",
    period: "2024",
    technologies: ["Next.js", "Redux", "PHP", "MySQL", "Next UI", "REST APIs"],
    images: ["/images/customer-portel.png"],
    link: "https://github.com/Thuvarakan-97/customer-portel", 
  },
  {
    name: "Moura E-Learning Project",
    description:
      "An e-learning platform with 8 modules including admin, student, institute, guardian, sponsor, chat, and social media features, designed to facilitate online education.",
    period: "2023",
    technologies: ["Next.js", "TypeScript", "Laravel"],
    images: ["/images/moura.png"],
    link: "https://github.com/yourusername/moura-elearning", 
  },
  {
    name: "Bakery Management Project",
    description:
      "A sophisticated bakery product delivery management system built as a real-time mobile application, streamlining order processing and delivery workflows.",
    period: "2021",
    technologies: ["Flutter", "Firebase"],
    images: ["/images/bakery.jpeg"],
    link: "https://github.com/Thuvarakan-97/Royal-bakery", 
  },
  {
    name: "DIGA – Mobile Application",
    description:
      "DIGA (Digitale Gesundheitsanwendung) is a mobile application developed as a university final-year project. It provides a user-friendly mobile experience with a responsive interface and Firebase integration for backend services and data management.",
    period: "University Final-Year Project",
    technologies: ["Flutter", "Dart", "Firebase"],
    images: ["/images/diga1.jpeg", "/images/diga2.jpeg"],
  },
];