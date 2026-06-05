"use client";

import { useState, useEffect } from "react";
import { 
  Heart, Sparkles, Plus, Trash2, Check, ArrowRight, 
  Layers, Info, Calendar, MapPin, Database, Save, Loader2, RefreshCw
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/utils/supabaseClient";

interface ColorPalette {
  hex: string;
  name: string;
}

interface CoreBlueprint {
  id?: string | number;
  couple_names: string;
  vision_style: string;
  vibe_description: string;
  extracted_title: string;
  color_palette: ColorPalette[];
  atmosphere_guide: string;
  planner_actions: string[];
  created_at?: string;
}

// Generative simulator databases based on wedding style
const GENERATIVE_PRESETS: Record<string, { title: string, palette: ColorPalette[], guide: string, actions: string[] }> = {
  "Rustic": {
    title: "Sunsets & Suede: An Organic Barn Celebration",
    palette: [
      { hex: "#78350f", name: "Warm Oak" },
      { hex: "#b45309", name: "Amber Suede" },
      { hex: "#d97706", name: "Harvest Gold" }
    ],
    guide: "A warm, grounded experience centered around natural wood textures, glowing amber lights, and dried foliage. Guests gather at long farm tables under draped string lighting, creating an intimate, home-like festival vibe.",
    actions: [
      "Source salvaged oak barrels to use as cocktail hour high-tops.",
      "Incorporate textured linen table runners in raw beige.",
      "Design an altar arch featuring pampas grass and amber roses."
    ]
  },
  "Modern": {
    title: "Monochrome & Sage: A Sleek Glasshouse Soiree",
    palette: [
      { hex: "#1e293b", name: "Midnight Charcoal" },
      { hex: "#64748b", name: "Slate Steel" },
      { hex: "#a7f3d0", name: "Eucalyptus Frost" }
    ],
    guide: "An architectural, high-contrast atmosphere defined by clean lines, modern geometry, and botanical glass frame boundaries. The experience feels polished, minimal, and upscale, highlighted by neon signs and sleek lounge configurations.",
    actions: [
      "Design minimalist acrylic menus with frosted typography.",
      "Arrange towering eucalyptus leaves in clean glass cylinders.",
      "Set up a black velvet lounge seating area near the main dance floor."
    ]
  },
  "Classic": {
    title: "Timeless Ivory & Champagne: A Manor Ballroom Gala",
    palette: [
      { hex: "#fef08a", name: "Champagne Cream" },
      { hex: "#e2e8f0", name: "Polished Pearl" },
      { hex: "#1c1917", name: "Tuxedo Black" }
    ],
    guide: "The height of symmetry and classic romance. Draped ballrooms, candelabras reflecting off polished floors, and structured floral columns. Guests enjoy a five-course plated dinner surrounded by jazz arrangements.",
    actions: [
      "Select silver candelabras as the central focal point for dinner tables.",
      "Incorporate heavy cream cardstock invitations with letterpress script.",
      "Arrange a grand exit featuring ivory rose petal throws."
    ]
  },
  "Boho": {
    title: "Wildflowers & Terracotta: A Desert Horizon Ritual",
    palette: [
      { hex: "#c2410c", name: "Terracotta Clay" },
      { hex: "#ca8a04", name: "Desert Ochre" },
      { hex: "#f3e8ff", name: "Washed Lavender" }
    ],
    guide: "A whimsical, free-spirited gathering framed by mountain skylines or garden canopies. Macrame tapestries, vintage rugs layered on the sand, and mismatched stoneware create a deeply personalized and spiritual setting.",
    actions: [
      "Layer mismatched vintage Turkish rugs along the ceremony aisle path.",
      "Hang raw macrame installations behind the couple's head table.",
      "Provide custom clay favors hand-stamped with guest name tags."
    ]
  },
  "Vintage": {
    title: "Brass & Burgundy: A Gatsby Era Celebration",
    palette: [
      { hex: "#4c0519", name: "Gothic Burgundy" },
      { hex: "#d97706", name: "Antiqued Brass" },
      { hex: "#fcf6e3", name: "Aged Parchment" }
    ],
    guide: "A highly dramatic, cinematic experience reminiscent of a 1920s jazz club. Deep velvet drapery, brass accents, and moody lighting set a rich tone of luxurious nostalgia.",
    actions: [
      "Utilize antique brass goblets and velvet napkins for place settings.",
      "Hire a live swing band to play vintage jazz tracks during reception hours.",
      "Incorporate retro typewriter guestbooks for guests to sign."
    ]
  }
};

export default function CorePage() {
  const [coupleNames, setCoupleNames] = useState("");
  const [visionStyle, setVisionStyle] = useState("Modern");
  const [keywords, setKeywords] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [vibeDescription, setVibeDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeBlueprint, setActiveBlueprint] = useState<CoreBlueprint | null>(null);
  const [blueprints, setBlueprints] = useState<CoreBlueprint[]>([]);
  const [dbStatus, setDbStatus] = useState<"connected" | "mock">("mock");

  // Load Saved Blueprints on Mount
  useEffect(() => {
    fetchBlueprints();
  }, []);

  const fetchBlueprints = async () => {
    const isConfigured = isSupabaseConfigured;
    setDbStatus(isConfigured ? "connected" : "mock");

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("core_outputs")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (data) setBlueprints(data);
      } catch (err) {
        console.error("Error fetching from Supabase, falling back to localStorage:", err);
        loadLocalBlueprints();
      }
    } else {
      loadLocalBlueprints();
    }
  };

  const loadLocalBlueprints = () => {
    const local = localStorage.getItem("everafter_cores");
    if (local) {
      setBlueprints(JSON.parse(local));
    }
  };

  // Toggle priority items
  const handlePriorityChange = (item: string) => {
    setPriorities(prev => 
      prev.includes(item) ? prev.filter(p => p !== item) : [...prev, item]
    );
  };

  // Simulate AI extraction
  const handleExtractCore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleNames || !vibeDescription) return;

    setLoading(true);

    setTimeout(() => {
      const preset = GENERATIVE_PRESETS[visionStyle] || GENERATIVE_PRESETS["Modern"];
      
      // Inject some user-specific inputs into the template output
      const cleanKeywords = keywords ? keywords.split(",").map(k => k.trim()).filter(Boolean) : [];
      const primaryKeywordsText = cleanKeywords.length > 0 
        ? ` emphasizing ${cleanKeywords.join(" and ")}` 
        : "";

      const newBlueprint: CoreBlueprint = {
        couple_names: coupleNames,
        vision_style: visionStyle,
        vibe_description: vibeDescription,
        extracted_title: `${coupleNames}'s ${preset.title}`,
        color_palette: preset.palette,
        atmosphere_guide: `${preset.guide} This blueprint is custom-tailored to focus on ${priorities.join(", ") || "wedding decor"}${primaryKeywordsText}.`,
        planner_actions: [
          ...preset.actions.slice(0, 2),
          `Incorporate elements reflecting the couple's special note: "${vibeDescription.substring(0, 45)}..."`
        ]
      };

      setActiveBlueprint(newBlueprint);
      setLoading(false);
    }, 1200);
  };

  // Save Blueprint to Database
  const handleSaveBlueprint = async () => {
    if (!activeBlueprint) return;
    setSaving(true);

    const blueprintWithDate: CoreBlueprint = {
      ...activeBlueprint,
      created_at: new Date().toISOString()
    };

    if (dbStatus === "connected" && supabase) {
      try {
        const { data, error } = await supabase
          .from("core_outputs")
          .insert([blueprintWithDate])
          .select();
        
        if (error) throw error;
        if (data) {
          setBlueprints(prev => [data[0], ...prev]);
        }
      } catch (err) {
        console.error("Supabase insert error, saving locally:", err);
        saveLocal(blueprintWithDate);
      }
    } else {
      saveLocal(blueprintWithDate);
    }

    setSaving(false);
  };

  const saveLocal = (blueprint: CoreBlueprint) => {
    const updated = [
      { ...blueprint, id: Date.now() },
      ...blueprints
    ];
    setBlueprints(updated);
    localStorage.setItem("everafter_cores", JSON.stringify(updated));
  };

  // Delete Blueprint
  const handleDeleteBlueprint = async (id: string | number) => {
    if (dbStatus === "connected" && supabase) {
      try {
        const { error } = await supabase
          .from("core_outputs")
          .delete()
          .eq("id", id);
        if (error) throw error;
        setBlueprints(prev => prev.filter(b => b.id !== id));
      } catch (err) {
        console.error("Supabase delete error, running locally:", err);
        deleteLocal(id);
      }
    } else {
      deleteLocal(id);
    }

    if (activeBlueprint && activeBlueprint.id === id) {
      setActiveBlueprint(null);
    }
  };

  const deleteLocal = (id: string | number) => {
    const updated = blueprints.filter(b => b.id !== id);
    setBlueprints(updated);
    localStorage.setItem("everafter_cores", JSON.stringify(updated));
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* HEADER BAR */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-6 border-b border-stone-250 dark:border-stone-850">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 flex items-center">
            <Sparkles className="h-7 w-7 text-rose-500 fill-rose-500/10 mr-2" />
            Generative Core Agent
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
            Translate your vague wedding concepts into structured design blueprints.
          </p>
        </div>

        {/* Database indicator status */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold border bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-sm">
          <Database className={`h-4 w-4 ${dbStatus === "connected" ? "text-emerald-500" : "text-amber-500"}`} />
          <span className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Database: {dbStatus === "connected" ? "Supabase Cloud" : "Local Sandbox"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* COLUMN 1: INTAKE FORM */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-stone-250 bg-white p-6 dark:border-stone-850 dark:bg-stone-900 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100 flex items-center">
              <Plus className="h-5 w-5 mr-1.5 text-rose-500" />
              Intake Parameters
            </h2>

            <form onSubmit={handleExtractCore} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 block mb-1">Couple Names</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emma & Liam"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-stone-50/50 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 dark:border-stone-800 dark:bg-stone-950"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 block mb-1">Wedding Vision Style</label>
                <select
                  value={visionStyle}
                  onChange={(e) => setVisionStyle(e.target.value)}
                  className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-stone-50/50 focus:border-rose-500 focus:outline-none dark:border-stone-800 dark:bg-stone-950"
                >
                  <option value="Modern">Modern Minimalist</option>
                  <option value="Rustic">Rustic Countryside</option>
                  <option value="Classic">Classic Elegance</option>
                  <option value="Boho">Bohemian Whimsy</option>
                  <option value="Vintage">Vintage Glamour</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 block mb-1">Core Keywords</label>
                <input
                  type="text"
                  placeholder="e.g. cozy, natural wood, copper"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-stone-50/50 focus:border-rose-500 focus:outline-none dark:border-stone-800 dark:bg-stone-950"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 block mb-2">Priority Focus Elements</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["Catering", "Photography", "Music", "Decor", "Ceremony"].map(item => {
                    const isChecked = priorities.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handlePriorityChange(item)}
                        className={`flex items-center space-x-1.5 p-2 rounded-lg border transition-all ${
                          isChecked 
                            ? "bg-rose-500/10 border-rose-400 text-rose-700 dark:text-rose-300" 
                            : "bg-stone-50/50 border-stone-200 text-stone-600 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-400"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${isChecked ? "bg-rose-500" : "bg-stone-400"}`} />
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 block mb-1">Tell Us Your Vibe</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your ideal wedding day... include feelings, colors, or visual fragments."
                  value={vibeDescription}
                  onChange={(e) => setVibeDescription(e.target.value)}
                  className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-stone-50/50 focus:border-rose-500 focus:outline-none dark:border-stone-800 dark:bg-stone-950"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex h-10 items-center justify-center rounded-lg bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-800 disabled:opacity-50 dark:bg-rose-600 dark:hover:bg-rose-500 transition-colors cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Extracting Wedding Core...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 text-gold-300" />
                    Extract Wedding Core
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* COLUMN 2: STRUCTURED OUTPUT RENDERER */}
        <div className="lg:col-span-1 space-y-6">
          {activeBlueprint ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-850 dark:bg-stone-900 shadow-lg space-y-6 animate-fade-in relative overflow-hidden">
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-rose-500/5 blur-xl pointer-events-none" />

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-gold-600 dark:text-gold-400 tracking-wider">
                  Extracted Essence Blueprint
                </span>
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
                  {activeBlueprint.extracted_title}
                </h2>
              </div>

              {/* Archetype badge */}
              <div className="flex items-center space-x-1.5 text-xs text-stone-500 font-medium">
                <Layers className="h-4 w-4 text-rose-500" />
                <span>Style Anchor: </span>
                <span className="font-semibold text-rose-700 dark:text-rose-400">{activeBlueprint.vision_style}</span>
              </div>

              <div className="h-px bg-stone-100 dark:bg-stone-800" />

              {/* Design Palette Chips */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-rose-800 dark:text-rose-450">
                  Design Palette Recommendations
                </h4>
                <div className="flex gap-3">
                  {activeBlueprint.color_palette.map((color, cIdx) => (
                    <div key={cIdx} className="flex flex-col items-center space-y-1">
                      <div 
                        className="h-10 w-10 rounded-lg shadow-sm border border-stone-200/50 dark:border-stone-800"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[9px] font-semibold text-stone-600 dark:text-stone-400">{color.name}</span>
                      <span className="text-[8px] font-mono text-stone-400">{color.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atmosphere Guide */}
              <div className="space-y-1.5">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-rose-800 dark:text-rose-450">
                  Sensory Atmosphere Guide
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                  {activeBlueprint.atmosphere_guide}
                </p>
              </div>

              {/* Planner Actions */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-rose-800 dark:text-rose-450">
                  Immediate Planner Action Items
                </h4>
                <ul className="space-y-2">
                  {activeBlueprint.planner_actions.map((act, aIdx) => (
                    <li key={aIdx} className="flex items-start space-x-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500/10 text-[9px] text-rose-700 font-bold shrink-0 mt-0.5">
                        {aIdx + 1}
                      </span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveBlueprint}
                disabled={saving}
                className="w-full inline-flex h-9 items-center justify-center rounded-lg bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-800 disabled:opacity-50 dark:bg-rose-600 dark:hover:bg-rose-500 transition-colors cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Saving Blueprint...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Blueprint to Database
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center text-stone-400 space-y-3 dark:border-stone-800">
              <Sparkles className="h-8 w-8 mx-auto text-stone-300 animate-float" />
              <h3 className="font-serif text-lg font-semibold text-stone-700 dark:text-stone-300">No Blueprint Rendered</h3>
              <p className="text-xs max-w-xs mx-auto leading-relaxed">
                Fill out the intake form with details of your couple and their design vision, then click "Extract Wedding Core" to see results.
              </p>
            </div>
          )}
        </div>

        {/* COLUMN 3: HISTORY LIST (DASHBOARD PREVIEW) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-stone-250 bg-white p-6 dark:border-stone-850 dark:bg-stone-900 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100 flex items-center">
              <Calendar className="h-5 w-5 mr-1.5 text-rose-500" />
              Saved Blueprints
            </h2>

            {blueprints.length === 0 ? (
              <p className="text-xs text-stone-400 italic">No saved blueprints found.</p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {blueprints.map(bp => (
                  <div 
                    key={bp.id}
                    onClick={() => setActiveBlueprint(bp)}
                    className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-rose-500/5 hover:border-rose-300 transition-all cursor-pointer flex items-start justify-between gap-3 dark:border-stone-800 dark:bg-stone-950"
                  >
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 line-clamp-1">{bp.extracted_title}</h4>
                      <span className="text-[9px] uppercase font-bold text-rose-800 dark:text-rose-450 tracking-wider">
                        Style: {bp.vision_style}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (bp.id) handleDeleteBlueprint(bp.id);
                      }}
                      className="text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
