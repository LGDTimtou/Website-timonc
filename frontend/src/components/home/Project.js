import React from "react";
import PropTypes from "prop-types";
import "../../styles/home/Project.css";

const Project = ({ title, description, imageUrl, link, altText, onReadMore }) => {
    const paragraphs = description.split("\n").filter((line) => line.trim() !== "");

    return (
        <div className="project-item">
            <div className="project-text">
                <h3>{title}</h3>
                {paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
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
    onReadMore: PropTypes.func.isRequired,
};

export default Project;
