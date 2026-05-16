# 💰 Bütçe Takip App

Kişisel bütçe ve yatırım takip uygulaması. React + Firebase ile geliştirilmiş, PWA destekli modern bir finans yönetim aracı.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat-square&logo=firebase)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=flat-square&logo=bootstrap)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square&logo=pwa)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)

---

## 🖥️ Ekran Görüntüleri

| Ana Sayfa | Analiz | Finans | Profil |
|-----------|--------|--------|--------|
| Gelir/Gider/Bakiye özeti | Pasta grafiği | Yatırım takibi | Tema & Güvenlik |

---

## ✨ Özellikler

- 🔐 **Firebase Authentication** — Email/şifre ile kayıt ve giriş
- 💸 **Gelir/Gider Takibi** — Aylık filtreleme, kategori bazlı listeleme
- 📈 **Yatırım Yönetimi** — Bitcoin, Hisse, Döviz, Borç, Kredi takibi
- 📊 **Analiz Sayfası** — Haftalık/Aylık/Yıllık pasta grafiği
- 🎨 **6 Tema** — Gece/Gündüz modu + Ocean, Sunset, Forest, Galaksi renk temaları
- 📱 **PWA Desteği** — Telefona yüklenebilir
- 🖥️ **Responsive Tasarım** — Mobil bottom nav, desktop sidebar
- ✏️ **Düzenle/Sil** — Onay modalı ile güvenli silme
- 🔑 **Şifre Değiştir** — Mevcut şifre doğrulamalı güvenli güncelleme
- 🌍 **Çoklu Para Birimi** — TRY, USD, EUR, GBP desteği

---

## 🛠️ Teknoloji Yığını

| Teknoloji | Kullanım |
|-----------|----------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Firebase Firestore | Veritabanı |
| Firebase Auth | Kimlik Doğrulama |
| Bootstrap 5 | CSS Framework |
| react-icons | İkon Kütüphanesi |
| recharts | Grafik Kütüphanesi |
| react-router-dom | Sayfa Yönlendirme |
| vite-plugin-pwa | PWA Desteği |

---

## 📁 Klasör Yapısı

```src/
├── components/
│   ├── layout/          # AppLayout, BottomNav
│   ├── home/            # DateNavigator, SummaryCards, Modals
│   ├── analytics/       # FilterTabs, PieChart, Summary
│   ├── finance/         # InvestmentCard, Modals
│   ├── profile/         # UserInfo, SettingsMenu
│   └── shared/          # ConfirmModal, LoadingSpinner
├── context/
│   ├── ThemeContext.jsx # 6 tema yönetimi
│   └── AuthContext.jsx  # Oturum yönetimi
├── firebase/
│   ├── firebaseConfig.js
│   ├── authService.js
│   ├── transactionService.js
│   └── investmentService.js
├── hooks/
│   ├── useTransactions.js
│   └── useInvestments.js
├── pages/
│   ├── auth/
│   │   └── LoginPage.jsx
│   ├── HomePage.jsx
│   ├── AnalyticsPage.jsx
│   ├── FinancePage.jsx
│   └── ProfilePage.jsx
├── styles/              # Tüm CSS dosyaları
└── utils/               # formatCurrency, formatDate, categoryIcons
```

---

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- Firebase hesabı

### 1. Repoyu Klonla
```bash
git clone https://github.com/kullanici-adi/butce-takip-app.git
cd butce-takip-app
```

### 2. Bağımlılıkları Kur
```bash
npm install
```

### 3. Firebase Kurulumu

[Firebase Console](https://console.firebase.google.com)'a git:
- Yeni proje oluştur
- **Authentication** → Email/Password aktifleştir
- **Firestore Database** oluştur (europe-west3)
- Web uygulaması ekle → config bilgilerini kopyala

### 4. `.env` Dosyası Oluştur
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Geliştirme Sunucusunu Başlat
```bash
npm run dev
```

### 6. Production Build
```bash
npm run build
npm run preview
```

---

## 🔥 Firebase Firestore Yapısı
users/{userId}
├── name: string
├── email: string
├── createdAt: timestamp
└── theme: string
transactions/{transactionId}
├── userId: string
├── type: "income" | "expense"
├── amount: number
├── currency: "TRY" | "USD" | "EUR" | "GBP"
├── category: string
├── description: string
├── date: timestamp
└── createdAt: timestamp
investments/{investmentId}
├── userId: string
├── title: string
├── amount: number
├── currency: string
├── type: "Borç"|"Kredi"|"Bitcoin"|"Hisse"|"Döviz"|"Diğer"
└── date: timestamp

---

## 🔒 Firestore Güvenlik Kuralları

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📱 PWA Kurulumu

### Android
1. Chrome'da siteyi aç
2. Adres çubuğundaki **"Yükle"** ikonuna tıkla
3. **"Yükle"** butonuna bas

### iOS
1. Safari'de siteyi aç
2. Alt menüden **Paylaş** ikonuna tıkla
3. **"Ana Ekrana Ekle"** seçeneğini seç

---

## 🤝 Katkıda Bulunma

1. Fork'la
2. Feature branch oluştur (`git checkout -b feature/yeni-ozellik`)
3. Commit'le (`git commit -m 'feat: yeni özellik eklendi'`)
4. Push'la (`git push origin feature/yeni-ozellik`)
5. Pull Request aç

---

## 📝 Lisans

MIT License — dilediğin gibi kullanabilirsin.

---

<div align="center">
  💰 <strong>Bütçe Takip App</strong> — React + Firebase ile geliştirildi
</div>

