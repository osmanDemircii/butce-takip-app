import { useState } from "react";
import { HiXMark, HiPlus } from "react-icons/hi2";
import { getCategoryIcon } from "../../utils/categoryIcons";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { deleteTransaction } from "../../firebase/transactionService";
import AddTransactionModal from "./AddTransactionModal";

const TransactionListModal = ({ type, transactions, onClose, onRefetch }) => {
  const isIncome = type === "income";
  const title = isIncome ? "Tüm Gelirler" : "Tüm Giderler";
  const accentColor = isIncome ? "var(--accent-green)" : "var(--accent-red)";
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="modal-handle" />
          <div className="modal-header">
            <h2 className="modal-title" style={{ color: accentColor }}>
              {title}
              <span style={{
                marginLeft: "0.5rem",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}>
                ({transactions.length})
              </span>
            </h2>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button
                className="txlist-add-btn"
                style={{ color: accentColor, borderColor: accentColor }}
                onClick={(e) => { e.stopPropagation(); setShowAdd(true); }}
              >
                <HiPlus /> {isIncome ? "Gelir Ekle" : "Gider Ekle"}
              </button>
              <button className="modal-close" onClick={onClose}>
                <HiXMark />
              </button>
            </div>
          </div>

          {transactions.length === 0 ? (
            <div style={{
              color: "var(--text-muted)",
              textAlign: "center",
              padding: "2.5rem 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <span style={{ fontSize: "2rem" }}>{isIncome ? "💰" : "💸"}</span>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>Bu ayda kayıt bulunamadı.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingTop: "0.5rem" }}>
              {transactions.map((tx) => {
                const Icon = getCategoryIcon(tx.category);
                return (
                  <div key={tx.id} className="tx-item">
                    <div className="tx-item__icon-wrap"
                      style={{ background: isIncome ? "#00c89620" : "#ff4d6d20" }}>
                      <Icon style={{ color: accentColor, fontSize: "1.1rem" }} />
                    </div>
                    <div className="tx-item__info">
                      <span className="tx-item__category">{tx.category}</span>
                      <span className="tx-item__date">{formatDate(tx.date)}</span>
                      {tx.description && (
                        <span className="tx-item__desc">{tx.description}</span>
                      )}
                    </div>
                    <div className="tx-item__right">
                      <span className="tx-item__amount" style={{ color: accentColor }}>
                        {isIncome ? "+" : "-"}{formatCurrency(tx.amount, tx.currency)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showAdd && (
        <AddTransactionModal
          type={type}
          onClose={() => setShowAdd(false)}
          onSuccess={() => { onRefetch(); setShowAdd(false); }}
        />
      )}
    </>
  );
};

export default TransactionListModal;