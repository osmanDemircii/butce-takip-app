import { useState, useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import DateNavigator from "../components/home/DateNavigator";
import SummaryCards from "../components/home/SummaryCards";
import RecentTransactions from "../components/home/RecentTransactions";
import AddTransactionModal from "../components/home/AddTransactionModal";
import TransactionListModal from "../components/home/TransactionListModal";
import { HiPlus } from "react-icons/hi2";
import "../styles/homePage.css";

const HomePage = () => {
  const today = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const { transactions, loading, refetch } = useTransactions();

  const [addModal, setAddModal]   = useState(null); // "income" | "expense" | null
  const [listModal, setListModal] = useState(null); // "income" | "expense" | null

  // Seçili aya göre filtrele
  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      if (!tx.date) return false;
      const d = tx.date.toDate ? tx.date.toDate() : new Date(tx.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }, [transactions, year, month]);

  const income  = useMemo(() => filtered.filter((t) => t.type === "income"), [filtered]);
  const expense = useMemo(() => filtered.filter((t) => t.type === "expense"), [filtered]);

  const totalIncome  = income.reduce((s, t) => s + t.amount, 0);
  const totalExpense = expense.reduce((s, t) => s + t.amount, 0);

  const handlePrev = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };

  const handleNext = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  return (
    <div className="home-page">
      <DateNavigator
        year={year}
        month={month}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <SummaryCards
        income={totalIncome}
        expense={totalExpense}
        onIncomeClick={() => setListModal("income")}
        onExpenseClick={() => setListModal("expense")}
      />

      {loading ? (
        <div className="home-loading">
          <div className="home-spinner" />
        </div>
      ) : (
        <RecentTransactions transactions={filtered} onRefetch={refetch} />
      )}

      {/* FAB Butonları */}
      <div className="home-fabs">
        <button
          className="home-fab home-fab--expense"
          onClick={() => setAddModal("expense")}
        >
          <HiPlus /> Gider
        </button>
        <button
          className="home-fab home-fab--income"
          onClick={() => setAddModal("income")}
        >
          <HiPlus /> Gelir
        </button>
      </div>

      {/* Modallar */}
      {addModal && (
        <AddTransactionModal
          type={addModal}
          onClose={() => setAddModal(null)}
          onSuccess={refetch}
        />
      )}

      {listModal && (
        <TransactionListModal
          type={listModal}
          transactions={listModal === "income" ? income : expense}
          onClose={() => setListModal(null)}
          onRefetch={refetch}
        />
      )}
    </div>
  );
};

export default HomePage;