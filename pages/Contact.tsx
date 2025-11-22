import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check, ArrowRight, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FAQS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable Floating Label Input
const FloatingInput = ({ label, name, type = "text", required = false, onChange, value, ...props }: any) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative mt-2 mb-6">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full px-4 py-4 bg-white rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all placeholder-transparent text-slate-900 font-medium"
        placeholder={label}
        {...props}
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none
          ${focused || value ? '-top-2.5 text-xs bg-white px-2 text-primary-600 font-bold' : 'top-4 text-slate-500'}
        `}
      >
        {label} {required && '*'}
      </label>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-slate-900 hover:text-primary-600 transition-colors"
      >
        {question}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 pb-2 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Multiple',
    budget: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/mwpzodyw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Multiple',
          budget: '',
          message: ''
        });
      } else {
        alert("There was a problem submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was a network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-20 mb-24">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-4 block">Get in Touch</span>
            <h1 className="text-5xl font-bold text-slate-900 mb-8 leading-tight">Let's engineer your <br/>next breakthrough.</h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Whether you have a strict RFP or a napkin sketch, we're ready to listen. We typically respond within 2 hours during business days.
            </p>

            <div className="space-y-8 mb-16">
              {[
                { icon: Mail, title: "Email Us", value: "hello@nexgen.com", desc: "For general inquiries & RFPs" },
                { icon: Phone, title: "Call Us", value: "+91 98765 43210", desc: "Mon-Fri, 9am - 7pm IST" },
                { icon: MapPin, title: "Visit Us", value: "Mumbai, India", desc: "Technical HQ" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start group">
                  <div className="w-14 h-14 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-primary-600 transition-all duration-300 mr-6">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-primary-600 font-semibold text-lg">{item.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden"
          >
            {submitted ? (
              <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500">We'll be in touch shortly to discuss your project.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-primary-600 font-bold hover:underline">Send another</button>
              </div>
            ) : null}

            <h2 className="text-2xl font-bold text-slate-900 mb-8">Project Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid md:grid-cols-2 gap-x-6">
                <FloatingInput label="Name" name="name" required value={formData.name} onChange={handleChange} />
                <FloatingInput label="Email" name="email" type="email" required value={formData.email} onChange={handleChange} />
              </div>

              <div className="grid md:grid-cols-2 gap-x-6">
                <FloatingInput label="Phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} />
                <FloatingInput label="Company" name="company" value={formData.company} onChange={handleChange} />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Service</label>
                  <select 
                    name="service" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary-200 outline-none font-medium text-slate-900"
                    onChange={handleChange}
                    value={formData.service}
                  >
                    <option value="Software">Software Services</option>
                    <option value="Robotics">Robotics Services</option>
                    <option value="Mechanical">Mechanical Services</option>
                    <option value="Branding">Branding & Content</option>
                    <option value="Multiple">Integrated / Multiple</option>
                    <option value="Not Sure">Not Sure / Consult</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Budget Range (USD)</label>
                  <select 
                    name="budget" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary-200 outline-none font-medium text-slate-900"
                    onChange={handleChange}
                    value={formData.budget}
                  >
                    <option value="">Select Range</option>
                    <option value="<5k">&lt; $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-50k">$10,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <textarea 
                  name="message" rows={4} 
                  className="w-full px-4 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-slate-900"
                  placeholder="Tell us about your pain points, timeline, and goals..."
                  onChange={handleChange}
                  value={formData.message}
                ></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full justify-center py-5 text-lg font-bold shadow-lg hover:shadow-primary-500/30" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending... <Loader2 className="ml-2 animate-spin" size={18} /></>
                ) : (
                  <>Send Inquiry <Send size={18} className="ml-2" /></>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
           <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              {FAQS.map(faq => (
                <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};