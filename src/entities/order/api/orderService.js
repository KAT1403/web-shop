import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../shared/api/firebase/firebaseConfig";

const ORDERS_COLLECTION = "orders";

export const createOrder = async (userId, items, totalPrice, totalItems) => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    
    const compactItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    const docRef = await addDoc(ordersRef, {
      userId: userId || "guest",
      items: compactItems,
      totalPrice,
      totalItems,
      createdAt: new Date(),
      status: "pending",
    });

    return { id: docRef.id };
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    throw error;
  }
};
