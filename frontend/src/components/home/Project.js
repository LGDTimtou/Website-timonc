import React from "react";
import PropTypes from "prop-types";
import {
    SiPython,
    SiCplusplus,
    SiC,
    SiTensorflow,
    SiRaspberrypi,
    SiDropbox,
    SiOdoo,
} from "react-icons/si";
import "../../styles/home/Project.css";

// Maps a tech label to a brand icon where one exists. Labels without an
// entry render as a plain text pill.
const TECH_ICONS = {
    Python: SiPython,
    "C++17": SiCplusplus,
    C11: SiC,
    "TensorFlow Lite": SiTensorflow,
    "Raspberry Pi 5": SiRaspberrypi,
    Dropbox: SiDropbox,
    Odoo: SiOdoo,
};

const Project = ({ title, description, imageUrl, link, altText, tech, onReadMore }) => {
    const paragraphs = description.split("\n").filter((line) => line.trim() !== "");

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
            <div className="project-image">
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
    onReadMore: PropTypes.func.isRequired,
};

export default Project;
