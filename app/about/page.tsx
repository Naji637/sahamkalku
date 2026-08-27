import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Target, HeartHandshake, Calculator, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami (About Us) | Kalkulator Saham IDX",
  description:
    "Misi kami menyediakan kalkulator keuangan dan edukasi valuasi saham independen, transparan, dan akurat untuk investor ritel Bursa Efek Indonesia.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
            <HeartHandshake className="h-4 w-4" />
            <span>Misi &amp; Komitmen Edukasi Investor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Tentang SahamTools
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Platform kalkulator investasi saham independen yang dibangun khusus untuk ekosistem pasar modal Indonesia.
          </p>
        </div>

        <article className="prose prose-slate max-w-none rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs text-slate-700 space-y-6 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-600" />
              1. Latar Belakang &amp; Visi Kami
            </h2>
            <p>
              Di tengah pesatnya pertumbuhan investor ritel di Bursa Efek Indonesia (IDX), banyak investor pemula yang kesulitan melakukan perhitungan fundamental yang presisi. Kebanyakan kalkulator keuangan yang tersedia di internet menggunakan standar pasar saham global (Amerika/Eropa) yang memiliki unit lembar saham individual dan sistem desimal yang membingungkan.
            </p>
            <p>
              <strong>SahamTools</strong> hadir untuk mengisi kekosongan tersebut dengan menyediakan alat hitung keuangan yang 100% selaras dengan regulasi dan kebiasaan investor Indonesia: format Rupiah (IDR), konversi 1 Lot = 100 Lembar, dan regulasi dividen bebas pajak sesuai UU Cipta Kerja &amp; PMK No. 18/PMK.03/2021.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="h-4 w-4 text-emerald-600" />
              2. Metodologi Perhitungan Kami
            </h2>
            <p>
              Kami mengimplementasikan formula-formula teruji yang diakui secara global:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold text-slate-900 mb-1">Graham Number</div>
                <p className="text-[12px] text-slate-600">
                  Mengukur nilai intrinsik harga wajar saham defensif berbasis EPS TTM &amp; BVPS dengan konstanta konservatif 22.5.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold text-slate-900 mb-1">Dividend Yield &amp; YoC</div>
                <p className="text-[12px] text-slate-600">
                  Menghitung imbal hasil dividen kotor dan bersih dengan opsi pembebasan pajak PPh Final 10% sesuai regulasi perpajakan RI.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold text-slate-900 mb-1">DCA &amp; Multi-Tier Lots</div>
                <p className="text-[12px] text-slate-600">
                  Kalkulasi rata-rata harga beli berbobot volume (weighted average price) dan simulasi kebutuhan lot untuk target average down.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              3. Independensi &amp; Privasi Tanpa Kompromi
            </h2>
            <p>
              Kami adalah entitas independen yang tidak berafiliasi dengan emiten manapun di Bursa Efek Indonesia. Kami tidak menjual produk investasi atau mengelola dana masyarakat.
            </p>
            <p>
              Semua komputasi angka dijalankan secara lokal di peramban (client-side) tanpa menyimpan data portofolio pribadi Anda di server kami, menjamin kerahasiaan keuangan Anda tetap terjaga 100%.
            </p>
          </section>

          <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
            <span className="text-xs text-slate-500">Punya saran perbaikan atau pertanyaan?</span>
            <Link
              href="/contact"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs"
            >
              Hubungi Kami
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
