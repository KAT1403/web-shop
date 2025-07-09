import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import Basket from "./Basket";

const Header = ({
  orders,
  totalPrice,
  totalItems,
  onDelete,
  onIncrease,
  onDecrease,
  onClearCart,
  onPurchase,
  showHomeLink = false,
}) => {
  return (
    <header>
      <div>
        <span className="logo">
          {showHomeLink ? <Link to="/">На главную</Link> : "goMART"}
        </span>
        <ul className="nav">
          <li>
            <Link to="/AboutUsPage">О нас</Link>
          </li>
          <li>
            <Link to="/ContactPage">Контакты</Link>
          </li>
          <li>
            <Link to="/WorkPage">Работа</Link>
          </li>
        </ul>

        <Basket
          orders={orders}
          totalPrice={totalPrice}
          totalItems={totalItems}
          onDelete={onDelete}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onClearCart={onClearCart}
          onPurchase={onPurchase}
        />
      </div>
    </header>
  );
};

export default Header;
