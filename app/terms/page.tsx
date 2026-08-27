import React from "react";
import type { Metadata } from "next";
import { ShieldAlert, AlertCircle, FileCheck, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Syarat Layanan & Disclaimer Investasi (Terms of Service) | Kalkulator Saham IDX",
  description:
    "Syarat ketentuan penggunaan layanan dan penafian risiko investasi resmi platform SahamTools.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
            <Scale className="h-4 w-4" />
            <span>Kepatuhan Hukum &amp; Batasan Tanggung Jawab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Syarat Layanan &amp; Penafian Investasi (Disclaimer)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Terakhir diperbarui: 18 Agustus 2026 &bull; Harap baca dengan seksama sebelum menggunakan alat kalkulator
          </p>
        </div>

        {/* Highlighted Warning Box */}
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-amber-950 shadow-xs flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <strong className="font-bold text-amber-900 block">
              PENTING: Bukan Nasihat Keuangan Resmi (Financial Advice)
            </strong>
            <p className="text-amber-800 leading-relaxed">
              Seluruh kalkulasi, angka, rasio valuasi Graham Number, proyeksi dividen, dan simulasi average down yang disajikan di situs ini ditujukan semata-mata untuk tujuan edukasi dan pemodelan matematis mandiri. Kami tidak memberikan rekomendasi beli, jual, atau rekomendasi saham tertentu.
            </p>
          </div>
        </div>

        <article className="prose prose-slate max-w-none rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs text-slate-700 space-y-6 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-emerald-600" />
              1. Penerimaan Syarat dan Ketentuan
            </h2>
            <p>
              Dengan mengakses dan menggunakan situs web <strong>SahamTools</strong>, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan Penggunaan ini beserta Kebijakan Privasi kami. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda disarankan untuk tidak menggunakan situs ini.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-emerald-600" />
              2. Penafian Risiko Pasar Modal (High Risk Warning)
            </h2>
            <p>
              Investasi pada instrumen saham di Bursa Efek Indonesia (IDX) melibatkan tingkat risiko yang signifikan, termasuk potensi kehilangan seluruh modal yang diinvestasikan. Kinerja historis perusahaan, dividen masa lalu, dan rasio valuasi historis tidak menjamin hasil di masa depan.
            </p>
            <p>
              Investor wajib melakukan analisis mendalam (<em>Due Diligence / Do Your Own Research</em>) dan bila perlu berkonsultasi dengan penasihat keuangan berlisensi OJK sebelum mengambil keputusan investasi.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              3. Batasan Tanggung Jawab (Limitation of Liability)
            </h2>
            <p>
              Pengelola SahamTools tidak bertanggung jawab atas segala kerugian finansial, kehilangan keuntungan, atau kerusakan langsung maupun tidak langsung yang timbul akibat penggunaan atau ketidakmampuan menggunakan alat kalkulator pada situs ini.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              4. Hak Kekayaan Intelektual
            </h2>
            <p>
              Seluruh kode sumber, desain grafis, teks artikel edukasi, tata letak, dan materi visual yang ada di situs ini merupakan hak cipta milik SahamTools dan dilindungi oleh hukum hak cipta yang berlaku di Republik Indonesia.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              5. Perubahan Syarat Layanan
            </h2>
            <p>
              Kami berhak memperbarui atau mengubah Syarat Layanan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Penggunaan berkelanjutan atas situs ini setelah perubahan tersebut dianggap sebagai persetujuan Anda terhadap ketentuan yang diperbarui.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
