import React, {useEffect, useRef, useState} from "react";
import "../styles/home/Home.css";
import profilePicture from "../assets/images/portret.jpg";
import renoperfectPicture from "../assets/images/renoperfect.jpg";
import customEnchantsPicture from "../assets/images/custom_enchants.png";
import somkoPicture from "../assets/images/odoo.png";
import brittleStarPicture from "../assets/images/brittle_star.png";
import spgPicture from "../assets/images/spg_emulator.gif";
import tinyMlPicture from "../assets/images/tiny_ml.gif";
import Project from "../components/home/Project";
import Header from "../components/home/HomeHeader";
import Footer from "../components/Footer";
import ProjectPopup from "../components/home/ProjectPopup";
import Contact from "../components/home/Contact";

const projects = {
    renoperfect: {
        title: "RenoPerfect — Full-Stack Field Platform",
        short_description:
            "A full-stack platform that runs the daily operations of a construction company. Crews pull up their assignments, log hours and materials, and upload progress photos from the job site — all synced straight into the company database and Dropbox.",
        description:
            "RenoPerfect replaced the paperwork and phone calls a growing construction company was running on. Through an API tied to the company database, employees open their daily assignments with everything they need in one place — required materials, reference images, and mandates — and log their worked hours and used materials on the spot.\n\nAt the end of each day, progress photos uploaded from the field land automatically in the company's Dropbox, organized per project. A web-scraping pipeline also pulls work orders from insurance companies straight into the database, removing an entire category of manual data entry.",
        imageUrl: renoperfectPicture,
        link: "https://renoperfect.be",
        altText: "RenoPerfect field operations platform",
        tech: ["Full-Stack", "REST API", "Web Scraping", "Dropbox"],
    },
    somko: {
        title: "Odoo ERP Internship — Somko",
        short_description:
            "Extended Somko's Odoo ERP with a client-facing portal for support tickets and a sprint-planning module for project managers — turning a plain ticket list into a real project-management workflow.",
        description:
            "During my internship at Somko I built a custom Odoo extension to close the gap between clients and the project managers delivering their work. Clients got a dedicated portal where they raise tickets with structured details and follow up through a built-in chat, instead of scattered emails.\n\nOn the internal side, I added a sprint-based planning module and richer management dashboards, giving project managers a clear read on delivery speed and how reliably deadlines are being met.",
        imageUrl: somkoPicture,
        link: "https://somko.be",
        altText: "Somko Odoo ERP client portal",
        tech: ["Odoo", "Python", "ERP"],
        imageContain: true,
    },
    spg_emulator: {
        title: "Game Engine & 16-bit CPU Emulator",
        short_description:
            "A platform-independent game engine paired with a from-scratch 16-bit CPU emulator, written in C11 and C++17. Game objects run on a custom Entity Component System, and the in-game AI is real assembly executed by the emulated processor.",
        description:
            "Built as a systems-programming project at Ghent University, this is a puzzle game running on top of a hardware emulator I designed myself. The first half is a data-driven Entity Component System in C11 that handles game logic, collision, and a level editor.\n\nThe second half is a 16-bit big-endian CPU emulator in C++17 — virtual bus, memory-mapped I/O, and a custom instruction set — so the vehicles' \"car-brain\" AI could be written in assembly and run by the emulated CPU. The work leaned heavily on careful manual memory management, bit-level handling of custom binary formats, and staying portable across Ubuntu and ARM Raspberry Pi.",
        imageUrl: spgPicture,
        link: "/files/spg_emulator.pdf",
        altText: "C++ CPU emulator and ECS game engine",
        tech: ["C11", "C++17", "ECS", "Assembly"],
    },
    tiny_ml: {
        title: "TinyML: On-Device Person Detection for Drones",
        short_description:
            "A real-time person-detection system that runs entirely on a drone's onboard hardware, so search-and-rescue flights don't have to burn power streaming live video. Quantized models cut size by up to 75% with little accuracy lost.",
        description:
            "Search-and-rescue drones lose most of their flight time to power-hungry video streaming. This project moves detection on-device so the drone only reports what matters. We benchmarked YOLO, FOMO, MobileNet-SSD and EfficientDet, then fine-tuned YOLO11n for the best balance of accuracy and latency.\n\nWith TensorFlow Lite, post-training quantization (int8 and float16) shrank the model by up to 75% while keeping detection precision high. Everything was measured on Raspberry Pi 5 hardware standing in for a solar-powered UAV, weighing the trade-offs between CPU heat, energy draw, and inference speed.",
        imageUrl: tinyMlPicture,
        link: "/files/tiny_ml_project.pdf",
        altText: "On-device person detection on drone hardware",
        tech: ["Python", "TensorFlow Lite", "YOLO11n", "Raspberry Pi 5"],
    },
    brittleStarRL: {
        title: "Reinforcement Learning: Brittle-Star Locomotion",
        short_description:
            "A research project that trains a simulated brittle star to crawl using evolutionary reinforcement learning instead of hand-coded control. Energy-aware rewards produced 8% more efficient and noticeably more lifelike movement.",
        description:
            "This study sits between evolutionary biology and reinforcement learning: can a brittle star's decentralized movement, which has no central brain, be learned rather than hand-coded? Using the MuJoCo physics engine and the Evosax framework, I trained a neural-network controller with Open Evolution Strategies (OpenES).\n\nI designed custom reward structures for two tasks — \"Origin Avoidance\" and \"Target Pursuit\" — with energy-aware fitness functions that pushed the simulation to 8% more efficient movement and more natural biomechanical trajectories. The architecture is modular, so different body morphologies can be swapped in and limb coordination (in-plane vs. out-of-plane) studied with custom visualization tools.",
        imageUrl: brittleStarPicture,
        link: "/files/brittle_star_research.pdf",
        altText: "Reinforcement learning brittle star simulation",
        tech: ["Python", "JAX", "MuJoCo", "Evosax"],
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
        hidden: true,
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
        }, 1800);

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
                    <section className="hero">
                        <div className="hero-inner">
                            <p className="hero-eyebrow">Software Developer &middot; Ghent, Belgium</p>
                            <h1 className="hero-title">
                                I build software that automates the busywork.
                            </h1>
                            <p className="hero-subtitle">
                                Backend Engineer at Lighthouse in Ghent, and a Master of Computer
                                Science &amp; Engineering from Ghent University &mdash; building software
                                that turns manual processes into reliable tools.
                            </p>
                            <div className="hero-actions">
                                <a href="#projects" className="hero-btn hero-btn-primary">View my work</a>
                                <a href="#contact" className="hero-btn hero-btn-ghost">Get in touch</a>
                            </div>
                        </div>
                    </section>

                    <div className="divider"></div>

                    <section id="about" className="about">
                        <div className="about-container">
                            <div className="about-text">
                                <h2>About Me</h2>
                                <p>
                                    Hello! I'm <strong>Timon Coucke</strong>, a <strong>Backend Engineer at Lighthouse</strong> in
                                    Ghent. I hold a Master's degree in Computer Science and Engineering from <strong>Ghent University</strong>.
                                </p>
                                <p>
                                    I'm passionate about automating and optimizing processes. By building custom software and integrating the right tools, I help teams operate more efficiently and save time.
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
                                {Object.entries(projects)
                                    .filter(([, project]) => !project.hidden)
                                    .map(([key, project]) => (
                                        <Project
                                            key={key}
                                            title={project.title}
                                            description={project.short_description}
                                            imageUrl={project.imageUrl}
                                            link={project.link}
                                            altText={project.altText}
                                            tech={project.tech}
                                            imageContain={project.imageContain}
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