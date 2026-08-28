"use client";

import React, { useState } from "react";
import { RupiahInput } from "@/components/RupiahInput";
import {
  calculateDividend,
  formatRupiah,
  formatPercent,
  formatNumber,
} from "@/lib/utils";
import {
  RotateCcw,
  Coins,
  Receipt,
  PiggyBank,
} from "lucide-react";

export function DividendCalculator() {
  const [ticker, setTicker] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [dps, setDps] = useState<number>(0);
  const [lots, setLots] = useState<number>(0);
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [useCustomBuyPrice, setUseCustomBuyPrice] = useState<boolean>(true);
  const [applyTax, setApplyTax] = useState<boolean>(false); // False = Bebas pajak jika diinvestasikan kembali (PP No. 9/2021)

  const result = calculateDividend(currentPrice, dps, lots, applyTax);
  const yieldOnCost = buyPrice > 0 ? (dps / buyPrice) * 100 : result.dividendYield;

  const handleReset = () => {
    setTicker("");
    setCurrentPrice(0);
    setDps(0);
    setLots(0);
    setBuyPrice(0);
  };

  // Passive income projections based on net dividend
  const yearlyNet = result.netDividend;
  const monthlyNet = yearlyNet / 12;
  const dailyNet = yearlyNet / 365;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Form Inputs */}
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Parameter Dividen Saham
              </h2>
              <p className="text-xs text-slate-500">
                Hitung dividen tunai, dividend yield, dan passive income.
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
              htmlFor="dividend-ticker"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5"
            >
              Kode Saham (Opsional)
            </label>
            <input
              id="dividend-ticker"
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="Contoh: BBRI, ASII, UNTR"
              maxLength={6}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold uppercase text-slate-800 focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RupiahInput
              id="dividend-current-price"
              label="Harga Saham Saat Ini"
              value={currentPrice}
              onChange={setCurrentPrice}
              placeholder="0"
              helperText="Harga pasar per lembar saat ini."
              required
            />

            <RupiahInput
              id="dividend-dps"
              label="DPS (Dividen per Lembar)"
              value={dps}
              onChange={setDps}
              placeholder="0"
              helperText="Nominal rupiah dividen per 1 lembar saham."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="dividend-lots"
                className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5"
              >
                Jumlah Kepemilikan (Lot) <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center rounded-lg border border-slate-300 bg-white shadow-xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20">
                <input
                  id="dividend-lots"
                  type="number"
                  min="1"
                  step="1"
                  value={lots || ""}
                  onChange={(e) => setLots(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="Contoh: 100"
                  className="w-full bg-transparent px-3 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
                />
                <span className="select-none pr-3 text-xs font-semibold text-slate-400">
                  Lot ({formatNumber(result.totalShares)} lbr)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">1 Lot = 100 Lembar saham di IDX.</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="dividend-buy-price"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  Harga Beli Rata-Rata (Avg)
                </label>
                <button
                  type="button"
                  onClick={() => setUseCustomBuyPrice(!useCustomBuyPrice)}
                  className="text-[10px] text-emerald-600 hover:underline font-semibold"
                >
                  {useCustomBuyPrice ? "Samakan Pasar" : "Gunakan Beli Asli"}
                </button>
              </div>
              <RupiahInput
                id="dividend-buy-price"
                label=""
                value={buyPrice}
                onChange={setBuyPrice}
                placeholder="0"
                helperText="Digunakan untuk mengukur Yield on Cost (YoC)."
              />
            </div>
          </div>

          {/* Tax Regulation Toggle (PP No. 9 Tahun 2021) */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">
                  Pajak Penghasilan Dividen (PPh Final 10%)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setApplyTax(!applyTax)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  applyTax ? "bg-rose-600" : "bg-emerald-600"
                }`}
                role="switch"
                aria-checked={applyTax}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    applyTax ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {applyTax ? (
                <span className="text-rose-700 font-medium">
                  Memotong PPh Final 10% dari total dividen kotor.
                </span>
              ) : (
                <span className="text-emerald-800 font-medium">
                  Bebas Pajak (0% PPh) sesuai PMK No. 18/PMK.03/2021 jika dividen diinvestasikan kembali di instrumen keuangan Indonesia selama minimal 3 tahun.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Column: Dividend Results */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Rincian Penerimaan Dividen
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {ticker ? `Saham ${ticker}` : "Total Imbal Hasil Dividen"}
                </span>
              </div>

              <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1">
                <Coins className="h-3.5 w-3.5" />
                Yield: {formatPercent(result.dividendYield, 2)}
              </div>
            </div>

            {/* Hero Card: Net Dividend */}
            <div className="rounded-xl bg-slate-900 p-4 text-white shadow-sm">
              <div className="text-xs font-medium text-slate-300">
                Total Dividen Bersih (Net Cash Diterima)
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                {formatRupiah(result.netDividend, true, 0)}
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between text-xs text-slate-300 border-t border-slate-800 pt-2">
                <span>Dari Kepemilikan {formatNumber(lots)} Lot:</span>
                <span className="font-semibold text-white font-mono">
                  {formatNumber(result.totalShares)} Lembar
                </span>
              </div>
            </div>

            {/* Metric Boxes */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Total Modal Investasi
                </span>
                <div className="mt-1 text-lg font-bold text-slate-800 font-mono">
                  {formatRupiah(result.totalInvestment, true, 0)}
                </div>
                <span className="text-[10px] text-slate-400">
                  {formatNumber(lots)} Lot × {formatRupiah(currentPrice)}
                </span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Yield on Cost (YoC)
                </span>
                <div className="mt-1 text-lg font-bold text-emerald-600 font-mono">
                  {formatPercent(yieldOnCost, 2)}
                </div>
                <span className="text-[10px] text-slate-400">
                  Dihitung dari modal beli {formatRupiah(buyPrice)}
                </span>
              </div>
            </div>

            {/* Proyeksi Passive Income */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <PiggyBank className="h-4 w-4 text-emerald-600" />
                <span>Simulasi Arus Kas Dividen (Passive Income):</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="rounded-lg bg-white p-2 border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-medium text-slate-400 uppercase">Per Tahun</div>
                  <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">
                    {formatRupiah(yearlyNet, true, 0)}
                  </div>
                </div>

                <div className="rounded-lg bg-white p-2 border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-medium text-slate-400 uppercase">Per Bulan</div>
                  <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">
                    {formatRupiah(monthlyNet, true, 0)}
                  </div>
                </div>

                <div className="rounded-lg bg-white p-2 border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-medium text-slate-400 uppercase">Per Hari</div>
                  <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">
                    {formatRupiah(dailyNet, true, 0)}
                  </div>
                </div>
              </div>

              {applyTax && (
                <div className="text-[11px] text-rose-600 pt-1 flex justify-between">
                  <span>Potongan Pajak PPh Final (10%):</span>
                  <span className="font-mono font-semibold">-{formatRupiah(result.taxAmount)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Rupiah & Lot Indonesia Precision</span>
            <span>Dividen Tunai Bersih</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DividendCalculator;
