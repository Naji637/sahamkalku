"use client";

import React, { useState } from "react";
import { RupiahInput } from "@/components/RupiahInput";
import {
  calculateDCA,
  formatRupiah,
  formatPercent,
  formatNumber,
  PurchaseEntry,
} from "@/lib/utils";
import {
  Plus,
  Trash2,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Target,
} from "lucide-react";

export function DCACalculator() {
  const [ticker, setTicker] = useState("");
  const [currentMarketPrice, setCurrentMarketPrice] = useState<number>(0);
  const [entries, setEntries] = useState<PurchaseEntry[]>([
    { id: "1", label: "Pembelian 1 (Beli Puncak)", price: 0, lots: 0 },
    { id: "2", label: "Pembelian 2 (Average Down 1)", price: 0, lots: 0 },
    { id: "3", label: "Pembelian 3 (Support Kuat)", price: 0, lots: 0 },
  ]);

  // Target Average Simulation
  const [targetAvgPrice, setTargetAvgPrice] = useState<number>(0);
  const [targetBuyPrice, setTargetBuyPrice] = useState<number>(0);

  const result = calculateDCA(entries, currentMarketPrice);

  const handleAddRow = () => {
    const newId = (entries.length + 1).toString();
    setEntries([
      ...entries,
      {
        id: newId,
        label: `Pembelian ${entries.length + 1}`,
        price: currentMarketPrice || 4500,
        lots: 10,
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    if (entries.length <= 1) return;
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleUpdateEntry = (
    index: number,
    field: "price" | "lots" | "label",
    value: any,
  ) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    setEntries(updated);
  };

  const handleReset = () => {
    setTicker("");
    setCurrentMarketPrice(0);
    setEntries([
      { id: "1", label: "Pembelian 1", price: 0, lots: 0 },
      { id: "2", label: "Pembelian 2", price: 0, lots: 0 },
    ]);
  };

  // Target simulation math:
  let requiredLotsToTarget = 0;
  let targetSimError = "";

  if (targetAvgPrice > 0 && targetBuyPrice > 0 && result.totalShares > 0) {
    if (targetBuyPrice === targetAvgPrice) {
      targetSimError =
        "Harga beli baru tidak boleh sama persis dengan target average.";
    } else {
      const numerator =
        targetAvgPrice * result.totalShares - result.totalCapital;
      const denominator = 100 * (targetBuyPrice - targetAvgPrice);
      const needed = numerator / denominator;
      if (needed <= 0) {
        targetSimError =
          targetBuyPrice > targetAvgPrice &&
          targetAvgPrice < result.averagePrice
            ? "Tidak mungkin menurunkan average dengan membeli di atas harga target."
            : "Kondisi target sudah tercapai atau tidak valid.";
      } else {
        requiredLotsToTarget = Math.ceil(needed);
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Dynamic Purchase Multi-Row List */}
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Riwayat Transaksi Beli (Multi-Row)
              </h2>
              <p className="text-xs text-slate-500">
                Tambahkan transaksi berkala / average down bertahap Anda.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium cursor-pointer mr-1"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
              <input
                id="dca-ticker"
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                placeholder="Ticker"
                maxLength={6}
                className="w-20 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-bold uppercase text-slate-800 focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Current Market Price Tracker */}
          <div className="rounded-lg bg-slate-50 p-3 border border-slate-200">
            <RupiahInput
              id="dca-current-market-price"
              label="Harga Pasar Saat Ini (Untuk Hitung Floating P/L)"
              value={currentMarketPrice}
              onChange={setCurrentMarketPrice}
              placeholder="0"
              helperText="Opsional: masukkan harga real-time untuk melihat keuntungan/kerugian mengambang."
            />
          </div>

          {/* Multi-Row Entry Table */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-500 uppercase px-1">
              <span className="col-span-4">Keterangan / Tahap</span>
              <span className="col-span-4">Harga Beli (Rp)</span>
              <span className="col-span-3">Jumlah Lot</span>
              <span className="col-span-1 text-center">Aksi</span>
            </div>

            {entries.map((entry, idx) => (
              <div
                key={entry.id || idx}
                className="grid grid-cols-12 items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 text-sm shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="col-span-4">
                  <input
                    type="text"
                    value={entry.label}
                    onChange={(e) =>
                      handleUpdateEntry(idx, "label", e.target.value)
                    }
                    placeholder={`Beli ${idx + 1}`}
                    className="w-full rounded-md border border-slate-200 bg-slate-50/50 px-2 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="col-span-4">
                  <div className="relative flex items-center rounded-md border border-slate-200 bg-white focus-within:border-emerald-500">
                    <span className="pl-2 text-xs font-semibold text-slate-400">
                      Rp
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={entry.price || ""}
                      onChange={(e) =>
                        handleUpdateEntry(
                          idx,
                          "price",
                          Math.max(0, parseInt(e.target.value) || 0),
                        )
                      }
                      placeholder="0"
                      className="w-full bg-transparent px-1.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <div className="relative flex items-center rounded-md border border-slate-200 bg-white focus-within:border-emerald-500">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={entry.lots || ""}
                      onChange={(e) =>
                        handleUpdateEntry(
                          idx,
                          "lots",
                          Math.max(0, parseInt(e.target.value) || 0),
                        )
                      }
                      placeholder="Lot"
                      className="w-full bg-transparent px-2 py-1.5 text-xs font-semibold text-slate-800 focus:outline-hidden"
                    />
                    <span className="pr-2 text-[10px] font-medium text-slate-400">
                      Lot
                    </span>
                  </div>
                </div>

                <div className="col-span-1 text-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(idx)}
                    disabled={entries.length <= 1}
                    className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Hapus baris"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddRow}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-emerald-600/40 bg-emerald-50/50 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 hover:border-emerald-600 transition-all"
          >
            <Plus className="h-4 w-4" />
            Tambah Baris Transaksi Beli
          </button>
        </div>

        {/* Right Column: DCA Summary & Target Average Simulation */}
        <div className="space-y-4 lg:col-span-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Hasil Kalkulasi Rata-Rata (Avg Price)
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {ticker ? `Portofolio Saham ${ticker}` : "Ringkasan Rata-Rata"}
              </span>
            </div>

            {/* Hero Average Price */}
            <div className="mt-4 rounded-xl bg-slate-900 p-4 text-white shadow-sm">
              <div className="text-xs font-medium text-slate-300">
                Harga Rata-Rata Beli (Average Price)
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                {formatRupiah(result.averagePrice, true, 1)}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-300 border-t border-slate-800 pt-2">
                <span>Total Akumulasi:</span>
                <span className="font-semibold text-white font-mono">
                  {formatNumber(result.totalLots)} Lot (
                  {formatNumber(result.totalShares)} Lbr)
                </span>
              </div>
            </div>

            {/* Financial Metrics */}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Total Modal Masuk
                </span>
                <div className="mt-0.5 text-base font-bold text-slate-800 font-mono">
                  {formatRupiah(result.totalCapital, true, 0)}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Nilai Portofolio Kini
                </span>
                <div className="mt-0.5 text-base font-bold text-slate-800 font-mono">
                  {formatRupiah(result.currentPortfolioValue, true, 0)}
                </div>
              </div>
            </div>

            {/* Floating P/L (if market price entered) */}
            {currentMarketPrice > 0 && (
              <div
                className={`mt-3 rounded-lg border p-3.5 ${
                  result.floatingPnL >= 0
                    ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                    : "border-rose-200 bg-rose-50 text-rose-950"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                    {result.floatingPnL >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-rose-600" />
                    )}
                    Floating Profit / Loss
                  </span>
                  <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded-full bg-white/80">
                    {formatPercent(result.floatingPnLPercent, 2)}
                  </span>
                </div>
                <div className="mt-1.5 text-xl font-black font-mono">
                  {formatRupiah(result.floatingPnL, true, 0)}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Target Average Calculator Simulation */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-900">
                Simulasi Target Average Down
              </h4>
            </div>
            <p className="text-[11px] text-slate-500">
              Ketahui berapa lot lagi yang harus dibeli untuk menurunkan average
              price Anda ke target tertentu.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <RupiahInput
                id="dca-target-avg"
                label="Target Average Baru"
                value={targetAvgPrice}
                onChange={setTargetAvgPrice}
                placeholder="4800"
              />
              <RupiahInput
                id="dca-target-buy"
                label="Beli di Harga (Rp)"
                value={targetBuyPrice}
                onChange={setTargetBuyPrice}
                placeholder="4500"
              />
            </div>

            {targetSimError ? (
              <div className="rounded-lg bg-amber-50 p-2.5 text-[11px] text-amber-800 border border-amber-200">
                {targetSimError}
              </div>
            ) : requiredLotsToTarget > 0 ? (
              <div className="rounded-lg bg-emerald-50 p-3 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span>Dibutuhkan Pembelian:</span>
                  <span className="text-base font-mono font-extrabold text-emerald-700">
                    +{formatNumber(requiredLotsToTarget)} Lot
                  </span>
                </div>
                <div className="text-[11px] text-emerald-800 flex items-center justify-between border-t border-emerald-200/60 pt-1">
                  <span>Estimasi Dana Tambahan:</span>
                  <span className="font-mono font-semibold">
                    {formatRupiah(requiredLotsToTarget * 100 * targetBuyPrice)}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DCACalculator;
