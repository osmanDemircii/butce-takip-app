import { useMemo, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import FilterTabs from "../components/analytics/FilterTabs";
import AnalyticsSummary from "../components/analytics/AnalyticsSummary";
import ExpensePieChart from "../components/analytics/ExpensePieChart";
import "../styles/analyticsPage.css";

const getRange = (filter) => {
  const now = new Date();
  if (filter === "weekly") {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    start.setHours(0, 0, 0, 0);
    return { start, end: now };
  }
  if (filter === "monthly") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return { start, end: now };
  }
  if (filter === "yearly") {
    const start = new Date(now.getFullYear(), 0, 1);
    return { start, end: now };
  }
};

const AnalyticsPage = () => {
  const [filter, setFilter] = useState("monthly");
  const { transactions, loading } = useTransactions();

  const filtered = useMemo(() => {
    const { start, end } = getRange(filter);
    return transactions.filter((tx) => {
      if (!tx.date) return false;
      const d = tx.date.toDate ? tx.date.toDate() : new Date(tx.date);
      return d >= start && d <= end;
    });
  }, [transactions, filter]);

  const income  = useMemo(() => filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0), [filtered]);
  const expense = useMemo(() => filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0), [filtered]);
  const expenses = useMemo(() => filtered.filter((t) => t.type === "expense"), [filtered]);

  return (
    <div className="analytics-page">
      <div className="analytics-page__header">
        <h1 className="analytics-page__title">Analiz</h1>
        <p className="analytics-page__sub">Finansal durumun genel görünümü</p>
      </div>

      <FilterTabs active={filter} onChange={setFilter} />

      {loading ? (
        <div className="analytics-loading">
          <div className="home-spinner" />
        </div>
      ) : (
        <>
          <AnalyticsSummary income={income} expense={expense} />
          <ExpensePieChart transactions={expenses} />
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;