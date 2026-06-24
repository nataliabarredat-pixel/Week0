"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Heart, Sparkles, DollarSign, Users, Award, Briefcase, Clock, 
  CheckSquare, Image as ImageIcon, Camera, Globe, ArrowRight, 
  MapPin, Check, Plus, Trash2, Calendar, Layers
} from "lucide-react";

// Feature list definitions
const FEATURES = [
  {
    icon: DollarSign,
    name: "Budget Planner",
    desc: "Allocate funds, log purchases, and track remaining budgets with visual progress indicators.",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400"
  },
  {
    icon: Users,
    name: "Guest Tracker",
    desc: "Manage RSVPs, track dietary requirements, and organize contact details efficiently.",
    color: "bg-gold-500/10 text-gold-600 dark:text-gold-400"
  },
  {
    icon: Award,
    name: "Seating Planner",
    desc: "Graphically arrange table assignments and view seating charts instantly.",
    color: "bg-stone-500/10 text-stone-600 dark:text-stone-300"
  },
  {
    icon: Briefcase,
    name: "Vendor Management",
    desc: "Maintain profiles, contracts, and payment timelines for caterers, DJs, and photographers.",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400"
  },
  {
    icon: Clock,
    name: "Day-Of Timeline",
    desc: "Draft an hourly schedule for decorators, caterers, and the wedding party.",
    color: "bg-gold-500/10 text-gold-600 dark:text-gold-400"
  },
  {
    icon: CheckSquare,
    name: "Checklist Manager",
    desc: "Detailed modular checklist broken down by monthly milestones.",
    color: "bg-stone-500/10 text-stone-600 dark:text-stone-300"
  },
  {
    icon: ImageIcon,
    name: "Inspiration Board",
    desc: "Assemble color schemes, dress designs, and flower themes in a visual gallery.",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400"
  },
  {
    icon: Users,
    name: "Wedding Crew Coordinator",
    desc: "Apportion helper roles, toast guidelines, and tasks to bridesmaids and groomsmen.",
    color: "bg-gold-500/10 text-gold-600 dark:text-gold-400"
  },
  {
    icon: Camera,
    name: "Photo Gallery",
    desc: "Compile precious engagement shots and capture live guest uploads on the big day.",
    color: "bg-stone-500/10 text-stone-600 dark:text-stone-300"
  },
  {
    icon: Globe,
    name: "Public Wedding Site",
    desc: "Instantly deploy a beautiful, custom web portal for RSVPs, registries, and venue maps.",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400"
  }
];

// Roadmap phases definition
const ROADMAP_PHASES = [
  {
    phase: "Phase 1: Foundation",
    status: "Completed",
    date: "Current Release",
    description: "Launch of Next.js workspace framework, baseline Tailwind v4 layout design, basic interactive offline client widgets.",
    milestones: ["GitHub Repository Created", "Vercel live deployment configured", "Next.js core design shell running", "Documented .env variables and docs page"]
  },
  {
    phase: "Phase 2: Couple Workspace",
    status: "In Progress",
    date: "Ongoing Development",
    description: "Detailed client-side widgets for all 10 modules: dynamic guest sheets, live drag-and-drop seating coordinates, active budget estimators.",
    milestones: ["Budget calculator charts", "Modular checklist widgets", "RSVP list filters", "Public wedding site live mock builder"]
  },
  {
    phase: "Phase 3: Supabase Sync",
    status: "Up Next",
    date: "Next Sprint",
    description: "Integration of real-time database syncing using Supabase Postgres tables to save checklist items, budgets, and guest lists in the cloud.",
    milestones: ["Supabase connection middleware", "Postgres DB schemas", "Real-time subscriptions", "Secure row-level authentication"]
  },
  {
    phase: "Phase 4: Collaboration",
    status: "Planned",
    date: "Future Roadmap",
    description: "Multi-user invitation sharing for couples and professional wedding planners to edit coordinates in real-time.",
    milestones: ["Shared session notifications", "PDF seating exporter", "Vendor proposal uploaders", "Custom domain binding"]
  }
];

