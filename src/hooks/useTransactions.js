import { useState, useEffect, useCallback } from "react";
import { getTransactions } from "../firebase/transactionService";
import { useAuth } from "../context/AuthContext";

export const useTransactions = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await getTransactions(currentUser.uid);
      setTransactions(data);
    } catch (err) {
      console.error("İşlemler yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, refetch: fetchTransactions };
};