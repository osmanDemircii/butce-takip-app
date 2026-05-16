import { formatCurrency } from "../../utils/formatCurrency";
import "../../styles/analyticsSummary.css";

const AnalyticsSummary = ({ income, expense }) => {
  const balance = income - expense;
  const spentPercent = income > 0
    ? Math.min(Math.round((expense / income) * 100), 100)
    : 0;

  return (
    <div className="an-summary">
      {/* Gelir */}
      <div className="an-card an-card--income">
        <div className="an-card__label">
          <span className="an-card__dot an-card__dot--green" />
          Toplam Gelir
        </div>
        <div className="an-card__amount">{formatCurrency(income)}</div>
        <div className="an-card__sub">
          Gelirin <strong>%{spentPercent}</strong>'i harcandı
        </div>
        {/* Progress bar */}
        <div className="an-progress">
          <div
            className="an-progress__fill an-progress__fill--green"
            style={{ width: `${spentPercent}%` }}
          />
        </div>
      </div>

      {/* Gider */}
      <div className="an-card an-card--expense">
        <div className="an-card__label">
          <span className="an-card__dot an-card__dot--red" />
          Toplam Gider
        </div>
        <div className="an-card__amount an-card__amount--red">
          {formatCurrency(expense)}
        </div>
        <div className="an-card__sub">
          {expense > income
            ? "⚠️ Bütçe aşıldı!"
            : `${formatCurrency(income - expense)} tasarruf`}
        </div>
      </div>

      {/* Net Bakiye */}
      <div className={`an-card an-card--balance ${balance >= 0 ? "an-card--pos" : "an-card--neg"}`}>
        <div className="an-card__label">
          <span className={`an-card__dot ${balance >= 0 ? "an-card__dot--blue" : "an-card__dot--red"}`} />
          Net Bakiye
        </div>
        <div className={`an-card__amount ${balance >= 0 ? "an-card__amount--blue" : "an-card__amount--red"}`}>
          {balance >= 0 ? "+" : ""}{formatCurrency(Math.abs(balance))}
        </div>
        <div className="an-card__sub">
          {balance >= 0 ? "Pozitif bakiye 🎉" : "Negatif bakiye ⚠️"}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;