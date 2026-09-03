import React from "react";
import "../../styles/home/ProjectPopup.css";

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

// Splits a line of text into plain strings and clickable links.
const linkify = (text) =>
    text.split(URL_PATTERN).map((part, index) =>
        /^https?:\/\//.test(part) ? (
            <a
                key={index}
                className="popup-inline-link"
                href={part}
                target="_blank"
                rel="noopener noreferrer"
            >
                {part}
            </a>
        ) : (
            part
        )
    );

const ProjectPopup = ({ project, isVisible, onClose }) => {
    if (!isVisible || !project) return null;

    const paragraphs = project.description
        .split("\n")
        .filter((line) => line.trim() !== "");

    return (
        <div className="popup-overlay show" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{project.title}</h2>
                <img src={project.imageUrl} alt={project.altText} />
                <div className="popup-description">
                    {paragraphs.map((paragraph, index) => (
                        <p key={index}>{linkify(paragraph)}</p>
                    ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Visit Project
                </a>
            </div>
        </div>
    );
};

export default ProjectPopup;
