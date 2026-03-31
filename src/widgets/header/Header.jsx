import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import Basket from "../basket/Basket";
import AuthModal from "../../features/auth/AuthModal";
import useAuth from "../../shared/lib/hooks/useAuth";
import { logoutUser } from "../../entities/user/api/authService";
import { LogIn, LogOut } from "lucide-react";

const Header = ({
  orders,
  totalPrice,
  totalItems,
  onDelete,
  onIncrease,
  onDecrease,
  onClearCart,
  onPurchase,
  isHomePage = false,
}) => {
  const { currentUser } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <header>
        <div>
          <span className="logo">
            {isHomePage ? "goMART" : <Link to="/">На главную</Link>}
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
            {currentUser ? (
              <li 
                onClick={() => logoutUser()} 
                title="Выйти"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 500, color: '#2c3e50', justifyContent: 'center' }}
              >
                {currentUser.email.split('@')[0]}
                <LogOut size={16} />
              </li>
            ) : (
              <li 
                onClick={() => setIsAuthModalOpen(true)}
                title="Войти"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 500, color: '#2c3e50', justifyContent: 'center' }}
              >
                Войти
                <LogIn size={16} />
              </li>
            )}
          </ul>

          {isHomePage && (
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
          )}
        </div>
      </header>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
