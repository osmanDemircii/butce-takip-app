import { formatCurrency } from "../../utils/formatCurrency";
import "../../styles/summaryCards.css";

const SummaryCards = ({ income, expense, onIncomeClick, onExpenseClick }) => {
  const balance = income - expense;

  return (
    <div className="summary">
      {/* Üst satır: Gelir + Gider */}
      <div className="summary__row">
        <div className="summary__card summary__card--income" onClick={onIncomeClick}>
          <div className="summary__card-header">
            <span className="summary__icon">↑</span>
            <span className="summary__label">Gelir</span>
          </div>
          <span className="summary__amount">{formatCurrency(income)}</span>
        </div>

        <div className="summary__card summary__card--expense" onClick={onExpenseClick}>
          <div className="summary__card-header">
            <span className="summary__icon">↓</span>
            <span className="summary__label">Gider</span>
          </div>
          <span className="summary__amount">{formatCurrency(expense)}</span>
        </div>
      </div>

      {/* Alt satır: Bakiye */}
      <div
        className={`summary__card summary__card--balance ${
          balance >= 0 ? "summary__card--positive" : "summary__card--negative"
        }`}
      >
        <div className="summary__card-header">
          <span className="summary__icon">◈</span>
          <span className="summary__label">Net Bakiye</span>
        </div>
        <span className="summary__amount summary__amount--large">
          {balance >= 0 ? "+" : ""}{formatCurrency(Math.abs(balance))}
        </span>
      </div>
    </div>
  );
};

export default SummaryCards;