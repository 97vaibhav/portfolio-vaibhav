import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import './Contact.css';

// Initialize Supabase once (module scope) — never re-created on re-renders
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// ── Simple in-memory rate limiter ────────────────────────────────────────────
const RATE_LIMIT = 3;          // max submissions
const RATE_WINDOW_MS = 60_000; // per 60 seconds
const submissionTimestamps: number[] = [];

function isRateLimited(): boolean {
    const now = Date.now();
    // Remove entries outside the window
    while (submissionTimestamps.length && submissionTimestamps[0] < now - RATE_WINDOW_MS) {
        submissionTimestamps.shift();
    }
    return submissionTimestamps.length >= RATE_LIMIT;
}

function recordSubmission() {
    submissionTimestamps.push(Date.now());
}

// ── Input validation ─────────────────────────────────────────────────────────
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function validateForm(name: string, email: string, message: string): string | null {
    if (!name.trim() || name.trim().length < 2) return 'Name must be at least 2 characters.';
    if (name.trim().length > 100) return 'Name must be under 100 characters.';
    if (!EMAIL_RE.test(email.trim())) return 'Please enter a valid email address.';
    if (email.trim().length > 254) return 'Email address is too long.';
    if (!message.trim() || message.trim().length < 10) return 'Message must be at least 10 characters.';
    if (message.trim().length > 2000) return 'Message must be under 2000 characters.';
    return null;
}

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (validationError) setValidationError(null); // clear on change
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!supabase) {
            setValidationError('Contact form is not configured. Please reach out via email.');
            return;
        }

        // Client-side validation
        const validationMsg = validateForm(formData.name, formData.email, formData.message);
        if (validationMsg) {
            setValidationError(validationMsg);
            return;
        }

        // Rate limiting
        if (isRateLimited()) {
            setValidationError('Too many submissions. Please wait a minute and try again.');
            return;
        }

        setStatus('loading');
        setValidationError(null);

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([{
                    name: formData.name.trim().slice(0, 100),
                    email: formData.email.trim().toLowerCase().slice(0, 254),
                    message: formData.message.trim().slice(0, 2000),
                }]);

            if (error) throw error;

            recordSubmission();
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch {
            // Do NOT expose raw server error details to the user
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Get in Touch
            </motion.h2>

            <div className="contact-wrapper">
                <motion.div
                    className="contact-card glass glow-on-hover"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="contact-info mb-8 text-center">
                        <h3 className="mb-4">Let's work together!</h3>
                        <p className="text-secondary">
                            Whether you have a critical infrastructure problem to solve or an speaking opportunity,
                            feel free to reach out. I'll get back to you as soon as possible.
                        </p>
                    </div>

                    <form className="contact-form flex-col gap-6" onSubmit={handleSubmit} noValidate>
                        {validationError && (
                            <div role="alert" className="form-error-banner">
                                {validationError}
                            </div>
                        )}
                        <div className="form-group flex-col gap-2">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input glass"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                maxLength={100}
                                required
                                autoComplete="name"
                            />
                        </div>

                        <div className="form-group flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input glass"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                maxLength={254}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group flex-col gap-2">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-input glass textarea"
                                placeholder="How can I help you?"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                maxLength={2000}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="submit-btn flex items-center justify-center gap-2"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <>Sending... <Loader className="spin" size={20} /></>
                            ) : status === 'success' ? (
                                'Message Sent!'
                            ) : status === 'error' ? (
                                'Error! Try again'
                            ) : (
                                <>Send Message <Send size={20} /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
