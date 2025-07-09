import { useState, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

const useShoppingCart = () => {
  const [orders, setOrders] = useState([]);
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

  const handlePurchase = useCallback(() => {
    if (orders.length === 0) {
      toast.info("Корзина пуста! 🛒", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    const totalPrice = getTotalPrice();
    const totalItems = getTotalItems();

    toast.success(
      `Спасибо за покупку!\nТоваров: ${totalItems} шт.\nСумма: ${totalPrice} ₸`,
      {
        position: "bottom-right",
        autoClose: 3000,
      }
    );
    clearCart();
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