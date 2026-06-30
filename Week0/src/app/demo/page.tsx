"use client";

import { useState } from "react";
import { 
  Heart, Sparkles, Compass, CheckSquare, DollarSign, Users, 
  Award, Briefcase, ChevronRight, Play, Terminal, Shield, 
  UserCheck, HelpCircle, Layers, ArrowRight, CheckCircle2, ChevronLeft
} from "lucide-react";

// Walkthrough Steps Definition
const STEPS = [
  {
    title: "1. Budget Allocator",
    desc: "Allocate expenses organically without vendor ad clutter. Define your ceiling and log invoices instantly.",
    actionText: "Simulate Log $4,500 Photography Contract",
    icon: DollarSign,
    details: "Your total budget is $35,000. When you click, the Budget Auditor Agent will verify the transaction bounds and allocate funds under 'Photography'."
  },
  {
    title: "2. RSVP Registry",
    desc: "Collect RSVPs, dietary requirement details, and guest plus-ones in a single, safe PostgreSQL table.",
    actionText: "Simulate RSVP from Emma Watson (+1 guest)",
    icon: Users,
    details: "The RSVP Sync Agent will register the arrival of Emma Watson and update table counts instantly."
  },
  {
    title: "3. Seating Arranger",
    desc: "Assign guests to tables with active constraint checks. Seating tools prevent seating more guests than table capacities allow.",
    actionText: "Simulate Seating Emma Watson at Table 1",
    icon: Award,
    details: "The Seating Specialist Agent will place the guest at Table 1, checking capacity and dietary compatibility warnings."
  },
  {
    title: "4. Crew Coordinator",
    desc: "Delegate granular coordination roles (Maid of Honor, Best Man, Family helpers) with volunteer checklists.",
    actionText: "Simulate Crew Assignment for Sophia Miller",
    icon: UserCheck,
    details: "The Crew Coordinator Agent assigns the tasks, creating individual checklist scopes for helpers."
  },
  {
    title: "5. Public Site Deployer",
    desc: "Instantly publish your personalized couple wedding portal showing wedding story details, map locations, and registries.",
    actionText: "Simulate Custom Wedding Site Compilation",
    icon: Compass,
    details: "The deployment engine compiles static pages and hosts them on Vercel Edge Serverless clusters."
  }
];

// AI Agent Map Nodes
const AGENTS = [
  {
    id: "rsvp",
    name: "RSVP Coordinator Agent",
    role: "Database compiler & Diet auditor",
    icon: Users,
    trace: [
      "THOUGHT: Checking incoming guest table updates for newly registered RSVPs.",
      "ACTION: Load row ID 'guest-emma-watson' from guests table.",
      "OBSERVATION: RSVP marked as 'Attending'. Diet flag set to 'Vegetarian'. Plus-ones count set to 1.",
      "ACTION: Verify seating constraints for Emma Watson.",
      "RESULT: Seating checks passed. Menu warning sent to caterer (1 Vegetarian meal added to Table 1)."
    ]
  },
  {
    id: "budget",
    name: "Budget Auditor Agent",
    role: "Buffer balancing & slippage optimizer",
    icon: DollarSign,
    trace: [
      "THOUGHT: Analyzing expense registry entries against total ceiling limit ($35,000).",
      "ACTION: Calculate sum of active expenses: Spent=$28,200. Remaining=$6,800.",
      "OBSERVATION: Vendor invoice 'Fine Art Photography' logged for $4,500.",
      "ACTION: Calculate estimated buffer depletion. Allocations = 80.5%.",
      "RESULT: Slippage ratio set to +18%. Alert threshold logged for miscellaneous bounds."
    ]
  },
  {
    id: "seating",
    name: "Seating Layout Agent",
    role: "Capacity supervisor & constraint planner",
    icon: Award,
    trace: [
      "THOUGHT: Arranging seat configurations. Selected table: Table 1 (Head Table).",
      "ACTION: Load Table 1 details. Capacity limit: 6. Occupied seats: 2.",
      "OBSERVATION: Adding Emma Watson (and plus-one). Total seats would be 4/6. Under limit.",
      "ACTION: Check dietary alignment. Emma Watson is Vegetarian. Table menu is compatible.",
      "RESULT: Guest seated successfully. Seating coordinates synchronized in PostgreSQL database."
    ]
  },
  {
    id: "vendor",
    name: "Vendor Inspector Agent",
    role: "Ad-free proposal auditor",
    icon: Briefcase,
    trace: [
      "THOUGHT: Inspecting new vendor proposal from 'Lumiere Studios'.",
      "ACTION: Analyze cost metrics ($4,500) and service terms.",
      "OBSERVATION: Pricing falls within regional averages. Zero ad sponsored markups detected.",
      "ACTION: Validate contract status. Current proposal marked as 'Proposal Signed'.",
      "RESULT: Proposal verified and logged into vendor coordinations deck."
    ]
  }
];

