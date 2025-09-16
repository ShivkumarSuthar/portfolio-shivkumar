import { GitHub, LinkedIn, Facebook, Instagram, Code, Description, Language } from '@mui/icons-material';

export const data = {
  'profile__image': '/images/about.jpg',
  socialLinks: [
  // Development & Code Platforms
  {
    label: 'GitHub',
    icon: 'GitHub', // MUI icon name
    url: 'https://github.com/ShivkumarSuthar',
    group: 'group-1',
  },
  {
    label: 'LeetCode',
    icon: 'Code',
    url: 'https://leetcode.com/yourprofile',
    group: 'group-1',
  },

  // Professional Links
  {
    label: 'LinkedIn',
    icon: 'LinkedIn',
    url: 'https://www.linkedin.com/in/shivkumar-suthar',
    group: 'group-2',
  },
  {
    label: 'Download Resume',
    icon: 'Description',
    url: '/files/ShivkumarSuthar_Resume.pdf', 
    group: 'group-3',
  },

  // Social Media
  // {
  //   label: 'Facebook',
  //   icon: 'Facebook',
  //   url: 'https://www.facebook.com/shivkumar.suthar.165',
  //   group: 'group-2',
  // },
  // {
  //   label: 'Instagram',
  //   icon: 'Instagram',
  //   url: 'https://instagram.com/yourprofile',
  //   group: 'group-2',
  // },
],

  "skills": {
    "Front-end": [
      "HTML",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue",
      "GSAP",
      "Three.js",
      "Optimized Accordion (on-demand rendering)"
    ],
    "Styles": [
      "CSS",
      "SASS",
      "Tailwind",
      "Bootstrap",
      "Material UI"
    ],
    "Programming Languages": [
      "Java",
      "PHP",
      "C",
      "Node.js"
    ],
    "Design": [
      "Figma",
      "Adobe Illustrator",
      "Adobe XD"
    ],
    "Tools": [
      "Postman",
      "Git",
      "GitHub",
      "Fork (Git GUI Client)"
    ],
    "Databases": [
      "MySQL",
      "MongoDB"
    ],
    "Deployment": [
      "Vercel",
      "Netlify",
      "Custom Hosting (cPanel / FTP)"
    ]
  },
  "experience": {
    "total": "2 years 7 months",
    "jobs": [
      {
        "duration": "2024 - Present",
        "period": "Since May 2024",
        "company": "Dev Technosys Pvt Ltd.",
        "role": "MERN Stack Developer",
        "tech": "MongoDB, Express, React, Node.js"
      },
      {
        "duration": "2024",
        "period": "Jan 2024 - May 2024",
        "company": "Rams Creative Technologies Pvt. Ltd.",
        "role": "Frontend Developer",
        "tech": "Vue, JavaScript"
      },
      {
        "duration": "2022 - 2024",
        "period": "1 year 3 months",
        "company": "Viseven India Pvt. Ltd.",
        "role": "Content Developer",
        "tech": "eWizard, Vue, Git"
      }
    ]
  },
  projects: [
    {
      title: "CarDekho Clone",
      description: "A car listing and search platform with filtering, sorting, and modern UI.",
      tech: ["Next.js", "MongoDB", "Bootstrap"],
      liveLink: "https://car-dekhlo.vercel.app/",
      githubLink: "https://github.com/yourusername/car-dekhlo",
      'image': '/images/cardekho.jpg',
    },
    {
      title: "GymHouse",
      description: "A modern gym website with responsive design and feature-rich pages.",
      tech: ["React", "Bootstrap"],
      liveLink: "https://house-gym.vercel.app/",
      githubLink: "https://github.com/yourusername/house-gym",
      'image': '/images/gymhouse.jpg',
    }, {
      title: "DAP Solutions Website",
      description: "A professional IT agency website built to showcase services, team, and projects. Responsive, fast, and visually modern.",
      tech: ["Next.js", "Bootstrap", "React Icons"],
      liveLink: "http://dapsolutions.in/",
      githubLink: "",
      'image': "/images/dap-solutions.jpg"
    },
    {
      title: 'Foliary – Portfolio CMS',
      description: 'A dynamic portfolio admin dashboard to manage projects, experience, skills, and blog using MERN stack.',
      image: '/images/foliary-dashboard.jpg',
      github: 'https://github.com/yourname/foliary-admin',
      live: 'https://admin.foliary.dev',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'MUI'],
    },

  ],
  PROJECT_CAROUSEL: [
    {
      id: 1,
      title: "Kafka + Golang Microservice",
      'image': '/images/img.jpg',
      description:
        "A simple microservice architecture using Kafka, Golang, and Docker for scalable event-driven processing.",
      // image: "/images/projects/kafka-golang.jpg",
      link: "https://yourprojectlink.com",
      techStack: ["Kafka", "Golang", "Docker"],
    },
    {
      id: 2,
      title: "Portfolio Website",
      'image': '/images/img.jpg',
      description:
        "A personal portfolio built with Next.js to showcase my skills, experience, and projects.",
      // image: "/images/projects/portfolio.jpg",
      link: "https://yourportfolio.com",
      techStack: ["Next.js", "React", "Framer Motion"],
    },
    {
      id: 3,
      title: "E-commerce Landing Page",
      'image': '/images/img.jpg',
      description:
        "A modern landing page for an e-commerce platform built with HTML, CSS, and Bootstrap.",
      // image: "/images/projects/ecommerce.jpg",
      link: "https://example.com",
      techStack: ["HTML", "CSS", "Bootstrap"],
    },
    {
      id: 4,
      title: "E-commerce Landing Page",
      'image': '/images/img.jpg',
      description:
        "A modern landing page for an e-commerce platform built with HTML, CSS, and Bootstrap.",
      // image: "/images/projects/ecommerce.jpg",
      link: "https://example.com",
      techStack: ["HTML", "CSS", "Bootstrap"],
    },
  ]
}
