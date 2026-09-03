import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "../../styles/home/HomeHeader.css";

const GITHUB_URL = "https://github.com/LGDTimtou";
const LINKEDIN_URL = "https://www.linkedin.com/in/timon-coucke-155ab61a3/";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuWrapperRef = useRef(null);
    const menuToggleRef = useRef(null);
    const mobileGithubRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (!isMenuOpen) {
                return;
            }

            const clickedInsideMenu = menuWrapperRef.current?.contains(event.target);
            const clickedToggle = menuToggleRef.current?.contains(event.target);
            const clickedGithub = mobileGithubRef.current?.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle && !clickedGithub) {
                closeMenu();
            }
        };

        const handleScroll = () => {
            if (isMenuOpen) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleDocumentClick);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMenuOpen]);

    return (
        <header className="home-header">
            <div className="home-header-container">
                <div className="home-header-left">
                    <h1 className="name">Timon Coucke</h1>
                    <p className="tagline"><strong>
                        <span className="tagline-line">Backend Engineer @ Lighthouse</span>
                        <span className="tagline-separator"> | </span>
                        <span className="tagline-line">MSc Computer Science &amp; Engineering,{" "}
                            <a className="base-url" href="https://www.ugent.be/en" target="_blank" rel="noopener noreferrer">
                            UGent
                            </a>
                        </span>
                    </strong>
                    </p>
                </div>
                <div className="mobile-actions">
                    <a
                        className="mobile-social-link"
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin className="github-icon" />
                    </a>
                    <a
                        ref={mobileGithubRef}
                        className="mobile-github-link"
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub className="github-icon" />
                    </a>
                    <button
                        ref={menuToggleRef}
                        className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                        type="button"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <nav ref={menuWrapperRef} className={`home-header-right ${isMenuOpen ? "open" : ""}`}>
                    <ul className="nav-links">
                        <li><a href="#about" onClick={closeMenu}>About</a></li>
                        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
                        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
                        <li className="social-links">
                            <a
                                href={LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                onClick={closeMenu}
                            >
                                <FaLinkedin className="github-icon" />
                            </a>
                            <a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                onClick={closeMenu}
                            >
                                <FaGithub className="github-icon" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;