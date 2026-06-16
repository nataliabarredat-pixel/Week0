"use client";

import { useState, useEffect } from "react";
import { 
  BookOpen, Terminal, Database, Cloud, FileText, CheckCircle2, 
  AlertTriangle, Copy, Check, ChevronRight, Sparkles 
} from "lucide-react";
import { isSupabaseConfigured, getMockDatabase } from "@/utils/supabaseClient";

export default function DocsPage() {
  const [supabaseConnected, setSupabaseConnected] = useState<boolean | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setSupabaseConnected(isSupabaseConfigured);
  }, []);

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const codeInstall = `npm install @supabase/supabase-js lucide-react`;
  
  const codeSupabaseClient = `import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);`;

  const codeSqlSchema = `-- 1. Wedding Checklist Table
CREATE TABLE checklist (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  checked BOOLEAN DEFAULT FALSE,
  category TEXT DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Budget Planner Table
CREATE TABLE budget (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  spent NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  category TEXT DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Guest RSVP Table
CREATE TABLE guests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  rsvp_status TEXT CHECK (rsvp_status IN ('Pending', 'Attending', 'Declined')) DEFAULT 'Pending',
  dietary_requirements TEXT DEFAULT 'None',
  plus_ones INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Generative Core Outputs Table
CREATE TABLE core_outputs (
  id BIGSERIAL PRIMARY KEY,
  couple_names TEXT NOT NULL,
  vision_style TEXT NOT NULL,
  vibe_description TEXT NOT NULL,
  extracted_title TEXT NOT NULL,
  color_palette JSONB NOT NULL,
  atmosphere_guide TEXT NOT NULL,
  planner_actions JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Custom Quote Configurations Table
CREATE TABLE custom_quotes (
  id BIGSERIAL PRIMARY KEY,
  couple_names TEXT NOT NULL,
  wedding_date TEXT NOT NULL,
  plan_tier TEXT NOT NULL,
  billing_cycle TEXT NOT NULL,
  add_ons JSONB NOT NULL,
  storage_gb INTEGER NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;

  const codeCorePrompt = `You are a creative wedding planner and design agent. Your task is to extract a wedding theme blueprint from the couple's name, their style choice, keywords, priorities, and description.

INPUTS:
- Couple Names: {couple_names}
- Wedding Style: {vision_style}
- Keywords: {keywords}
- Priorities: {priorities}
- Description: {vibe_description}