export default function DemoPage() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [demoState, setDemoState] = useState({
    budgetSpent: 28200,
    attendingCount: 3,
    seatedGuests: ["Lady Gaga", "Tom Hanks"],
    crewTasksAssigned: 2,
    siteCompiled: false
  });
  
  // Agent Console Simulation
  const [selectedAgentId, setSelectedAgentId] = useState("rsvp");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "Select an AI Agent Node above to inspect its execution traces..."
  ]);
  const [isSimulatingAgent, setIsSimulatingAgent] = useState(false);

  // Run mock action in stepper
  const handleSimulateAction = (stepIdx: number) => {
    if (stepIdx === 0) {
      setDemoState(prev => ({ ...prev, budgetSpent: prev.budgetSpent + 4500 }));
    } else if (stepIdx === 1) {
      setDemoState(prev => ({ ...prev, attendingCount: prev.attendingCount + 2 }));
    } else if (stepIdx === 2) {
      setDemoState(prev => ({ 
        ...prev, 
        seatedGuests: [...prev.seatedGuests, "Emma Watson", "Guest (Watson PlusOne)"]
      }));
    } else if (stepIdx === 3) {
      setDemoState(prev => ({ ...prev, crewTasksAssigned: prev.crewTasksAssigned + 1 }));
    } else if (stepIdx === 4) {
      setDemoState(prev => ({ ...prev, siteCompiled: true }));
    }
  };

  // Inspect and simulate Agent Thought Process
  const handleInspectAgent = (agentId: string) => {
    setSelectedAgentId(agentId);
    const agent = AGENTS.find(a => a.id === agentId);
    if (!agent) return;

    setIsSimulatingAgent(true);
    setConsoleLogs([`Initializing telemetry link to ${agent.name}...`]);

    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < agent.trace.length) {
        setConsoleLogs(prev => [...prev, agent.trace[logIdx]]);
        logIdx++;
      } else {
        clearInterval(interval);
        setIsSimulatingAgent(false);
      }
    }, 800);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. HERO HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 rounded-full border border-rose-200 bg-rose-50/50 px-3.5 py-1 text-xs font-semibold text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
          <Compass className="h-3.5 w-3.5 text-rose-500" />
          <span>Interactive Guided Tour Walkthrough</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
          EverAfter Product Walkthrough
        </h1>
        <p className="text-sm md:text-base text-stone-500 dark:text-stone-400 font-light leading-relaxed">
          Walk through the active planner modules, inspect the underlying AI agent workflows, and review the version 2 automation roadmap.
        </p>
      </div>

      {/* 2. GUIDED STEPPER WIZARD */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-md dark:border-stone-800 dark:bg-stone-900/30 space-y-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Stepper controls (left) */}
          <div className="lg:w-1/3 space-y-3">
            <h3 className="font-serif font-bold text-lg text-stone-850 dark:text-stone-100">
              Walkthrough Steps
            </h3>
            <p className="text-xs text-stone-400 font-light mb-4">
              Explore how the platforms core components address coordinate fragmentation.
            </p>
            <div className="space-y-2">
              {STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStepIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStepIdx(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border flex items-start space-x-3 transition-all ${
                      isActive
                        ? "border-rose-500 bg-rose-50/10 text-rose-800 dark:bg-stone-950/40 dark:text-rose-400"
                        : "bg-white border-stone-100 hover:bg-stone-50 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300"
                    }`}
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-rose-500" : "text-stone-400"}`} />
                    <div className="space-y-1 text-xs">
                      <h4 className="font-bold">{step.title}</h4>
                      <p className="text-stone-450 leading-relaxed font-light text-[11px] truncate max-w-[200px]">
                        {step.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Details & Simulated Sandbox Canvas (right) */}
          <div className="lg:w-2/3 p-6 bg-stone-50/50 border rounded-2xl dark:bg-stone-950/30 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-rose-800 dark:text-rose-400">
                {(() => {
                  const CurrentIcon = STEPS[activeStepIdx].icon;
                  return <CurrentIcon className="h-5 w-5" />;
                })()}
                <h3 className="font-serif font-bold text-xl">
                  {STEPS[activeStepIdx].title} Details
                </h3>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                {STEPS[activeStepIdx].desc}
              </p>

              <div className="p-4 rounded-xl bg-white border border-stone-200 dark:bg-stone-900 dark:border-stone-800 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-800 dark:text-rose-400 block">
                  Simulated Workspace Preview state
                </span>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  {STEPS[activeStepIdx].details}
                </p>

                {/* State Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-2 border rounded bg-stone-50 dark:bg-stone-950">
                    <span className="text-[9px] font-sans uppercase font-bold text-stone-400 block">Expenses Logged</span>
                    <span className="font-bold">${demoState.budgetSpent.toLocaleString()}</span>
                  </div>
                  <div className="p-2 border rounded bg-stone-50 dark:bg-stone-950">
                    <span className="text-[9px] font-sans uppercase font-bold text-stone-400 block">Guests Registered</span>
                    <span className="font-bold">{demoState.attendingCount} Attending</span>
                  </div>
                  <div className="p-2 border rounded bg-stone-50 dark:bg-stone-950">
                    <span className="text-[9px] font-sans uppercase font-bold text-stone-400 block">Seated Guests</span>
                    <span className="font-bold">{demoState.seatedGuests.length} seated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Action trigger */}
            <div className="pt-6 border-t border-stone-150 mt-6 dark:border-stone-850 flex justify-between items-center gap-4">
              <button
                onClick={() => handleSimulateAction(activeStepIdx)}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-stone-900 text-white px-6 text-xs font-semibold hover:bg-stone-800 dark:bg-rose-600 dark:hover:bg-rose-500 transition-colors"
              >
                <Play className="h-4 w-4 mr-1.5 shrink-0" />
                {STEPS[activeStepIdx].actionText}
              </button>

              <div className="flex gap-2">
                <button
                  disabled={activeStepIdx === 0}
                  onClick={() => setActiveStepIdx(prev => prev - 1)}
                  className="p-2.5 rounded-xl border border-stone-200 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  disabled={activeStepIdx === STEPS.length - 1}
                  onClick={() => setActiveStepIdx(prev => prev + 1)}
                  className="p-2.5 rounded-xl border border-stone-200 disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE AI AGENT MAP */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-850 dark:text-stone-100 flex items-center justify-center">
            <Layers className="mr-2 text-rose-500" />
            AI Agent Collaboration Flow Map
          </h2>
          <p className="text-xs text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
            Click any AI Agent node below to hook into its standard thought-action loops and simulate execution diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Visual Node flowchart layout */}
          <div className="lg:col-span-2 relative p-8 border rounded-2xl bg-white dark:bg-stone-900/30 flex flex-col justify-center min-h-[300px]">
            {/* Visual connector lines (relative layout) */}
            <div className="absolute inset-0 hidden md:block">
              <svg className="w-full h-full pointer-events-none opacity-20 dark:opacity-10">
                <line x1="25%" y1="30%" x2="50%" y2="50%" stroke="#b83f65" strokeWidth="2" strokeDasharray="4" />
                <line x1="75%" y1="30%" x2="50%" y2="50%" stroke="#bd8b3a" strokeWidth="2" strokeDasharray="4" />
                <line x1="25%" y1="70%" x2="50%" y2="50%" stroke="#bd8b3a" strokeWidth="2" strokeDasharray="4" />
                <line x1="75%" y1="70%" x2="50%" y2="50%" stroke="#b83f65" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
              {AGENTS.map(agent => {
                const AgentIcon = agent.icon;
                const isSelected = selectedAgentId === agent.id;
                return (
                  <button
                    key={agent.id}
                    onClick={() => handleInspectAgent(agent.id)}
                    className={`p-4 rounded-2xl border text-left flex items-start space-x-3.5 transition-all hover:scale-102 ${
                      isSelected
                        ? "border-rose-500 bg-rose-50/20 shadow-md ring-1 ring-rose-500/30 dark:bg-stone-950/40"
                        : "bg-white border-stone-200 dark:bg-stone-900 dark:border-stone-850"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-rose-500 text-white" : "bg-stone-100 text-stone-500 dark:bg-stone-950/40"}`}>
                      <AgentIcon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <h4 className="font-bold text-stone-850 dark:text-stone-100">{agent.name}</h4>
                      <p className="text-[10px] uppercase font-bold text-stone-400">{agent.role}</p>
                      <span className="inline-flex items-center text-[10px] font-semibold text-rose-600 dark:text-rose-400 mt-1">
                        Inspect Engine
                        <ChevronRight className="h-3 w-3 ml-0.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Execution Trace Terminal Console */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-850 dark:bg-stone-900/30 flex flex-col h-[320px]">
            <div className="flex justify-between items-center pb-3 border-b mb-3">
              <h3 className="font-serif font-bold text-stone-850 dark:text-stone-100 flex items-center">
                <Terminal className="h-4.5 w-4.5 text-rose-500 mr-1.5" />
                Agent Thought Engine
              </h3>
              <span className="text-[9px] uppercase bg-stone-950 font-mono text-stone-400 font-bold px-2 py-0.5 rounded border border-stone-800">
                Trace log
              </span>
            </div>

            <div className="flex-grow overflow-y-auto rounded-xl bg-stone-900 p-4 font-mono text-[10px] leading-relaxed text-emerald-400 space-y-2 border border-stone-950">
              {consoleLogs.map((log, idx) => {
                const isSystem = log.includes("Initializing") || log.includes("Select");
                return (
                  <p key={idx} className={`transition-all animate-fade-in ${isSystem ? "text-stone-400 italic" : ""}`}>
                    <span className="text-stone-600 select-none">{isSystem ? "#" : ">"}</span> {log}
                  </p>
                );
              })}
            </div>
            
            {/* Run agent simulation triggers */}
            <button
              disabled={isSimulatingAgent}
              onClick={() => handleInspectAgent(selectedAgentId)}
              className="mt-3 w-full bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-xl py-2 text-xs font-semibold dark:bg-rose-600 dark:hover:bg-rose-500 transition-colors"
            >
              {isSimulatingAgent ? "Running Agent Cycles..." : "Re-Run Agent Diagnostics"}
            </button>
          </div>

        </div>
      </section>

      {/* 4. PRACTICAL IMPACT CHECK SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Core Impact Cards */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-850 dark:text-stone-100 flex items-center">
              <Shield className="mr-2 text-rose-500" />
              Venture Practical Impact Check
            </h2>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              We check the practical impact of our tech layers. Below is how EverAfter implements safety buffers, mitigates markup biases, and addresses representation limits.
            </p>
          </div>

          <div className="space-y-3.5">
            {[
              {
                title: "1. Gender & Relationship Inclusivity Support",
                desc: "Existing tools force binary templates (e.g. strict Groom & Bride fields). EverAfter resolves this: public portal customized headers (Groom/Bride, Bride/Bride, Groom/Groom, or partner titles) are fully modifiable text inputs.",
                outcome: "Guarantees representation for diverse relationship forms."
              },
              {
                title: "2. Financial Stress Over-commitment Protection",
                desc: "Weddings cause severe debt overruns due to layout changes and vendor markups. EverAfter incorporates dynamic budget slippage gauges and buffer trackers into `/dashboard` to make expenses fully visible.",
                outcome: "Aids couples in scaling scopes before signing contracts."
              },
              {
                title: "3. Ad-free Vendor Placement Neutrality",
                desc: "Platforms like Zola are funded by vendors, creating biased rankings. EverAfter operates without any sponsored directory interfaces, serving as a neutral coordinates repository.",
                outcome: "Prevents artificial vendor price markups."
              }
            ].map((impact, idx) => (
              <div key={idx} className="p-4 border rounded-2xl bg-white dark:bg-stone-900/30 space-y-2.5">
                <h4 className="text-xs font-bold text-stone-850 dark:text-stone-100">
                  {impact.title}
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-450 leading-relaxed font-light">
                  {impact.desc}
                </p>
                <div className="flex items-center space-x-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/5 px-2.5 py-1 rounded-lg w-fit">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Mitigation: {impact.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Version 2 Roadmap */}
        <div className="space-y-6 lg:border-l lg:pl-8 dark:border-stone-850">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-850 dark:text-stone-100 flex items-center">
              <Layers className="mr-2 text-rose-500" />
              V2 Autonomous Agentic Roadmap
            </h2>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Future development iterations will integrate actual LLM-based autonomous agent cycles.
            </p>
          </div>

          <div className="relative border-l border-stone-200 pl-6 space-y-8 dark:border-stone-800">
            {[
              {
                title: "Phase A: AI Automated Table Arranger",
                date: "Q3 2026",
                desc: "An optimization engine that automatically seats guests at tables by parsing dietary compatibility flags and social affinity constraints. Resolves layout bottlenecks.",
                tech: "Greedy optimization search + LLM clustering"
              },
              {
                title: "Phase B: AI Vendor Contract PDF Parser",
                date: "Q4 2026",
                desc: "Enables couples to drop vendor PDF proposals directly into the dashboard. The agent parses pricing tables, payment schedules, and dates, appending logs instantly.",
                tech: "Llama OCR + Supabase vector store search"
              },
              {
                title: "Phase C: Autonomous Notification Alert Agent",
                date: "Q1 2027",
                desc: "An agent that polls guest PostgreSQL registries, monitoring dietary discrepancies and sending alerts to wedding caterers.",
                tech: "Cron scheduling + serverless edge triggers"
              }
            ].map((phase, idx) => (
              <div key={idx} className="relative space-y-2">
                <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-rose-500 bg-white dark:bg-stone-950" />
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-850 dark:text-stone-100">{phase.title}</h4>
                  <span className="text-[9px] bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold px-2 py-0.5 rounded">
                    {phase.date}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-450 leading-relaxed font-light">
                  {phase.desc}
                </p>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 font-medium">
                  Proposed Tech: {phase.tech}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>
      
    </div>
  );
}