export default function Home() {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 365, hours: 12, minutes: 30, seconds: 45 });
  
  // Interactive checklist demo state
  const [demoTasks, setDemoTasks] = useState([
    { id: 1, text: "Book romantic wedding venue", checked: true },
    { id: 2, text: "Hire professional photographer", checked: false },
    { id: 3, text: "Send save-the-date cards", checked: false },
  ]);
  const [newTaskInput, setNewTaskInput] = useState("");

  // Interactive roadmap tab state
  const [activeRoadmapTab, setActiveRoadmapTab] = useState(0);

  // A/B Headline testing state
  const [abVersion, setAbVersion] = useState<"A" | "B">("A");

  useEffect(() => {
    // Check local storage for assigned version
    let assigned = localStorage.getItem("everafter_ab_headline_version") as "A" | "B" | null;
    if (!assigned) {
      assigned = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("everafter_ab_headline_version", assigned);
    }
    setAbVersion(assigned);

    // Track impression in localStorage if not already counted this session
    const countedSession = sessionStorage.getItem("everafter_ab_counted_session");
    if (!countedSession) {
      const impKey = `everafter_ab_impressions_${assigned}`;
      const currentImp = parseInt(localStorage.getItem(impKey) || "0");
      localStorage.setItem(impKey, String(currentImp + 1));
      sessionStorage.setItem("everafter_ab_counted_session", "true");
    }
  }, []);

  const handleCtaClick = () => {
    const clickKey = `everafter_ab_clicks_${abVersion}`;
    const currentClicks = parseInt(localStorage.getItem(clickKey) || "0");
    localStorage.setItem(clickKey, String(currentClicks + 1));
  };

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleDemoTask = (id: number) => {
    setDemoTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const handleAddDemoTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setDemoTasks(prev => [
      ...prev,
      { id: Date.now(), text: newTaskInput.trim(), checked: false }
    ]);
    setNewTaskInput("");
  };

  const handleDeleteDemoTask = (id: number) => {
    setDemoTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="flex flex-col space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.rose.100/30),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.rose.950/20),transparent)]" />
        <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-gold-200/10 blur-3xl dark:bg-gold-500/5" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="mx-auto inline-flex items-center space-x-2 rounded-full border border-rose-200 bg-rose-50/50 px-3.5 py-1.5 text-xs font-semibold text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
            <Sparkles className="h-3.5 w-3.5 text-rose-500" />
            <span>Welcome to the Future of Wedding Planning</span>
          </div>

          <h1 className="mx-auto max-w-4xl font-serif text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-stone-900 dark:text-stone-100">
            {abVersion === "B" ? (
              <>
                <span className="bg-gradient-to-r from-rose-700 via-rose-500 to-gold-500 bg-clip-text text-transparent dark:from-rose-400 dark:to-gold-400">
                  EverAfter
                </span>{" "}
                | The Premium Wedding Workspace for Discerning Couples
              </>
            ) : (
              <>
                Design Your Perfect Day with{" "}
                <span className="bg-gradient-to-r from-rose-700 via-rose-500 to-gold-500 bg-clip-text text-transparent dark:from-rose-400 dark:to-gold-400">
                  EverAfter
                </span>
              </>
            )}
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-stone-500 dark:text-stone-400 leading-relaxed font-light">
            Plan your budget, arrange seats, log RSVPs, and coordinate vendors. Our complete, high-end couple workspace transforms complexity into sheer romance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/workspace"
              onClick={handleCtaClick}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-rose-600 to-rose-500 px-8 text-base font-semibold text-white shadow-lg shadow-rose-600/10 hover:from-rose-500 hover:to-rose-400 transition-all hover:-translate-y-0.5"
            >
              Enter Couple Workspace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full border border-stone-200 bg-white/50 px-8 text-base font-semibold text-stone-700 hover:bg-stone-50 transition-all hover:-translate-y-0.5 dark:border-stone-800 dark:bg-stone-900/40 dark:text-stone-300 dark:hover:bg-stone-900"
            >
              Explore Documentation
            </Link>
          </div>

          {/* Interactive Countdown Timer */}
          <div className="pt-10 max-w-2xl mx-auto">
            <div className="rounded-2xl border border-stone-200/50 bg-white/60 p-6 shadow-xl backdrop-blur-md dark:border-stone-800/40 dark:bg-stone-900/60 dark:shadow-stone-950/20">
              <div className="flex items-center justify-center space-x-2 text-rose-600 dark:text-rose-400 mb-4 font-serif text-sm font-semibold tracking-wider uppercase">
                <Calendar className="h-4 w-4" />
                <span>Countdown to Our Dream Wedding</span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Minutes" },
                  { value: timeLeft.seconds, label: "Seconds" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="font-serif text-3xl md:text-5xl font-bold text-stone-800 dark:text-stone-100">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500 mt-1 font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM WORKSPACE FEATURES GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            A Complete Couple Workspace
          </h2>
          <p className="mx-auto max-w-2xl text-stone-500 dark:text-stone-400 font-light">
            Every feature you need to organize, visualize, and execute your dream wedding day without the stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className="group relative rounded-2xl border border-stone-200/50 bg-white/40 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-rose-200/40 dark:border-stone-800/40 dark:bg-stone-900/30 dark:hover:border-stone-700/60"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`rounded-xl p-2.5 ${feat.color} transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-100">
                    {feat.name}
                  </h3>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE MINI DEMO & ROADMAP SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Interactive Checklist Widget Demo */}
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300">
            <Heart className="h-3.5 w-3.5 fill-rose-500/20" />
            <span>Interactive Live Preview</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Try a Live Feature Right Now
          </h2>
          <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            Get a taste of our planning workspace! Add or check off initial goals. Your interactive selections update instantly below and simulate database writes.
          </p>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-lg dark:border-stone-800 dark:bg-stone-900">
            <h3 className="font-serif font-bold text-lg mb-4 text-stone-800 dark:text-stone-100 flex items-center">
              <CheckSquare className="h-5 w-5 text-rose-500 mr-2" />
              Interactive Checklist Preview
            </h3>

            <form onSubmit={handleAddDemoTask} className="flex space-x-2 mb-4">
              <input
                type="text"
                placeholder="Add another wedding todo..."
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                className="flex-grow rounded-lg border border-stone-200 px-3.5 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 dark:border-stone-800 dark:bg-stone-950 dark:text-white"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white hover:bg-stone-800 dark:bg-rose-600 dark:hover:bg-rose-500 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </button>
            </form>

            <ul className="space-y-2.5">
              {demoTasks.map(t => (
                <li 
                  key={t.id}
                  className={`flex items-center justify-between rounded-lg p-3 border transition-colors ${
                    t.checked 
                      ? "bg-rose-50/20 border-rose-100/50 line-through text-stone-400 dark:bg-stone-950/20 dark:border-stone-800/40" 
                      : "bg-stone-50/50 border-stone-100 text-stone-700 dark:bg-stone-950/40 dark:border-stone-900 dark:text-stone-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleToggleDemoTask(t.id)}
                      className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                        t.checked 
                          ? "bg-rose-500 border-rose-500 text-white" 
                          : "border-stone-300 hover:border-rose-500 dark:border-stone-700"
                      }`}
                    >
                      {t.checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </button>
                    <span className="text-sm font-medium">{t.text}</span>
                  </div>
                  <button 
                    onClick={() => handleDeleteDemoTask(t.id)}
                    className="text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dynamic Interactive Platform Roadmap */}
        <div id="roadmap" className="scroll-mt-24 space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-800 dark:text-gold-300">
            <Layers className="h-3.5 w-3.5" />
            <span>Product Development Road</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Interactive Roadmap
          </h2>
          <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            Click through our active release timeline below. EverAfter is designed to support modular milestones, from static layouts to real-time Supabase cluster integrations.
          </p>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-lg dark:border-stone-800 dark:bg-stone-900">
            {/* Roadmap Phase Tabs */}
            <div className="flex overflow-x-auto border-b border-stone-200 dark:border-stone-800 gap-2 pb-2">
              {ROADMAP_PHASES.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveRoadmapTab(idx)}
                  className={`text-xs font-semibold uppercase tracking-wider py-2 px-3.5 rounded-lg whitespace-nowrap transition-all ${
                    activeRoadmapTab === idx
                      ? "bg-rose-500 text-white"
                      : "text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 dark:text-stone-400"
                  }`}
                >
                  Phase {idx + 1}
                </button>
              ))}
            </div>

            {/* Selected Roadmap Phase Details */}
            <div className="pt-4 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100">
                  {ROADMAP_PHASES[activeRoadmapTab].phase}
                </h4>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                  ROADMAP_PHASES[activeRoadmapTab].status === "Completed"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : ROADMAP_PHASES[activeRoadmapTab].status === "In Progress"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                    : "bg-stone-100 text-stone-800 dark:bg-stone-950/50 dark:text-stone-400"
                }`}>
                  {ROADMAP_PHASES[activeRoadmapTab].status}
                </span>
              </div>
              <p className="text-xs text-stone-400 dark:text-stone-500 font-medium">
                Target: {ROADMAP_PHASES[activeRoadmapTab].date}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                {ROADMAP_PHASES[activeRoadmapTab].description}
              </p>
              
              <div className="space-y-2 border-t border-stone-100 pt-3 dark:border-stone-800/50">
                <h5 className="text-[10px] uppercase tracking-wider font-bold text-rose-800 dark:text-rose-400">
                  Key Deliverables
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {ROADMAP_PHASES[activeRoadmapTab].milestones.map((m, mIdx) => (
                    <li key={mIdx} className="flex items-center space-x-2 text-stone-600 dark:text-stone-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. PRE-FOOTER CTA SECTION */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-900 to-rose-700 px-8 py-12 md:p-16 text-center space-y-6 shadow-2xl">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,theme(colors.gold-500/20),transparent)]" />
          <Heart className="h-12 w-12 mx-auto text-gold-300 fill-gold-300/10 animate-float" />
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            Ready to Plan Your EverAfter?
          </h2>
          <p className="mx-auto max-w-xl text-sm md:text-base text-rose-100 font-light leading-relaxed">
            Jump directly into the planner, play with the tools, review our detailed local configuration steps, and witness state-of-the-art wedding planning.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/workspace"
              onClick={handleCtaClick}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-rose-900 hover:bg-stone-50 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Open Couple Workspace
            </Link>
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full border border-rose-400/50 text-white hover:bg-white/10 px-8 text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              Read Implementation Docs
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
