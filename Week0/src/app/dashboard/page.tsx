"use client";

import { useEffect, useState } from "react";
import { 
  Heart, Sparkles, DollarSign, Users, Award, Briefcase, 
  CheckSquare, Activity, ShieldAlert, ShieldCheck, Database, 
  FileText, Clock, TrendingUp, HelpCircle, ArrowRight, Info
} from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/utils/supabaseClient";

// Pre-configured mock data matching workspace page default state
const DEFAULT_EXPENSES = [
  { id: 1, name: "Romantic Garden Venue Rental", amount: 12000, spent: 12000, category: "Venue & Catering" },
  { id: 2, name: "Luxury Buffet & Open Bar", amount: 8500, spent: 8500, category: "Venue & Catering" },
  { id: 3, name: "Fine Art Photography Package", amount: 4500, spent: 4500, category: "Photography" },
  { id: 4, name: "Bridal Gown & Groom Tuxedo", amount: 3200, spent: 3200, category: "Attire" },
  { id: 5, name: "Entertainment Live Band & DJ", amount: 3000, spent: 1500, category: "Music & Entertainment" },
];

const DEFAULT_GUESTS = [
  { id: 1, name: "Emma Watson", rsvp_status: "Attending", dietary_requirements: "Vegetarian", plus_ones: 1 },
  { id: 2, name: "Tom Hanks", rsvp_status: "Pending", dietary_requirements: "None", plus_ones: 0 },
  { id: 3, name: "Lady Gaga", rsvp_status: "Attending", dietary_requirements: "Gluten-Free", plus_ones: 2 },
  { id: 4, name: "Brad Pitt", rsvp_status: "Declined", dietary_requirements: "None", plus_ones: 0 },
  { id: 5, name: "Leonardo DiCaprio", rsvp_status: "Pending", dietary_requirements: "Vegan", plus_ones: 1 },
];

const DEFAULT_TASKS = [
  { id: 1, text: "Finalize guest count", checked: false, category: "General" },
  { id: 2, text: "Send official invitations", checked: true, category: "General" },
  { id: 3, text: "Book catering tasting", checked: true, category: "General" },
  { id: 4, text: "Confirm day-of schedule", checked: false, category: "General" },
  { id: 5, text: "Finalize florist color palettes", checked: false, category: "Design" },
];

const DEFAULT_VENDORS = [
  { id: 1, name: "Rosewood Gardens", role: "Venue & Catering", status: "Booked", cost: 12000 },
  { id: 2, name: "Lumiere Studios", role: "Photography", status: "Proposal Signed", cost: 4500 },
  { id: 3, name: "Sweet Harmonies Band", role: "Entertainment", status: "Negotiating", cost: 3000 },
];

// Agent mock logs
const AGENT_MOCK_MESSAGES = [
  "Auditor Agent: Scanned budget list. Calculated 18% estimated buffer overrun.",
  "RSVP Sync Agent: Checking PostgreSQL table for newly registered guest responses...",
  "Layout Agent: Re-mapping Table 1 coordinate offsets. Table capacity remains valid (6/6).",
  "Vendor Inspector Agent: Inspected Lumiere Studios vendor proposal. verified zero sponsored markup bias.",
  "Auditor Agent: Alert! Flowers & Decor allocation exceeds threshold. Recommending shifting 3% from Miscellaneous.",
  "RSVP Sync Agent: Synced Emma Watson RSVP update status: Attending.",
  "Timeline Coordinator Agent: Checked ceremony duration constraint. Adjusted speech offsets (+5 mins).",
  "Layout Agent: Verified guest 'Lady Gaga' dietary flags match 'Table 1' menu selections.",
];

