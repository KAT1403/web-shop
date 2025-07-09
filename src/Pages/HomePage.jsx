import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Items from "../components/Items";
import Categories from "../components/Categories";
import SearchBar from "../components/SearchBar";
import PresentationSlider from "../components/PresentationSlider";
import useMobile from "../Hooks/useMobile";
import useHomePage from "../Hooks/useHomePage";

const HomePage = () => {
  const isMobile = useMobile();
  const {
    orders,
    filteredItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
    handlePurchase,
    handleCategoryChange,
    handleSearch,
  } = useHomePage();

  return (
    <div className="wrapper">
      <Header
        orders={orders}
        totalPrice={totalPrice}
        totalItems={totalItems}
        onDelete={removeFromCart}
        onIncrease={(id) => updateQuantity(id, "increase")}
        onDecrease={(id) => updateQuantity(id, "decrease")}
        onClearCart={clearCart}
        onPurchase={handlePurchase}
      />
      {!isMobile && <PresentationSlider />}
      <Categories chooseCategory={handleCategoryChange} />
      <SearchBar onSearch={handleSearch} />
      <Items items={filteredItems} onAdd={addToCart} />
      <Footer />
      <ToastContainer newestOnTop />
    </div>
  );
};

export default HomePage;
