import { useState } from "react";
import { loginUser, registerUser } from "../../firebase/authService";
import { useTheme } from "../../context/ThemeContext";
import { HiEye, HiEyeSlash, HiWallet } from "react-icons/hi2";
import "../../styles/loginPage.css";

const LoginPage = () => {
  const { theme } = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        if (!form.name.trim()) {
          setError("İsim alanı zorunludur.");
          setLoading(false);
          return;
        }
        await registerUser(form.name, form.email, form.password);
      } else {
        await loginUser(form.email, form.password);
      }
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
          setError("E-posta veya şifre hatalı.");
          break;
        case "auth/user-not-found":
          setError("Bu e-posta ile kayıtlı kullanıcı bulunamadı.");
          break;
        case "auth/email-already-in-use":
          setError("Bu e-posta zaten kullanımda.");
          break;
        case "auth/weak-password":
          setError("Şifre en az 6 karakter olmalıdır.");
          break;
        case "auth/invalid-email":
          setError("Geçerli bir e-posta adresi girin.");
          break;
        default:
          setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" data-theme={theme}>
      {/* Arka plan dekoratif daireler */}
      <div className="login-bg">
        <div className="login-bg__circle login-bg__circle--1" />
        <div className="login-bg__circle login-bg__circle--2" />
        <div className="login-bg__circle login-bg__circle--3" />
      </div>

      <div className="login-container">
        {/* Logo & Başlık */}
        <div className="login-header">
          <div className="login-logo">
            <HiWallet className="login-logo__icon" />
          </div>
          <h1 className="login-title">Bütçe Takip</h1>
          <p className="login-subtitle">
            {isRegister
              ? "Hesabını oluştur, kontrolü ele al"
              : "Tekrar hoş geldin!"}
          </p>
        </div>

        {/* Form Kartı */}
        <div className="login-card">
          {/* Tab Switcher */}
          <div className="login-tabs">
            <button
              className={`login-tab ${!isRegister ? "login-tab--active" : ""}`}
              onClick={() => { setIsRegister(false); setError(""); }}
            >
              Giriş Yap
            </button>
            <button
              className={`login-tab ${isRegister ? "login-tab--active" : ""}`}
              onClick={() => { setIsRegister(true); setError(""); }}
            >
              Kayıt Ol
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* İsim — sadece kayıt */}
            {isRegister && (
              <div className="login-field">
                <label className="login-label">Ad Soyad</label>
                <input
                  type="text"
                  name="name"
                  className="login-input"
                  placeholder="Adınızı girin"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* E-posta */}
            <div className="login-field">
              <label className="login-label">E-posta</label>
              <input
                type="email"
                name="email"
                className="login-input"
                placeholder="ornek@mail.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Şifre */}
            <div className="login-field">
              <label className="login-label">Şifre</label>
              <div className="login-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="login-input login-input--password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="login-eye"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
            </div>

            {/* Hata Mesajı */}
            {error && (
              <div className="login-error">
                <span>⚠️ {error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? (
                <span className="login-spinner" />
              ) : isRegister ? (
                "Hesap Oluştur"
              ) : (
                "Giriş Yap"
              )}
            </button>
          </form>
        </div>

        <p className="login-footer">
          {isRegister ? "Zaten hesabın var mı?" : "Hesabın yok mu?"}{" "}
          <button
            className="login-switch"
            onClick={() => { setIsRegister(!isRegister); setError(""); }}
          >
            {isRegister ? "Giriş yap" : "Kayıt ol"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;