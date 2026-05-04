"use client";

import { useState } from 'react';
import { Mail, Camera } from 'lucide-react';

const creamCakes = [
  { name: 'Pineapple Mango Cake', img: '/images/cream-pineapple-mango.png' },
  { name: 'Vanilla Strawberry Cake', img: '/images/cream-vanilla-strawberry.png' },
  { name: 'Chocolate Pudding Cake', img: '/images/cream-chocolate-pudding.png' },
];

const seasonalCakes = [
  { name: 'Black Sesame', img: '/images/seasonal-black-sesame.png' },
  { name: 'Durian Mille-feuille', img: '/images/seasonal-durian-mille-feuille.png' },
  { name: 'Lychee Camellia', img: '/images/seasonal-lychee-camellia.png' },
];

const cheeseCakes = [
  { name: 'Matcha Cheese', img: '/images/cheese-matcha.png' },
  { name: 'Basque', img: '/images/cheese-basque.png' },
];

const rollCakes = [
  { name: 'Taro Roll', img: '/images/roll-taro.png' },
  { name: 'Milk Rose Roll', img: '/images/roll-milk-rose.png' },
  { name: 'Soybean Mochi Roll', img: '/images/roll-soybean-mochi.png' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [menuCategory, setMenuCategory] = useState('Seasonal Cake');
  const [formData, setFormData] = useState({ name: '', email: '', date: '', message: '' });
  const [status, setStatus] = useState('');
  const [selectedCake, setSelectedCake] = useState<typeof creamCakes[0] | null>(null);

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
        setFormData({ name: '', email: '', date: '', message: '' });
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
    { id: 'workshop', label: 'Workshop' }
  ];

  return (
    <div className="flex flex-col md:flex-row-reverse h-screen w-full bg-white font-sans text-brand-dark overflow-hidden">

      {/* 左侧内容区 (左边 3/4) */}
      <div className="w-full md:w-3/4 h-[60vh] md:h-screen overflow-y-auto bg-white p-4 md:p-8">

        {/* Home - 一张大图 */}
        {activeTab === 'home' && (
          <div className="w-full h-full flex items-center justify-center fade-in">
            <img
              src="/images/hero-cover.png"
              alt="The Sesame Door Cover Image"
              className="w-full h-full object-contain wavy-border playful-shadow p-4 bg-[#6A9AE8]/10"
            />
          </div>
        )}

        {/* Menu - 菜单 */}
        {activeTab === 'menu' && (
          <div className="w-full h-full flex flex-col items-center max-w-4xl mx-auto fade-in p-4 md:p-6 overflow-hidden">
            {/* 插画 */}
            <div className="w-full max-w-2xl mb-4 shrink-0 flex justify-center">
              <img
                src="/images/menu-illustration.png"
                alt="Menu Illustration"
                className="w-full max-h-[25vh] lg:max-h-[30vh] object-cover object-center rounded-[2rem] border-4 border-brand-dark playful-shadow"
              />
            </div>

            {/* 菜单分类导航 */}
            <div className="w-full mb-6 shrink-0">
              <ul className="flex flex-row justify-between md:justify-center md:gap-12 w-full border-b-2 border-brand-dark/10 pb-3">
                {['Seasonal Cake', 'Cream Cake', 'Cheese Cake', 'Roll'].map((category) => (
                  <li key={category} className="relative">
                    <button
                      onClick={() => { setMenuCategory(category); setSelectedCake(null); }}
                      className={`text-[13px] sm:text-lg md:text-2xl font-bold transition-all whitespace-nowrap ${
                        menuCategory === category
                          ? 'text-brand-orange'
                          : 'text-brand-dark/60 hover:text-brand-dark'
                      }`}
                    >
                      {category}
                    </button>
                    {menuCategory === category && (
                      <div className="absolute -bottom-[14px] left-0 w-full h-1.5 bg-brand-orange rounded-t-lg"></div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* 对应分类的内容 */}
            {menuCategory === 'Seasonal Cake' ? (
              <div className="w-full flex flex-row gap-6 flex-1 min-h-0">
                <div className="flex flex-col gap-3 shrink-0 justify-center w-52">
                  {seasonalCakes.map((cake) => (
                    <button
                      key={cake.name}
                      onClick={() => setSelectedCake(cake)}
                      className={`text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        selectedCake?.name === cake.name
                          ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                          : 'border-brand-dark/20 hover:border-brand-dark/40 text-brand-dark'
                      }`}
                    >
                      <img src={cake.img} alt={cake.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div className="font-bold text-sm leading-tight">{cake.name}</div>
                    </button>
                  ))}
                </div>
                <div className="flex-1 flex items-center justify-center min-h-0">
                  {selectedCake ? (
                    <div className="flex flex-col items-center max-h-full fade-in">
                      <img
                        src={selectedCake.img}
                        alt={selectedCake.name}
                        className="max-h-[45vh] w-auto object-contain rounded-[2rem] border-4 border-brand-dark playful-shadow"
                      />
                    </div>
                  ) : (
                    <p className="text-xl text-brand-dark/40">← Select a cake</p>
                  )}
                </div>
              </div>
            ) : menuCategory === 'Cream Cake' ? (
              <div className="w-full flex flex-row gap-6 flex-1 min-h-0">
                <div className="flex flex-col gap-3 shrink-0 justify-center w-52">
                  {creamCakes.map((cake) => (
                    <button
                      key={cake.name}
                      onClick={() => setSelectedCake(cake)}
                      className={`text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        selectedCake?.name === cake.name
                          ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                          : 'border-brand-dark/20 hover:border-brand-dark/40 text-brand-dark'
                      }`}
                    >
                      <img src={cake.img} alt={cake.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div className="font-bold text-sm leading-tight">{cake.name}</div>
                    </button>
                  ))}
                </div>
                <div className="flex-1 flex items-center justify-center min-h-0">
                  {selectedCake ? (
                    <div className="flex flex-col items-center max-h-full fade-in">
                      <img
                        src={selectedCake.img}
                        alt={selectedCake.name}
                        className="max-h-[45vh] w-auto object-contain rounded-[2rem] border-4 border-brand-dark playful-shadow"
                      />
                    </div>
                  ) : (
                    <p className="text-xl text-brand-dark/40">← Select a cake</p>
                  )}
                </div>
              </div>
            ) : menuCategory === 'Cheese Cake' ? (
              <div className="w-full flex flex-row gap-6 flex-1 min-h-0">
                <div className="flex flex-col gap-3 shrink-0 justify-center w-52">
                  {cheeseCakes.map((cake) => (
                    <button
                      key={cake.name}
                      onClick={() => setSelectedCake(cake)}
                      className={`text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        selectedCake?.name === cake.name
                          ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                          : 'border-brand-dark/20 hover:border-brand-dark/40 text-brand-dark'
                      }`}
                    >
                      <img src={cake.img} alt={cake.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div className="font-bold text-sm leading-tight">{cake.name}</div>
                    </button>
                  ))}
                </div>
                <div className="flex-1 flex items-center justify-center min-h-0">
                  {selectedCake ? (
                    <div className="flex flex-col items-center max-h-full fade-in">
                      <img
                        src={selectedCake.img}
                        alt={selectedCake.name}
                        className="max-h-[45vh] w-auto object-contain rounded-[2rem] border-4 border-brand-dark playful-shadow"
                      />
                    </div>
                  ) : (
                    <p className="text-xl text-brand-dark/40">← Select a cake</p>
                  )}
                </div>
              </div>
            ) : menuCategory === 'Roll' ? (
              <div className="w-full flex flex-row gap-6 flex-1 min-h-0">
                <div className="flex flex-col gap-3 shrink-0 justify-center w-52">
                  {rollCakes.map((cake) => (
                    <button
                      key={cake.name}
                      onClick={() => setSelectedCake(cake)}
                      className={`text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        selectedCake?.name === cake.name
                          ? 'border-brand-orange bg-brand-orange/10 text-brand-orange'
                          : 'border-brand-dark/20 hover:border-brand-dark/40 text-brand-dark'
                      }`}
                    >
                      <img src={cake.img} alt={cake.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div className="font-bold text-sm leading-tight">{cake.name}</div>
                    </button>
                  ))}
                </div>
                <div className="flex-1 flex items-center justify-center min-h-0">
                  {selectedCake ? (
                    <div className="flex flex-col items-center max-h-full fade-in">
                      <img
                        src={selectedCake.img}
                        alt={selectedCake.name}
                        className="max-h-[45vh] w-auto object-contain rounded-[2rem] border-4 border-brand-dark playful-shadow"
                      />
                    </div>
                  ) : (
                    <p className="text-xl text-brand-dark/40">← Select a cake</p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Order Now - 订购信息 */}
        {activeTab === 'order' && (
          <div className="w-full h-full fade-in overflow-y-auto p-4 md:p-6 lg:p-8 flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto bg-brand-blue border-4 border-brand-dark rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 playful-shadow rotate-1 flex flex-col md:flex-row items-center gap-8 md:gap-16">
              
              <div className="w-full md:w-5/12 flex flex-col items-center justify-center text-center">
                <img
                  src="/images/order-illustration.png"
                  alt="Order Illustration"
                  className="w-32 md:w-40 lg:w-52 h-auto max-h-[20vh] object-cover object-center rounded-[1.5rem] border-4 border-brand-dark playful-shadow -rotate-2 mb-4 md:mb-6"
                />
                <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">Ready to Order? 🎂</h2>
                <p className="text-sm md:text-base lg:text-lg text-brand-dark/80 px-2 md:px-4">
                  Each cake is custom made with love. Please allow at least 48 hours notice for all orders.
                </p>
              </div>

              <div className="w-full md:w-7/12">
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 bg-white border-4 border-brand-dark rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 -rotate-1">
                  <div>
                    <label className="block text-brand-dark font-bold mb-1 md:mb-1.5 text-sm md:text-base">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border-2 border-brand-dark rounded-xl p-2.5 md:p-3 text-sm md:text-base focus:outline-none focus:border-brand-orange bg-brand-light/50"
                      placeholder="Alice"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-dark font-bold mb-1 md:mb-1.5 text-sm md:text-base">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border-2 border-brand-dark rounded-xl p-2.5 md:p-3 text-sm md:text-base focus:outline-none focus:border-brand-orange bg-brand-light/50"
                      placeholder="alice@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-dark font-bold mb-1 md:mb-1.5 text-sm md:text-base">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full border-2 border-brand-dark rounded-xl p-2.5 md:p-3 text-sm md:text-base focus:outline-none focus:border-brand-orange bg-brand-light/50"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-dark font-bold mb-1 md:mb-1.5 text-sm md:text-base">Cake Details / Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full border-2 border-brand-dark rounded-xl p-2.5 md:p-3 text-sm md:text-base h-24 md:h-32 focus:outline-none focus:border-brand-orange bg-brand-light/50 resize-none"
                      placeholder="I would like a strawberry dream cake for a birthday on..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-brand-yellow text-brand-dark font-bold text-lg md:text-xl py-3 md:py-4 rounded-xl border-2 border-brand-dark hover-playful-shadow transition-all disabled:opacity-50 mt-2 md:mt-4"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Inquiry ✨'}
                  </button>

                {status === 'success' && (
                  <p className="text-green-600 font-bold text-center mt-4 text-lg">Message sent successfully! We will get back to you soon.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 font-bold text-center mt-4 text-lg">Oops! Something went wrong. Please try again later.</p>
                )}
              </form>
              </div>
            </div>
          </div>
        )}

        {/* Workshop - 工作坊 */}
        {activeTab === 'workshop' && (
          <div className="w-full h-full fade-in overflow-y-auto p-4 md:p-6 lg:p-8 flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
              
              {/* 左侧/上方 插画 */}
              <div className="w-full md:w-1/2 flex justify-center fade-in">
                <img
                  src="/images/workshop-illustration.png"
                  alt="Workshop Illustration"
                  className="w-full max-w-md md:max-w-full h-auto max-h-[40vh] md:max-h-[70vh] object-contain rounded-[2rem] border-4 border-brand-dark playful-shadow bg-brand-yellow/10 p-2 -rotate-1"
                />
              </div>

              {/* 右侧/下方 课程介绍 */}
              <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Our Workshop 👩🏻‍🍳</h2>
                  <p className="text-base md:text-lg text-brand-dark/80 mb-4 md:mb-6 px-2 md:px-0">
                    Join us in the kitchen! Whether you want to spend a fun afternoon or learn professional skills, we have a place for you.
                  </p>
                </div>

                <div className="flex flex-col gap-4 md:gap-6 px-2 md:px-0">
                  {/* 蛋糕体验 */}
                  <div className="bg-brand-pink/20 border-4 border-brand-dark rounded-3xl p-5 md:p-6 playful-shadow hover:translate-y-[-4px] transition-transform rotate-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                      🍰 Cake Experience
                    </h3>
                    <p className="text-sm md:text-base text-brand-dark/80 leading-relaxed">
                      A fun and relaxing cake-making class for everyone. No experience needed — just bring your ideas and create the cake you’ve always wanted.
                    </p>
                  </div>

                  {/* 蛋糕培训班 */}
                  <div className="bg-brand-blue/20 border-4 border-brand-dark rounded-3xl p-5 md:p-6 playful-shadow hover:translate-y-[-4px] transition-transform -rotate-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                      🎓 Learning Class
                    </h3>
                    <p className="text-sm md:text-base text-brand-dark/80 leading-relaxed">
                      A complete cake course where you can learn step by step, from basic preparation to final decoration, and understand the whole cake-making process from start to finish.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* 侧边导航与介绍 (现在改到了左边) */}
      <div className="w-full md:w-1/4 h-[40vh] md:h-screen bg-white border-t-4 md:border-t-0 md:border-r-4 border-brand-dark flex flex-col p-6 md:p-10 overflow-y-auto">

        <div className="mb-20">
          <h1 className="font-bold text-4xl leading-none tracking-tight">
            The Sesame Door
          </h1>
        </div>

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

        <div className="mt-auto space-y-6">
          <div>
            <div className="text-xl font-medium text-brand-dark mb-2">
              Zizi
            </div>
            <div className="text-base text-brand-dark/80 space-y-4">
              <p>
                I love baking and creating desserts that follow the seasons.
              </p>
              <p>
                To me, the best flavors come at the right time — fresh, simple, and made to be enjoyed slowly.
              </p>
            </div>
          </div>

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