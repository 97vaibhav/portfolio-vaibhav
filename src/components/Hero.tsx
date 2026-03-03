import { motion } from 'framer-motion';
import { Github, Mail, Linkedin, Twitter } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            {/* Animated background orbs */}
            <div className="hero-bg">
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="hero-orb hero-orb-3" />
            </div>

            <div className="container hero-content">
                <motion.div
                    className="hero-card glass"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Profile Image */}
                    <motion.div
                        className="profile-wrapper"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="profile-ring">
                            <img
                                src="/images/profile.jpg"
                                alt="Vaibhav Gupta"
                                className="profile-image"
                            />
                        </div>
                        <div className="status-dot" title="Available for opportunities" />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <div className="hero-tag">
                            <span className="hero-tag-dot" />
                            Tokyo, Japan · Open to Work
                        </div>
                        <h1 className="hero-name">Vaibhav Gupta</h1>
                        <h2 className="hero-title">Backend Engineer &amp; Technical Speaker</h2>
                        <p className="hero-description">
                            I'm a Tokyo-based Backend Engineer specializing in <strong>Golang</strong>, <strong>Python</strong>, and <strong>AWS</strong>.
                            I build scalable, serverless microservices and optimize complex systems for high availability.
                            Selected speaker at <strong>Go Conference 2024 &amp; 2025</strong>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="hero-actions">
                            <a
                                href="https://flowcv.com/resume/niv80v1rvw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                View Resume
                            </a>
                            <a
                                href="#contact"
                                className="btn-secondary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Get in Touch
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="social-links">
                            <a href="https://github.com/97vaibhav" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/97vaibhav/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://x.com/97GuptaVaibhav" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter / X">
                                <Twitter size={20} />
                            </a>
                            <a href="mailto:1997guptavaibhav@gmail.com" className="social-icon" aria-label="Email">
                                <Mail size={20} />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
