"use client";

import React, { useEffect } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "fluid";
  client?: string;
  responsive?: boolean;
  className?: string;
  label?: string;
}

export function AdBanner({
  slot,
  format = "auto",
  client = "ca-pub-XXXXXXXXXXXXXXXX",
  responsive = true,
  className = "",
  label = "Sponsor & Rekomendasi Investasi",
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      // Ignore adsbygoogle push error during development/adblocker active
    }
  }, []);

  const isConfigured = client && !client.includes("XXXXXXXXXXXXXXXX");

  return (
    <div
      id={`ad-container-${slot}`}
      className={`my-6 mx-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-center transition-all ${className}`}
    >
      <div className="mb-1.5 flex items-center justify-between px-2 text-[11px] font-medium tracking-wider uppercase text-slate-400">
        <span>{label}</span>
        <span className="text-[10px] text-slate-400">Google AdSense Partner</span>
      </div>

      {isConfigured ? (
        <div className="overflow-hidden rounded-lg bg-white">
          <ins
            className="adsbygoogle block"
            style={{ display: "block", minHeight: "90px" }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
          />
        </div>
      ) : (
        <div className="flex min-h-[90px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            AdSense Slot Placeholder (ID: {slot})
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Area penempatan iklan responsif {format}. Format teroptimasi untuk Google AdSense & SEO Compliance.
          </p>
        </div>
      )}
    </div>
  );
}
export default AdBanner;
