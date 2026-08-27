"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TrendingUp,
  Calculator,
  Coins,
  Layers,
  FileText,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Kalkulator Saham", icon: Calculator },
    { href: "/about", label: "Tentang Kami", icon: FileText },
    { href: "/privacy-policy", label: "Kebijakan Privasi", icon: ShieldAlert },
    { href: "/terms", label: "Syarat & Disclaimer", icon: FileText },
    { href: "/contact", label: "Kontak", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-emerald-400 shadow-xs group-hover:bg-slate-800 transition-colors">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-slate-900 flex items-center gap-1">
              KalkulatorSaham
            </span>
           
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-4 md:hidden">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
