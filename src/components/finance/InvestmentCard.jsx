import { useState } from "react";
import { formatInvestmentAmount } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { deleteInvestment } from "../../firebase/investmentService";
import { HiTrash, HiPencilSquare } from "react-icons/hi2";
import EditInvestmentModal from "./EditInvestmentModal";
import ConfirmModal from "../shared/ConfirmModal";
import "../../styles/investmentCard.css";
import "../../styles/actionButtons.css";

const TYPE_CONFIG = {
  Borç:    { emoji: "🤝", color: "#ff6b35" },
  Kredi:   { emoji: "🏦", color: "#ff4d6d" },
  Bitcoin: { emoji: "₿",  color: "#f7931a" },
  Hisse:   { emoji: "📈", color: "#00c896" },
  Döviz:   { emoji: "💱", color: "#00b4d8" },
  Diğer:   { emoji: "📦", color: "#9c27b0" },
};

const InvestmentCard = ({ investment, onRefetch }) => {
  const { id, title, amount, currency, type, date } = investment;
  const config = TYPE_CONFIG[type] || TYPE_CONFIG["Diğer"];
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    await deleteInvestment(id);
    setShowConfirm(false);
    onRefetch();
  };

  return (
    <>
      <div
        className="inv-card"
        onClick={() => {
          if (window.innerWidth < 768) setShowEdit(true);
        }}
      >
        <div
          className="inv-card__icon"
          style={{ background: `${config.color}20`, color: config.color }}
        >
          {config.emoji}
        </div>

        <div className="inv-card__info">
          <span className="inv-card__title">{title}</span>
          <div className="inv-card__meta">
            <span
              className="inv-card__badge"
              style={{ background: `${config.color}20`, color: config.color }}
            >
              {type}
            </span>
            <span className="inv-card__date">{formatDate(date)}</span>
          </div>
        </div>

        <div className="inv-card__right">
          <span className="inv-card__amount" style={{ color: config.color }}>
            {formatInvestmentAmount(amount, currency)}
          </span>
          <div className="action-btns">
            <button
              className="action-btn action-btn--edit desktop-only"
              onClick={(e) => { e.stopPropagation(); setShowEdit(true); }}
            >
              <HiPencilSquare />
            </button>
            <button
              className="action-btn action-btn--delete"
              onClick={(e) => { e.stopPropagation(); setShowConfirm(true); }}
            >
              <HiTrash />
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditInvestmentModal
          investment={investment}
          onClose={() => setShowEdit(false)}
          onSuccess={() => { onRefetch(); setShowEdit(false); }}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          title="Yatırımı Sil"
          message={`"${title}" yatırımını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default InvestmentCard;