OUTPUT FORMAT:
Generate a structured JSON object containing:
- extracted_title: A cohesive wedding moniker (e.g. "Sunsets & Suede: An Organic Barn Celebration")
- color_palette: An array of 3 color objects, each containing hex code and name (e.g. { hex: "#78350f", name: "Warm Oak" })
- atmosphere_guide: A paragraph describing the sensory guest experience.
- planner_actions: An array of 3 immediate planning task steps.`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
      
      {/* 1. DOCUMENTATION OUTLINE SIDEBAR */}
      <aside className="lg:w-64 flex-shrink-0 space-y-6">
        <div className="sticky top-24 space-y-4">
          <div className="flex items-center space-x-2 text-rose-800 dark:text-rose-400 font-serif font-bold text-lg">
            <BookOpen className="h-5 w-5" />
            <span>Developer Center</span>
          </div>
          <div className="h-px bg-stone-200 dark:bg-stone-850" />
          <nav className="flex flex-col gap-2">
            {[
              { label: "Getting Started", href: "#getting-started", icon: Terminal },
              { label: "Supabase Integration", href: "#supabase-integration", icon: Database },
              { label: "Database Schema", href: "#database-schema", icon: FileText },
              { label: "Generative Core Prompt", href: "#core-prompt", icon: Sparkles },
              { label: "Pricing Testing Scenarios", href: "#pricing-tests", icon: CheckCircle2 },
              { label: "Vercel Deployment", href: "#vercel-deployment", icon: Cloud },
            ].map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.href}
                  className="flex items-center space-x-2.5 text-sm font-medium text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-300 py-1.5 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* 2. MAIN TECH DOCUMENTS CONTENT */}
      <div className="flex-grow space-y-16">
        
        {/* Title Banner */}
        <div className="space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
            Developer Documentation
          </h1>
          <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-3xl">
            Everything you need to compile, customize, and deploy EverAfter. Built with Next.js App Router, Tailwind CSS, and optimized for real-time Postgres syncing via Supabase.
          </p>
        </div>

        {/* Supabase Verification Status Card */}
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-md dark:border-stone-800 dark:bg-stone-900 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className={`p-2.5 rounded-xl ${supabaseConnected ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"}`}>
                <Database className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100">
                  Supabase Project Connection Evidence
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-0.5 leading-relaxed">
                  Real-time validation of client environment bindings (`process.env`).
                </p>
              </div>
            </div>

            <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              supabaseConnected 
                ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50" 
                : "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50"
            }`}>
              {supabaseConnected ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Evidence: Supabase Configured</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  <span>Sandbox: Mock Local DB Running</span>
                </>
              )}
            </div>
          </div>

          <div className="h-px bg-stone-100 dark:bg-stone-800" />

          {/* Details list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5 p-3 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-850">
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-800 dark:text-rose-400 block font-sans">
                Variable Target
              </span>
              <p className="text-stone-600 dark:text-stone-400 break-all font-semibold">
                NEXT_PUBLIC_SUPABASE_URL
              </p>
              <p className="text-[10px] text-stone-400 dark:text-stone-500">
                {supabaseConnected 
                  ? process.env.NEXT_PUBLIC_SUPABASE_URL 
                  : "https://[your-project-id].supabase.co (Fallback Mock Enabled)"}
              </p>
            </div>
            
            <div className="space-y-1.5 p-3 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-850">
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-800 dark:text-rose-400 block font-sans">
                Variable Status
              </span>
              <p className="text-stone-600 dark:text-stone-400 break-all font-semibold">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </p>
              <p className="text-[10px] text-stone-400 dark:text-stone-500">
                {supabaseConnected 
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 15)}... (Validated)` 
                  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (Fallback Mock Enabled)"}
              </p>
            </div>
          </div>
        </section>

        {/* 1. GETTING STARTED SECTION */}
        <section id="getting-started" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-white">
            <Terminal className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">1. Getting Started</h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            Follow these commands to clone, configure, and bootstrap the local Next.js development environment.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Step A: Clone and Install Dependencies
              </h4>
              <div className="relative rounded-lg bg-stone-900 p-4 font-mono text-xs text-stone-200">
                <button
                  onClick={() => handleCopyCode("install", codeInstall)}
                  className="absolute top-3 right-3 text-stone-400 hover:text-white transition-colors"
                >
                  {copiedId === "install" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
                <code className="block pr-8">{codeInstall}</code>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Step B: Configure API Credentials
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                Create a `.env.local` file in your root workspace (or configure on Vercel Dashboard) and add your Supabase credentials:
              </p>
              <div className="relative rounded-lg bg-stone-900 p-4 font-mono text-xs text-stone-200">
                <code className="block pr-8 leading-relaxed">
                  NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co{"\n"}
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Step C: Launch Dev Environment
              </h4>
              <div className="relative rounded-lg bg-stone-900 p-4 font-mono text-xs text-stone-200">
                <code className="block pr-8">npm run dev</code>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SUPABASE INTEGRATION */}
        <section id="supabase-integration" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-white">
            <Database className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">2. Supabase Client Configuration</h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            The platform initializes a safe `@supabase/supabase-js` service container inside `src/utils/supabaseClient.ts` that gracefully logs operations.
          </p>

          <div className="relative rounded-lg bg-stone-900 p-4 font-mono text-xs text-stone-200">
            <button
              onClick={() => handleCopyCode("client", codeSupabaseClient)}
              className="absolute top-3 right-3 text-stone-400 hover:text-white transition-colors"
            >
              {copiedId === "client" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <pre className="overflow-x-auto pr-8 leading-relaxed">
              <code>{codeSupabaseClient}</code>
            </pre>
          </div>
        </section>

        {/* 3. DATABASE SCHEMA */}
        <section id="database-schema" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-white">
            <FileText className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">3. Postgres SQL Schema Blueprint</h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            Run the following SQL commands in your Supabase SQL Editor to spin up the target tables representing Budgets, guest lists, and monthly planning tasks.
          </p>

          <div className="relative rounded-lg bg-stone-900 p-4 font-mono text-xs text-stone-200">
            <button
              onClick={() => handleCopyCode("sql", codeSqlSchema)}
              className="absolute top-3 right-3 text-stone-400 hover:text-white transition-colors"
            >
              {copiedId === "sql" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <pre className="overflow-x-auto pr-8 leading-relaxed">
              <code>{codeSqlSchema}</code>
            </pre>
          </div>
        </section>

        {/* 3.5 GENERATIVE CORE PROMPT */}
        <section id="core-prompt" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-white">
            <Sparkles className="h-6 w-6 text-rose-600 dark:text-rose-455" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">Generative Core System Prompt</h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed font-sans">
            The system prompt library template that instructs the AI agent on how to extract design themes, color aesthetics, and planner actions.
          </p>

          <div className="relative rounded-lg bg-stone-900 p-4 font-mono text-xs text-stone-200">
            <button
              onClick={() => handleCopyCode("prompt", codeCorePrompt)}
              className="absolute top-3 right-3 text-stone-400 hover:text-white transition-colors"
            >
              {copiedId === "prompt" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <pre className="overflow-x-auto pr-8 leading-relaxed whitespace-pre-wrap font-sans">
              <code>{codeCorePrompt}</code>
            </pre>
          </div>
        </section>

        {/* 3.6 PRICING TESTING SCENARIOS */}
        <section id="pricing-tests" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-white">
            <CheckCircle2 className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">Interactive Pricing Test Plan</h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            The platform embeds a live test execution suite on the `/pricing` page. The suite asserts 2 pricing logic conditions and 3 software flow operations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-stone-250 dark:border-stone-850 bg-white/40 dark:bg-stone-900/10 space-y-2">
              <h4 className="font-serif font-bold text-sm text-stone-850 dark:text-stone-100">1. Pricing Logic Verification</h4>
              <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400 font-light">
                <li>&bull; **20% Annual Discount**: Validates that all standard plan tiers (Bronze, Silver, Gold, Platinum) apply a exact 20% discount on monthly equivalents when annual billing cycle is active.</li>
                <li>&bull; **Cumulative Add-on Accumulation**: Asserts that selecting a base plan, toggling SMS Alerts, custom domains, dragging storage sliders (GB * $2/mo), and checking planner reviews correctly calculate the subtotal and one-time fees.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-stone-250 dark:border-stone-850 bg-white/40 dark:bg-stone-900/10 space-y-2">
              <h4 className="font-serif font-bold text-sm text-stone-850 dark:text-stone-100">2. Software Flow Verification</h4>
              <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400 font-light">
                <li>&bull; **Empty Name Validation**: Asserts that trying to request a quote without a Couple Name throws an error banner and halts insertion.</li>
                <li>&bull; **Database Save & Reload Sync**: Creates a test quote, saves it, and verifies it appears in the sidebar records.</li>
                <li>&bull; **Delete Synchronizer**: Removes the test quote and confirms the sidebar list updates instantly.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. VERCEL DEPLOYMENT */}
        <section id="vercel-deployment" className="scroll-mt-24 space-y-6">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-white">
            <Cloud className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">4. Vercel Deployment Walkthrough</h2>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            EverAfter is optimized to be deployed to the edge using Vercel.
          </p>

          <div className="space-y-4 rounded-xl border border-stone-250 dark:border-stone-850 p-6 bg-stone-50/50 dark:bg-stone-900/10">
            {[
              "Import your GitHub repository into your Vercel Dashboard.",
              "Configure framework preset to 'Next.js' and root directory as 'Week0'.",
              "Paste in your production Supabase URL and Anon Key variables under the Environment Variables toggle.",
              "Click 'Deploy'. Vercel will automatically build the TSX framework and serve it from edge DNS clusters.",
            ].map((step, idx) => (
              <div key={idx} className="flex items-start space-x-3.5 text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/10 text-rose-700 text-xs font-bold font-sans dark:text-rose-400 shrink-0">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}
