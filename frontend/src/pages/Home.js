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
        title: "RenoPerfect — Full-Stack Web App",
        short_description:
            "A full-stack web app I built for a construction company. Workers use it to see the jobs assigned to them each day, log their hours and materials, and upload photos from site. Everything syncs to the company's database and Dropbox.",
        description:
            "RenoPerfect is a construction company that was managing its daily work with paperwork and phone calls. I built a web app to replace that.\n\nEmployees log in to see the jobs assigned to them for the day, along with the materials, reference images and mandates for each one. They record their worked hours and used materials directly in the app, and upload photos of finished work at the end of the day. Those photos are saved to the company's Dropbox, sorted per project.\n\nThe app also runs a scraper that reads incoming work orders from insurance companies and adds them to the database automatically, so nobody has to type them in.",
        imageUrl: renoperfectPicture,
        link: "https://renoperfect.be",
        altText: "RenoPerfect field operations platform",
        tech: ["Full-Stack", "REST API", "Web Scraping", "Dropbox"],
    },
    somko: {
        title: "Odoo ERP Internship — Somko",
        short_description:
            "My internship project: a custom extension for Somko's Odoo ERP. It adds a portal where clients can open and follow up on support tickets, plus a sprint-planning module and dashboards for the project managers.",
        description:
            "This was my internship project at Somko. They use Odoo as their ERP, and I built a custom extension for it.\n\nThe main part is a client portal: customers can open support tickets with structured fields and follow up through a chat, instead of sending loose emails. On the internal side, I added a module for planning work in sprints and some extra dashboards, so project managers can see how fast work is moving and whether deadlines are being met.",
        imageUrl: somkoPicture,
        link: "https://somko.be",
        altText: "Somko Odoo ERP client portal",
        tech: ["Odoo", "Python", "ERP"],
        imageContain: true,
    },
    spg_emulator: {
        title: "Game Engine & 16-bit CPU Emulator",
        short_description:
            "A university project with two parts: a small puzzle game with its own engine, and a 16-bit CPU emulator I wrote from scratch. Game objects use a custom entity-component system, and the in-game AI runs as assembly code on the emulated CPU.",
        description:
            "This was a systems-programming project at Ghent University, split into two parts.\n\nThe first part is a game engine built around a data-driven entity-component system in C11. It handles game logic, collision detection and a level editor for a small puzzle game.\n\nThe second part is a 16-bit big-endian CPU emulator written in C++17, with a virtual bus, memory-mapped I/O and its own instruction set. The vehicle AI in the game is written in assembly and executed by this emulated CPU. Most of the work went into manual memory management, reading and writing custom binary formats at the bit level, and keeping everything running on both Ubuntu and a Raspberry Pi.",
        imageUrl: spgPicture,
        link: "/files/spg_emulator.pdf",
        altText: "C++ CPU emulator and ECS game engine",
        tech: ["C11", "C++17", "ECS", "Assembly"],
    },
    tiny_ml: {
        title: "TinyML: On-Device Person Detection for Drones",
        short_description:
            "A person-detection model that runs on a drone's own hardware instead of streaming video to a server, which saves power on search-and-rescue flights. We compared several models and used quantization to shrink the chosen one by up to 75%.",
        description:
            "Search-and-rescue drones spend a lot of their battery streaming live video back to an operator. The idea here was to run the detection on the drone itself, so it only needs to send something when it actually spots a person.\n\nWe tested several detection models (YOLO, FOMO, MobileNet-SSD, EfficientDet) and picked YOLO11n for its balance of accuracy and speed. Using TensorFlow Lite, we applied post-training quantization (int8 and float16), which reduced the model size by up to 75% with only a small drop in accuracy.\n\nWe ran the benchmarks on a Raspberry Pi 5 as a stand-in for a solar-powered drone, and looked at how CPU temperature, power draw and inference speed trade off against each other.",
        imageUrl: tinyMlPicture,
        link: "/files/tiny_ml_project.pdf",
        altText: "On-device person detection on drone hardware",
        tech: ["Python", "TensorFlow Lite", "YOLO11n", "Raspberry Pi 5"],
    },
    brittleStarRL: {
        title: "Reinforcement Learning: Brittle-Star Locomotion",
        short_description:
            "A research project where a simulated brittle star learns to move using evolutionary reinforcement learning, rather than hand-written control. Adding an energy cost to the reward made its movement about 8% more efficient and more natural-looking.",
        description:
            "A brittle star moves its arms without a central brain coordinating them. This project looked at whether that kind of decentralized movement can be learned instead of programmed by hand.\n\nI used the MuJoCo physics engine and the Evosax library to train a neural-network controller with Open Evolution Strategies. I set up two tasks, \"Origin Avoidance\" and \"Target Pursuit\", and added an energy term to the reward function. That made the learned movement about 8% more efficient and closer to how a real brittle star moves.\n\nThe setup is modular, so different body shapes can be tried, and it includes tools for plotting how the arms coordinate (in-plane versus out-of-plane movement).",
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
                                    Outside of work I like keeping up with new developer tools and AI
                                    integrations, usually by wiring them into a small side project to
                                    see what they are actually good for.
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