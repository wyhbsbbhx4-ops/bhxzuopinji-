import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Copy, Check, Sparkles, Mail, Github, Dribbble, Twitter, ArrowUpRight, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DESIGNER_INFO } from '../data/portfolioData';
import { audio } from '../utils/audioSynth';

interface ContactSectionProps {
  darkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ darkMode }) => {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Product Design');
  const [budget, setBudget] = useState('$15k — $30k');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Time ticker for Shanghai/Tokyo
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Shanghai',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    audio.playClick(900);
    navigator.clipboard.writeText(DESIGNER_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E2F952', '#38BDF8', '#FFFFFF']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    audio.playClick(1000);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#E2F952', '#FF6B00', '#10B981', '#FFFFFF']
      });
    }, 800);
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-noise"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Top Header Marker */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#2644F4] rounded-none rotate-45" />
            <span className="font-mono-tag text-xs sm:text-sm tracking-widest uppercase text-neutral-600 dark:text-neutral-400 font-bold">
              05 // TRANSMIT // GET IN TOUCH & COMMISSIONS
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono-tag text-xs text-neutral-600 dark:text-neutral-400">
            <Clock className="w-3.5 h-3.5 text-[#2644F4]" />
            <span>SHANGHAI TIME: {currentTime || '18:40:12'} (GMT+8)</span>
          </div>
        </div>

        {/* Massive Callout Typography */}
        <div className="space-y-4">
          <h2
            id="contact-loud-heading"
            className="text-4xl sm:text-6xl lg:text-7xl font-condensed font-black tracking-tight leading-[0.95] text-neutral-900 dark:text-white hover:text-[#2644F4] transition-colors"
          >
            LET’S CREATE SOMETHING UNFORGETTABLE.
          </h2>
          <p className="text-base sm:text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl font-normal leading-relaxed">
            Have a bold product vision, a high-stakes design system to architect, or an experimental digital experience? Let’s talk.
          </p>
        </div>

        {/* Contact Split Grid: Direct Links & Interactive Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Quick Connect & Socials */}
          <div className="lg:col-span-5 space-y-8">
            {/* One-Click Copy Email Pill Box */}
            <div className="p-6 rounded-2xl bg-white/70 dark:bg-[#131726]/90 border border-black/10 dark:border-white/10 space-y-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">
                  // DIRECT INBOX
                </span>
                <span className="font-mono-tag text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  RESPONSE &lt; 24H
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-mono-tag font-bold text-neutral-900 dark:text-white break-all">
                {DESIGNER_INFO.email}
              </div>

              <button
                id="copy-email-button"
                onClick={handleCopyEmail}
                className="w-full py-3 rounded-full bg-[#2644F4] hover:bg-[#1c38e0] text-white font-mono-tag font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-lg shadow-[#2644F4]/25"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                <span>{copied ? 'EMAIL COPIED TO CLIPBOARD!' : 'COPY EMAIL ADDRESS'}</span>
              </button>
            </div>

            {/* Social Channels Network */}
            <div className="space-y-3">
              <span className="font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">
                // CONTACT CHANNELS & CREDENTIALS
              </span>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'PHONE / 电话', handle: DESIGNER_INFO.phone, url: `tel:${DESIGNER_INFO.phone}` },
                  { name: 'WECHAT / 微信', handle: DESIGNER_INFO.wechat, url: '#' },
                  { name: 'UNIVERSITY / 学校', handle: '福州大学 (双一流 211)', url: '#' },
                  { name: 'MAJOR / 专业', handle: '产品设计 · 二等奖学金', url: '#' },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#2644F4] flex items-center justify-between group transition-all"
                  >
                    <div>
                      <div className="font-mono-tag text-xs font-bold text-neutral-900 dark:text-white group-hover:text-[#2644F4]">
                        {s.name}
                      </div>
                      <div className="font-mono-tag text-[10px] text-neutral-500 font-semibold mt-0.5">
                        {s.handle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Coordinates */}
            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#2644F4] shrink-0" />
              <span>{DESIGNER_INFO.location} · 积极寻求产品体验设计 / UI/UX 实习与全职机会</span>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-[#131726]/90 border border-black/10 dark:border-white/10 shadow-2xl space-y-6 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2644F4]" />
                  <span className="font-mono-tag text-sm font-bold text-neutral-900 dark:text-white">
                    // START A CONVERSATION
                  </span>
                </div>
                <span className="font-mono-tag text-xs text-neutral-500">
                  EST. RESPONSE: SAME DAY
                </span>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#2644F4] text-white mx-auto flex items-center justify-center font-bold shadow-lg shadow-[#2644F4]/30">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
                    Transmission Received.
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 font-mono-tag text-xs max-w-md mx-auto">
                    Thanks for reaching out, {name}! I will review your project details and get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      audio.playClick(600);
                      setSubmitted(false);
                    }}
                    className="px-6 py-2 rounded-full border border-black/20 dark:border-white/20 text-xs font-mono-tag text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  >
                    SEND ANOTHER NOTE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">
                        YOUR NAME / BRAND
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Rivera"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white font-mono-tag text-sm focus:border-[#2644F4] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white font-mono-tag text-sm focus:border-[#2644F4] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type Select */}
                  <div className="space-y-1.5">
                    <label className="font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">
                      PROJECT SCOPE
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'Product Design',
                        'Design System',
                        'Spatial & WebGL',
                        'Advisory / Sprint'
                      ].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            audio.playClick(600);
                            setProjectType(t);
                          }}
                          className={`py-2 px-2 text-center rounded-lg text-xs font-mono-tag font-bold transition-all ${
                            projectType === t
                              ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30'
                              : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 uppercase font-bold">
                      PROJECT BRIEF / OBJECTIVES
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your product, timeline, and what you aim to achieve..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white font-mono-tag text-sm focus:border-[#2644F4] focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#2644F4] hover:bg-[#1a37dd] text-white font-mono-tag font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer shadow-lg shadow-[#2644F4]/30 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'TRANSMITTING MESSAGE...' : 'SEND INQUIRY'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
