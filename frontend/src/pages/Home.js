import React, {useEffect, useRef, useState} from "react";
import "../styles/home/Home.css";
import profilePicture from "../assets/images/portret.jpg";
import renoperfectPicture from "../assets/images/renoperfect.jpg";
import customEnchantsPicture from "../assets/images/custom_enchants.png";
import somkoPicture from "../assets/images/odoo.png";
import brittleStarPicture from "../assets/images/brittle_star.webp";
import spgPicture from "../assets/images/spg_emulator.gif";
import tinyMlPicture from "../assets/images/tiny_ml.gif";
import Project from "../components/home/Project";
import Header from "../components/home/HomeHeader";
import Footer from "../components/Footer";
import ProjectPopup from "../components/home/ProjectPopup";
import Contact from "../components/home/Contact";

const projects = {
    renoperfect: {
        title: "Full Stack Application: RenoPerfect",
        short_description:
            "Allows employees to access their daily assigned projects, view essential details, log work hours, upload progress photos... \nAll data automatically gets synced with the company’s database and Dropbox.",
        description:
            "Its a custom-built full-stack web application designed to optimize project management for RenoPerfect, a construction company. The platform connects the company’s database with an API, allowing employees to easily access their daily project assignments, review key information (such as required materials, images, and mandates), and log their work hours and used materials. \n\nAt the end of each workday, employees can upload photos of their completed work, which are automatically stored in the company’s Dropbox, ensuring organized and secure documentation. Additionally, via web scraping it extracts relevant work orders from insurance companies, integrating them directly into the database—eliminating the need for manual input.",
        imageUrl: renoperfectPicture,
        link: "https://renoperfect.be",
        altText: "RenoPerfect",
    },
    somko: {
        title: "Odoo ERP: Internship Somko",
        short_description:
            "Upgraded Somko’s internal Odoo ERP by developing a custom client portal for ticket management and a backend sprint system for project managers.",
        description:
            "Developed a custom extension for the Odoo ERP system to bridge the communication gap between clients and project managers. I designed and implemented a dedicated client platform that allows users to create tickets with specific parameters and interact via a chat system.\n\nI developed a sprint-based management module and enhanced backend overviews. This gives project managers deeper insights into development speed and deadline accuracy, transforming the standard ticketing process into a better project management tool.",
        imageUrl: somkoPicture,
        link: "https://somko.be",
        altText: "Somko Odoo ERP Development",
    },
    spg_emulator: {
        title: "Low-Level Game Engine & CPU Emulator",
        short_description: 
            "A platform-independent game engine and 16-bit CPU emulator built in C11 and C++17, featuring a custom Entity Component System (ECS) and assembly-driven AI.",
        description: 
            "Developed as a systems programming project at Ghent University, this application consists of a puzzle game ('spg') powered by a custom-built hardware emulator. \n\nIn the first phase, I implemented a data-driven Entity System Framework in C11 to manage game logic, collisions, and a level editor. The second phase involved engineering a 16-bit Big-Endian CPU emulator in C++17, complete with a virtual bus, memory-mapped I/O, and a custom instruction set. This allowed 'car-brain' AI to be written in assembly and executed by the emulated CPU. The project required strict memory management, cross-platform compatibility between Ubuntu and Raspberry Pi (ARM), and bit-level data manipulation for custom binary formats.",
        imageUrl: spgPicture,
        link: "/files/spg_emulator.pdf",
        altText: "C++ CPU Emulator and ECS Game Engine",
    },
    tiny_ml: {
        title: "TinyML: Low-Power Person Detection",
        short_description:
            "Developed a lightweight, real-time person detection system for UAVs using optimized TinyML models to enhance search and rescue operational time.",
        description:
            "This project addresses the energy constraints of search and rescue (SAR) drones by deploying on-device inference to eliminate the need for power-hungry live video streaming. \n\nWe evaluated several state-of-the-art models (YOLO, FOMO, MobileNet-SSD, and EfficientDet), ultimately selecting and fine-tuning YOLO11n for its great balance of accuracy and latency. \n\nUsing TensorFlow Lite, we implemented post-training quantization (int8 and float16) to reduce model size by up to 75% while maintaining high detection precision. The system was benchmarked on Raspberry Pi 5 hardware, simulating a solar-powered UAV environment where we analyzed the trade-offs between CPU thermal output, energy consumption, and real-time inference speed.",
        imageUrl: tinyMlPicture,
        link: "/files/tiny_ml_project.pdf", 
        altText: "UAV Person Detection on Edge Hardware",
    },
    brittleStarRL: {
        title: "Reinforcement Learning Research: Brittle Star Locomotion",
        short_description:
            "A bio-inspired robotics study using Open Evolution Strategies (OpenES) to train an ANN-controlled brittle star for efficient, decentralized locomotion in MuJoCo.",
        description:
            "This research explores the intersection of evolutionary biology and reinforcement learning by simulating a brittle star’s decentralized movement. Using the MuJoCo physics engine and the Evosax framework, I developed a neural network controller trained via Open Evolution Strategies (OpenES). \n\nThe project involved designing custom reward structures for both 'Origin Avoidance' and 'Target Pursuit' tasks. By implementing energy-aware fitness functions, the simulation achieved an 8% increase in movement efficiency and more naturalistic biomechanical trajectories. The system features a modular architecture, allowing for flexible morphological configurations and detailed analysis of limb coordination (in-plane vs. out-of-plane) through custom visualization and plotting tools.",
        imageUrl: brittleStarPicture,
        link: "/files/brittle_star_research.pdf",
        altText: "Reinforcement Learning Brittle Star Simulation",
    },
    custom_enchants: {
        title: "Minecraft Plugin:⚡Custom Enchants⚡",
        short_description:
            "Allows server owners to create custom enchantments functioning just like vanilla enchantments. With an intuitive online enchantment builder, players can design new enchantments effortlessly. \nIncludes a variety of pre-built custom enchantments!",
        description:
            "Allows server owners to create custom enchantments functioning just like vanilla enchantments. \n\nUnlike other plugins that require complex configuration files, this plugin offers an easy-to-use online enchantment builder, making enchantment creation as simple as possible. \n\nWith just a few clicks, players can define enchantment triggers, effects, and mechanics that work exactly like standard Minecraft enchantments. \n\nThe plugin also comes with a large selection of pre-configured custom enchantments, ready to be used immediately on any server. \n\nKey Features: \n✅ Intuitive Online Enchantment Builder \n✅ Works with anvils, enchanting tables, books... \n✅ Pre-Built Custom Enchants \n✅ Server-Friendly & Optimized \n\nWhether you're looking to enhance your Minecraft survival experience, add exciting features to your SMP, or give server owners more creative control, Custom Enchants provides a high level of customization and ease of use! ⚡",
        imageUrl: customEnchantsPicture,
        link: "https://timonc.be/custom_enchants",
        altText: "CustomEnchants",
    },
};

