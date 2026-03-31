import useAuth from "../../../shared/lib/hooks/useAuth";

const CartTotal = ({ totalPrice, totalItems, onPurchase, onClearCart }) => {
  const { currentUser } = useAuth();

  return (
    <div className="cart-total">
      <div className="total-info">
        <div className="total-items">Товаров: {totalItems} шт.</div>
        <div className="total-price">
          <strong>Общая сумма: {totalPrice} ₸</strong>
        </div>
      </div>
      
      {!currentUser && (
        <div style={{ color: '#d32f2f', margin: '15px 0 5px', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px', border: '1px solid #d32f2f', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>i</span>
          Требуется авторизация
        </div>
      )}

      <div className="cart-buttons" style={{ marginTop: currentUser ? '15px' : '5px' }}>
        <button className="clear-cart-btn" onClick={onClearCart}>
          Очистить корзину
        </button>
        {currentUser ? (
          <button className="purchase-btn" onClick={onPurchase}>
            Купить
          </button>
        ) : (
          <button className="purchase-btn" disabled style={{ backgroundColor: '#e0e0e0', color: '#9e9e9e', cursor: 'not-allowed' }}>
            Купить
          </button>
        )}
      </div>
    </div>
  );
};

export default CartTotal;