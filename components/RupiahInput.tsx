"use client";

import React, { useState } from "react";
import { parseIndonesianNumber, formatRupiah } from "@/lib/utils";
import { X } from "lucide-react";

interface RupiahInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  helperText?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  required?: boolean;
}

export function RupiahInput({
  id,
  label,
  value,
  onChange,
  placeholder = "0",
  helperText,
  prefix = "Rp",
  suffix,
  disabled = false,
  required = false,
}: RupiahInputProps) {
  const [localText, setLocalText] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Compute what to display:
  // If user is focused and has typed something, show their typed text;
  // otherwise, format the numerical value according to Indonesian locale
  const displayValue = isFocused
    ? localText ?? (value !== 0 ? value.toLocaleString("id-ID") : "")
    : value !== 0
    ? value.toLocaleString("id-ID")
    : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setLocalText(rawVal);
    const parsed = parseIndonesianNumber(rawVal);
    onChange(parsed);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setLocalText(value !== 0 ? value.toLocaleString("id-ID") : "");
  };

  const handleBlur = () => {
    setIsFocused(false);
    const parsed = parseIndonesianNumber(displayValue);
    onChange(parsed);
    setLocalText(null);
  };

  const handleClear = () => {
    setLocalText("");
    onChange(0);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {value > 0 && prefix === "Rp" && (
          <span className="text-[11px] font-medium text-emerald-600">
            {formatRupiah(value, true)}
          </span>
        )}
      </div>

      <div className="relative flex items-center rounded-lg border border-slate-300 bg-white shadow-xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
        {prefix && (
          <span className="select-none pl-3 text-sm font-semibold text-slate-400">
            {prefix}
          </span>
        )}

        <input
          id={id}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full bg-transparent px-3 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden disabled:bg-slate-100 disabled:cursor-not-allowed ${
            prefix ? "pl-2" : ""
          } ${suffix || displayValue ? "pr-8" : ""}`}
        />

        {displayValue && !disabled && (
          <button
            type="button"
            id={`${id}-clear-btn`}
            onClick={handleClear}
            className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 focus:outline-hidden cursor-pointer"
            title="Hapus input"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        {suffix && !displayValue && (
          <span className="select-none pr-3 text-xs font-medium text-slate-400">
            {suffix}
          </span>
        )}
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      )}
    </div>
  );
}
export default RupiahInput;
