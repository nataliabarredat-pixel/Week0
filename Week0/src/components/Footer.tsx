"use client";

import Link from "next/link";
import { Heart, GitBranch, Globe, Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200/50 bg-stone-50/50 dark:border-stone-900/50 dark:bg-stone-950/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500/20" />
              <span className="font-serif text-xl font-bold tracking-wide bg-gradient-to-r from-rose-700 to-gold-500 bg-clip-text text-transparent dark:from-rose-400 dark:to-gold-400">
                EverAfter
              </span>
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm leading-relaxed">
              Crafting premium digital workspaces for modern couples. Plan every detail of your dream wedding seamlessly from budget allocations to public invitations.
            </p>
            <div className="flex space-x-4 text-stone-400 dark:text-stone-500">
              <a href="#" className="hover:text-rose-500 transition-colors"><GitBranch className="h-5 w-5" /></a>
              <a href="#" className="hover:text-rose-500 transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" className="hover:text-rose-500 transition-colors"><Compass className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-800 dark:text-rose-400">
              Platform Features
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/product" className="text-sm font-semibold text-rose-700 hover:text-rose-600 dark:text-rose-450 dark:hover:text-rose-300">
                  Platform Showcase ⚡
                </Link>
              </li>
              <li>
                <Link href="/workspace" className="text-sm text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-300">
                  Budget Tracker
                </Link>
              </li>
              <li>
                <Link href="/workspace" className="text-sm text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-300">
                  Guest Checklist
                </Link>
              </li>
              <li>
                <Link href="/workspace" className="text-sm text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-300">
                  Seating Chart
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Agents */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-800 dark:text-rose-400">
              Resources & Tools
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/pricing" className="text-sm font-semibold text-rose-700 hover:text-rose-600 dark:text-rose-450 dark:hover:text-rose-300">
                  Interactive Pricing 💰
                </Link>
              </li>
              <li>
                <Link href="/marketing" className="text-sm text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-300">
                  Marketing Engine 📣
                </Link>
              </li>
              <li>
                <Link href="/core" className="text-sm text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-300">
                  Generative Core Agent 🌸
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-sm text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-300">
                  Research Module
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-300">
                  Technical Docs
                </Link>
              </li>
              <li>
                <Link href="/docs#supabase-integration" className="text-sm text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-300">
                  Supabase Integration
                </Link>
              </li>
              <li>
                <Link href="/docs#database-schema" className="text-sm text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-300">
                  DB Setup Schema
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 border-t border-stone-200/50 pt-6 dark:border-stone-900/50">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 dark:text-stone-500 space-y-4 sm:space-y-0">
            <p>&copy; {new Date().getFullYear()} EverAfter Inc. All rights reserved.</p>
            <p className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
              <span>for modern couples.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
