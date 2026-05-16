import { useState } from "react";
import { useTheme, THEMES } from "../../context/ThemeContext";
import { logoutUser, changePassword } from "../../firebase/authService";
import { useNavigate } from "react-router-dom";
import {
  HiShieldCheck,
  HiArrowRightOnRectangle,
  HiChevronRight,
  HiXMark,
  HiEye,
  HiEyeSlash,
} from "react-icons/hi2";
import "../../styles/settingsMenu.css";

// Şifre Değiştir Modalı
const ChangePasswordModal = ({ onClose }) => {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.newPass.length < 6) {
      setError("Yeni şifre en az 6 karakter olmalıdır.");
      return;
    }
    if (form.newPass !== form.confirm) {
      setError("Yeni şifreler eşleşmiyor.");
      return;
    }
    setLoading(true);
    try {
      await changePassword(form.current, form.newPass);
      setSuccess(true);
      setTimeout(onClose, 1500);
    } catch (err) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Mevcut şifreniz hatalı.");
      } else {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
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
            Şifre Değiştir
          </h2>
          <button className="modal-close" onClick={onClose}>
            <HiXMark />
          </button>
        </div>

        {success ? (
          <div className="pw-success">
            <span>✅</span>
            <p>Şifreniz başarıyla değiştirildi!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Mevcut şifre */}
            <div className="modal-field">
              <label className="modal-label">Mevcut Şifre</label>
              <div className="login-input-wrap">
                <input
                  type={showCurrent ? "text" : "password"}
                  className="modal-input login-input--password"
                  placeholder="••••••••"
                  value={form.current}
                  onChange={(e) => setForm({ ...form, current: e.target.value })}
                  required
                />
                <button type="button" className="login-eye"
                  onClick={() => setShowCurrent((p) => !p)}>
                  {showCurrent ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
            </div>

            {/* Yeni şifre */}
            <div className="modal-field">
              <label className="modal-label">Yeni Şifre</label>
              <div className="login-input-wrap">
                <input
                  type={showNew ? "text" : "password"}
                  className="modal-input login-input--password"
                  placeholder="En az 6 karakter"
                  value={form.newPass}
                  onChange={(e) => setForm({ ...form, newPass: e.target.value })}
                  required
                />
                <button type="button" className="login-eye"
                  onClick={() => setShowNew((p) => !p)}>
                  {showNew ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
            </div>

            {/* Şifre tekrar */}
            <div className="modal-field">
              <label className="modal-label">Yeni Şifre (Tekrar)</label>
              <input
                type="password"
                className="modal-input"
                placeholder="••••••••"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required
              />
            </div>

            {error && (
              <div className="login-error">⚠️ {error}</div>
            )}

            <button
              type="submit"
              className="modal-submit"
              style={{ background: "var(--accent-blue)" }}
              disabled={loading}
            >
              {loading ? <span className="login-spinner" /> : "Şifreyi Güncelle"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Ana SettingsMenu
const SettingsMenu = () => {
  const { theme, changeTheme } = useTheme();
  const navigate = useNavigate();
  const [showPwModal, setShowPwModal] = useState(false);

  // Tema mod ve renk ayrımı
  const MODE_THEMES = THEMES.filter((t) => t.id === "dark" || t.id === "light");
  const COLOR_THEMES = THEMES.filter((t) => t.id !== "dark" && t.id !== "light");

  const activeMode = ["dark", "light"].includes(theme) ? theme : "dark";
  const activeColor = !["dark", "light"].includes(theme) ? theme : null;

  const handleModeChange = (id) => changeTheme(id);
  const handleColorChange = (id) => changeTheme(id);

  const handleLogout = async () => {
    if (!window.confirm("Çıkış yapmak istediğinize emin misiniz?")) return;
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="settings">
      {/* Tema Modu */}
      <div className="settings__section">
        <h3 className="settings__section-title">Görünüm Modu</h3>
        <div className="theme-mode-row">
          {MODE_THEMES.map(({ id, name, emoji, preview }) => (
            <button
              key={id}
              className={`theme-mode-card ${activeMode === id && !activeColor ? "theme-mode-card--active" : ""}`}
              onClick={() => handleModeChange(id)}
            >
              <div className="theme-card__preview">
                {preview.map((color, i) => (
                  <div key={i} className="theme-card__color"
                    style={{ backgroundColor: color }} />
                ))}
              </div>
              <span className="theme-card__emoji">{emoji}</span>
              <span className="theme-card__name">{name}</span>
              {activeMode === id && !activeColor && (
                <div className="theme-card__check">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Renk Teması */}
      <div className="settings__section">
        <h3 className="settings__section-title">Renk Teması</h3>
        <div className="theme-color-grid">
          {COLOR_THEMES.map(({ id, name, emoji, preview }) => (
            <button
              key={id}
              className={`theme-card ${activeColor === id ? "theme-card--active" : ""}`}
              onClick={() => handleColorChange(id)}
            >
              <div className="theme-card__preview">
                {preview.map((color, i) => (
                  <div key={i} className="theme-card__color"
                    style={{ backgroundColor: color }} />
                ))}
              </div>
              <span className="theme-card__emoji">{emoji}</span>
              <span className="theme-card__name">{name}</span>
              {activeColor === id && (
                <div className="theme-card__check">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tercihler */}
      <div className="settings__section">
        <h3 className="settings__section-title">Güvenlik</h3>
        <div className="settings__list">
          <div className="settings__item" onClick={() => setShowPwModal(true)}>
            <div className="settings__item-left">
              <div className="settings__item-icon settings__item-icon--green">
                <HiShieldCheck />
              </div>
              <div className="settings__item-info">
                <span className="settings__item-title">Şifre Değiştir</span>
                <span className="settings__item-sub">Hesap güvenliğini güncelle</span>
              </div>
            </div>
            <HiChevronRight className="settings__item-arrow" />
          </div>
        </div>
      </div>

      {/* Çıkış */}
      <button className="settings__logout" onClick={handleLogout}>
        <HiArrowRightOnRectangle />
        Çıkış Yap
      </button>

      {/* Şifre Modalı */}
      {showPwModal && (
        <ChangePasswordModal onClose={() => setShowPwModal(false)} />
      )}
    </div>
  );
};

export default SettingsMenu;