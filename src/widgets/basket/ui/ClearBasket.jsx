import React from "react";
import { X } from "lucide-react";

const ClearBasket = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="modal-icon">🛒</div>
        <h2 className="modal-title">Очистка корзины</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={onClose}>
            Оставить как есть
          </button>
          <button className="modal-button confirm" onClick={onConfirm}>
            Да, очистить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearBasket;