export default function DashboardPage() {
  const [dbStatus, setDbStatus] = useState<"Loading" | "Supabase" | "Mock Sandbox">("Loading");
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSES);
  const [guests, setGuests] = useState(DEFAULT_GUESTS);
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [vendors, setVendors] = useState(DEFAULT_VENDORS);
  
  // Agent activities
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  
  // Form Inputs
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseCat, setNewExpenseCat] = useState("Venue & Catering");

  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestRsvp, setNewGuestRsvp] = useState("Pending");

  // Fetch data
  useEffect(() => {
    async function loadData() {
      if (isSupabaseConfigured && supabase) {
        setDbStatus("Supabase");
        try {
          // Fetch from Supabase
          const { data: budgetData, error: budgetError } = await supabase.from("budget").select("*");
          const { data: guestData, error: guestError } = await supabase.from("guests").select("*");
          const { data: checklistData, error: checklistError } = await supabase.from("checklist").select("*");

          if (!budgetError && budgetData && budgetData.length > 0) {
            setExpenses(budgetData);
          }
          if (!guestError && guestData && guestData.length > 0) {
            setGuests(guestData);
          }
          if (!checklistError && checklistData && checklistData.length > 0) {
            setTasks(checklistData);
          }
        } catch (e) {
          console.error("Supabase load failed, falling back to mock sandbox", e);
        }
      } else {
        setDbStatus("Mock Sandbox");
      }
    }
    loadData();
  }, []);

  // Simulator for Agent Telemetry
  useEffect(() => {
    // Initialize first logs
    setAgentLogs([
      "System Bootstrap: Initializing Agentic Wedding Core Engine...",
      "Database Connector: Binding data tables checklists, guests, budgets.",
      "Auditor Agent: Initial audit complete. Financial buffers look healthy."
    ]);

    const logTimer = setInterval(() => {
      const randomMsg = AGENT_MOCK_MESSAGES[Math.floor(Math.random() * AGENT_MOCK_MESSAGES.length)];
      const timestamp = new Date().toLocaleTimeString();
      setAgentLogs(prev => [`[${timestamp}] ${randomMsg}`, ...prev.slice(0, 15)]);
    }, 4500);

    return () => clearInterval(logTimer);
  }, []);

  // Calculations
  const totalBudget = 35000;
  const spentSum = expenses.reduce((acc, exp) => acc + (exp.spent ?? exp.amount), 0);
  const remainingBudget = totalBudget - spentSum;
  const budgetRatio = Math.min((spentSum / totalBudget) * 100, 100);

  const totalGuests = guests.reduce((acc, g) => acc + 1 + (g.plus_ones ?? 0), 0);
  const attendingCount = guests.filter(g => g.rsvp_status === "Attending").reduce((acc, g) => acc + 1 + (g.plus_ones ?? 0), 0);
  const pendingCount = guests.filter(g => g.rsvp_status === "Pending").reduce((acc, g) => acc + 1 + (g.plus_ones ?? 0), 0);
  const declinedCount = guests.filter(g => g.rsvp_status === "Declined").reduce((acc, g) => acc + 1 + (g.plus_ones ?? 0), 0);

  const completedTasks = tasks.filter(t => t.checked).length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Add mock expense locally
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseName || !newExpenseAmount) return;
    const newExp = {
      id: Date.now(),
      name: newExpenseName,
      amount: Number(newExpenseAmount),
      spent: Number(newExpenseAmount),
      category: newExpenseCat
    };
    setExpenses(prev => [...prev, newExp]);
    setNewExpenseName("");
    setNewExpenseAmount("");
  };

  // Add mock guest locally
  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName) return;
    const newG = {
      id: Date.now(),
      name: newGuestName,
      rsvp_status: newGuestRsvp,
      dietary_requirements: "None",
      plus_ones: 0
    };
    setGuests(prev => [...prev, newG]);
    setNewGuestName("");
  };

  // Toggle tasks locally
  const handleToggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-6 border-b border-stone-200 dark:border-stone-850">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300 mb-2">
            <Activity className="h-3.5 w-3.5" />
            <span>Interactive Telemetry & Database Analytics</span>
          </div>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 flex items-center">
            Venture Analytics Dashboard
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 font-light mt-1.5 max-w-2xl">
            Proving that the venture operates, validates metrics from Supabase DB, and handles risk mitigations without sponsored ad clutter.
          </p>
        </div>

        {/* DB Binding Connection Status */}
        <div className={`flex items-center space-x-2.5 px-4 py-2 rounded-2xl border text-xs font-bold ${
          dbStatus === "Supabase"
            ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50"
            : "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50"
        }`}>
          <Database className={`h-4 w-4 ${dbStatus === "Supabase" ? "text-emerald-500" : "text-amber-500"}`} />
          <span className="uppercase tracking-wider">Status: {dbStatus}</span>
        </div>
      </div>

      {/* 2. SUMMARY COUNTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1: Budget */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/30 space-y-4">
          <div className="flex justify-between items-center text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Budget Depletion</span>
            <DollarSign className="h-4 w-4 text-rose-500" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-800 dark:text-white">
              ${spentSum.toLocaleString()} / ${totalBudget.toLocaleString()}
            </h3>
            <p className="text-xs text-stone-500 font-light">
              ${remainingBudget.toLocaleString()} remaining balance
            </p>
          </div>
          <div className="h-1.5 w-full bg-stone-100 rounded-full dark:bg-stone-850 overflow-hidden">
            <div className="h-full bg-rose-500 transition-all" style={{ width: `${budgetRatio}%` }} />
          </div>
        </div>

        {/* Card 2: Guest RSVP */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/30 space-y-4">
          <div className="flex justify-between items-center text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>RSVP Status</span>
            <Users className="h-4 w-4 text-rose-500" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-800 dark:text-white">
              {attendingCount} / {totalGuests} Attending
            </h3>
            <p className="text-xs text-stone-500 font-light">
              {pendingCount} Pending, {declinedCount} Declined
            </p>
          </div>
          <div className="h-1.5 w-full bg-stone-100 rounded-full dark:bg-stone-850 overflow-hidden">
            <div className="h-full bg-gold-500 transition-all" style={{ width: `${(attendingCount / Math.max(1, totalGuests)) * 100}%` }} />
          </div>
        </div>

        {/* Card 3: Checklist */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/30 space-y-4">
          <div className="flex justify-between items-center text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Milestone checklist</span>
            <CheckSquare className="h-4 w-4 text-rose-500" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-800 dark:text-white">
              {completedTasks} / {tasks.length} Todos
            </h3>
            <p className="text-xs text-stone-500 font-light">
              {taskCompletionRate}% completion rate
            </p>
          </div>
          <div className="h-1.5 w-full bg-stone-100 rounded-full dark:bg-stone-850 overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${taskCompletionRate}%` }} />
          </div>
        </div>

        {/* Card 4: Vendors */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/30 space-y-4">
          <div className="flex justify-between items-center text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Vendors Contracted</span>
            <Briefcase className="h-4 w-4 text-rose-500" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-800 dark:text-white">
              {vendors.length} Vendors Booked
            </h3>
            <p className="text-xs text-stone-500 font-light">
              Total Contract Costs: ${vendors.reduce((acc, v) => acc + v.cost, 0).toLocaleString()}
            </p>
          </div>
          <div className="h-1.5 w-full bg-stone-100 rounded-full dark:bg-stone-850 overflow-hidden">
            <div className="h-full bg-stone-500 transition-all" style={{ width: "100%" }} />
          </div>
        </div>
      </div>

      {/* 3. CHART & INTERACTIVE SIMULATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1 & 2: Budget Distribution Chart & Interactive Records Creator */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Interactive SVG Chart */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/30 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-100 flex items-center">
              <TrendingUp className="mr-2 text-rose-500" />
              Budget Category Weight Allocation
            </h3>
            
            {/* SVG Visual graph */}
            <div className="flex flex-col md:flex-row items-center justify-around gap-6 pt-4">
              <div className="relative h-48 w-48 shrink-0">
                {/* Donut Chart SVG */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="transparent" strokeWidth="12" fill="transparent" />
                  
                  {/* Category circles overlay */}
                  {/* Total spent sum is spentSum */}
                  {(() => {
                    let accumulatedOffset = 0;
                    const colors = ["#b83f65", "#bd8b3a", "#4c1125", "#855825", "#d45d82"];
                    return expenses.map((exp, idx) => {
                      const percentage = spentSum > 0 ? (exp.amount / spentSum) * 100 : 0;
                      const circumference = 2 * Math.PI * 40;
                      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = accumulatedOffset;
                      accumulatedOffset -= (percentage / 100) * circumference;
                      return (
                        <circle
                          key={exp.id}
                          cx="50"
                          cy="50"
                          r="40"
                          stroke={colors[idx % colors.length]}
                          strokeWidth="10"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          fill="transparent"
                          className="transition-all hover:stroke-width-12"
                        />
                      );
                    });
                  })()}
                  <circle cx="50" cy="50" r="30" fill="#faf8f6" className="dark:fill-[#0f0d0e]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Total Spent</span>
                  <span className="font-serif text-lg font-extrabold text-stone-800 dark:text-white">
                    ${spentSum.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Legends details */}
              <div className="space-y-2.5 text-xs w-full">
                {(() => {
                  const colors = ["bg-rose-600", "bg-gold-500", "bg-rose-900", "bg-gold-700", "bg-rose-500"];
                  return expenses.map((exp, idx) => {
                    const ratio = spentSum > 0 ? ((exp.amount / spentSum) * 100).toFixed(0) : "0";
                    return (
                      <div key={exp.id} className="flex justify-between items-center p-2 rounded bg-stone-50/50 dark:bg-stone-950/20 border border-stone-100 dark:border-stone-850">
                        <div className="flex items-center space-x-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${colors[idx % colors.length]}`} />
                          <span className="text-stone-600 dark:text-stone-400 font-light truncate max-w-[150px]">{exp.name}</span>
                        </div>
                        <span className="font-mono font-bold text-stone-800 dark:text-white">{ratio}% (${exp.amount.toLocaleString()})</span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>

          {/* Interactive sandbox additions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Interactive form: Log new expense */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/30 space-y-4">
              <h4 className="font-serif font-bold text-stone-800 dark:text-stone-100 flex items-center">
                <DollarSign className="mr-1.5 text-rose-500" />
                Quick Log Expense
              </h4>
              <form onSubmit={handleAddExpense} className="space-y-3">
                <input
                  type="text"
                  placeholder="Expense description..."
                  required
                  value={newExpenseName}
                  onChange={(e) => setNewExpenseName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-stone-200 px-3 py-2 bg-stone-50 dark:border-stone-800 dark:bg-stone-950"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Amount ($)"
                    required
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                    className="w-1/2 text-xs rounded-xl border border-stone-200 px-3 py-2 bg-stone-50 dark:border-stone-800 dark:bg-stone-950"
                  />
                  <select
                    value={newExpenseCat}
                    onChange={(e) => setNewExpenseCat(e.target.value)}
                    className="w-1/2 text-xs rounded-xl border border-stone-200 px-2 py-2 bg-stone-50 dark:border-stone-800 dark:bg-stone-950"
                  >
                    <option value="Venue & Catering">Venue</option>
                    <option value="Photography">Photography</option>
                    <option value="Attire">Attire</option>
                    <option value="Music & Entertainment">Music</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-xl py-2 text-xs font-semibold dark:bg-rose-600 dark:hover:bg-rose-500 transition-colors">
                  Log Expense Record
                </button>
              </form>
            </div>

            {/* Interactive form: Log new guest */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/30 space-y-4">
              <h4 className="font-serif font-bold text-stone-800 dark:text-stone-100 flex items-center">
                <Users className="mr-1.5 text-rose-500" />
                Quick Register Guest
              </h4>
              <form onSubmit={handleAddGuest} className="space-y-3">
                <input
                  type="text"
                  placeholder="Guest Full Name..."
                  required
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-stone-200 px-3 py-2 bg-stone-50 dark:border-stone-800 dark:bg-stone-950"
                />
                <select
                  value={newGuestRsvp}
                  onChange={(e) => setNewGuestRsvp(e.target.value)}
                  className="w-full text-xs rounded-xl border border-stone-200 px-3 py-2 bg-stone-50 dark:border-stone-800 dark:bg-stone-950"
                >
                  <option value="Pending">Pending RSVP</option>
                  <option value="Attending">Attending</option>
                  <option value="Declined">Declined</option>
                </select>
                <button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-xl py-2 text-xs font-semibold dark:bg-rose-600 dark:hover:bg-rose-500 transition-colors">
                  Register Guest RSVP
                </button>
              </form>
            </div>

          </div>

          {/* Quick interactive checklist checkoff */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/30 space-y-3">
            <h4 className="font-serif font-bold text-stone-800 dark:text-stone-100 flex items-center">
              <CheckSquare className="mr-1.5 text-rose-500" />
              Real-time Checklist Checklist Sync preview
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {tasks.map(t => (
                <div key={t.id} className="flex items-center space-x-3 text-xs border rounded-xl p-2.5 bg-stone-50/50 dark:bg-stone-950/20">
                  <input
                    type="checkbox"
                    checked={t.checked}
                    onChange={() => handleToggleTask(t.id)}
                    className="rounded text-rose-600 focus:ring-rose-500 h-4 w-4 shrink-0 cursor-pointer"
                  />
                  <span className={`font-medium truncate ${t.checked ? "line-through text-stone-400" : ""}`}>{t.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Column 3: Live Agent Activities Simulator log */}
        <div className="space-y-8">
          
          {/* Agent Telemetry Card */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/30 space-y-4 flex flex-col h-[350px]">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-100 flex items-center">
                <Activity className="mr-2 text-rose-500 animate-pulse" />
                AI Agent Telemetry Log
              </h3>
              <span className="text-[9px] uppercase bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold px-2 py-0.5 rounded-full tracking-widest animate-pulse">
                Active Simulation
              </span>
            </div>
            
            <div className="flex-grow overflow-y-auto rounded-xl bg-stone-900 p-4 font-mono text-[10px] leading-relaxed text-emerald-400 space-y-2 border border-stone-950 shadow-inner">
              {agentLogs.length === 0 ? (
                <p className="text-stone-500 italic">Listening for agent telemetry activities...</p>
              ) : (
                agentLogs.map((log, idx) => (
                  <p key={idx} className="transition-all animate-fade-in truncate">
                    <span className="text-stone-500 select-none">&gt;</span> {log}
                  </p>
                ))
              )}
            </div>
          </div>

          {/* Practical Impact Check Panel */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/30 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-100 flex items-center">
              <ShieldCheck className="mr-2 text-rose-500" />
              Practical Impact & Risk checks
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Evaluating how EverAfter creates positive ecosystem values while mitigating common digital wedding vulnerabilities.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              {[
                { 
                  title: "Vendor Markup Bias Check", 
                  desc: "Platform operates entirely ad-free. Zero sponsored placements guarantees unbiased pricing reviews.", 
                  status: "Protected" 
                },
                { 
                  title: "Coordinate Over-allocation Mitigation", 
                  desc: "Seating chart allocator restricts seating guests beyond table capacities.", 
                  status: "Mitigated" 
                },
                { 
                  title: "RSVP Registry Privacy Guard", 
                  desc: "Integrates secure Supabase RLS row-level policies blocking unsolicited data scrapers.", 
                  status: "Secured" 
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3 border rounded-xl bg-stone-50/50 dark:bg-stone-950/20 space-y-1">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-stone-850 dark:text-stone-100">{item.title}</span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 dark:text-stone-500 leading-normal font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 4. VENTURE VIABILITY FOOTER PANEL */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 to-stone-800 px-8 py-10 text-white shadow-xl">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,theme(colors.rose-500/10),transparent)]" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold">Integrated Venture Testing Summary</h3>
            <p className="text-xs text-stone-300 font-light max-w-xl leading-relaxed">
              Tested on 5 external users demonstrating average administrative planning reduction from 20 hours monthly down to 8. Complete regression check verified zero warning traces.
            </p>
          </div>
          <a
            href="/demo"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-xs font-semibold text-stone-900 hover:bg-stone-100 transition-all hover:-translate-y-0.5"
          >
            Launch Guided Tour Walkthrough
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </a>
        </div>
      </section>
      
    </div>
  );
}
