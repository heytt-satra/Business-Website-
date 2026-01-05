import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { FAQS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable Floating Label Input - Dark theme
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
        className="peer w-full px-4 py-4 bg-white/5 rounded-xl border border-white/20 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all placeholder-transparent text-white font-medium text-base"
        placeholder={label}
        {...props}
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none
          ${focused || value ? '-top-2.5 text-xs bg-slate-900 px-2 text-cyan-400 font-bold' : 'top-4 text-slate-500'}
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
    <div className="border-b border-white/10 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-white hover:text-cyan-400 transition-colors"
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
            <p className="pt-4 pb-2 text-slate-400 leading-relaxed">{answer}</p>
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
    <div className="bg-slate-900 min-h-screen overflow-hidden">
      {/* Unified Background - Same as other pages */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNDQ1NSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

        {/* Floating gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[5%] w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[30%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">

            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block">Get in Touch</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Let's engineer your <br />next breakthrough.</h1>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                Whether you have a strict RFP or a napkin sketch, we're ready to listen. We typically respond within 2 hours during business days.
              </p>

              <div className="space-y-8 mb-16">
                {[
                  { icon: Mail, title: "Email Us", value: "hello@teraindustries.com", desc: "For general inquiries & RFPs" },
                  { icon: Phone, title: "Call Us", value: "+91 98765 43210", desc: "Mon-Fri, 9am - 7pm IST" },
                  { icon: MapPin, title: "Visit Us", value: "Mumbai, India", desc: "Technical HQ" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 group-hover:border-transparent transition-all duration-300 mr-6">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-cyan-400 font-semibold text-lg">{item.value}</p>
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
              className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden"
            >
              {submitted ? (
                <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-12">
                  <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 mb-6 animate-bounce">
                    <Check size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400">We'll be in touch shortly to discuss your project.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 text-cyan-400 font-bold hover:underline">Send another</button>
                </div>
              ) : null}

              <h2 className="text-2xl font-bold text-white mb-8">Project Inquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid md:grid-cols-2 gap-x-6">
                  <FloatingInput label="Name" name="name" required value={formData.name} onChange={handleChange} />
                  <FloatingInput label="Email" name="email" type="email" required value={formData.email} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-6">
                  <FloatingInput label="Phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} />
                  <FloatingInput label="Company" name="company" value={formData.company} onChange={handleChange} />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="relative">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Service</label>
                    <select
                      name="service"
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:ring-2 focus:ring-cyan-500/20 outline-none font-medium text-white"
                      onChange={handleChange}
                      value={formData.service}
                    >
                      <option value="Software" className="bg-slate-900">Software Services</option>
                      {/* Commented out robotics and mechanical options */}
                      {/* <option value="Robotics" className="bg-slate-900">Robotics Services</option> */}
                      {/* <option value="Mechanical" className="bg-slate-900">Mechanical Services</option> */}
                      <option value="Branding" className="bg-slate-900">Branding & Content</option>
                      <option value="Multiple" className="bg-slate-900">Integrated / Multiple</option>
                      <option value="Not Sure" className="bg-slate-900">Not Sure / Consult</option>
                    </select>
                  </div>
                  <div className="relative">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Budget Range (USD)</label>
                    <select
                      name="budget"
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:ring-2 focus:ring-cyan-500/20 outline-none font-medium text-white"
                      onChange={handleChange}
                      value={formData.budget}
                    >
                      <option value="" className="bg-slate-900">Select Range</option>
                      <option value="<5k" className="bg-slate-900">&lt; $5,000</option>
                      <option value="5k-10k" className="bg-slate-900">$5,000 - $10,000</option>
                      <option value="10k-50k" className="bg-slate-900">$10,000 - $50,000</option>
                      <option value="50k+" className="bg-slate-900">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <textarea
                    name="message" rows={4}
                    className="w-full px-4 py-4 bg-white/5 rounded-xl border border-white/20 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white placeholder-slate-500"
                    placeholder="Tell us about your pain points, timeline, and goals..."
                    onChange={handleChange}
                    value={formData.message}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>Sending... <Loader2 className="ml-2 animate-spin" size={18} /></>
                  ) : (
                    <>Send Inquiry <Send size={18} className="ml-2" /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <section className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              {FAQS.map(faq => (
                <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};