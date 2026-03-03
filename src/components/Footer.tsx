import { Github, Mail, Linkedin, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-container">
            <div className="container flex-col items-center gap-6">
                <div className="footer-links flex gap-6">
                    <a href="https://github.com/97vaibhav" target="_blank" rel="noopener noreferrer" className="footer-icon ml-auto mr-auto">
                        <Github size={20} />
                    </a>
                    <a href="mailto:1997guptavaibhav@gmail.com" className="footer-icon ml-auto mr-auto">
                        <Mail size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/97vaibhav/" target="_blank" rel="noopener noreferrer" className="footer-icon ml-auto mr-auto">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://x.com/97GuptaVaibhav" target="_blank" rel="noopener noreferrer" className="footer-icon ml-auto mr-auto">
                        <Twitter size={20} />
                    </a>
                </div>

                <p className="copyright text-secondary text-center">
                    &copy; {currentYear} Vaibhav Gupta. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
