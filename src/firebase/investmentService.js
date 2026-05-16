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

// Yatırım ekle
export const addInvestment = async (userId, data) => {
  return await addDoc(collection(db, "investments"), {
    userId,
    title: data.title,
    amount: data.amount,
    currency: data.currency,
    type: data.type,
    date: Timestamp.now(),
  });
};

// Kullanıcının yatırımlarını getir (sıralama client-side)
export const getInvestments = async (userId) => {
  const q = query(
    collection(db, "investments"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

  // Client-side sırala
  return docs.sort((a, b) => {
    const aTime = a.date?.seconds || 0;
    const bTime = b.date?.seconds || 0;
    return bTime - aTime;
  });
};

// Yatırım sil
export const deleteInvestment = async (investmentId) => {
  await deleteDoc(doc(db, "investments", investmentId));
};