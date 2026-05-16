import "../../styles/badgesSection.css";

const BADGES = [
  {
    id: 1,
    emoji: "🎯",
    title: "İlk Adım",
    desc: "İlk işlemini ekledin",
    color: "#00c896",
    unlocked: true,
  },
  {
    id: 2,
    emoji: "💰",
    title: "Tasarruf Ustası",
    desc: "Bir ay pozitif bakiye",
    color: "#00b4d8",
    unlocked: true,
  },
  {
    id: 3,
    emoji: "📊",
    title: "Analist",
    desc: "Analiz sayfasını ziyaret ettin",
    color: "#9c27b0",
    unlocked: true,
  },
  {
    id: 4,
    emoji: "📈",
    title: "Yatırımcı",
    desc: "İlk yatırımını ekledin",
    color: "#f7931a",
    unlocked: false,
  },
  {
    id: 5,
    emoji: "🏆",
    title: "Bütçe Şampiyonu",
    desc: "3 ay üst üste pozitif",
    color: "#ffc107",
    unlocked: false,
  },
  {
    id: 6,
    emoji: "🌟",
    title: "Pro Kullanıcı",
    desc: "50+ işlem kaydı",
    color: "#ff6b35",
    unlocked: false,
  },
];

const BadgesSection = () => {
  return (
    <div className="badges">
      <h3 className="badges__title">Başarı Rozetleri</h3>
      <div className="badges__grid">
        {BADGES.map(({ id, emoji, title, desc, color, unlocked }) => (
          <div
            key={id}
            className={`badge-card ${unlocked ? "badge-card--unlocked" : "badge-card--locked"}`}
          >
            <div
              className="badge-card__icon"
              style={{
                background: unlocked ? `${color}20` : "var(--input-bg)",
                color: unlocked ? color : "var(--text-muted)",
              }}
            >
              {unlocked ? emoji : "🔒"}
            </div>
            <span
              className="badge-card__title"
              style={{ color: unlocked ? "var(--text-primary)" : "var(--text-muted)" }}
            >
              {title}
            </span>
            <span className="badge-card__desc">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesSection;