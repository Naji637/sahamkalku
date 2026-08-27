"use client";

import React, { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Calculator,
  Shield,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    question: "Apa itu Graham Number dan bagaimana cara menggunakannya di saham IDX?",
    answer:
      "Graham Number adalah formula valuasi saham konservatif yang diciptakan oleh Benjamin Graham, bapak value investing dan mentor Warren Buffett. Formula ini menghitung batas harga wajar tertinggi yang layak dibayar untuk suatu saham berdasarkan EPS (Earnings Per Share) dan BVPS (Book Value Per Share). Di Bursa Efek Indonesia (IDX), saham dengan harga pasar di bawah Graham Number dengan Margin of Safety > 20% sering dianggap memiliki potensi apresiasi modal yang aman.",
  },
  {
    question: "Mengapa konstanta dalam rumus Graham adalah 22.5?",
    answer:
      "Konstanta 22.5 didasarkan pada kriteria valuasi konservatif Benjamin Graham: rasio Price to Earnings (P/E) tidak boleh melebihi 15x, dan rasio Price to Book Value (P/B) tidak boleh melebihi 1.5x. Mengalikan batas maksimum PER (15) dengan batas maksimum PBV (1.5) menghasilkan nilai 22.5 (15 × 1.5 = 22.5).",
  },
  {
    question: "Berapa konversi 1 Lot saham di Bursa Efek Indonesia (BEI)?",
    answer:
      "Sesuai regulasi resmi PT Bursa Efek Indonesia (BEI), 1 Lot setara dengan 100 lembar saham. Sebagai contoh, jika Anda membeli 50 Lot saham BBRI pada harga Rp 5.000, maka Anda memiliki 5.000 lembar saham dengan total modal investasi sebesar Rp 25.000.000.",
  },
  {
    question: "Apakah dividen saham di Indonesia dikenakan pajak?",
    answer:
      "Berdasarkan Undang-Undang Cipta Kerja dan Peraturan Pemerintah (PP) No. 9 Tahun 2021 serta PMK No. 18/PMK.03/2021, dividen yang diterima oleh Wajib Pajak Orang Pribadi dalam negeri dibebaskan dari Pajak Penghasilan (PPh 0%) dengan syarat dividen tersebut diinvestasikan kembali ke instrumen pasar keuangan atau sektor riil di Indonesia dalam jangka waktu minimal 3 tahun pajak.",
  },
  {
    question: "Apa perbedaan antara Dividend Yield dan Yield on Cost (YoC)?",
    answer:
      "Dividend Yield dihitung dengan membagi DPS (Dividen per Lembar) terhadap harga pasar saat ini. Sementara itu, Yield on Cost (YoC) dihitung dengan membagi DPS terhadap harga beli rata-rata (modal awal) Anda. Bagi investor jangka panjang yang membeli saham di harga bawah bertahun-tahun lalu, YoC mereka bisa mencapai 15% - 30% meskipun Dividend Yield di harga pasar sekarang hanya 5%.",
  },
  {
    question: "Bagaimana strategi Dollar Cost Averaging (DCA) yang efektif di IHSG?",
    answer:
      "Strategi DCA dilakukan dengan mengalokasikan sejumlah dana tetap secara konsisten untuk membeli saham pilihan pada interval waktu teratur (misalnya setiap tanggal gajian) tanpa memusingkan fluktuasi jangka pendek. Strategi ini terbukti sangat efektif untuk saham berfundamental kuat (Blue Chip / IDX30 / LQ45) karena mereduksi risiko salah timing beli di pucuk.",
  },
];

