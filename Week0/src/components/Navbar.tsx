"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Sparkles, LayoutDashboard, BookOpen, Layers, CheckCircle2, AlertCircle, BarChart2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [supabaseConnected, setSupabaseConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if Supabase keys are configured in environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("placeholder")) {
      setSupabaseConnected(true);
    } else {
      setSupabaseConnected(false);
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-rose-100/20 bg-stone-50/70 backdrop-blur-md dark:border-stone-800/40 dark:bg-stone-950/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-500 fill-rose-500/20 animate-float" />
              <span className="font-serif text-2xl font-bold tracking-wide bg-gradient-to-r from-rose-700 via-rose-500 to-gold-600 bg-clip-text text-transparent dark:from-rose-400 dark:to-gold-400">
                EverAfter
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium tracking-wide transition-colors ${
                pathname === "/" 
                  ? "text-rose-600 dark:text-rose-400" 
                  : "text-stone-600 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400"
              }`}
            >
              Home
            </Link>
            <Link
              href="/workspace"
              className={`flex items-center space-x-1.5 text-sm font-medium tracking-wide transition-colors ${
                pathname.startsWith("/workspace") 
                  ? "text-rose-600 dark:text-rose-400" 
                  : "text-stone-600 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Workspace</span>
            </Link>
            
           <Link
              href="/core"
              className={`flex items-center space-x-1.5 text-sm font-medium tracking-wide transition-colors ${
                pathname.startsWith("/core") 
                  ? "text-rose-600 dark:text-rose-400" 
                  : "text-stone-600 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400"
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>Core</span>
            </Link>
            <Link
              href="/research"
              className={`flex items-center space-x-1.5 text-sm font-medium tracking-wide transition-colors ${
                pathname.startsWith("/research") 
                  ? "text-rose-600 dark:text-rose-400" 
                  : "text-stone-600 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400"
              }`}
            >
              <BarChart2 className="h-4 w-4" />
              <span>Research</span>
            </Link>

            <Link
              href="/product"
              className={`flex items-center space-x-1.5 text-sm font-medium tracking-wide transition-colors ${
                pathname.startsWith("/product") 
                  ? "text-rose-600 dark:text-rose-400" 
                  : "text-stone-600 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400"
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Product</span>
            </Link>

            <Link
              href="/pricing"
              className={`flex items-center space-x-1.5 text-sm font-medium tracking-wide transition-colors ${
                pathname.startsWith("/pricing") 
                  ? "text-rose-600 dark:text-rose-400" 
                  : "text-stone-600 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400"
              }`}
            >
              <DollarSign className="h-4 w-4" />
              <span>Pricing</span>
            </Link>
            
            <Link
              href="/docs"
              className={`flex items-center space-x-1.5 text-sm font-medium tracking-wide transition-colors ${
                pathname.startsWith("/docs") 
                  ? "text-rose-600 dark:text-rose-400" 
                  : "text-stone-600 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Docs</span>
            </Link>
          </div>

          {/* Right Status / Action Controls */}
          <div className="flex items-center space-x-4">
            {/* Supabase connection indicator */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border bg-stone-100/50 border-stone-200 dark:bg-stone-900/50 dark:border-stone-800">
              <span className="relative flex h-2 w-2">
                {supabaseConnected ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </>
                ) : (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </>
                )}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 hidden sm:inline-block">
                Supabase: {supabaseConnected ? "Connected" : "Mock Sandbox"}
              </span>
            </div>

            <Link
              href="/workspace"
              className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-rose-600/10 hover:from-rose-500 hover:to-rose-400 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-600/20 active:translate-y-0"
            >
              <Sparkles className="mr-1.5 h-4 w-4" />
              Workspace
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
