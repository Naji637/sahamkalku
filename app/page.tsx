"use client";

import React, { useState } from "react";
import { GrahamCalculator } from "@/components/calculators/GrahamCalculator";
import { DividendCalculator } from "@/components/calculators/DividendCalculator";
import { DCACalculator } from "@/components/calculators/DCACalculator";
import { EducationalContent } from "@/components/EducationalContent";
import { Calculator, Coins, Layers, Sparkles, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"graham" | "dividend" | "dca">(
    "graham",
  );

  const tabs = [
    {
      id: "graham" as const,
      label: "Kalkulator Harga Wajar Graham",
      shortLabel: "Graham Number",
      // icon: Calculator,
      description: "",
    },
    {
      id: "dividend" as const,
      label: "Kalkulator Dividen & Yield",
      shortLabel: "Dividen & Yield",
      // icon: Coins,
      description: "",
    },
    {
      id: "dca" as const,
      label: "Kalkulator DCA & Avg Down Saham",
      shortLabel: "DCA / Avg Down",
      // icon: Layers,
      description: "",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section & Headline */}
        <section className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                Standar Bursa Efek Indonesia (IDX / BEI) &bull; 1 Lot = 100
                Lembar 
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              Kalkulator Saham Indonesia
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Solusi perhitungan investasi saham lengkap untuk menghitung{" "}
              <strong>Harga Wajar Graham Number</strong>,{" "}
              <strong>Imbal Hasil Dividen Bersih</strong>, dan{" "}
              <strong>Rata-Rata Pembelian DCA</strong> dengan format angka
              Rupiah presisi.
            </p>
          </div>

         
        </section>

        {/* Tab Navigation Controls */}
        <div className="mb-6 ">
          <div className="mb-6 text-center font-bold text-xl sm:hidden">￬ Free Tools ￬</div>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5 ">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              // const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center border-3 border-emerald-600 h-40 w-28 sm:w-80 rounded-3xl ${
                    isActive
                      ? "border-emerald-600 bg-green-200 text-white shadow-md ring-2 ring-emerald-500/20"
                      : "border-slate-200 bg-green-100 text-white hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    
                    <span
                      className={isActive ? "text-slate-900" : "text-slate-700"}
                    >
                      {tab.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2">
                    {tab.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Calculator Module */}
        <div className="transition-opacity duration-200">
          {activeTab === "graham" && <GrahamCalculator />}
          {activeTab === "dividend" && <DividendCalculator />}
          {activeTab === "dca" && <DCACalculator />}
        </div>

        {/* Rich Educational Content & FAQ with Structured Data */}
        <div className="mt-10">
          <EducationalContent activeTab={activeTab} />
        </div>
      </div>
    </main>
  );
}
