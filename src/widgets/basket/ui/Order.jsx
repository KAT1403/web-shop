import { Trash2, Plus, Minus } from "lucide-react";

const Order = ({ item, onDelete, onIncrease, onDecrease }) => {
  const handleDelete = () => {
    onDelete(item.id);
  };

  const handleIncrease = () => {
    onIncrease(item.id);
  };

  const handleDecrease = () => {
    onDecrease(item.id);
  };

  return (
    <div className="item">
      <img src={`./img/${item.img}`} alt={item.title} />
      <div className="item-info">
        <h2>{item.title}</h2>
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
          >
            <Minus size={14} />
          </button>
          <p className="quantity">{item.quantity}</p>
          <button className="quantity-btn" onClick={handleIncrease}>
            <Plus size={14} />
          </button>
        </div>
        <div className="price-section">
          <span className="total-price">{item.price * item.quantity} ₸</span>
        </div>
      </div>
      <Trash2 className="delete-icon" onClick={handleDelete} size={16} />
    </div>
  );
};

export default Order;
