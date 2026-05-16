export const formatCurrency = (amount, currency = "TRY") => {
  const symbols = { TRY: "₺", USD: "$", EUR: "€", GBP: "£", BTC: "₿" };
  const symbol = symbols[currency] || currency;

  // Bitcoin için 8 ondalık, diğerleri 2
  const isCrypto = currency === "BTC";
  const formatted = Number(amount).toLocaleString("tr-TR", {
    minimumFractionDigits: isCrypto ? 2 : 2,
    maximumFractionDigits: isCrypto ? 8 : 2,
  });

  return `${symbol}${formatted}`;
};

// Yatırım tutarı — ondalık hassasiyet
export const formatInvestmentAmount = (amount, currency = "TRY") => {
  const symbols = { TRY: "₺", USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency;

  // 8 ondalığa kadar göster ama gereksiz sıfırları kaldır
  const formatted = Number(amount).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });

  return `${symbol}${formatted}`;
};