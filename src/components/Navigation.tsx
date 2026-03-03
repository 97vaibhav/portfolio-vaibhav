import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        // Setup intersection observer for detecting active section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            threshold: 0,          // trigger as soon as any part enters
            rootMargin: "-20% 0px -60% 0px"  // only fire when section is in the middle band
        });

        document.querySelectorAll('section[id]').forEach((section) => {
            observer.observe(section);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header
            className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <nav className="nav-container glass">
                <ul className="nav-list flex items-center justify-center gap-6">
                    {navLinks.map((link) => {
                        const sectionId = link.href.substring(1);
                        const isActive = activeSection === sectionId;

                        return (
                            <li key={link.name} style={{ position: 'relative' }}>
                                <a
                                    href={link.href}
                                    className={`nav-link ${isActive ? 'active' : ''}`}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                >
                                    {link.name}
                                </a>
                                {isActive && (
                                    <motion.div
                                        className="active-pill"
                                        layoutId="activeNavIndicator"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30
                                        }}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </motion.header>
    );
};

export default Navigation;
