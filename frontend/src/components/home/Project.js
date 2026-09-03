import React from "react";
import PropTypes from "prop-types";
import {
    SiPython,
    SiCplusplus,
    SiC,
    SiDjango,
    SiReact,
    SiScrapy,
    SiTensorflow,
    SiRaspberrypi,
    SiDropbox,
    SiOdoo,
    SiNvidia,
} from "react-icons/si";
import {
    FaSitemap,
    FaCubes,
    FaMicrochip,
    FaEye,
    FaBolt,
    FaAtom,
    FaDna,
    FaCube,
    FaBroadcastTower,
} from "react-icons/fa";
import "../../styles/home/Project.css";

// Maps a tech label to an icon. Brand icons where one exists, otherwise a
// generic icon that fits the concept. Every label used across the projects
// has an entry here.
const TECH_ICONS = {
    Python: SiPython,
    "Web Scraping": SiScrapy,
    Django: SiDjango,
    React: SiReact,
    Dropbox: SiDropbox,
    Odoo: SiOdoo,
    ERP: FaSitemap,
    C: SiC,
    "C++": SiCplusplus,
    ECS: FaCubes,
    Assembly: FaMicrochip,
    "TensorFlow Lite": SiTensorflow,
    YOLO11n: FaEye,
    "Raspberry Pi 5": SiRaspberrypi,
    JAX: FaBolt,
    MuJoCo: FaAtom,
    Evosax: FaDna,
    "3D Gaussian Splatting": FaCube,
    LiDAR: FaBroadcastTower,
    CUDA: SiNvidia,
};

const Project = ({ title, description, imageUrl, link, altText, tech, imageFit, onReadMore }) => {
    const paragraphs = description.split("\n").filter((line) => line.trim() !== "");
    const imageClass = imageFit ? `project-image--${imageFit}` : "";

    return (
        <div className="project-item">
            <div className="project-text">
                <h3>{title}</h3>
                {paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
                {tech && tech.length > 0 && (
                    <ul className="tech-list" aria-label="Tech stack">
                        {tech.map((item) => {
                            const Icon = TECH_ICONS[item];
                            return (
                                <li key={item} className="tech-tag">
                                    {Icon && <Icon className="tech-tag-icon" aria-hidden="true" />}
                                    <span>{item}</span>
                                </li>
                            );
                        })}
                    </ul>
                )}
                <button
                    type="button"
                    className="read-more-button"
                    onClick={onReadMore}
                >
                    Read more <span aria-hidden="true">&rarr;</span>
                </button>
            </div>
            <div className={`project-image ${imageClass}`}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <img src={imageUrl} alt={altText} />
                </a>
            </div>
        </div>
    );
};

Project.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string),
    imageFit: PropTypes.oneOf(["contain-light", "contain-dark"]),
    onReadMore: PropTypes.func.isRequired,
};

export default Project;
