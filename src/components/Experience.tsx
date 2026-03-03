import { motion } from 'framer-motion';
import { Briefcase, Mic } from 'lucide-react';
import './Experience.css';

const experiences = [
    {
        role: "Backend Engineer",
        company: "Qenest Holdings | Hanwha Japan",
        period: "May 2024 – Present",
        location: "Tokyo, Japan",
        type: 'work',
        description: [
            "Developed and optimized backend services using Python, FastAPI, and Serverless methodologies on AWS.",
            "Led a team in executing projects within budget, coordinating with third-party companies for API integrations (VPP project).",
            "Architected and deployed applications on AWS, utilizing CI/CD methodologies to streamline deployments.",
        ]
    },
    {
        role: "Speaker",
        company: "Go Conference 2025",
        period: "Sep 2025",
        location: "Shibuya, Tokyo",
        type: 'speaking',
        description: [
            "Delivering talk titled 'After go func(): Goroutines Through a Beginner’s Eye'.",
            "Explaining Go's concurrency model (G-M-P, work-stealing, pitfalls)."
        ]
    },
    {
        role: "Speaker",
        company: "Go Conference 2024",
        period: "Jun 2024",
        location: "Shibuya, Tokyo",
        type: 'speaking',
        description: [
            "Delivered an impactful presentation on Race Detection in Golang.",
            "Highly praised for technical insights and articulation of complex concepts to professional Gophers."
        ]
    },
    {
        role: "Server Side Engineer",
        company: "Andpad Inc",
        period: "Feb 2022 – Apr 2024",
        location: "Tokyo, Japan",
        type: 'work',
        description: [
            "Designed and optimized microservices using Golang/gRPC.",
            "Spearheaded Golang BFF, GraphQL, and RESTful API development.",
            "Achieved a 60% reduction in CI/CD time via automated testing & deployment on AWS.",
            "Mentored and coached 5 new hires, significantly improving team productivity."
        ]
    }
];

const Experience = () => {
    return (
        <section id="experience" className="container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Experience & Speaking
            </motion.h2>

            <div className="timeline">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="timeline-item flex"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                        <div className={`timeline-icon flex items-center justify-center glow-on-hover ${exp.type}`}>
                            {exp.type === 'work' ? <Briefcase size={20} /> : <Mic size={20} />}
                        </div>

                        <motion.div
                            className="timeline-content glass"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{ cursor: 'pointer' }}
                        >
                            <h3 className="role">{exp.role}</h3>
                            <h4 className="company">{exp.company}</h4>
                            <p className="meta">{exp.period} | {exp.location}</p>

                            <ul className="description-list mt-4">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
