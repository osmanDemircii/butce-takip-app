import { useState } from "react";
import { getCategoryIcon } from "../../utils/categoryIcons";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { deleteTransaction } from "../../firebase/transactionService";
import EditTransactionModal from "./EditTransactionModal";
import ConfirmModal from "../shared/ConfirmModal";
import { HiTrash, HiPencilSquare } from "react-icons/hi2";
import "../../styles/recentTransactions.css";
import "../../styles/actionButtons.css";

const RecentTransactions = ({ transactions, onRefetch }) => {
  const recent = transactions.slice(0, 5);
  const [editTx, setEditTx] = useState(null);
  const [deleteTx, setDeleteTx] = useState(null);

  const handleDelete = async () => {
    await deleteTransaction(deleteTx.id);
    setDeleteTx(null);
    onRefetch();
  };

  return (
    <>
      <div className="recent">
        <div className="recent__header">
          <h3 className="recent__title">Son İşlemler</h3>
        </div>

        {recent.length === 0 ? (
          <div className="recent__empty">
            <span>Bu ay henüz işlem yok</span>
          </div>
        ) : (
          <div className="recent__list">
            {recent.map((tx) => {
              const Icon = getCategoryIcon(tx.category);
              const isIncome = tx.type === "income";
              return (
                <div
                  key={tx.id}
                  className="tx-item tx-item--clickable"
                  onClick={() => {
                    if (window.innerWidth < 768) setEditTx(tx);
                  }}
                >
                  <div
                    className="tx-item__icon-wrap"
                    style={{ background: isIncome ? "#00c89620" : "#ff4d6d20" }}
                  >
                    <Icon style={{
                      color: isIncome ? "var(--accent-green)" : "var(--accent-red)",
                      fontSize: "1.1rem",
                    }} />
                  </div>

                  <div className="tx-item__info">
                    <span className="tx-item__category">{tx.category}</span>
                    <span className="tx-item__date">{formatDate(tx.date)}</span>
                    {tx.description && (
                      <span className="tx-item__desc">{tx.description}</span>
                    )}
                  </div>

                  <div className="tx-item__right">
                    <span
                      className="tx-item__amount"
                      style={{ color: isIncome ? "var(--accent-green)" : "var(--accent-red)" }}
                    >
                      {isIncome ? "+" : "-"}{formatCurrency(tx.amount, tx.currency)}
                    </span>
                    <div className="action-btns">
                      <button
                        className="action-btn action-btn--edit desktop-only"
                        onClick={(e) => { e.stopPropagation(); setEditTx(tx); }}
                      >
                        <HiPencilSquare />
                      </button>
                      <button
                        className="action-btn action-btn--delete"
                        onClick={(e) => { e.stopPropagation(); setDeleteTx(tx); }}
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Düzenle Modalı */}
      {editTx && (
        <EditTransactionModal
          transaction={editTx}
          onClose={() => setEditTx(null)}
          onSuccess={() => { onRefetch(); setEditTx(null); }}
        />
      )}

      {/* Silme Onay Modalı */}
      {deleteTx && (
        <ConfirmModal
          title="İşlemi Sil"
          message={`"${deleteTx.category}" kaydını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTx(null)}
        />
      )}
    </>
  );
};

export default RecentTransactions;