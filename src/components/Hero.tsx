import { motion } from 'framer-motion';
import { Github, Mail, Linkedin, Twitter } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero-section container flex items-center justify-center">
            <motion.div
                className="hero-card glass flex-col items-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="profile-container mb-8">
                    <div className="profile-ring glow-on-hover">
                        <img src="/images/IMG-20250424-WA0045.jpg" alt="Vaibhav Gupta" className="profile-image" />
                    </div>
                </div>

                <motion.div className="hero-text text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h1 className="hero-name">Vaibhav Gupta</h1>
                    <h2 className="hero-title mt-4">Backend Engineer & Technical Speaker</h2>
                    <p className="hero-description mt-6 text-secondary">
                        Good afternoon! I'm a Tokyo-based Backend Engineer specializing in Python, Golang, and AWS.
                        I build scalable, serverless microservices and optimize complex systems for high availability.
                        Selected speaker at Go Conference 2024 & 2025.
                    </p>

                    <div className="social-links flex items-center justify-center gap-6 mt-8">
                        <a href="https://github.com/97vaibhav" target="_blank" rel="noopener noreferrer" className="social-icon glow-on-hover">
                            <Github size={24} />
                        </a>
                        <a href="mailto:1997guptavaibhav@gmail.com" className="social-icon glow-on-hover">
                            <Mail size={24} />
                        </a>
                        <a href="#" className="social-icon glow-on-hover">
                            <Linkedin size={24} />
                        </a>
                        <a href="#" className="social-icon glow-on-hover">
                            <Twitter size={24} />
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
