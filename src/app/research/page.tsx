"use client";

import { useState } from "react";
import { 
  BarChart2, Users, DollarSign, Layers, ShieldAlert, 
  HelpCircle, CheckCircle2, XCircle, Calculator, Compass, 
  Sparkles, Heart, AlertTriangle, ArrowRight, UserPlus, Info
} from "lucide-react";

// Competitor data definitions
const COMPETITORS = [
  { name: "EverAfter", ads: "No Ads", rsvp: "Real-time Sync", seating: "Interactive Visual", crew: "Collaborative Roles", flexibility: "Modular Hub", price: "Free Tier / Pro" },
  { name: "Zola / The Knot", ads: "Heavy Ads & Sponsor Placements", rsvp: "Proprietary Forms", seating: "Basic Table Grid", crew: "No Helper Roles", flexibility: "Rigid Template", price: "Free (Monetized on Registry/Ads)" },
  { name: "Excel / Sheets", ads: "No Ads", rsvp: "None (Manual Input)", seating: "None", crew: "No Role Sync", flexibility: "High (Formulas Only)", price: "Free / Office Subscription" },
  { name: "Notion Planners", ads: "No Ads", rsvp: "Manual / Mock", seating: "Database Kanban", crew: "Workspace Invites", flexibility: "High (Steep Curve)", price: "Free / Paid Workspace" }
];

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState("problem");
  const [matrixFilter, setMatrixFilter] = useState("all");

  // Calculator inputs
  const [guests, setGuests] = useState(150);
  const [budget, setBudget] = useState(30000);
  const [vendors, setVendors] = useState(8);
  const [crewCount, setCrewCount] = useState(4);

  // Calculator outputs
  // Stress Score: 0 to 100
  const rawStress = (guests * 0.25) + ((budget / 1000) * 0.4) + (vendors * 5.5) - (crewCount * 4.5);
  const stressScore = Math.max(0, Math.min(100, Math.round(rawStress)));

  // Budget Slippage: typical 18% overrun modified by vendors and crew coordination
  const estimatedSlippage = Math.max(0, Math.round((budget * 0.15) + (vendors * 250) - (crewCount * 150)));
  const slippagePercentage = ((estimatedSlippage / budget) * 100).toFixed(0);

  // Get stress tier
  const getStressTier = (score: number) => {
    if (score < 40) return { label: "Mild & Manageable", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25", desc: "You have a solid ratio of helpers to workload. Keep guest lists under control to avoid planning spikes!" };
    if (score < 75) return { label: "Elevated Planning Friction", color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25", desc: "Coordinating this many details will cause stress fatigue. Recruit more crew helpers or delegate tasks early." };
    return { label: "Critical Planning Exhaustion", color: "text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/25", desc: "WARNING: High guest-to-helper ratio and multiple vendor contracts. Severe risk of budget slippage and timeline delays. We recommend deploying a shared planner." };
  };

  const stressTier = getStressTier(stressScore);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. HEADER HERO */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 rounded-full border border-rose-200 bg-rose-50/50 px-3.5 py-1 text-xs font-semibold text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
          <BarChart2 className="h-3.5 w-3.5 text-rose-500" />
          <span>Product Research & Problem Validation</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
          Is Wedding Planning Broken?
        </h1>
        <p className="text-sm md:text-base text-stone-500 dark:text-stone-400 font-light leading-relaxed">
          Proving the problem of budget overruns, coordinator burnout, and sponsored ad clutter through data and direct market comparisons.
        </p>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex justify-center border-b border-stone-200 dark:border-stone-850">
        <div className="flex overflow-x-auto gap-2 pb-px scrollbar-none">
          {[
            { id: "problem", label: "Problem Proof", icon: ShieldAlert },
            { id: "matrix", label: "Competitor Matrix", icon: Layers },
            { id: "calculator", label: "Stress & Slippage Estimator", icon: Calculator },
            { id: "gaps", label: "Market Gaps", icon: Compass },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3.5 text-xs uppercase tracking-wider font-bold border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "border-rose-500 text-rose-600 dark:text-rose-400"
                    : "border-transparent text-stone-500 hover:text-rose-500 hover:border-rose-300 dark:text-stone-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TABS CONTENT */}
      <div className="min-h-[400px]">
        
        {/* TAB 1: PROBLEM PROOF */}
        {activeTab === "problem" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-100">
                The Reality of Wedding Friction
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                Wedding planning is not just romantic—it is a complex logistics operation. Couples act as project managers coordinating five-figure budgets, dozens of guest requirements, and complex time schedules.
              </p>
              
              <div className="space-y-4">
                {[
                  { value: "45%", label: "Budget Slippage", desc: "Percentage of couples who go over budget due to hidden service charges and poor planning trackers." },
                  { value: "200h+", label: "Average Planning Time", desc: "Hours spent planning a single wedding day across 12-18 months of preparation." },
                  { value: "15+", label: "Vendors Coordinated", desc: "Average number of distinct contracts, invoices, and schedules couples must balance." },
                ].map((stat, idx) => (
                  <div key={idx} className="flex space-x-4 p-4 rounded-xl border border-stone-200 bg-white dark:border-stone-850 dark:bg-stone-900/30">
                    <div className="font-serif text-3xl font-bold text-rose-600 dark:text-rose-400 shrink-0">
                      {stat.value}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-stone-800 dark:text-stone-200">{stat.label}</h4>
                      <p className="text-xs text-stone-500 dark:text-stone-450 leading-relaxed font-light">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white/60 p-6 shadow-xl backdrop-blur-md dark:border-stone-800/40 dark:bg-stone-900/60 space-y-6">
              <h3 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Root Causes of Stress
              </h3>
              
              <div className="space-y-4 text-xs md:text-sm text-stone-600 dark:text-stone-450 leading-relaxed font-light">
                <p>
                  <strong>1. High-Stake Decisions:</strong> Because weddings are seen as once-in-a-lifetime events, the emotional weight of every decision (from napkin shades to seating charts) is magnified.
                </p>
                <p>
                  <strong>2. Communication Breakdown:</strong> Spreadsheets lack real-time synchronization between the couple, helpers (crew), and vendors. A single change in guests results in outdated seating charts.
                </p>
                <p>
                  <strong>3. The Sponsored Trap:</strong> Massive directory sites are designed around vendor advertisements. They push sponsored recommendations to users instead of letting users manage their work organically.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100/50 dark:bg-rose-950/10 dark:border-rose-900/20 text-xs text-rose-800 dark:text-rose-300 leading-relaxed font-light">
                <strong className="block font-semibold mb-1">Our Hypothesis:</strong>
                By creating a distraction-free, ad-free couple workspace that models the wedding as a unified dashboard, we can cut administrative friction by 50% and decrease budget overruns.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPETITOR MATRIX */}
        {activeTab === "matrix" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-100">
                  Feature Comparison Matrix
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
                  How EverAfter compares against commercial portals and spreadsheet substitutes.
                </p>
              </div>

              {/* Filtering Controls */}
              <div className="flex gap-2">
                {[
                  { id: "all", label: "Show All" },
                  { id: "collaboration", label: "Collaboration Features" },
                  { id: "adfree", label: "Ad-Free Cleanliness" },
                ].map(ctrl => (
                  <button
                    key={ctrl.id}
                    onClick={() => setMatrixFilter(ctrl.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      matrixFilter === ctrl.id
                        ? "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/10"
                        : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300"
                    }`}
                  >
                    {ctrl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
              <table className="min-w-full divide-y text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-950 font-semibold uppercase tracking-wider text-stone-500">
                  <tr>
                    <th className="px-6 py-4">Alternative</th>
                    <th className={`px-6 py-4 ${matrixFilter === "adfree" ? "bg-rose-500/10 text-rose-700 dark:text-rose-300" : ""}`}>Ad Clutter</th>
                    <th className="px-6 py-4">Guest RSVP Sync</th>
                    <th className="px-6 py-4">Seating Tools</th>
                    <th className={`px-6 py-4 ${matrixFilter === "collaboration" ? "bg-rose-500/10 text-rose-700 dark:text-rose-300" : ""}`}>Crew Delegation</th>
                    <th className="px-6 py-4">Flexibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-850">
                  {COMPETITORS.map((comp, idx) => {
                    const isBrand = comp.name === "EverAfter";
                    return (
                      <tr 
                        key={idx} 
                        className={`transition-colors ${
                          isBrand 
                            ? "bg-rose-500/5 font-semibold text-stone-900 dark:bg-rose-950/20 dark:text-stone-100" 
                            : "text-stone-600 dark:text-stone-400"
                        }`}
                      >
                        <td className="px-6 py-4 font-bold border-r dark:border-stone-850">
                          {comp.name}
                        </td>
                        <td className={`px-6 py-4 ${matrixFilter === "adfree" ? "bg-rose-500/5 font-bold" : ""}`}>
                          {comp.ads.includes("Heavy") ? (
                            <span className="flex items-center text-rose-600 dark:text-rose-450">
                              <XCircle className="h-4 w-4 mr-1.5 shrink-0" />
                              {comp.ads}
                            </span>
                          ) : (
                            <span className="flex items-center text-emerald-600 dark:text-emerald-450">
                              <CheckCircle2 className="h-4 w-4 mr-1.5 shrink-0" />
                              {comp.ads}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">{comp.rsvp}</td>
                        <td className="px-6 py-4">{comp.seating}</td>
                        <td className={`px-6 py-4 ${matrixFilter === "collaboration" ? "bg-rose-500/5 font-bold" : ""}`}>
                          {comp.crew.includes("No") ? (
                            <span className="flex items-center text-stone-400">
                              <XCircle className="h-4 w-4 mr-1.5 shrink-0" />
                              {comp.crew}
                            </span>
                          ) : (
                            <span className="flex items-center text-emerald-600 dark:text-emerald-450">
                              <CheckCircle2 className="h-4 w-4 mr-1.5 shrink-0" />
                              {comp.crew}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">{comp.flexibility}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: STRESS ESTIMATOR */}
        {activeTab === "calculator" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in">
            {/* Sliders Form */}
            <div className="space-y-6 bg-stone-50 dark:bg-stone-900/30 p-6 rounded-2xl border border-stone-200 dark:border-stone-850">
              <h3 className="font-serif font-bold text-xl text-stone-800 dark:text-stone-100 flex items-center">
                <Calculator className="h-5 w-5 text-rose-500 mr-2" />
                Planning Parameter Inputs
              </h3>
              
              <div className="space-y-5">
                {/* Sliders: Guests */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-500">Target Guest Count</span>
                    <span className="text-rose-600 font-bold">{guests} Guests</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-stone-200 accent-rose-500 cursor-pointer dark:bg-stone-800"
                  />
                </div>

                {/* Sliders: Budget */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-500">Total Budget Allocation</span>
                    <span className="text-rose-600 font-bold">${budget.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="2500"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-stone-200 accent-rose-500 cursor-pointer dark:bg-stone-800"
                  />
                </div>

                {/* Sliders: Vendors */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-500">Vendor Contracts (Venue, Caterer, Florist, DJ...)</span>
                    <span className="text-rose-600 font-bold">{vendors} Vendors</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={vendors}
                    onChange={(e) => setVendors(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-stone-200 accent-rose-500 cursor-pointer dark:bg-stone-800"
                  />
                </div>

                {/* Sliders: Crew */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-500">Coordination Helpers (Crew/Family)</span>
                    <span className="text-rose-600 font-bold">{crewCount} Crew Members</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={crewCount}
                    onChange={(e) => setCrewCount(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-stone-200 accent-rose-500 cursor-pointer dark:bg-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Dashboard */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xl dark:border-stone-800 dark:bg-stone-900/60 space-y-6">
                
                {/* Stress Index Result */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Wedding Stress Index
                    </span>
                    <span className="text-xs font-mono font-bold text-rose-500">{stressScore}/100</span>
                  </div>
                  
                  {/* Gauge Bar */}
                  <div className="h-3.5 w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        stressScore < 40 
                          ? "bg-emerald-500" 
                          : stressScore < 75 
                          ? "bg-amber-500" 
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${stressScore}%` }} 
                    />
                  </div>

                  <div className={`p-4 rounded-xl border text-xs leading-relaxed font-light ${stressTier.color}`}>
                    <strong className="block font-semibold mb-1">{stressTier.label}</strong>
                    {stressTier.desc}
                  </div>
                </div>

                <div className="h-px bg-stone-100 dark:bg-stone-800/80" />

                {/* Budget Slippage Result */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Est. Budget Slippage
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-rose-600 dark:text-rose-400">
                      ${estimatedSlippage.toLocaleString()}
                    </h3>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Slippage Ratio
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100">
                      +{slippagePercentage}%
                    </h3>
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 dark:text-stone-500 font-light italic leading-relaxed">
                  *Estimations based on standard industry patterns. Budgets exceed estimates due to contract signing increments (+15%), vendor tips, and guest counts. Incorporating a visual coordinator reduces slippage risks.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MARKET GAPS */}
        {activeTab === "gaps" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {[
              {
                title: "1. Sponsored Ad Distractions",
                desc: "Existing commercial platforms are funded by selling featured placements to vendor agencies. This creates conflict, pushing high-margin vendors rather than helpful organizers.",
                gap: "EverAfter operates entirely ad-free, prioritizing transparent, user-driven planning features."
              },
              {
                title: "2. Static Worksheet Isolation",
                desc: "Spreadsheets allow mathematical calculations but fail to provide real-time notification alerts, automated visual table seats, and live guest RSVP synchronization.",
                gap: "EverAfter blends database syncing with layout editors to represent changes instantly."
              },
              {
                title: "3. Helper Delegation Blindspot",
                desc: "Existing wedding sites restrict administration to a single couple login. This creates coordination bottlenecks, blocking bridesmaids or coordinators from accessing the workspace.",
                gap: "EverAfter features Crew Delegation panels allowing couples to allocate granular read/write rights."
              }
            ].map((gap, idx) => (
              <div 
                key={idx} 
                className="rounded-2xl border border-stone-200 bg-white/40 p-6 shadow-sm hover:shadow-md transition-all dark:border-stone-850 dark:bg-stone-900/30 space-y-4"
              >
                <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100">
                  {gap.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                  {gap.desc}
                </p>
                <div className="h-px bg-stone-100 dark:bg-stone-800" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-800 dark:text-rose-450 tracking-wider">
                    Our Solution Gap
                  </span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
                    {gap.gap}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* 4. PRE-FOOTER CTA SECTION */}
      <section className="max-w-4xl mx-auto pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-900 to-rose-700 px-8 py-10 text-center space-y-6 shadow-xl">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,theme(colors.gold-500/10),transparent)]" />
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Experience the Distraction-Free Workspace
          </h2>
          <p className="mx-auto max-w-xl text-xs md:text-sm text-rose-100 font-light leading-relaxed">
            Ready to convert research theory into planning action? Launch our active dashboard to model your seating coordinates, crew tasks, and dynamic budget planners.
          </p>
          <div className="pt-2">
            <a
              href="/workspace"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-xs font-semibold text-rose-900 hover:bg-stone-50 transition-all hover:-translate-y-0.5 shadow-md"
            >
              Open Couple Workspace
            </a>
          </div>
        </div>
      </section>
      
    </div>
  );
}
