import { useState } from "react";
import { addTransaction } from "../../firebase/transactionService";
import { useAuth } from "../../context/AuthContext";
import { CATEGORIES } from "../../utils/categoryIcons";
import { HiXMark } from "react-icons/hi2";
import "../../styles/modal.css";

const CURRENCIES = ["TRY", "USD", "EUR", "GBP"];

const AddTransactionModal = ({ type, onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    currency: "TRY",
    category: "",
    description: "",
  });

  const categories = CATEGORIES[type] || [];
  const isIncome = type === "income";
  const accentColor = isIncome ? "var(--accent-green)" : "var(--accent-red)";
  const title = isIncome ? "Gelir Ekle" : "Gider Ekle";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.category) return;
    setLoading(true);
    try {
      await addTransaction(currentUser.uid, {
        type,
        amount: parseFloat(form.amount),
        currency: form.currency,
        category: form.category,
        description: form.description,
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("İşlem eklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Handle */}
        <div className="modal-handle" />

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title" style={{ color: accentColor }}>
            {title}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <HiXMark />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
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
                placeholder="0.00"
                min="0"
                step="0.01"
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
              {categories.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  className={`category-chip ${
                    form.category === value ? "category-chip--active" : ""
                  }`}
                  style={
                    form.category === value
                      ? { borderColor: accentColor, color: accentColor }
                      : {}
                  }
                  onClick={() => setForm({ ...form, category: value })}
                >
                  <Icon className="category-chip__icon" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Açıklama */}
          <div className="modal-field">
            <label className="modal-label">Açıklama (Opsiyonel)</label>
            <input
              type="text"
              name="description"
              className="modal-input"
              placeholder="Notunuzu girin..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="modal-submit"
            style={{ background: accentColor }}
            disabled={loading || !form.amount || !form.category}
          >
            {loading ? <span className="login-spinner" /> : title}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;