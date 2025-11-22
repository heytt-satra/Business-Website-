import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, Clock, ArrowRight, Sparkles, Search } from 'lucide-react';
import { Image } from '../components/ui/Image';
import { motion } from 'framer-motion';

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];

  const filteredPosts = BLOG_POSTS.filter(post => {
     const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
     const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
     return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 mb-6">
             <Sparkles size={16} className="text-primary-500" />
             <span className="text-sm font-bold text-slate-700">Latest Thinking</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Insights & Updates</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Technical deep dives, founder stories, and industry analysis.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
           <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${selectedCategory === cat ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                  {cat}
                </button>
              ))}
           </div>
           <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-200 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full group"
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary-700 shadow-sm">
                  {post.category}
                </div>
                <Image src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-slate-500 mb-4 space-x-4 font-medium uppercase tracking-wide">
                  <div className="flex items-center"><Calendar size={12} className="mr-1.5 text-primary-500"/> {post.date}</div>
                  <div className="flex items-center"><Clock size={12} className="mr-1.5 text-primary-500"/> {post.readTime}</div>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-slate-600 text-base mb-8 flex-grow leading-relaxed">{post.excerpt}</p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <div className="flex items-center text-sm font-bold text-slate-900">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mr-3 text-slate-500">
                      <User size={14} />
                    </div>
                    {post.author}
                  </div>
                  <Link to={`/blog/${post.id}`} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all duration-300">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500">
               No articles found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};