import { useState, useMemo } from "react";
import { useInvestments } from "../hooks/useInvestments";
import InvestmentCard from "../components/finance/InvestmentCard";
import AddInvestmentModal from "../components/finance/AddInvestmentModal";
import { formatCurrency } from "../utils/formatCurrency";
import { HiPlus, HiBriefcase } from "react-icons/hi2";
import "../styles/financePage.css";

const TYPE_COLORS = {
  Borç:    "#ff6b35",
  Kredi:   "#ff4d6d",
  Bitcoin: "#f7931a",
  Hisse:   "#00c896",
  Döviz:   "#00b4d8",
  Diğer:   "#9c27b0",
};

const FinancePage = () => {
  const { investments, loading, refetch } = useInvestments();
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const filters = ["Tümü", "Borç", "Kredi", "Bitcoin", "Hisse", "Döviz", "Diğer"];

  const filtered = useMemo(() => {
    if (activeFilter === "Tümü") return investments;
    return investments.filter((inv) => inv.type === activeFilter);
  }, [investments, activeFilter]);

  const totalTRY = useMemo(() => {
    return investments
      .filter((inv) => inv.currency === "TRY")
      .reduce((s, inv) => s + inv.amount, 0);
  }, [investments]);

  return (
    <div className="finance-page">
      {/* Header */}
      <div className="finance-header">
        <div>
          <h1 className="finance-title">Finans</h1>
          <p className="finance-sub">Yatırım ve varlık takibi</p>
        </div>
        <button className="finance-add-btn" onClick={() => setShowModal(true)}>
          <HiPlus /> Yeni Yatırım
        </button>
      </div>

      {/* Özet Kart */}
      <div className="finance-summary">
        <div className="finance-summary__icon">
          <HiBriefcase />
        </div>
        <div className="finance-summary__info">
          <span className="finance-summary__label">Toplam Portföy (TRY)</span>
          <span className="finance-summary__amount">
            {formatCurrency(totalTRY)}
          </span>
          <span className="finance-summary__count">
            {investments.length} yatırım kaydı
          </span>
        </div>
      </div>

      {/* Filtre Chips */}
      <div className="finance-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`finance-filter-chip ${activeFilter === f ? "finance-filter-chip--active" : ""}`}
            style={
              activeFilter === f && TYPE_COLORS[f]
                ? { background: `${TYPE_COLORS[f]}20`, borderColor: TYPE_COLORS[f], color: TYPE_COLORS[f] }
                : {}
            }
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Liste */}
      {loading ? (
        <div className="finance-loading">
          <div className="home-spinner" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="finance-empty">
          <span>💼</span>
          <p>
            {activeFilter === "Tümü"
              ? "Henüz yatırım eklenmedi"
              : `${activeFilter} kategorisinde yatırım yok`}
          </p>
          {activeFilter === "Tümü" && (
            <button className="finance-empty-btn" onClick={() => setShowModal(true)}>
              İlk Yatırımı Ekle
            </button>
          )}
        </div>
      ) : (
        <div className="finance-list">
          {filtered.map((inv) => (
            <InvestmentCard key={inv.id} investment={inv} onRefetch={refetch} />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <AddInvestmentModal
          onClose={() => setShowModal(false)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default FinancePage;