const Home = () => {
    const [isIntroVisible, setIsIntroVisible] = useState(true);
    const [projectsVisible, setProjectsVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const projectsRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsIntroVisible(false);
        }, 2300);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isIntroVisible) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setProjectsVisible(true);
                    }
                },
                {threshold: 0.05, rootMargin: "0px 0px 120px 0px"}
            );

            if (projectsRef.current) {
                observer.observe(projectsRef.current);
            }

            return () => observer.disconnect();
        }
    }, [isIntroVisible]);

    const openPopup = (project) => {
        setSelectedProject(project);
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        setSelectedProject(null);
    };

    return (
        <>
            {isIntroVisible && (
                <div className="intro-screen">
                    <h1 className="intro-title-name">Timon Coucke</h1>
                    <h1 className="intro-title-port">Portfolio</h1>
                </div>
            )}
            {!isIntroVisible && (
                <div className="homepage">
                    <Header/>
                    <section id="about" className="about">
                        <div className="about-container">
                            <div className="about-text">
                                <h2>About Me</h2>
                                <p>
                                    Hello! I'm <strong>Timon Coucke</strong>, a graduating Master of Computer Science and Engineering
                                    student at <strong>Ghent University</strong> and a freelance software engineer.
                                </p>
                                <p>
                                    I'm passionate about automating and optimizing processes. By building custom software and integrating the right tools, I help companies operate more efficiently and save time.
                                </p>
                                <p>
                                    In my free time, I love modding for a
                                    variety of games, combining my technical skills with
                                    creativity.
                                </p>
                            </div>
                            <div className="about-image">
                                <img src={profilePicture} alt="Timon Coucke"/>
                            </div>
                        </div>
                    </section>

                    <div className="divider"></div>

                    <section
                        id="projects"
                        className={`projects ${projectsVisible ? "fade-in" : ""}`}
                        ref={projectsRef}
                    >
                        <div className="container">
                            <h2>Projects</h2>
                            <div className="project-list">
                                {Object.entries(projects).map(([key, project]) => (
                                    <Project
                                        key={key}
                                        title={project.title}
                                        description={project.short_description}
                                        imageUrl={project.imageUrl}
                                        link={project.link}
                                        altText={project.altText}
                                        onReadMore={() => openPopup(project)}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="divider"></div>

                    <Contact/>

                    <ProjectPopup
                        project={selectedProject}
                        isVisible={isPopupVisible}
                        onClose={closePopup}
                    />

                    <Footer/>
                </div>
            )}
        </>
    );
};

export default Home;