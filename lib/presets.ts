export interface StockPreset {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  epsTTM: number;
  bvps: number;
  dps: number;
  dcaEntries: { price: number; lots: number; label: string }[];
}

export const IDX_STOCK_PRESETS: StockPreset[] = [
  {
    symbol: "BBRI",
    name: "PT Bank Rakyat Indonesia (Persero) Tbk",
    sector: "Financials (Perbankan)",
    price: 4850,
    epsTTM: 405,
    bvps: 2150,
    dps: 340,
    dcaEntries: [
      { price: 5400, lots: 25, label: "Beli Tahap 1 (Top)" },
      { price: 5000, lots: 40, label: "Beli Tahap 2 (Koreksi)" },
      { price: 4650, lots: 60, label: "Beli Tahap 3 (Support)" },
    ],
  },
  {
    symbol: "BBCA",
    name: "PT Bank Central Asia Tbk",
    sector: "Financials (Perbankan)",
    price: 9800,
    epsTTM: 430,
    bvps: 2020,
    dps: 270,
    dcaEntries: [
      { price: 9200, lots: 10, label: "Cicilan Bulanan 1" },
      { price: 9500, lots: 15, label: "Cicilan Bulanan 2" },
      { price: 9750, lots: 20, label: "Cicilan Bulanan 3" },
    ],
  },
  {
    symbol: "ASII",
    name: "PT Astra International Tbk",
    sector: "Industrials (Otomotif & Konglomerasi)",
    price: 5100,
    epsTTM: 810,
    bvps: 5120,
    dps: 421,
    dcaEntries: [
      { price: 5600, lots: 30, label: "Beli Awal" },
      { price: 5200, lots: 50, label: "Average Down 1" },
      { price: 4900, lots: 70, label: "Average Down 2" },
    ],
  },
  {
    symbol: "TLKM",
    name: "PT Telkom Indonesia (Persero) Tbk",
    sector: "Telecommunication",
    price: 2950,
    epsTTM: 245,
    bvps: 1540,
    dps: 178,
    dcaEntries: [
      { price: 3400, lots: 50, label: "Akumulasi Q1" },
      { price: 3100, lots: 75, label: "Akumulasi Q2" },
      { price: 2850, lots: 100, label: "Akumulasi Q3" },
    ],
  },
  {
    symbol: "UNTR",
    name: "PT United Tractors Tbk",
    sector: "Heavy Equipment & Mining",
    price: 26800,
    epsTTM: 5200,
    bvps: 24300,
    dps: 2270,
    dcaEntries: [
      { price: 28500, lots: 5, label: "Beli Tahap 1" },
      { price: 26000, lots: 8, label: "Beli Tahap 2" },
    ],
  },
  {
    symbol: "ADRO",
    name: "PT Adaro Energy Indonesia Tbk",
    sector: "Energy & Mining",
    price: 3650,
    epsTTM: 780,
    bvps: 3450,
    dps: 450,
    dcaEntries: [
      { price: 3900, lots: 40, label: "Beli Tahap 1" },
      { price: 3500, lots: 60, label: "Beli Tahap 2" },
    ],
  },
];
