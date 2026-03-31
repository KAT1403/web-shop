import React from "react";
import Order from "./Order";

const OrdersList = ({ orders, onDelete, onIncrease, onDecrease }) => (
  <div>
    {orders.map((el) => (
      <Order
        key={el.id}
        item={el}
        onDelete={onDelete}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    ))}
  </div>
);

export default OrdersList;
