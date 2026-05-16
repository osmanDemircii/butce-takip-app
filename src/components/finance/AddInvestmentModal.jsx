import { useState } from "react";
import { addInvestment } from "../../firebase/investmentService";
import { useAuth } from "../../context/AuthContext";
import { HiXMark } from "react-icons/hi2";

const INVESTMENT_TYPES = [
  { value: "Borç",    emoji: "🤝" },
  { value: "Kredi",   emoji: "🏦" },
  { value: "Bitcoin", emoji: "₿"  },
  { value: "Hisse",   emoji: "📈" },
  { value: "Döviz",   emoji: "💱" },
  { value: "Diğer",   emoji: "📦" },
];

const CURRENCIES = ["TRY", "USD", "EUR", "GBP"];

const AddInvestmentModal = ({ onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    currency: "TRY",
    type: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.type) return;
    setLoading(true);
    try {
      await addInvestment(currentUser.uid, {
        title: form.title,
        amount: parseFloat(form.amount),
        currency: form.currency,
        type: form.type,
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Yatırım eklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle" />

        <div className="modal-header">
          <h2 className="modal-title" style={{ color: "var(--accent-blue)" }}>
            Yeni Yatırım
          </h2>
          <button className="modal-close" onClick={onClose}>
            <HiXMark />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Yatırım Adı */}
          <div className="modal-field">
            <label className="modal-label">Yatırım Adı</label>
            <input
              type="text"
              name="title"
              className="modal-input"
              placeholder="Örn: Apple Hissesi"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Para Birimi + Tutar */}
          <div className="modal-row">
            <div className="modal-field" style={{ flex: "0 0 100px" }}>
              <label className="modal-label">Para Birimi</label>
              <select
                name="currency"
                className="modal-select"
                value={form.currency}
                onChange={handleChange}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="modal-field" style={{ flex: 1 }}>
              <label className="modal-label">Tutar</label>
              <input
                type="number"
                name="amount"
                className="modal-input"
                placeholder="0.000000"
                min="0"
                step="any"
                value={form.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Kategori */}
          <div className="modal-field">
            <label className="modal-label">Kategori</label>
            <div className="category-grid">
              {INVESTMENT_TYPES.map(({ value, emoji }) => (
                <button
                  key={value}
                  type="button"
                  className={`category-chip ${form.type === value ? "category-chip--active" : ""}`}
                  style={
                    form.type === value
                      ? { borderColor: "var(--accent-blue)", color: "var(--accent-blue)" }
                      : {}
                  }
                  onClick={() => setForm({ ...form, type: value })}
                >
                  <span style={{ fontSize: "1.3rem" }}>{emoji}</span>
                  <span>{value}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="modal-submit"
            style={{ background: "var(--accent-blue)" }}
            disabled={loading || !form.title || !form.amount || !form.type}
          >
            {loading ? <span className="login-spinner" /> : "Yatırım Ekle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInvestmentModal;