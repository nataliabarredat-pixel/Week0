"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart, Sparkles, DollarSign, Users, Award, Briefcase, Clock,
  CheckSquare, Image as ImageIcon, Camera, Globe, ArrowRight,
  Plus, Trash2, Check, ArrowRightCircle
} from "lucide-react";

// Definitions of the 10 modules
const MODULES = [
  {
    id: "budget",
    name: "Budget Planner",
    description: "Keep track of all spending, allocate category caps, and view live percentage utilization charts.",
    icon: DollarSign,
    themeColor: "text-rose-500 bg-rose-500/10 dark:text-rose-400"
  },
  {
    id: "guests",
    name: "Guest RSVP Tracker",
    description: "Manage guest lists, RSVPs, dietary needs, and plus-ones with automated response analytics.",
    icon: Users,
    themeColor: "text-gold-500 bg-gold-500/10 dark:text-gold-400"
  },
  {
    id: "seating",
    name: "Seating Chart Planner",
    description: "Assign guests to tables virtually and check spacing configurations.",
    icon: Award,
    themeColor: "text-rose-500 bg-rose-500/10 dark:text-rose-400"
  },
  {
    id: "vendors",
    name: "Vendor Coordinator",
    description: "Organize vendor profiles, deposit records, contact information, and billing logs.",
    icon: Briefcase,
    themeColor: "text-gold-500 bg-gold-500/10 dark:text-gold-400"
  },
  {
    id: "timeline",
    name: "Day-Of Timeline",
    description: "Build an hourly timetable for hair prep, setup, photos, ceremony, reception, and departure.",
    icon: Clock,
    themeColor: "text-rose-500 bg-rose-500/10 dark:text-rose-400"
  },
  {
    id: "checklist",
    name: "Wedding Checklist",
    description: "A comprehensive checklist structured by monthly countdown markers to ensure nothing is missed.",
    icon: CheckSquare,
    themeColor: "text-gold-500 bg-gold-500/10 dark:text-gold-400"
  },
  {
    id: "inspiration",
    name: "Inspiration Board",
    description: "Create mood boards with dress types, lighting concepts, and flower presets.",
    icon: ImageIcon,
    themeColor: "text-rose-500 bg-rose-500/10 dark:text-rose-400"
  },
  {
    id: "crew",
    name: "Wedding Crew Coordinator",
    description: "Assign key tasks to bridesmaids, groomsmen, and helpers to coordinate day-of duties.",
    icon: Users,
    themeColor: "text-gold-500 bg-gold-500/10 dark:text-gold-400"
  },
  {
    id: "gallery",
    name: "Photo Gallery",
    description: "Upload early engagement shots and share a QR code for guests to upload live pictures.",
    icon: Camera,
    themeColor: "text-rose-500 bg-rose-500/10 dark:text-rose-400"
  },
  {
    id: "publicsite",
    name: "Public Wedding Site",
    description: "Create a beautiful, personalized, public-facing portal for your guests to view maps and RSVP.",
    icon: Globe,
    themeColor: "text-gold-500 bg-gold-500/10 dark:text-gold-400"
  }
];

