import {
  HiBriefcase, HiShoppingCart, HiHeart, HiAcademicCap,
  HiBolt, HiMusicalNote, HiHome, HiTruck, HiGift,
  HiEllipsisHorizontalCircle,
} from "react-icons/hi2";

export const CATEGORIES = {
  income: [
    { value: "Maaş",      label: "Maaş",      Icon: HiBriefcase },
    { value: "Serbest",   label: "Serbest",   Icon: HiHome },
    { value: "Yatırım",   label: "Yatırım",   Icon: HiBolt },
    { value: "Kira",      label: "Kira",      Icon: HiHome },
    { value: "Hediye",    label: "Hediye",    Icon: HiGift },
    { value: "Diğer",     label: "Diğer",     Icon: HiEllipsisHorizontalCircle },
  ],
  expense: [
    { value: "Market",    label: "Market",    Icon: HiShoppingCart },
    { value: "Sağlık",    label: "Sağlık",    Icon: HiHeart },
    { value: "Eğitim",    label: "Eğitim",    Icon: HiAcademicCap },
    { value: "Fatura",    label: "Fatura",    Icon: HiBolt },
    { value: "Eğlence",   label: "Eğlence",   Icon: HiMusicalNote },
    { value: "Ulaşım",    label: "Ulaşım",    Icon: HiTruck },
    { value: "Kira",      label: "Kira",      Icon: HiHome },
    { value: "Hediye",    label: "Hediye",    Icon: HiGift },
    { value: "Diğer",     label: "Diğer",     Icon: HiEllipsisHorizontalCircle },
  ],
};

export const getCategoryIcon = (categoryName) => {
  const all = [...CATEGORIES.income, ...CATEGORIES.expense];
  const found = all.find((c) => c.value === categoryName);
  return found ? found.Icon : HiEllipsisHorizontalCircle;
};