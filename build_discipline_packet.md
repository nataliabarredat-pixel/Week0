# EverAfter 🌸 | Build Discipline Packet

This document contains the build discipline packet for all modules developed on the EverAfter wedding planning platform, outlining requirements, mockups, architecture, database schemas, and testing plans.

---

# PART 1: GENERATIVE CORE AGENT (`/core`)

## 1. Problem Definition
When couples start planning their wedding, they struggle to translate their vague, fragmented design ideas (e.g., "warm feelings", "likes wood but needs to feel modern") into a cohesive visual and experiential design anchor. This leads to conflicting choices when selecting florists, caterers, and venues, often causing budget leakage. The **Generative Core Agent** solves this by extracting a structured, high-fidelity design "core" (aesthetic style, color palette, emotional atmosphere, and immediate planner actions) from a simple client intake narrative.

## 2. User Definition
- **Engaged Couples**: To define their wedding theme design guide early.
- **Professional Wedding Planners**: To extract a design blueprint from initial consultation transcripts or narrative emails.
- **Evaluators**: To review the capability of the AI agent running on the platform.

## 3. Product Spec
- **Intake Form**:
  - Couple Names (text input)
  - Wedding Style (select dropdown: Rustic, Modern, Classic, Boho, Vintage)
  - Core Keywords (text, comma-separated)
  - Priorities (checkboxes: Catering, Photography, Music, Decor, Ceremony)
  - Narrative Vibe Description (textarea for long-form description)
- **Generative Core Extraction**:
  - Simulates or fetches an AI-structured output card featuring:
    - *Essence Title*: A unique branding moniker.
    - *Style Anchor*: The aesthetic archetype.
    - *Design Palette*: Three HSL/HEX colors with description.
    - *Atmosphere Guide*: Narrative explaining guest sensory experience.
    - *Planner Actions*: Three immediate planning actions.
- **Database Integration**:
  - Saves all extractions to Supabase table `core_outputs`.
  - Automatically falls back to a responsive Local Storage mock database if Supabase env credentials are not set.
- **History List (Dashboard Preview)**:
  - Sidebar showing previously saved wedding core blueprints with delete options.
  - Clicking on a saved card re-loads its detailed view in the main window.
- **Documentation**:
  - The System Prompt library entry will be documented on the `/docs` page.

### Acceptance Criteria
- Loading `/core` displays the form, an empty renderer state, and the history sidebar.
- Submitting the form triggers the core extraction card to animate into view.
- Clicking "Save Blueprint" commits the entry to the DB/Local Storage, updating the history sidebar instantly.
- The `/docs` page includes the documented Generative Core Agent prompts.

## 4. UX Mockup Prompt
"Create a clean, modern UX mockup for a student-built web app page: Generative Core Agent. The page should be practical, buildable in Next.js and Tailwind, and include clear sections for user input, AI/agent output, saved results, and testing evidence. Use a simple startup-product aesthetic. Avoid complex animations or expensive features."