export default function ProductPage() {
  const [activeModule, setActiveModule] = useState("budget");

  // --- 1. Budget Preview State ---
  const [budgetLimit, setBudgetLimit] = useState(35000);
  const [budgetExpenses, setBudgetExpenses] = useState([
    { name: "Luxury Reception Venue", cost: 15000 },
    { name: "Gourmet Catering", cost: 8500 },
    { name: "Floral & Decor Design", cost: 4200 },
  ]);
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseCost, setNewExpenseCost] = useState("");

  const totalSpent = budgetExpenses.reduce((sum, item) => sum + item.cost, 0);
  const spentPercent = Math.min((totalSpent / budgetLimit) * 100, 100);

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseName.trim() || !newExpenseCost) return;
    setBudgetExpenses(prev => [...prev, { name: newExpenseName.trim(), cost: parseFloat(newExpenseCost) }]);
    setNewExpenseName("");
    setNewExpenseCost("");
  };

  // --- 2. RSVP Preview State ---
  const [guests, setGuests] = useState([
    { name: "Alexander Hamilton", rsvp: "Attending", meal: "Beef" },
    { name: "Eliza Schuyler", rsvp: "Attending", meal: "Vegetarian" },
    { name: "Aaron Burr", rsvp: "Pending", meal: "None" },
  ]);
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestRsvp, setNewGuestRsvp] = useState("Attending");

  const addGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    setGuests(prev => [...prev, { name: newGuestName.trim(), rsvp: newGuestRsvp, meal: "None" }]);
    setNewGuestName("");
  };

  // --- 3. Seating State ---
  const [tables, setTables] = useState([
    { number: 1, seats: ["Sophia (Bride)", "Leo (Groom)", "Emma (MOH)", "David (Best Man)"] },
    { number: 2, seats: ["Grandma Helen", "Uncle Frank", "Cousin Clara", "Aunt Beatrice"] },
  ]);
  const [selectedTableIdx, setSelectedTableIdx] = useState(0);

  // --- 4. Vendor State ---
  const [vendors, setVendors] = useState([
    { name: "La Bella Rosa Florals", category: "Decor", quote: 4500, paid: 1500 },
    { name: "Echo Sound DJs", category: "Music", quote: 2200, paid: 2200 },
    { name: "Sweet Slice Bakery", category: "Cake", quote: 950, paid: 400 },
  ]);
  const [vendorFilter, setVendorFilter] = useState("All");

  // --- 5. Timeline State ---
  const [timelineItems, setTimelineItems] = useState([
    { time: "10:00 AM", title: "Hair & Makeup Prep", location: "Bridal Suite" },
    { time: "02:00 PM", title: "First Look Ceremony", location: "Garden Gate" },
    { time: "04:30 PM", title: "Formal Vow Exchange", location: "Cathedral Hall" },
    { time: "06:00 PM", title: "Reception Cocktails", location: "Veranda Patio" },
  ]);

  // --- 6. Checklist State ---
  const [checklist, setChecklist] = useState([
    { task: "Secure Vow venue bookings", checked: true },
    { task: "Design dress invitations", checked: true },
    { task: "Taste gourmet cake samples", checked: false },
    { task: "Finalize floral bouquets", checked: false },
  ]);

  // --- 7. Inspiration State ---
  const [pins, setPins] = useState([
    { image: "🌸", tag: "Floral", title: "Blush Rose Bouquets" },
    { image: "🕯️", tag: "Lighting", title: "Warm Fairy lights" },
    { image: "🍽️", tag: "Table", title: "Golden Plate charger setup" },
  ]);

  // --- 8. Wedding Crew State ---
  const [crew, setCrew] = useState([
    { name: "Emma Watson", role: "Maid of Honor", duty: "Organize Bachelorette" },
    { name: "David Beckham", role: "Best Man", duty: "Guard the Wedding Rings" },
  ]);

  // --- 9. Photo Gallery State ---
  const [photoCount, setPhotoCount] = useState(3);

  // --- 10. Public Site State ---
  const [coupleHeadline, setCoupleHeadline] = useState("Sophia & Leo");
  const [siteTheme, setSiteTheme] = useState("classic-rose");

  return (
    <div className="flex flex-col space-y-20 pb-20 pt-10">
      {/* Hero Title */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center space-x-2 rounded-full border border-rose-200 bg-rose-50/50 px-3.5 py-1.5 text-xs font-semibold text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
          <Sparkles className="h-3.5 w-3.5 text-rose-500" />
          <span>Interactive Product Showcase</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Explore the{" "}
          <span className="bg-gradient-to-r from-rose-700 via-rose-500 to-gold-500 bg-clip-text text-transparent dark:from-rose-400 dark:to-gold-400">
            Workspace Features
          </span>
        </h1>
        <p className="text-lg text-stone-500 dark:text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
          EverAfter is equipped with 10 high-fidelity planning modules. Select any module below to interact with its live mockup preview right now.
        </p>
      </section>

      {/* Main Interactive Explorer Panel */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Module List Selector */}
          <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto pr-2">
            <h2 className="font-serif text-2xl font-bold mb-4 text-stone-800 dark:text-stone-200">
              Platform Modules
            </h2>
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              const isActive = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`w-full text-left rounded-xl p-4 border transition-all duration-300 flex items-start space-x-4 ${
                    isActive
                      ? "bg-white border-rose-200 shadow-md translate-x-1 dark:bg-stone-900 dark:border-rose-950/50"
                      : "bg-white/40 border-stone-200/50 hover:bg-white/80 dark:bg-stone-900/30 dark:border-stone-800/40 dark:hover:bg-stone-900/60"
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${mod.themeColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-stone-850 dark:text-stone-100 flex items-center gap-1.5">
                      {mod.name}
                      {isActive && <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mt-1 font-light">
                      {mod.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: High-Fidelity SPA Interactive Viewport */}
          <div className="lg:col-span-7 flex flex-col justify-stretch">
            <div className="rounded-2xl border border-rose-100/50 bg-stone-50/50 shadow-xl backdrop-blur-md dark:border-stone-800/40 dark:bg-stone-900/40 p-6 flex-grow flex flex-col justify-between">
              
              {/* Viewport Header */}
              <div className="flex items-center justify-between border-b border-stone-200/60 dark:border-stone-800/50 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="h-3.5 w-3.5 rounded-full bg-rose-500" />
                  <span className="h-3.5 w-3.5 rounded-full bg-gold-400" />
                  <span className="h-3.5 w-3.5 rounded-full bg-stone-300" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-450">
                  Live Viewport Preview: {MODULES.find(m => m.id === activeModule)?.name}
                </span>
              </div>

              {/* Viewport Body (Dynamic Render based on activeModule) */}
              <div className="flex-grow flex flex-col justify-center">
                
                {/* 1. BUDGET PREVIEW */}
                {activeModule === "budget" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Luxury Budget Allocator</h4>
                      <span className="text-sm font-semibold text-stone-550 dark:text-stone-400">Total: ${budgetLimit.toLocaleString()}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400">
                        <span>Spent: ${totalSpent.toLocaleString()}</span>
                        <span>{spentPercent.toFixed(1)}% Allocated</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-rose-500 to-gold-500 transition-all duration-550" 
                          style={{ width: `${spentPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* List */}
                    <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {budgetExpenses.map((exp, idx) => (
                        <li key={idx} className="flex justify-between text-sm py-2 px-3 bg-white/60 dark:bg-stone-900/60 rounded-lg border border-stone-200/50 dark:border-stone-800/40">
                          <span className="text-stone-700 dark:text-stone-300">{exp.name}</span>
                          <span className="font-semibold text-stone-900 dark:text-stone-100">${exp.cost.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Form */}
                    <form onSubmit={addExpense} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Expense name"
                        value={newExpenseName}
                        onChange={(e) => setNewExpenseName(e.target.value)}
                        className="flex-grow rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-3 py-1.5 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
                      />
                      <input 
                        type="number" 
                        placeholder="Cost ($)"
                        value={newExpenseCost}
                        onChange={(e) => setNewExpenseCost(e.target.value)}
                        className="w-24 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-3 py-1.5 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
                      />
                      <button type="submit" className="bg-rose-600 text-white rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-rose-500 transition-colors">
                        Add
                      </button>
                    </form>
                  </div>
                )}

                {/* 2. GUESTS PREVIEW */}
                {activeModule === "guests" && (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Guest RSVP Board</h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                        {guests.filter(g => g.rsvp === "Attending").length} Confirmed
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {guests.map((g, idx) => (
                        <li key={idx} className="flex justify-between items-center text-xs py-2 px-3 bg-white/60 dark:bg-stone-900/60 rounded-lg border border-stone-200/50 dark:border-stone-800/40">
                          <div>
                            <span className="font-medium text-stone-850 dark:text-stone-200">{g.name}</span>
                            <span className="text-[10px] text-stone-400 ml-2">Diet: {g.meal}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            g.rsvp === "Attending" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {g.rsvp}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={addGuest} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Guest full name"
                        value={newGuestName}
                        onChange={(e) => setNewGuestName(e.target.value)}
                        className="flex-grow rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-3 py-1.5 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
                      />
                      <select 
                        value={newGuestRsvp}
                        onChange={(e) => setNewGuestRsvp(e.target.value)}
                        className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-3 py-1.5 text-xs text-stone-850 dark:text-stone-250 focus:outline-none"
                      >
                        <option value="Attending">Attending</option>
                        <option value="Pending">Pending</option>
                      </select>
                      <button type="submit" className="bg-rose-600 text-white rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-rose-500 transition-colors">
                        Add
                      </button>
                    </form>
                  </div>
                )}

                {/* 3. SEATING PREVIEW */}
                {activeModule === "seating" && (
                  <div className="space-y-5">
                    <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Table Coordinate Planner</h4>
                    
                    <div className="flex gap-3">
                      {tables.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTableIdx(idx)}
                          className={`flex-grow py-2.5 px-4 rounded-xl border text-center font-serif text-sm transition-all ${
                            selectedTableIdx === idx 
                              ? "bg-rose-500/10 border-rose-300 text-rose-800 dark:text-rose-300 dark:border-rose-900" 
                              : "bg-white/50 border-stone-200/50 hover:bg-white dark:bg-stone-900/50 dark:border-stone-800"
                          }`}
                        >
                          Table {t.number} ({t.seats.length} guests)
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-stone-950/80 border border-stone-200/50 dark:border-stone-800/40 relative min-h-36 flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full border-4 border-gold-300/60 dark:border-gold-600/30 flex items-center justify-center font-serif text-xs font-bold text-stone-400 uppercase tracking-widest bg-stone-50/50 dark:bg-stone-900/50 z-0 shadow-inner">
                        Table {tables[selectedTableIdx].number}
                      </div>

                      {/* Display seating positions */}
                      {tables[selectedTableIdx].seats.map((seat, idx) => {
                        const angles = [0, 90, 180, 270];
                        const angle = angles[idx % 4] * (Math.PI / 180);
                        const radius = 64; // Distance from center
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                          <div 
                            key={idx} 
                            style={{ transform: `translate(${x}px, ${y}px)` }}
                            className="absolute bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-md transition-all z-10 hover:scale-105 cursor-pointer max-w-[90px] truncate"
                            title={seat}
                          >
                            {seat}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. VENDORS PREVIEW */}
                {activeModule === "vendors" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Vendor Payment Ledger</h4>
                      <div className="flex gap-1">
                        {["All", "Decor", "Music"].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setVendorFilter(cat)}
                            className={`text-[9px] uppercase tracking-wider font-semibold py-1 px-2.5 rounded-md border ${
                              vendorFilter === cat 
                                ? "bg-stone-900 border-stone-900 text-white dark:bg-rose-600 dark:border-rose-600" 
                                : "bg-white/50 border-stone-200 dark:bg-stone-900/50 dark:border-stone-800 text-stone-500"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {vendors
                        .filter(v => vendorFilter === "All" || v.category === vendorFilter)
                        .map((v, idx) => {
                          const outstanding = v.quote - v.paid;
                          return (
                            <div key={idx} className="p-3 bg-white/60 dark:bg-stone-900/60 rounded-xl border border-stone-200/50 dark:border-stone-800/40 flex justify-between items-center">
                              <div>
                                <span className="text-xs font-semibold block text-stone-800 dark:text-stone-200">{v.name}</span>
                                <span className="text-[10px] text-stone-400 uppercase tracking-wide">{v.category} &bull; Quote: ${v.quote}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-bold text-stone-850 dark:text-stone-100 block">Paid: ${v.paid}</span>
                                <span className={`text-[10px] ${outstanding === 0 ? "text-emerald-500 font-semibold" : "text-amber-500"}`}>
                                  {outstanding === 0 ? "Paid In Full" : `Due: $${outstanding}`}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                )}

                {/* 5. TIMELINE PREVIEW */}
                {activeModule === "timeline" && (
                  <div className="space-y-4">
                    <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Day-Of Operations Guide</h4>
                    
                    <div className="relative border-l border-stone-300 dark:border-stone-800 pl-4 space-y-4 py-2 ml-2">
                      {timelineItems.map((item, idx) => (
                        <div key={idx} className="relative group">
                          {/* Dot indicator */}
                          <span className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full border border-rose-300 bg-white dark:bg-stone-900 ring-4 ring-stone-50/50 dark:ring-stone-950/50 transition-all group-hover:bg-rose-500" />
                          <div className="text-xs">
                            <span className="font-semibold text-rose-700 dark:text-rose-400 block">{item.time}</span>
                            <span className="font-medium text-stone-850 dark:text-stone-200">{item.title}</span>
                            <span className="text-stone-450 block text-[10px]">Location: {item.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. CHECKLIST PREVIEW */}
                {activeModule === "checklist" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Task Milestones</h4>
                      <span className="text-xs font-bold text-stone-400">
                        {checklist.filter(c => c.checked).length} of {checklist.length} done
                      </span>
                    </div>

                    <div className="space-y-2">
                      {checklist.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setChecklist(prev => prev.map((c, cIdx) => cIdx === idx ? { ...c, checked: !c.checked } : c));
                          }}
                          className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl border transition-all text-xs ${
                            item.checked 
                              ? "bg-rose-500/5 border-rose-100/30 line-through text-stone-400 dark:border-stone-800/20" 
                              : "bg-white/60 border-stone-200/50 text-stone-800 dark:bg-stone-900/60 dark:border-stone-800/40 dark:text-stone-200 hover:border-rose-300"
                          }`}
                        >
                          <span className={`h-4.5 w-4.5 border rounded flex items-center justify-center shrink-0 ${
                            item.checked ? "bg-rose-600 border-rose-600 text-white" : "border-stone-300 dark:border-stone-700"
                          }`}>
                            {item.checked && <Check className="h-3.5 w-3.5" />}
                          </span>
                          <span>{item.task}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. INSPIRATION PREVIEW */}
                {activeModule === "inspiration" && (
                  <div className="space-y-4">
                    <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Theme Inspiration Moodboard</h4>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {pins.map((pin, idx) => (
                        <div key={idx} className="group relative rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all dark:border-stone-800 dark:bg-stone-900 text-center p-3">
                          <div className="text-3xl py-3 select-none bg-stone-50 dark:bg-stone-950 rounded-lg mb-2">
                            {pin.image}
                          </div>
                          <span className="text-[8px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300">
                            {pin.tag}
                          </span>
                          <h5 className="text-[10px] font-semibold text-stone-800 dark:text-stone-200 mt-2 truncate">
                            {pin.title}
                          </h5>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. CREW PREVIEW */}
                {activeModule === "crew" && (
                  <div className="space-y-4">
                    <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Wedding Party Tasks</h4>

                    <div className="space-y-2">
                      {crew.map((member, idx) => (
                        <div key={idx} className="p-3 bg-white/60 dark:bg-stone-900/60 rounded-xl border border-stone-200/50 dark:border-stone-800/40 flex justify-between items-center">
                          <div>
                            <span className="text-xs font-bold text-stone-800 dark:text-stone-100 block">{member.name}</span>
                            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">{member.role}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-rose-800 dark:text-rose-450 block font-semibold">Duty</span>
                            <span className="text-[11px] text-stone-600 dark:text-stone-300">{member.duty}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. GALLERY PREVIEW */}
                {activeModule === "gallery" && (
                  <div className="space-y-4">
                    <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Guest Snapshot Gallery</h4>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: photoCount }).map((_, idx) => (
                        <div key={idx} className="aspect-square bg-stone-200 dark:bg-stone-850 rounded-xl border border-stone-300/45 dark:border-stone-800/45 flex items-center justify-center text-stone-400 dark:text-stone-500 font-serif relative overflow-hidden group">
                          <ImageIcon className="h-6 w-6 absolute transition-transform group-hover:scale-110" />
                          <span className="absolute bottom-1 right-1.5 text-[8px] bg-black/40 text-white px-1.5 py-0.5 rounded-full uppercase">
                            IMG_{idx + 1}.jpg
                          </span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setPhotoCount(prev => (prev < 6 ? prev + 1 : 3))}
                      className="w-full text-center text-xs font-semibold border border-rose-200/50 text-rose-750 hover:bg-rose-500/5 py-2.5 rounded-xl transition-all dark:border-stone-800 dark:text-rose-450"
                    >
                      {photoCount < 6 ? "Simulate Guest Image Upload" : "Reset Gallery Preview"}
                    </button>
                  </div>
                )}

                {/* 10. PUBLIC SITE PREVIEW */}
                {activeModule === "publicsite" && (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Custom Public Portal Customizer</h4>
                      <div className="flex gap-1.5">
                        {["classic-rose", "elegant-gold"].map(theme => (
                          <button
                            key={theme}
                            onClick={() => setSiteTheme(theme)}
                            className={`text-[9px] font-bold uppercase py-1 px-2 border rounded-md ${
                              siteTheme === theme 
                                ? "bg-rose-500 text-white border-rose-500" 
                                : "bg-white/40 border-stone-200 dark:bg-stone-900/40 text-stone-500"
                            }`}
                          >
                            {theme.replace("-", " ")}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 items-stretch">
                      {/* Name input */}
                      <div className="w-1/3 flex flex-col justify-center">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-rose-800 dark:text-rose-450 mb-1">
                          Headline Text
                        </label>
                        <input
                          type="text"
                          value={coupleHeadline}
                          onChange={(e) => setCoupleHeadline(e.target.value)}
                          className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-3.5 py-2 text-xs font-medium text-stone-800 dark:text-stone-200 focus:outline-none"
                        />
                      </div>

                      {/* Mockup Mobile Phone View */}
                      <div className="flex-grow p-4 rounded-xl border border-stone-300/40 bg-stone-50 shadow-inner dark:border-stone-800 dark:bg-stone-950 flex flex-col justify-center items-center text-center space-y-2 min-h-28">
                        <div className={`p-4 rounded-lg w-full max-w-xs transition-all ${
                          siteTheme === "classic-rose" 
                            ? "bg-rose-50 border border-rose-100 text-rose-950" 
                            : "bg-amber-50/30 border border-gold-200 text-amber-950 dark:text-gold-200"
                        }`}>
                          <Heart className="h-4.5 w-4.5 mx-auto text-rose-500 fill-rose-500/20 mb-1" />
                          <h5 className="font-serif text-sm font-bold tracking-wide">{coupleHeadline}</h5>
                          <p className="text-[8px] tracking-widest uppercase text-stone-400 mt-1 font-semibold">
                            Save the Date &bull; September 2026
                          </p>
                          <span className="inline-block mt-2 text-[8px] bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            RSVP Online
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Viewport Footer CTA */}
              <div className="border-t border-stone-200/50 pt-4 mt-6 flex justify-between items-center text-xs">
                <span className="text-stone-400">All logic operates instantly in-browser.</span>
                <Link
                  href="/pricing"
                  className="flex items-center text-rose-600 font-semibold hover:text-rose-500 dark:text-rose-450 dark:hover:text-rose-400 hover:underline gap-0.5"
                >
                  Configure Quote for all Features
                  <ArrowRightCircle className="h-4 w-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Feature grid with 10 modules for quick scan */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <h2 className="font-serif text-3xl font-bold text-center text-stone-900 dark:text-stone-100">
          The Full 10-Module Planning Toolkit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveModule(mod.id);
                  // Scroll to main explorer viewport
                  document.getElementById("explorer")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white/40 border border-stone-200/50 p-4 rounded-xl text-center flex flex-col items-center hover:-translate-y-1 hover:bg-white transition-all dark:bg-stone-900/30 dark:border-stone-800/40 dark:hover:bg-stone-900/60"
              >
                <div className={`p-2 rounded-lg mb-3 ${mod.themeColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-sm font-bold text-stone-850 dark:text-stone-100">
                  {mod.name}
                </h3>
              </button>
            );
          })}
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-rose-900 to-rose-700 rounded-3xl p-10 text-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,theme(colors.gold-500/20),transparent)]" />
          <Heart className="h-10 w-10 mx-auto text-gold-300 fill-gold-300/10 mb-4 animate-float" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Create Your Custom Wedding Workspace Plan
          </h2>
          <p className="text-xs md:text-sm text-rose-100 font-light max-w-xl mx-auto leading-relaxed mb-6">
            Customize add-ons like SMS guest notifications, select annual discounts, calculate dynamic storage pricing, and request your custom plan quote.
          </p>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-xs font-semibold text-rose-900 hover:bg-stone-50 transition-all hover:-translate-y-0.5 shadow-md"
          >
            Construct Your Custom Plan & Quote
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
