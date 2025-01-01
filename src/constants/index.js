import { meta, 
    shopify, 
    starbucks, 
    sisenex, 
    kaseya,
    tesla, 
    image, 
    logo,
    imagegit1,
    imagegit2,
    snake1,
    snake2,
    ui1,
    ui2,
    ui3,
    ui4,
    ui5,
    face1,
    face2,
    face3,
    face4,
    face5,
    sleep1,
    sleep2,
    sleep3,
    mdsocial,
    panda1,
    panda2,
} from "../assets/images";

import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
    bootstrap,
    vuejs,
    aws,
    googlecloud,
    restapi,
    figma,
    mysql,
    postgresql,
    docker,
    jira,
    python,
    postman,
    jquery,
    linux,
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    },
    {
        imageUrl: bootstrap,
        name: "Bootstrap",
        type: "Frontend",
    },
    {
        imageUrl: vuejs,
        name: "Vue.js",
        type: "Frontend",
    },
    {
        imageUrl: aws,
        name: "AWS",
        type: "Frontend",
    },
    {
        imageUrl: googlecloud,
        name: "GoogleCloud",
        type: "Frontend",
    },
    {
        imageUrl: mysql,
        name: "Mysql",
        type: "Frontend",   
    },
    {
        imageUrl: postgresql,
        name: "Postgresql",
        type: "Frontend",
    },
    {
        imageUrl: restapi,
        name: "RestfulAPI",
        type: "Frontend",
    },
    {
        imageUrl: figma,
        name: "Figma",
        type: "Frontend",
    },
    {
        imageUrl: jira,
        name: "Jira",
        type: "Frontend",
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Frontend",
    },
    {
        imageUrl: docker,
        name: "Docker",
        type: "Frontend",
    },
    {
        imageUrl: postman,
        name: "Postman",
        type: "Frontend",
    },
    {
        imageUrl: jquery,
        name: "Jquery",
        type: "Frontend",
    },
    {
        imageUrl: linux,
        name: "Linux",
        type: "Frontend",
    },
];

export const experiences = [
   
        {
            title: "Frontend Engineer - DAP",
            company_name: "Kaseya",
            icon: kaseya,
            iconBg: "#FFF",
            date: "August 2024 - Present",
            points: [
              "Spearheaded the creation and optimization of WalkMe tutorials and guides for 40+ Kaseya applications, ensuring seamless user adoption and driving a 30% increase in customer engagement.",
              "Collaborated with stakeholders, product teams, QA engineers, and technical writers to align on product goals, delivering high-quality solutions within agile sprint cycles.",
              "Actively participated in daily stand-up meetings and sprint planning, contributing to team efficiency and ensuring alignment with project timelines.",
              "Managed tasks and tracked progress using JIRA, maintaining clear documentation and consistently meeting sprint deadlines.",
              "Refined user flows and addressed usability challenges, achieving a 25% improvement in user satisfaction based on feedback and metrics.",
              "Ensured quality and consistency by testing and iterating on solutions, reducing reported onboarding issues by 20%."
            ]
          },  
      {
        title: "React.js Developer",
        company_name: "LUMO",
        icon: sisenex,
        iconBg: "#accbe1",
        date: "August 2023 - Present",
        points: [
            "Interface Design: Implementing user-friendly interfaces for evaluators and room monitors, significantly enhancing user interaction and operational efficiency.",
            "Feature Implementation: Developing new screens and functionalities to support dynamic interactions during the event's oral presentation sessions..",
            "API Integration: Integrating both GraphQL and RESTful APIs to ensure seamless data synchronization across backend services." ,     
            "Debugging and Optimization: Identifying and resolving critical bugs, improving application stability and performance.  ", 
            ],
        },   
     
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/quelqu-un',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/laura-adler-silva/',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        img: [panda1,panda2],
        theme: 'btn-back-red',
        name: 'Digital Panda',
        description: 'Developed a fullstack e-commerce marketplace using Next.js 14, specializing in digital products. Key features included user authentication, admin dashboard, product verification, and secure payment processing with Stripe. Enhanced user experience with attractive landing and product pages using Tailwind CSS and custom artwork. Integrated MongoDB, tRPC, and Payload CMS, implemented email communications, and built a locally persisted shopping cart system. ',
        link: 'https://digitalpanda-a6fov09q1-laura-francines-projects.vercel.app/',
    },
    {
        iconUrl: threads,
        img: [sleep1, sleep2, sleep3],
        theme: 'btn-back-green',
        name: 'Sleepy Deep',
        description: 'Developed an IoT-based face authentication system, engineered a full-stack administrative dashboard for managing face authentication in workplace entry systems. Implemented real-time updates and system log visualizations, enhancing management and user experience. Developed secure face registration and verification processes using faceapi.js an AI for accurate identification  .',
        link: 'https://bit.ly/sleepyDeepApp',
    },
    {
        iconUrl: car,
        img: [  face1,face2,face3, face4,face5,],
        theme: 'btn-back-blue',
        name: 'Face Recognition AI',
        description: 'Developed an IoT-based face authentication system, engineered a full-stack administrative dashboard for managing face authentication in workplace entry systems. Implemented real-time updates and system log visualizations, enhancing management and user experience. Developed secure face registration and verification processes using faceapi.js an AI for accurate identification.',
        link: 'https://github.com/adrianhajdin/project_next13_car_showcase',
    },
    {
        iconUrl: snapgram,
        img: [imagegit1,imagegit2],
        theme: 'btn-back-pin',
        name: 'GitHub User Searcher',
        description: 'The GitHub User Searcher is a web application designed to allow users to search for GitHub profiles and view their repositories. The project leverages the power of React for building the user interface, TypeScript for type safety and better code maintainability, Tailwind CSS for styling, and the GitHub API for fetching user data..',
        link: 'https://github.com/adrianhajdin/social_media_app',
    },
    {
        iconUrl: estate,
        img: [ mdsocial,],
        theme: 'btn-back-black',
        name: 'Social Media',
        description: 'Developed a web application for real estate listings, facilitating property searches and connecting buyers with sellers.',
        link: 'https://github.com/adrianhajdin/projects_realestate',
    },
    {
        iconUrl: summiz,
        img: [snake1,snake2],
        theme: 'btn-back-yellow',
        name: 'Snake Game',
        description: 'The Snake Game is a classic arcade game recreated using modern web technologies. This project showcases your ability to implement game logic and create an engaging user interface using HTML, CSS, and JavaScript.',
        link: 'https://github.com/adrianhajdin/project_ai_summarizer',
    },
    {
        iconUrl: summiz,
        img: [ui1,ui2,ui3,ui4,ui5],
        theme: 'btn-back-yellow',
        name: 'Landing Page - UI/UX Design',
        description: 'The Travel Website is a beautifully designed and highly responsive web application created to inspire and assist travelers.',
        link: 'https://github.com/adrianhajdin/project_ai_summarizer',
    }
];