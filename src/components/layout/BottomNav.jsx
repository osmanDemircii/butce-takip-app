import { NavLink, useNavigate } from "react-router-dom";
import { HiHome, HiChartPie, HiCreditCard, HiUser, HiArrowRightOnRectangle } from "react-icons/hi2";
import { logoutUser } from "../../firebase/authService";
import "../../styles/bottomNav.css";

const navItems = [
  { to: "/",          icon: HiHome,       label: "Ana Sayfa" },
  { to: "/analytics", icon: HiChartPie,   label: "Analiz"    },
  { to: "/finance",   icon: HiCreditCard, label: "Finans"    },
  { to: "/profile",   icon: HiUser,       label: "Profil"    },
];

const BottomNav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!window.confirm("Çıkış yapmak istediğinize emin misiniz?")) return;
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
          }
        >
          <div className="bottom-nav__icon-wrap">
            <Icon className="bottom-nav__icon" />
          </div>
          <span className="bottom-nav__label">{label}</span>
        </NavLink>
      ))}

      {/* Çıkış — sadece desktop sidebar'da görünür */}
      <button className="bottom-nav__logout" onClick={handleLogout}>
        <div className="bottom-nav__icon-wrap">
          <HiArrowRightOnRectangle className="bottom-nav__icon" />
        </div>
        <span className="bottom-nav__label">Çıkış</span>
      </button>
    </nav>
  );
};

export default BottomNav;