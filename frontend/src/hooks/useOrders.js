import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const q = query(
      collection(db, "orders"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(orderList);
      setLoading(false);

    });

    return unsubscribe;

  }, []);

  const updateOrderStatus = async (orderId, status) => {

    const orderRef = doc(db, "orders", orderId);

    await updateDoc(orderRef, {
      status
    });

  };

  return {
    orders,
    loading,
    updateOrderStatus
  };

}