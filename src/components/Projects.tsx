import { motion } from 'framer-motion';
import { Database, Cloud, ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const projects = [
    {
        title: "Scalable ETL & DB Management for Nichicon API",
        description: "Designed a serverless ETL pipeline using AWS Glue (PySpark) processing ~40M+ records daily. Built a robust backend extracting time-series data from Nichicon API, securely stored in Amazon S3 and Aurora PostgreSQL via private VPC and VPC endpoints.",
        tags: ["AWS Glue", "PySpark", "S3", "Aurora PostgreSQL", "Step Functions"],
        icon: <Database size={40} className="project-icon" />,
        github: "#",
        live: "#"
    },
    {
        title: "AWS Cloud Data Engineering Pipeline",
        description: "Configured Amazon Kinesis Data Streams triggering AWS Lambda functions for real-time processing. Integrated RDS and Kinesis Firehose for archiving raw data into S3. Automated the pipeline using Step Functions and set up granular IAM roles ensuring top-tier data security.",
        tags: ["Kinesis", "AWS Lambda", "Python", "RDS Proxy", "CloudWatch", "IAM"],
        icon: <Cloud size={40} className="project-icon" />,
        github: "#",
        live: "#"
    }
];

const Projects = () => {
    return (
        <section id="projects" className="container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Featured Work
            </motion.h2>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="project-card glass glow-on-hover"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div className="card-header flex justify-between items-center mb-6">
                            <div className="icon-wrapper glass glow-on-hover">{project.icon}</div>
                            <div className="flex gap-4">
                                <a href={project.github} className="project-link" aria-label="GitHub"><Github size={20} /></a>
                                <a href={project.live} className="project-link" aria-label="Live Demo"><ExternalLink size={20} /></a>
                            </div>
                        </div>

                        <h3 className="project-title mb-4">{project.title}</h3>
                        <p className="project-desc mb-6">{project.description}</p>

                        <div className="project-tags flex flex-wrap gap-2 mt-auto">
                            {project.tags.map(tag => (
                                <span key={tag} className="tag glass">{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
