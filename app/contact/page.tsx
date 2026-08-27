"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Saran Fitur / Pertanyaan Kalkulator");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
            <Mail className="h-4 w-4" />
            <span>Dukungan Pengguna &amp; Kerja Sama</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Hubungi Tim SahamTools
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kirimkan kritik, saran penambahan formula baru, atau pertanyaan seputar platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Contact Info Sidebar */}
          <div className="space-y-4 md:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Informasi Kontak
              </h3>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <Mail className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-slate-800">Email Redaksi &amp; Support</strong>
                  <span className="font-mono text-slate-600">nreff572@gmail.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-slate-800">Lokasi Operasional</strong>
                  <span>NTB</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <MessageSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-slate-800">Waktu Respon</strong>
                  <span>Senin - Jumat (09:00 - 17:00 WIB, Hari Bursa)</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs text-emerald-900">
              <strong className="block font-bold text-emerald-950 mb-1">Butuh Formula Baru?</strong>
              Sampaikan jika Anda menginginkan kalkulator DCF (Discounted Cash Flow), Peter Lynch Fair Value, atau Dividend Payout Ratio.
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="md:col-span-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Pesan Anda Berhasil Terkirim!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Terima kasih telah menghubungi kami. Tim kami akan meninjau pesan Anda dan memberikan tanggapan melalui email <strong>{email}</strong> dalam 1-2 hari kerja.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Formulir Pertanyaan &amp; Masukan
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1"
                      >
                        Nama Lengkap <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1"
                      >
                        Alamat Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1"
                    >
                      Topik Pesan
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="Saran Fitur / Pertanyaan Kalkulator">Saran Fitur / Formula Baru</option>
                      <option value="Laporan Bug / Ketidakakuratan Angka">Laporan Bug / Ketidakakuratan Angka</option>
                      <option value="Pertanyaan Seputar Periklanan AdSense">Pertanyaan Seputar Iklan &amp; Sponsorship</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1"
                    >
                      Pesan atau Masukan Anda <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan masukan atau pertanyaan Anda secara rinci di sini..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Kirim Pesan
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
