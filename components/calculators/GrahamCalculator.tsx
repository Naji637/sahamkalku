"use client";

import React, { useState } from "react";
import { RupiahInput } from "@/components/RupiahInput";
import {
  calculateGrahamNumber,
  formatRupiah,
  formatPercent,
} from "@/lib/utils";
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Info,
  ShieldCheck,
} from "lucide-react";

export function GrahamCalculator() {
  const [ticker, setTicker] = useState("BBRI");
  const [currentPrice, setCurrentPrice] = useState<number>(4850);
  const [eps, setEps] = useState<number>(405);
  const [bvps, setBvps] = useState<number>(2150);

  const result = calculateGrahamNumber(currentPrice, eps, bvps);

  const handleReset = () => {
    setTicker("");
    setCurrentPrice(0);
    setEps(0);
    setBvps(0);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Form Inputs */}
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Input Parameter Saham
              </h2>
              <p className="text-xs text-slate-500">
                Masukkan data laporan keuangan TTM (Trailing Twelve Months).
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              Reset Form
            </button>
          </div>

          <div>
            <label
              htmlFor="graham-ticker"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5"
            >
              Kode Saham (Opsional)
            </label>
            <input
              id="graham-ticker"
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="Contoh: BBRI, ASII, BMRI"
              maxLength={6}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold uppercase text-slate-800 focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <RupiahInput
            id="graham-current-price"
            label="Harga Saham Saat Ini (Market Price)"
            value={currentPrice}
            onChange={setCurrentPrice}
            placeholder="0"
            helperText="Harga pasar per lembar saham di Bursa Efek Indonesia hari ini."
            required
          />

          <RupiahInput
            id="graham-eps"
            label="EPS TTM (Earning Per Share)"
            value={eps}
            onChange={setEps}
            placeholder="0"
            helperText="Laba bersih per lembar saham 12 bulan terakhir (Annualized/TTM)."
            required
          />

          <RupiahInput
            id="graham-bvps"
            label="BVPS (Book Value Per Share)"
            value={bvps}
            onChange={setBvps}
            placeholder="0"
            helperText="Nilai buku ekuitas per lembar saham (Total Ekuitas / Lembar Beredar)."
            required
          />

          <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600 flex items-start gap-2 border border-slate-200">
            <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-slate-800">Rumus Benjamin Graham:</strong>
              <div className="font-mono text-emerald-700 font-semibold mt-0.5">
                Graham Number = √(22.5 × EPS × BVPS)
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Konstanta 22.5 diturunkan dari batas konservatif Graham: PER maksimal 15x dikali PBV maksimal 1.5x.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Calculation Results */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Hasil Evaluasi Harga Wajar
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {ticker ? `Analisis Saham ${ticker}` : "Analisis Valuasi Saham"}
                </span>
              </div>

              {result.isValid && (
                <div
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    result.status === "undervalued"
                      ? "bg-emerald-100 text-emerald-800"
                      : result.status === "overvalued"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {result.status === "undervalued" ? (
                    <>
                      <TrendingUp className="h-3.5 w-3.5" />
                      UNDERVALUED (Murah)
                    </>
                  ) : result.status === "overvalued" ? (
                    <>
                      <TrendingDown className="h-3.5 w-3.5" />
                      OVERVALUED (Mahal)
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      FAIRLY VALUED (Wajar)
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Error / Warning Alert */}
            {!result.isValid ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <span>Kalkulasi Tidak Dapat Dilakukan</span>
                </div>
                <p className="mt-1 text-xs text-amber-800">
                  {result.errorReason}
                </p>
                <p className="mt-2 text-[11px] text-amber-700">
                  Metode Benjamin Graham mensyaratkan perusahaan memiliki laba operasional dan ekuitas bersih bernilai positif untuk menghitung nilai wajar intrinsik.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Fair Value Hero Card */}
                <div className="rounded-xl bg-slate-900 p-4 text-white shadow-sm">
                  <div className="text-xs font-medium text-slate-300">
                    Nilai Wajar Graham (Intrinsic Value)
                  </div>
                  <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                    {formatRupiah(result.grahamNumber, true, 0)}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between text-xs text-slate-300 border-t border-slate-800 pt-2">
                    <span>Harga Pasar Saat Ini:</span>
                    <span className="font-semibold text-white font-mono">
                      {formatRupiah(currentPrice)}
                    </span>
                  </div>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Margin of Safety (MoS)
                    </span>
                    <div
                      className={`mt-1 text-xl font-bold font-mono ${
                        result.marginOfSafetyPercent >= 0
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {formatPercent(result.marginOfSafetyPercent, 1)}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Diskon terhadap nilai wajar
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Price / Graham Ratio
                    </span>
                    <div className="mt-1 text-xl font-bold text-slate-800 font-mono">
                      {result.priceToGrahamRatio.toFixed(2)}x
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Ideal &lt; 1.0x (Harga &lt; Nilai Wajar)
                    </span>
                  </div>
                </div>

                {/* Interpretasi & Kesimpulan */}
                <div className="rounded-lg border border-slate-200 bg-emerald-50/50 p-3 text-xs text-slate-700 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <ShieldCheck className="h-4 w-4 text-emerald-700" />
                    <span>Kesimpulan Investasi:</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {result.status === "undervalued" ? (
                      <>
                        Saham <strong>{ticker || "ini"}</strong> saat ini diperdagangkan dengan diskon{" "}
                        <strong className="text-emerald-700">{formatPercent(result.marginOfSafetyPercent, 1)}</strong> di bawah nilai wajar intrinsik Graham ({formatRupiah(result.grahamNumber)}). Memiliki <em>Margin of Safety</em> yang kuat untuk investasi jangka panjang.
                      </>
                    ) : result.status === "overvalued" ? (
                      <>
                        Harga pasar saham <strong>{ticker || "ini"}</strong> berada{" "}
                        <strong className="text-rose-700">{formatPercent(Math.abs(result.marginOfSafetyPercent), 1)}</strong> di atas batas valuasi konservatif Graham ({formatRupiah(result.grahamNumber)}). Pertimbangkan untuk menunggu koreksi atau evaluasi rasio pertumbuhan laba (PEG).
                      </>
                    ) : (
                      <>
                        Saham <strong>{ticker || "ini"}</strong> diperdagangkan di sekitar nilai wajar Graham. Rasio harga terhadap nilai intrinsik cukup seimbang ({result.priceToGrahamRatio.toFixed(2)}x).
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Standar Bursa Efek Indonesia (IDX)</span>
            <span>Update Nilai: Realtime Client-Side</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GrahamCalculator;
