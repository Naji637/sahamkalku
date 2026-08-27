import React from "react";
import Link from "next/link";
import { TrendingUp, ShieldAlert, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-black">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-base font-black text-white">
                KalkulatorSaham
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Platform kalkulator investasi saham Bursa Efek Indonesia (BEI / IDX) independen, akurat, dan gratis untuk membantu investor ritel mengevaluasi valuasi fundamental dan perencanaan portofolio.
            </p>
            <div className="text-[11px] text-slate-500">
              Format Mata Uang: <strong>Rupiah (IDR)</strong> &bull; Lot: <strong>100 Lembar</strong>
            </div>
          </div>

          {/* Quick Tools */}
          <div className="space-y-2 md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Modul Kalkulator
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Kalkulator Graham Number (Harga Wajar)
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Kalkulator Dividen &amp; Yield (Net &amp; Gross)
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Kalkulator DCA (Dollar Cost Averaging)
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Simulasi Average Down Saham
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Compliance Pages */}
          <div className="space-y-2 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Kepatuhan Hukum
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Kebijakan Privasi (Privacy)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Syarat Layanan (Terms)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Tentang Kami (About)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Hubungi Kami (Contact)
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer Box */}
          <div className="space-y-2 md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              Disclaimer Investasi
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-800/50 p-3 rounded-lg border border-slate-800">
              Seluruh kalkulasi dan data pada situs ini disediakan semata-mata untuk tujuan edukasi dan simulasi. Kalkulator ini <strong>BUKAN</strong> merupakan ajakan, rekomendasi jual/beli, atau nasihat keuangan resmi. Selalu lakukan riset mandiri (DYOR).
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
          <div>
            &copy; 2026 SahamTools. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300">
              Kebijakan Cookie &amp; AdSense
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Penafian Hukum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