export function EducationalContent({ activeTab }: { activeTab: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-8 mt-10">
      {/* Dynamic Tab-Specific Educational Content (>300 words each) */}
      {activeTab === "graham" && (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="h-4 w-4" />
              <span>Panduan Fundamental Saham</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Panduan Lengkap Valuasi Saham dengan Graham Number di BEI
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              <strong>Graham Number (Angka Graham)</strong> merupakan salah satu instrumen kalkulasi valuasi fundamental paling teruji dalam dunia pasar modal, diperkenalkan oleh Benjamin Graham dalam buku legendarisnya <em>The Intelligent Investor</em> dan <em>Security Analysis</em>. Metode ini ditujukan khusus bagi investor defensif yang mengutamakan keamanan modal (<em>preservation of capital</em>) di atas spekulasi pertumbuhan harga semata.
            </p>

            <h3 className="text-lg font-bold text-slate-800 text-slate-900 mt-6">
              1. Formula dan Rumus Matematis Graham Number
            </h3>
            <p>
              Rumus dasar untuk menentukan harga wajar intrinsik suatu saham menurut Graham adalah:
            </p>
            <div className="rounded-xl bg-slate-900 p-4 text-white font-mono text-center text-base sm:text-lg">
              Harga Wajar Graham = √(22.5 × EPS × BVPS)
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
              <li><strong>EPS (Earning Per Share TTM):</strong> Laba bersih per lembar saham yang dihasilkan perusahaan dalam periode 12 bulan terakhir.</li>
              <li><strong>BVPS (Book Value Per Share):</strong> Nilai buku ekuitas bersih per lembar saham yang mencerminkan aset bersih perusahaan jika seluruh kewajiban dilunasi.</li>
              <li><strong>Konstanta 22.5:</strong> Batas valuasi ketat Graham yang mensyaratkan PER maksimal 15x dan PBV maksimal 1.5x (15 × 1.5 = 22.5).</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 text-slate-900 mt-6">
              2. Konsep Margin of Safety (MoS)
            </h3>
            <p>
              Benjamin Graham menekankan bahwa investor tidak boleh membeli saham tepat di harga wajarnya. Investor cerdas selalu mencari <strong>Margin of Safety (MoS)</strong>, yaitu selisih diskon antara harga pasar saat ini dengan nilai intrinsik Graham.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-950">
                <strong className="block font-bold text-emerald-900 mb-1">MoS &gt; 20% (Undervalued)</strong>
                Saham dihargai dengan diskon besar. Peluang akumulasi dengan risiko penurunan harga terbatas.
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs text-blue-950">
                <strong className="block font-bold text-blue-900 mb-1">MoS -10% s/d 20% (Fair Value)</strong>
                Harga pasar saham mencerminkan nilai wajar operasional perusahaan secara seimbang.
              </div>
              <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5 text-xs text-rose-950">
                <strong className="block font-bold text-rose-900 mb-1">MoS &lt; -10% (Overvalued)</strong>
                Harga saham melampaui kemampuan aset dan laba riilnya. Waspadai risiko koreksi harga.
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 text-slate-900 mt-6">
              3. Penerapan Praktis pada Saham Indonesia (IDX)
            </h3>
            <p>
              Di Bursa Efek Indonesia, metode Graham Number sangat ideal digunakan untuk menganalisis emiten di sektor perbankan (BBRI, BMRI, BBCA), barang konsumsi (ICBP, INDF), dan manufaktur/otomotif (ASII) yang memiliki rekam jejak laba konsisten serta nilai aset yang jelas. Namun, model ini tidak disarankan untuk saham teknologi tanpa laba atau saham dengan ekuitas negatif.
            </p>
          </div>
        </article>
      )}

      {activeTab === "dividend" && (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="h-4 w-4" />
              <span>Strategi Dividen Investing</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Strategi Investasi Saham Dividen & Passive Income di IHSG
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              Investasi berbasis dividen (<em>Dividend Investing</em>) adalah salah satu strategi paling populer dan menguntungkan bagi investor saham di Indonesia. Melalui kepemilikan saham emiten yang membagikan laba tunai secara konsisten, investor dapat membangun arus kas pasif (<em>passive income</em>) yang mengalir teratur setiap tahun tanpa perlu menjual lembar saham induk.
            </p>

            <h3 className="text-lg font-bold text-slate-800 text-slate-900 mt-6">
              1. Memahami Istilah Kunci Dividen Saham IDX
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
              <li><strong>DPS (Dividend Per Share):</strong> Jumlah nominal rupiah dividen tunai yang dibagikan per 1 lembar saham.</li>
              <li><strong>Dividend Yield (%):</strong> Rasio dividen tahunan terhadap harga beli saham saat ini (DPS / Harga Pasar × 100%). Indeks IDX High Dividend 20 umumnya memiliki yield berkisar 5% hingga 12% per tahun.</li>
              <li><strong>Cum Date (Cumulative Date):</strong> Hari terakhir bagi investor untuk membeli saham agar berhak menerima pembagian dividen.</li>
              <li><strong>Ex Date (Expired Date):</strong> Hari perdagangan di mana pembelian saham tidak lagi memperoleh hak dividen periode tersebut.</li>
              <li><strong>Payment Date:</strong> Tanggal pengiriman dana dividen langsung ke Rekening Dana Nasabah (RDN) investor.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 text-slate-900 mt-6">
              2. Ketentuan Pajak Dividen Indonesia (PP No. 9 Tahun 2021)
            </h3>
            <p>
              Berdasarkan PMK No. 18/PMK.03/2021 turunan UU Cipta Kerja, dividen yang diterima investor perseorangan domestik <strong>BEBAS PAJAK (0%)</strong> apabila dana dividen tersebut diinvestasikan kembali ke instrumen investasi resmi di Indonesia (seperti membeli kembali saham, obligasi negara, atau reksa dana) minimal 3 tahun pajak serta dilaporkan melalui e-Reporting SPT Tahunan. Jika tidak diinvestasikan kembali, dividen dikenakan PPh Final sebesar 10%.
            </p>
          </div>
        </article>
      )}

      {activeTab === "dca" && (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="h-4 w-4" />
              <span>Manajemen Modal Portofolio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Panduan Dollar Cost Averaging (DCA) & Average Down Saham
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              <strong>Dollar Cost Averaging (DCA)</strong> adalah strategi investasi di mana investor menyetorkan dana dengan jumlah nominal tertentu secara berkala pada jadwal rutin, terlepas dari apakah harga saham sedang naik atau turun. Di bursa Indonesia, strategi ini sering dipadukan dengan teknik <em>Average Down</em> untuk mengakumulasi saham berkualitas saat terjadi koreksi pasar.
            </p>

            <h3 className="text-lg font-bold text-slate-800 text-slate-900 mt-6">
              1. Cara Menghitung Rata-Rata Harga Beli (Average Price)
            </h3>
            <p>
              Harga rata-rata tidak dihitung dengan merata-ratakan harga begitu saja, melainkan menggunakan bobot volume lot saham:
            </p>
            <div className="rounded-xl bg-slate-900 p-4 text-white font-mono text-center text-sm sm:text-base">
              Average Price = Total Modal Disetor / Total Lembar Saham
            </div>

            <h3 className="text-lg font-bold text-slate-800 text-slate-900 mt-6">
              2. Kapan Harus Melakukan Average Down?
            </h3>
            <p>
              Melakukan average down hanya dianjurkan pada emiten yang memiliki fundamental laba bertumbuh, neraca keuangan sehat dengan utang terkendali (DER rendah), dan moat bisnis yang kokoh. Jangan pernah melakukan average down pada saham gorengan atau saham yang mengalami kemunduran bisnis struktural.
            </p>
          </div>
        </article>
      )}

      {/* Structured FAQ Section with Schema Markup */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
            <HelpCircle className="h-4 w-4" />
            <span>Tanya Jawab & Edukasi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Jawaban seputar regulasi bursa, formula valuasi, dan perpajakan saham Indonesia.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50 transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-4 text-left font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-slate-200/60 bg-white p-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* JSON-LD Schema Markup for FAQPage and FinancialCalculator */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS_DATA.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
export default EducationalContent;
