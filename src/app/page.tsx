"use client";

import { useState } from 'react';
import { Mail, Camera } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Shop' },
    { id: 'work', label: 'Work' }
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white font-sans text-brand-dark overflow-hidden">
      
      {/* 左侧内容区 (左边 3/4) */}
      <div className="w-full md:w-3/4 h-[60vh] md:h-screen overflow-y-auto bg-white p-4 md:p-8">
        
        {/* Home - 一张大图 */}
        {activeTab === 'home' && (
          <div className="w-full h-full flex items-center justify-center fade-in">
            <img 
              src="/images/hero-image.png" 
              alt="Master Mustache Signature Cake" 
              className="w-full h-full object-contain wavy-border playful-shadow p-4 bg-[#6A9AE8]/10"
            />
          </div>
        )}

        {/* Menu - 菜单 */}
        {activeTab === 'menu' && (
          <div className="w-full h-full flex flex-col justify-center max-w-3xl mx-auto fade-in p-4 md:p-8">
            <div className="w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center border-4 border-brand-dark mb-8 -rotate-12 playful-shadow">
              <span className="text-5xl">👨🏻‍🍳</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Meet the Mustache Behind the Magic</h2>
            <div className="space-y-6 text-xl leading-relaxed text-brand-dark/80">
              <p>
                Hello! I'm Master Mustache. My baking journey started with a simple belief: every cake should tell a story and every bite should bring a smile.
              </p>
              <p>
                Inspired by the playful aesthetics of modern art and the comforting warmth of traditional patisseries, we blend high-saturation color palettes with delicate, balanced flavors.
              </p>
              <p className="font-bold text-brand-orange text-2xl mt-8">
                Our cakes aren't just desserts;<br/>they are edible canvases.
              </p>
            </div>
          </div>
        )}

        {/* Order Now - 订购信息 */}
        {activeTab === 'order' && (
          <div className="w-full h-full flex flex-col justify-center max-w-2xl mx-auto fade-in p-4">
            <div className="bg-brand-pink border-4 border-brand-dark rounded-[3rem] p-8 md:p-12 playful-shadow rotate-1">
              <h2 className="text-4xl font-bold mb-4 text-center">Ready to Order? 🎂</h2>
              <p className="text-lg mb-8 text-brand-dark/80 text-center">
                Each cake is custom made with love. Please allow at least 48 hours notice for all orders.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4 bg-white border-4 border-brand-dark rounded-3xl p-6 -rotate-1">
                <div>
                  <label className="block text-brand-dark font-bold mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border-2 border-brand-dark rounded-xl p-3 focus:outline-none focus:border-brand-orange bg-brand-light/50"
                    placeholder="Alice"
                  />
                </div>
                <div>
                  <label className="block text-brand-dark font-bold mb-1">Your Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border-2 border-brand-dark rounded-xl p-3 focus:outline-none focus:border-brand-orange bg-brand-light/50"
                    placeholder="alice@example.com"
                  />
                </div>
                <div>
                  <label className="block text-brand-dark font-bold mb-1">Cake Details / Message</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full border-2 border-brand-dark rounded-xl p-3 h-32 focus:outline-none focus:border-brand-orange bg-brand-light/50 resize-none"
                    placeholder="I would like a strawberry dream cake for a birthday on..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full bg-brand-yellow text-brand-dark font-bold text-xl py-4 rounded-xl border-2 border-brand-dark hover-playful-shadow transition-all disabled:opacity-50 mt-4"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Inquiry ✨'}
                </button>

                {status === 'success' && (
                  <p className="text-green-600 font-bold text-center mt-4">Message sent successfully! We will get back to you soon.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 font-bold text-center mt-4">Oops! Something went wrong. Please try again later.</p>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Work - 作品展示 */}
        {activeTab === 'work' && (
          <div className="w-full h-full flex flex-col justify-center max-w-3xl mx-auto fade-in p-4 md:p-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Our Work</h2>
            <div className="space-y-6 text-xl leading-relaxed text-brand-dark/80">
              <p>
                Coming soon...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 右侧导航与介绍 (右边 1/4) */}
      <div className="w-full md:w-1/4 h-[40vh] md:h-screen bg-white border-t-4 md:border-t-0 md:border-l-4 border-brand-dark flex flex-col p-6 md:p-10 overflow-y-auto">
        
        {/* 店铺名称 */}
        <div className="mb-20">
          <h1 className="font-bold text-4xl leading-none tracking-tight">
            The Sesame Door
          </h1>
        </div>

        {/* 导航菜单 */}
        <nav className="mb-12">
          <ul className="flex flex-row md:flex-col items-start gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {navItems.map((item) => (
              <li key={item.id} className="shrink-0">
                <button 
                  onClick={() => setActiveTab(item.id)}
                  className={`text-left text-2xl md:text-3xl font-bold transition-all hover:translate-x-2 hover:text-brand-orange ${
                    activeTab === item.id 
                      ? 'text-brand-orange underline decoration-4 underline-offset-8' 
                      : 'text-brand-dark'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 个人介绍 */}
        <div className="mt-auto space-y-6">
          <div>
            <div className="text-xl font-medium text-brand-dark mb-2">
              Zizi
            </div>
            
            <div className="text-base text-brand-dark/80 space-y-4">
              <p>
                I am a pastry chef and creative director specialising in blending fine art aesthetics with delicious flavors. Grown up in Suzhou.
              </p>
            </div>
          </div>

          {/* 底部联系方式 */}
          <div className="pt-8 border-t-2 border-brand-dark/10 space-y-2 text-sm text-brand-dark/60">
            <p>Creative District, Suzhou</p>
            <p>wuzhiyi921@gmail.com</p>
            <div className="flex gap-4 pt-2 text-brand-dark">
              <a href="#" className="hover:text-brand-orange"><Camera size={20} /></a>
              <a href="#" className="hover:text-brand-orange"><Mail size={20} /></a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}