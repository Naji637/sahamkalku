import React from "react";
import type { Metadata } from "next";
import { ShieldCheck, Lock, Eye, FileText, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Kebijakan Privasi (Privacy Policy) | Kalkulator Saham IDX",
  description:
    "Kebijakan privasi resmi SahamTools yang mematuhi GDPR, CCPA, serta standar periklanan Google AdSense dan Google DoubleClick DART Cookies.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Top Breadcrumb & Header */}
        <div className="mb-8 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Kepatuhan Standar Google AdSense &amp; Regulasi Privasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Kebijakan Privasi (Privacy Policy)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Terakhir diperbarui: 18 Agustus 2026 &bull; Berlaku untuk seluruh pengunjung platform SahamTools
          </p>
        </div>

        {/* Policy Content Body */}
        <article className="prose prose-slate max-w-none rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs text-slate-700 space-y-6 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-600" />
              1. Pengantar &amp; Komitmen Privasi
            </h2>
            <p>
              Di <strong>SahamTools</strong>, privasi pengunjung adalah salah satu prioritas utama kami. Dokumen Kebijakan Privasi ini menjelaskan jenis informasi apa saja yang dikumpulkan dan dicatat oleh situs kami serta bagaimana kami menggunakannya.
            </p>
            <p>
              Jika Anda memiliki pertanyaan tambahan atau memerlukan informasi lebih lanjut tentang Kebijakan Privasi kami, jangan ragu untuk menghubungi kami melalui halaman kontak kami.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="h-4 w-4 text-emerald-600" />
              2. Data Kalkulator &amp; Penyimpanan Sisi Klien (Client-Side)
            </h2>
            <p>
              Semua angka, input keuangan, harga saham, EPS, BVPS, nominal dividen, dan transaksi DCA yang Anda masukkan ke dalam kalkulator diproses <strong>secara lokal di peramban (browser) Anda</strong>. Kami <strong>tidak pernah</strong> mengirimkan atau menyimpan data portofolio pribadi Anda ke server database eksternal kami.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cookie className="h-4 w-4 text-emerald-600" />
              3. Berkas Log (Log Files) &amp; Cookie
            </h2>
            <p>
              SahamTools mengikuti prosedur standar penggunaan berkas log. Berkas ini mencatat pengunjung saat mereka mengunjungi situs web. Informasi yang dikumpulkan oleh berkas log meliputi:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Alamat Protokol Internet (IP Address)</li>
              <li>Tipe peramban (Browser type) dan Penyedia Layanan Internet (ISP)</li>
              <li>Stempel tanggal dan waktu kunjungan</li>
              <li>Halaman rujukan/keluar (Referring/Exit pages)</li>
              <li>Jumlah klik untuk analisis tren, pengelolaan situs, dan pengumpulan informasi demografis</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              4. Cookie Google DoubleClick DART &amp; Google AdSense
            </h2>
            <p>
              Google adalah salah satu vendor pihak ketiga di situs kami. Google juga menggunakan cookie, yang dikenal sebagai <strong>cookie DART</strong>, untuk menayangkan iklan kepada pengunjung situs kami berdasarkan kunjungan mereka ke situs kami dan situs lain di internet.
            </p>
            <p>
              Pengunjung dapat memilih untuk menolak penggunaan cookie DART dengan mengunjungi Kebijakan Privasi jaringan iklan dan konten Google di URL berikut:{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline font-semibold"
              >
                https://policies.google.com/technologies/ads
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              5. Kebijakan Privasi Pihak Ketiga &amp; Mitra Iklan
            </h2>
            <p>
              Server iklan atau jaringan iklan pihak ketiga menggunakan teknologi seperti cookie, JavaScript, atau Web Beacon yang digunakan dalam iklan dan tautan masing-masing yang muncul di SahamTools, yang dikirim langsung ke peramban pengguna. Mereka secara otomatis menerima alamat IP Anda saat ini terjadi.
            </p>
            <p>
              Perhatikan bahwa SahamTools tidak memiliki akses atau kontrol terhadap cookie yang digunakan oleh pengiklan pihak ketiga ini.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              6. Hak Privasi GDPR &amp; CCPA
            </h2>
            <p>
              Kami memastikan setiap pengguna sepenuhnya mengetahui hak-hak perlindungan data mereka:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Hak Akses:</strong> Anda berhak meminta salinan data pribadi Anda.</li>
              <li><strong>Hak Perbaikan:</strong> Anda berhak meminta kami mengoreksi informasi yang Anda yakini tidak akurat.</li>
              <li><strong>Hak Penghapusan:</strong> Anda berhak meminta kami menghapus data pribadi Anda dalam kondisi tertentu.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              7. Informasi Anak
            </h2>
            <p>
              Bagian lain dari prioritas kami adalah menambahkan perlindungan bagi anak-anak saat menggunakan internet. Kami mendorong orang tua dan wali untuk mengamati, berpartisipasi dalam, dan/atau memantau serta memandu aktivitas online mereka.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-4">
            <h2 className="text-lg font-bold text-slate-900">
              8. Persetujuan Pengguna
            </h2>
            <p>
              Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui syarat dan ketentuannya.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
