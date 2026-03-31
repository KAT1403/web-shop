import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createOrder } from '../../../entities/order/api/orderService';
import { auth } from '../../api/firebase/firebaseConfig';

const useShoppingCart = () => {
  const [orders, setOrders] = useState(() => {
    try {
      const item = localStorage.getItem('cart');
      return item ? JSON.parse(item) : [];
    } catch (e) {
      console.warn("Ошибка при загрузке корзины", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(orders));
  }, [orders]);

  const lastToastTimestamp = useRef(0);

  const addToCart = useCallback((item, quantity = 1) => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find((order) => order.id === item.id);
      const now = Date.now();
      
      if (now - lastToastTimestamp.current > 100) {
        toast.success(
          existingOrder
            ? `Количество ${item.title} увеличено`
            : `${item.title} добавлен(а) в корзину`,
          {
            position: "bottom-right",
            autoClose: 1500,
          }
        );
        lastToastTimestamp.current = now;
      }

      return existingOrder
        ? prevOrders.map((order) =>
            order.id === item.id
              ? { ...order, quantity: order.quantity + quantity }
              : order
          )
        : [...prevOrders, { ...item, quantity: quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  }, []);

  const updateQuantity = useCallback((id, operation) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              quantity:
                operation === "increase"
                  ? order.quantity + 1
                  : Math.max(1, order.quantity - 1),
            }
          : order
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setOrders([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return orders.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [orders]);

  const getTotalItems = useCallback(() => {
    return orders.reduce((total, item) => total + item.quantity, 0);
  }, [orders]);

  const handlePurchase = useCallback(async () => {
    if (orders.length === 0) {
      toast.info("Корзина пуста! 🛒", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) {
      toast.error("Необходимо авторизоваться для совершения покупки!");
      return;
    }

    const totalPrice = getTotalPrice();
    const totalItems = getTotalItems();

    try {
      await createOrder(currentUserId, orders, totalPrice, totalItems);
      
      toast.success(
        `Заказ успешно оформлен!\nТоваров: ${totalItems} шт.\nСумма: ${totalPrice} ₸`,
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );
      clearCart();
    } catch (error) {
      toast.error("Ошибка при оформлении заказа. Попробуйте позже.");
    }
  }, [orders, getTotalPrice, getTotalItems, clearCart]);

  return {
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice: getTotalPrice(),
    totalItems: getTotalItems(),
    handlePurchase,
  };
};

export default useShoppingCart;