import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// İşlem ekle
export const addTransaction = async (userId, data) => {
  return await addDoc(collection(db, "transactions"), {
    userId,
    type: data.type,
    amount: data.amount,
    currency: data.currency,
    category: data.category,
    description: data.description || "",
    date: Timestamp.now(),
    createdAt: Timestamp.now(),
  });
};

// Kullanıcının tüm işlemlerini getir (sıralama client-side)
export const getTransactions = async (userId) => {
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

  // Firestore index yerine client-side sırala
  return docs.sort((a, b) => {
    const aTime = a.createdAt?.seconds || 0;
    const bTime = b.createdAt?.seconds || 0;
    return bTime - aTime;
  });
};

// İşlem sil
export const deleteTransaction = async (transactionId) => {
  await deleteDoc(doc(db, "transactions", transactionId));
};