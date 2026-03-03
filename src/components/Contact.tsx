import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import './Contact.css';

// Initialize Supabase. Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) {
            alert("Supabase keys are not configured. Please add them to your .env file.");
            return;
        }

        setStatus('loading');

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message
                    }
                ]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error('Error inserting message:', err);
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

                    <form className="contact-form flex-col gap-6" onSubmit={handleSubmit}>
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
                                required
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
                                required
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
