import { useState, useEffect, useCallback } from "react";
import { getInvestments } from "../firebase/investmentService";
import { useAuth } from "../context/AuthContext";

export const useInvestments = () => {
  const { currentUser } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvestments = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await getInvestments(currentUser.uid);
      setInvestments(data);
    } catch (err) {
      console.error("Yatırımlar yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchInvestments();
  }, [fetchInvestments]);

  return { investments, loading, refetch: fetchInvestments };
};