Mockup Image Reference:
![UX Mockup](file:///C:/Users/user/.gemini/antigravity/brain/e8f28ebc-30e7-4217-86c5-ed41feed6f9e/generative_core_mockup_1780677799454.png)

## 5. Architecture Sketch
- **Frontend Component**: `/core` Route (Client component handling state).
- **Backend Service**: Graceful data handler at `src/utils/supabaseClient.ts` reading from/writing to `core_outputs` table.
- **Data Flow**:
  1. Intake Form Submitted -> React client formats payload.
  2. Generative Extraction logic resolves a structured mock or real AI extraction.
  3. Clicking "Save Blueprint" -> Sends payload to Supabase (`insert`) or mock Local Storage.
  4. History state updates -> Re-renders sidebar component.

## 6. Tech Stack
| Tool / Library | Purpose | Rationale |
| :--- | :--- | :--- |
| **Next.js App Router** | Core framework | Fast routing, file-based layouts, server-side pre-rendering capabilities |
| **Tailwind CSS v4** | UI Styling | Standard design tokens, inline animations, and flexible dark theme features |
| **Lucide Icons** | Vector graphics | Highly readable, clean visual indicators |
| **Supabase client** | Cloud persistence | Free cloud Postgres backend with instant JS clients |

## 7. DevOps Plan
- **Git Repository**: Pushed under `main` branch to remote at `https://github.com/nataliabarredat-pixel/Week0`.
- **Cloud Hosting**: Deployed directly on Vercel (`week0-peach.vercel.app`).
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **SQL Table Creation Blueprint**:
  ```sql
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
  ```

## 8. Test Plan (3 Self-Tests)
1. **Self-Test 1 (Form Input Validation)**: Fill out the intake form with missing fields and verify the browser prevents submission. Then fill in all fields, submit, and confirm that the loading state triggers and the structured extraction card displays correct values.
2. **Self-Test 2 (Database Persistence & History Sync)**: Click "Save Blueprint". Check that the entry is added to the history sidebar list. Click on the item inside the list and verify the correct details are re-rendered. Refresh the page and confirm the saved item persists in the sidebar.
3. **Self-Test 3 (Delete Operation)**: Click the delete icon on a saved item in the history list. Verify that the list updates immediately, the item is removed, and the details view resets to the default empty state.

## 9. Codex/Claude Code Implementation Prompt
"Implement a client-side route `/core` in `src/app/core/page.tsx`. This page must include:
1. A luxury top header styled in brand Playfair/Cormorant serif.
2. A two-column layout:
   - Left side: The Intake Form (Couple Names, Style select, Keywords, Priority checkboxes, Narrative vibe text area) and a Save Blueprint button.
   - Right side: The Core Extraction Card (Essence Title, Style Anchor, 3 hex/color chips palette, Atmosphere Guide text, and 3 Planner action items) and a History Sidebar showing list cards of saved blueprints.
3. Persistent saving: Write to Supabase table `core_outputs` using `@supabase/supabase-js`, falling back to `localStorage` sandbox mode if connection keys are missing.
4. Document the core prompt in `src/app/docs/page.tsx` in a dedicated card."

## 10. Scope Cuts
- **Real-Time LLM API Key Requirement**: The extraction runs on a high-fidelity local AI generation simulator rather than requiring a paid OpenAI/Anthropic API key, keeping the app entirely free and robust.
- **Custom Theme Designer Hex Picker**: Deferred (couples select from pre-designed aesthetic palette recommendations generated by the agent).

---

# PART 2: PRODUCT & PRICING FEATURES (`/product` and `/pricing`)

## 1. Problem Definition
When couples evaluate wedding software, they struggle to compare pricing structures, see what features are included in different tiers, and understand how custom add-ons impact their total cost. Static tables fail to reflect complex needs (like custom storage for photos or guest SMS alert volumes). The **Interactive Product & Pricing Customizer** solves this by providing an interactive feature explorer and a real-time quote builder that dynamically calculates custom plan rates, validates fields, and saves configurations.

## 2. User Definition
- **Engaged Couples**: Looking to compare plan benefits and construct a custom, budgeted wedding subscription.
- **Professional Wedding Planners**: Seeking multi-planner pricing packages with custom domain additions.
- **Evaluators**: Reviewing the pricing logic tests and software flow validations live on the platform.

## 3. Product Spec
- **Product Showcase (/product)**:
  - Responsive feature grid detailing the 10 core planning modules.
  - *Interactive Feature Explorer*: Click-to-preview mini UI widgets showing realistic mock dashboards for Budget, RSVPs, Seating Charts, and countdowns.
- **Pricing Calculator (/pricing)**:
  - *Billing Toggle*: Monthly vs. Annual selection with an automatic 20% discount applied to the baseline tier rate.
  - *Tier Selection*: Bronze (Free), Silver ($19/mo), Gold ($49/mo - Recommended), and Platinum ($99/mo).
  - *Dynamic Add-ons*: Checkboxes for RSVP SMS Notifications (+$5/mo) and Custom Domain (+$10/mo), a slider for Extra Gallery Storage (+$2/mo per GB, 10GB to 100GB), and a checkmark for Professional Consultant Review (+$150 one-time fee).
  - *Real-time Quote Summary*: Shows line-item price breakdowns and total price dynamically updated in real-time.
  - *Persistent Quotes Form*: Collects Couple Names, Wedding Date, selected plan, and total cost, sending data to Supabase table `custom_quotes` (with Local Storage fallback).
  - *Sidebar History*: Allows loading previously saved quotes back into the calculator or deleting them.
  - *Live Test Suite Widget*: An embedded console that runs the required 2 pricing logic tests and 3 software tests inside the browser, rendering log outputs and validation badges.

### Acceptance Criteria
- Loading `/product` lets users toggle between features to view realistic mockup previews.
- Loading `/pricing` dynamically updates the total price whenever a slider, checkbox, or billing cycle toggle changes.
- Annual discount of 20% is mathematically validated and applied to standard plan rates when toggled.
- Saving a quote adds it to the sidebar list; clicking it restores the calculator options; deleting it removes it.
- Clicking "Run Automated Verification Suite" executes all 5 tests and outputs pass/fail badges.

## 4. UX Mockup Prompt
"Generate a premium pricing and configuration dashboard mockup, dark mode, luxury gold and champagne rose colors, showcasing pricing tables, monthly/annual toggles, slider indicators for gallery storage, add-on selections, checkout summaries, and a live testing status widget showing checkmarks."

Mockup Image Reference:
![Pricing Mockup](file:///C:/Users/user/.gemini/antigravity/brain/e8f28ebc-30e7-4217-86c5-ed41feed6f9e/pricing_mockup_1781626832651.png)

## 5. Architecture Sketch
- **Frontend Components**:
  - `/product/page.tsx` (Client component showcasing modules).
  - `/pricing/page.tsx` (Client component with state hooks for calculator, form, storage slider, database client calls, and test runner suite).
- **Backend Service**: Graceful database handler at `src/utils/supabaseClient.ts` reading from/writing to `custom_quotes` table.
- **Data Flow**:
  1. User toggles plan/add-ons -> State variables trigger recalculation of total cost.
  2. Quote Form submitted -> Writes quote parameters and total price to Supabase or `localStorage`.
  3. Sidebar retrieves quotes -> Maps saved items to state list.
  4. Test suite triggered -> Executes test scripts and updates UI log console state.

## 6. Tech Stack
| Tool / Library | Purpose | Rationale |
| :--- | :--- | :--- |
| **Next.js 15.5+ App Router** | Core framework | Fast route resolution and production compilation |
| **Tailwind CSS v4** | UI Styling | High-end glassmorphism, responsive grid spacing, HSL variables |
| **Lucide Icons** | Visual cues | Clear indicators for badges, checklists, and calculators |
| **Supabase client** | Quote saving | Real-time PostgreSQL persistence for custom planner quotes |

## 7. DevOps Plan
- **Git commits**: At least 5 distinct commits tracking the build.
- **Vercel Deployments**: Deployed to Vercel with root directory set to `Week0` to capture nested project changes.
- **SQL Table Creation Blueprint**:
  ```sql
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
  );
  ```

## 8. Test Plan (5 Required Tests)
1. **Pricing Logic Test 1 (Annual Discount 20%)**: Asserts that switching from Monthly to Annual billing applies exactly a 20% discount on standard plan prices (e.g., Gold standard rate $49 becomes $39.20/mo, billed as $470.40/yr).
2. **Pricing Logic Test 2 (Add-on Calculations)**: Asserts that cumulative cost changes dynamically: standard plan + SMS ($5) + Domain ($10) + Consultant ($150 one-time) + Extra Storage ($2/GB for specified amount) matches mathematical expectation.
3. **Software Test 1 (Form Input Validation)**: Asserts that saving a quote with empty couple name throws an error badge and blocks submission.
4. **Software Test 2 (Quote Persistence)**: Asserts that saved quotes are persisted in local storage or database, appearing in the history sidebar, and load correctly when clicked.
5. **Software Test 3 (Delete Operation)**: Asserts that clicking delete removes the quote from the database/history sidebar list, resetting the workspace view.

## 9. Codex/Claude Code Implementation Prompt
"Implement client-side routes `/product` and `/pricing` inside `src/app/product/page.tsx` and `src/app/pricing/page.tsx`.
1. The `/product` page must contain a responsive list of the 10 platform modules and an interactive 'workspace preview component' allowing users to click a module and see a beautiful simulated client-side dashboard state (seating chart grids, budget bars).
2. The `/pricing` page must contain a plan tier switcher, billing cycle toggle (apply 20% discount), storage GB slider, add-on options, and a quote request card.
3. Hook up quote submissions to write to Supabase table `custom_quotes` with a local storage mock fallback.
4. Embed a 'Live Automated Test Runner' widget on `/pricing` that runs 5 tests (2 pricing logic, 3 software) and outputs logs and pass/fail badges."

## 10. Scope Cuts
- **Real Payment Gateways (Stripe)**: Financial transactions are simulated with high-fidelity mockup modals rather than making real payments.
- **Live SMS API integrations**: Simulated messages are rendered inside mock notifications rather than utilizing a paid Twilio API.

---

# PART 3: MARKETING ENGINE & CONTENT SYSTEM (`/marketing`)

## 1. Problem Definition
Startups and planners lack an integrated brand management tool to align target personas, landing page copies, social content assets, and A/B verification suites. They manually copy copyblocks, lose track of campaign calendar sequences, and have no way of measuring headline performances locally. The **Marketing Engine & Content System** solves this by consolidating brand systems, target personas, social posts, reels scripts, campaign calendars, headline A/B analytics logs, and a clipboard copy/JSON export manager.

## 2. User Definition
- **Startup Marketing Leads**: Wanting to review campaign posts and content script copies.
- **Freelance Wedding Coordinators**: Designing target personas for different service segments.
- **Evaluators & Graders**: Reviewing A/B test results and software flow validations live on the page.

## 3. Product Spec
- **Homepage Upgrade**:
  - Dynamically serve Headline A ("Design Your Perfect Day with EverAfter") or Headline B ("EverAfter | The Premium Wedding Workspace for Discerning Couples") randomly to users.
  - Track impressions and CTA click-conversions in local storage.
- **Marketing Page (/marketing)**:
  - *Brand System Board*: Pre-defined primary/secondary color schemes, brand fonts, and tone guidelines.
  - *Target Persona Card*: Pre-defined profile details (Charlotte, 28, corporate coordinator; Marcus, 32, tech lead).
  - *Content Cards Grid*:
    - **10 Social Posts**: Curated copyblocks for Instagram, Pinterest, LinkedIn with copy buttons.
    - **3 Video Scripts**: Curated hooks, video descriptions, and CTA copy.
    - **14-day Content Campaign Calendar**: Structured daily posts sequence across channels.
  - *A/B Headline Tester Dashboard*: Displays impressions, click counts, and conversion rates for Headline A and Headline B. Includes an interactive "Simulate 100 Visits" button to generate randomized traffic.
  - *Copy/Export Toolkit*: Clipboard triggers on all copy blocks, plus a "Download All Assets as JSON" export handler.
  - *Saved Assets Persistence*: Save selected copyblocks, personas, or campaigns to Supabase `marketing_assets` table (or local storage sandbox fallback) with sidebar history.
  - *Live Test Runner Widget*: Runs the required 5 tests.

### Acceptance Criteria
- `/marketing` loads with responsive tabs for Brand, Persona, Content, and A/B Tester.
- Clicking "Simulate 100 Visits" randomly adds impressions/clicks to Headline A and B, calculating conversion rates dynamically.
- Copy buttons successfully trigger clipboard alerts.
- Saving a marketing asset places it in the sidebar list; deleting it purges it.
- Running the live verification suite outputs detailed logs and green checkmark badges.

## 4. UX Mockup Prompt
"Create a clean, modern UX mockup for a student-built web app page: Marketing Engine + Content System. The page should be practical, buildable in Next.js and Tailwind, and include clear sections for user input, AI/agent output, saved results, and testing evidence. Use a simple startup-product aesthetic. Avoid complex animations or expensive features."

Mockup Image Reference:
![Marketing Mockup](file:///C:/Users/user/.gemini/antigravity/brain/e8f28ebc-30e7-4217-86c5-ed41feed6f9e/marketing_mockup_1782276092030.png)

## 5. Architecture Sketch
- **Frontend Components**:
  - `/marketing/page.tsx` (Client component showcasing assets, analytics logs, and test suites).
  - `page.tsx` (Modified homepage serving A/B headlines and writing impressions/clicks to local storage).
- **Backend Service**: Graceful database handler at `src/utils/supabaseClient.ts` reading from/writing to `marketing_assets` table.
- **Data Flow**:
  1. Visitor opens `/` -> local storage records version impression.
  2. Click CTA -> local storage records conversion click.
  3. Planners load `/marketing` -> Reads stored metrics, runs simulator, writes custom assets to Supabase/localStorage.
  4. Test suite triggered -> Runs script checks and displays pass statuses.

## 6. Tech Stack
| Tool / Library | Purpose | Rationale |
| :--- | :--- | :--- |
| **Next.js App Router** | Core framework | File-based client/server routes |
| **Tailwind CSS v4** | Styling | Standard luxury fonts and HSL colors |
| **Lucide Icons** | Visual assets | Vector icons for cards, downloads, and alerts |
| **Supabase client** | Asset saving | postgres persistence for marketing assets |

## 7. DevOps Plan
- **Git Commits**: At least 5 commits tracking the build.
- **Vercel Deployment**: Live route at `/marketing`.
- **SQL Table Creation Blueprint**:
  ```sql
  CREATE TABLE marketing_assets (
    id BIGSERIAL PRIMARY KEY,
    asset_type TEXT NOT NULL,
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```

## 8. Test Plan (5 Required Tests)
1. **A/B Test 1 (Conversion Rate)**: Asserts that conversion rate matches `(clicks / impressions) * 100` mathematically.
2. **A/B Test 2 (Headline Display)**: Asserts that the homepage correctly serves either Headline A or Headline B text based on the assigned version identifier.
3. **Software Test 1 (Asset Persistence)**: Saves a custom marketing asset to the database/localStorage and verifies it appears in the saved assets history list.
4. **Software Test 2 (Copy to Clipboard)**: Verifies that clicking "Copy" triggers the clipboard API or mock fallback, successfully saving text content.
5. **Software Test 3 (Delete Sync)**: Deletes a saved asset and verifies the list updates immediately.

## 9. Codex/Claude Code Implementation Prompt
"Implement client-side routes `/` and `/marketing` inside `src/app/page.tsx` and `src/app/marketing/page.tsx`.
1. Upgrade `page.tsx` to read or assign an A/B headline version ('A' or 'B') from local storage. Render the selected headline in the hero. Track impressions and clicks on the 'Enter Couple Workspace' button.
2. Create `/marketing` with tabs for Brand Guidelines, Target Personas, Content System (10 social posts, 3 video scripts, 14-day campaign calendar), and Headline A/B Tester Board.
3. Add 'Copy to Clipboard' buttons to posts/scripts, and a 'Download as JSON' export button.
4. Save custom copy assets using Supabase table `marketing_assets` (with local storage mock fallback).
5. Add a 'Live Test Runner' console widget on `/marketing` that executes all 5 tests (2 A/B, 3 software) and outputs logs and pass badges."

## 10. Scope Cuts
- **Automated Social Publishing (API posting)**: Posts are copied manually rather than calling Facebook/LinkedIn Graph APIs.
- **Analytics Database Engine**: local storage is used to aggregate A/B impressions instead of a heavy Google Analytics tracker integration.
