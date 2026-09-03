import React, { useState } from "react";
import "../../styles/home/Contact.css";
import { FaPhone, FaLinkedin, FaEnvelope, FaRegCopy, FaCheck } from "react-icons/fa";

const EMAIL = "coucketimon@gmail.com";

const legacyCopy = (text) => {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    if (!ok) throw new Error("execCommand copy failed");
};

const copyToClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return;
        } catch {
            // fall through to the legacy path
        }
    }
    legacyCopy(text);
};

const Contact = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            await copyToClipboard(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // If copying fails, the mailto link on the row still works.
        }
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2>Contact Me</h2>
                <div className="contact-list">
                    <a href="tel:+32478760103" className="contact-item" aria-label="Call Timon Coucke">
                        <FaPhone className="contact-icon" />
                        <span>Call me</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/timon-coucke-155ab61a3/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-item"
                    >
                        <FaLinkedin className="contact-icon" />
                        <span>Timon Coucke</span>
                    </a>
                    <div className="contact-item contact-item-email">
                        <a href={`mailto:${EMAIL}`} className="contact-email-link">
                            <FaEnvelope className="contact-icon" />
                            <span>{EMAIL}</span>
                        </a>
                        <button
                            type="button"
                            className={`contact-copy ${copied ? "is-copied" : ""}`}
                            onClick={handleCopy}
                            aria-label={copied ? "Email address copied" : "Copy email address"}
                        >
                            {copied ? <FaCheck /> : <FaRegCopy />}
                            <span className="contact-copy-label">{copied ? "Copied!" : "Copy"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
