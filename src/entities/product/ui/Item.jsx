import React, { useState } from "react";

const Item = ({ item, onAdd }) => {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setQuantity("");
      return;
    }
    const value = parseInt(inputValue, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    const finalQuantity =
      typeof quantity === "number" && quantity > 0 ? quantity : 1;
    onAdd(item, finalQuantity);
  };

  const increaseQuantity = () => {
    const currentQty = typeof quantity === "number" ? quantity : 1;
    setQuantity(currentQty + 1);
  };

  const decreaseQuantity = () => {
    const currentQty = typeof quantity === "number" ? quantity : 1;
    if (currentQty > 1) {
      setQuantity(currentQty - 1);
    }
  };

  return (
    <div className="item">
      <img src={`./img/${item.img}`} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.desc}</p>
      <span className="price">{item.price} ₸</span>

      <div className="item-quantity-controls">
        <button
          type="button"
          onClick={decreaseQuantity}
          className="item-quantity-btn"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          onBlur={handleBlur}
          min="1"
          className="item-quantity-input"
        />
        <button
          type="button"
          onClick={increaseQuantity}
          className="item-quantity-btn"
        >
          +
        </button>
      </div>

      <div className="add-to-cart" onClick={handleAddToCart}>
        +
      </div>
    </div>
  );
};

export default Item;
