import { motion } from 'framer-motion';
import './Skills.css';

const skillCategories = [
    {
        title: "Core Programming & APIs",
        skills: ["Golang Development", "Python Programming", "RESTful APIs", "FastAPI", "GraphQL", "gRPC APIs"]
    },
    {
        title: "Cloud & DevOps",
        skills: ["AWS Cloud Services", "Docker & Kubernetes", "CI/CD", "Microservices Architecture"]
    },
    {
        title: "Database & Tools",
        skills: ["MySQL", "PostgreSQL", "Git & GitHub", "Datadog Monitoring", "Agile/Scrum (JIRA)"]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Technical Arsenal
            </motion.h2>

            <div className="skills-grid">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        className="skill-card glass glow-on-hover"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                    >
                        <h3 className="category-title mb-6">{category.title}</h3>
                        <div className="skills-list flex flex-wrap gap-4">
                            {category.skills.map(skill => (
                                <span key={skill} className="skill-item">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
