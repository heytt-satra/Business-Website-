import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Calendar, Clock, User, ArrowLeft, Share2, Linkedin, Twitter } from 'lucide-react';
import { Image } from '../components/ui/Image';
import { Button } from '../components/ui/Button';

export const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Link to="/blog" className="inline-flex items-center text-slate-500 hover:text-primary-600 mb-8 transition-colors font-medium">
          <ArrowLeft size={18} className="mr-2" /> Back to Insights
        </Link>
        
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center text-slate-500 text-sm gap-6 border-b border-slate-100 pb-8">
            <div className="flex items-center font-medium text-slate-900">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mr-2">
                <User size={14} />
              </div>
              {post.author}
            </div>
            <div className="flex items-center"><Calendar size={16} className="mr-2" /> {post.date}</div>
            <div className="flex items-center"><Clock size={16} className="mr-2" /> {post.readTime} read</div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden mb-12 aspect-video shadow-lg">
          <Image src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none mb-16">
          {post.content}
        </div>

        {/* Share / Footer */}
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
             <h3 className="font-bold text-slate-900 text-lg mb-1">Enjoyed this article?</h3>
             <p className="text-slate-500">Share it with your network.</p>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-[#0077b5] hover:border-[#0077b5] transition-colors font-medium">
               <Linkedin size={18} className="mr-2" /> Share
             </button>
             <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-sky-500 hover:border-sky-500 transition-colors font-medium">
               <Twitter size={18} className="mr-2" /> Tweet
             </button>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl"></div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to implement this?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto relative z-10">
            Our team can help you execute the strategies discussed in this article. Let's talk.
          </p>
          <Button to="/contact" variant="primary" className="relative z-10">
            Book a Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};