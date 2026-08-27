import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses any Indonesian or standard formatted number string into a numeric float.
 * Handles formats like:
 * - "2.500,50" -> 2500.50 (Indonesian standard)
 * - "2,500.50" -> 2500.50 (US standard)
 * - "2.500"    -> 2500
 * - "2500"     -> 2500
 * - "Rp 12.350,00" -> 12350
 */
export function parseIndonesianNumber(input: string | number | undefined | null): number {
  if (input === undefined || input === null || input === "") return 0;
  if (typeof input === "number") return isNaN(input) ? 0 : input;

  // Clean strings
  let str = input.trim();
  // Remove currency prefix and alphabets
  str = str.replace(/[^\d.,-]/g, "");

  if (!str || str === "-") return 0;

  // Check format:
  // If string has both '.' and ','
  if (str.includes(".") && str.includes(",")) {
    const lastDot = str.lastIndexOf(".");
    const lastComma = str.lastIndexOf(",");
    if (lastComma > lastDot) {
      // Indonesian format: 1.250.000,50
      str = str.replace(/\./g, "").replace(",", ".");
    } else {
      // US format: 1,250,000.50
      str = str.replace(/,/g, "");
    }
  } else if (str.includes(",")) {
    // Only commas: could be decimal (2500,50) or thousand separator (2,500)
    const parts = str.split(",");
    if (parts.length === 2 && parts[1].length <= 2) {
      // Decimal comma: 2500,5
      str = str.replace(",", ".");
    } else {
      // Thousands comma: 2,500 or 1,250,000
      str = str.replace(/,/g, "");
    }
  } else if (str.includes(".")) {
    // Only dots: in Indonesian context, single dot with 3 digits like "2.500" or multiple dots "1.500.000" are thousands
    const parts = str.split(".");
    if (parts.length > 2) {
      // Multiple dots: definitely thousands (1.500.000)
      str = str.replace(/\./g, "");
    } else if (parts.length === 2 && parts[1].length === 3) {
      // Standard 3-digit thousand separator (e.g. 4.500 or 25.000)
      str = str.replace(".", "");
    } else {
      // Standard decimal dot (e.g. 15.5)
      // keep as is
    }
  }

  const result = parseFloat(str);
  return isNaN(result) ? 0 : result;
}

/**
 * Formats a number to Indonesian Rupiah representation
 * e.g., 2500000 -> "Rp 2.500.000"
 */
export function formatRupiah(
  amount: number | null | undefined,
  includePrefix = true,
  decimals = 0
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return includePrefix ? "Rp 0" : "0";
  }

  const prefix = includePrefix ? "Rp " : "";
  const sign = amount < 0 ? "-" : "";
  const absVal = Math.abs(amount);

  const parts = absVal.toFixed(decimals).split(".");
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const decPart = parts[1] ? `,${parts[1]}` : "";

  return `${sign}${prefix}${intPart}${decPart}`;
}

/**
 * Formats a number with thousand separators without currency symbol
 */
export function formatNumber(
  num: number | null | undefined,
  decimals = 0
): string {
  if (num === null || num === undefined || isNaN(num)) return "0";
  return formatRupiah(num, false, decimals);
}

/**
 * Formats a percentage with 2 decimal places
 */
export function formatPercent(value: number | null | undefined, decimals = 2): string {
  if (value === null || value === undefined || isNaN(value)) return "0.00%";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Helper to calculate Graham Number
 * Formula: Graham Number = sqrt(22.5 * EPS * BVPS)
 */
export function calculateGrahamNumber(
  currentPrice: number,
  eps: number,
  bvps: number
) {
  if (eps <= 0 || bvps <= 0) {
    return {
      isValid: false,
      errorReason:
        eps <= 0 && bvps <= 0
          ? "EPS dan BVPS bernilai negatif/nol. Model Graham mensyaratkan laba dan nilai buku positif."
          : eps <= 0
          ? "EPS bernilai negatif/nol (Perusahaan sedang merugi). Model Graham memerlukan EPS positif."
          : "BVPS bernilai negatif/nol (Ekuitas perusahaan negatif). Model Graham memerlukan BVPS positif.",
      grahamNumber: 0,
      marginOfSafetyPercent: 0,
      priceToGrahamRatio: 0,
      status: "invalid" as const,
    };
  }

  const product = 22.5 * eps * bvps;
  const grahamNumber = Math.sqrt(product);

  // Margin of Safety = (Graham Number - Current Price) / Graham Number * 100%
  const marginOfSafetyPercent =
    grahamNumber > 0 ? ((grahamNumber - currentPrice) / grahamNumber) * 100 : 0;

  const priceToGrahamRatio = grahamNumber > 0 ? currentPrice / grahamNumber : 0;

  let status: "undervalued" | "fair" | "overvalued" = "fair";
  if (marginOfSafetyPercent >= 20) {
    status = "undervalued";
  } else if (marginOfSafetyPercent <= -10) {
    status = "overvalued";
  } else {
    status = "fair";
  }

  return {
    isValid: true,
    errorReason: null,
    grahamNumber,
    marginOfSafetyPercent,
    priceToGrahamRatio,
    status,
  };
}

/**
 * Helper for Dividend Calculations (1 Lot = 100 Shares)
 */
export function calculateDividend(
  currentPrice: number,
  dps: number,
  lots: number,
  apply10PercentTax = false
) {
  const totalShares = Math.max(0, lots) * 100;
  const totalInvestment = currentPrice * totalShares;
  const grossDividend = dps * totalShares;
  const taxRate = apply10PercentTax ? 0.1 : 0.0;
  const taxAmount = grossDividend * taxRate;
  const netDividend = grossDividend - taxAmount;

  const dividendYield = currentPrice > 0 ? (dps / currentPrice) * 100 : 0;

  return {
    totalShares,
    totalInvestment,
    grossDividend,
    taxAmount,
    netDividend,
    dividendYield,
    yieldOnCost: dividendYield, // If currentPrice is buy price
  };
}

/**
 * Helper for DCA / Average Price Calculations
 */
export interface PurchaseEntry {
  id: string;
  label: string;
  price: number;
  lots: number;
}

export function calculateDCA(entries: PurchaseEntry[], currentMarketPrice = 0) {
  let totalShares = 0;
  let totalLots = 0;
  let totalCapital = 0;

  entries.forEach((entry) => {
    const validLots = Math.max(0, entry.lots || 0);
    const validPrice = Math.max(0, entry.price || 0);
    const shares = validLots * 100;
    const cost = shares * validPrice;

    totalLots += validLots;
    totalShares += shares;
    totalCapital += cost;
  });

  const averagePrice = totalShares > 0 ? totalCapital / totalShares : 0;
  const currentPortfolioValue =
    currentMarketPrice > 0 ? currentMarketPrice * totalShares : 0;
  const floatingPnL =
    currentMarketPrice > 0 ? currentPortfolioValue - totalCapital : 0;
  const floatingPnLPercent =
    totalCapital > 0 && currentMarketPrice > 0
      ? (floatingPnL / totalCapital) * 100
      : 0;

  return {
    totalLots,
    totalShares,
    totalCapital,
    averagePrice,
    currentPortfolioValue,
    floatingPnL,
    floatingPnLPercent,
  };
}
