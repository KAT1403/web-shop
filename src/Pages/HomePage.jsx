import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../widgets/header/Header";
import Footer from "../widgets/footer/Footer";
import Items from "../widgets/product-list/Items";
import Categories from "../features/filter-products/Categories";
import SearchBar from "../features/search-products/SearchBar";
import PresentationSlider from "../widgets/presentation-slider/PresentationSlider";
import useMobile from "../shared/lib/hooks/useMobile";
import useHomePage from "../shared/lib/hooks/useHomePage";
import LoadingSpinner from "../shared/ui/LoadingSpinner";

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
    loading,
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
        isHomePage={true}
      />
      {!isMobile && <PresentationSlider />}
      <Categories chooseCategory={handleCategoryChange} />
      <SearchBar onSearch={handleSearch} />
      {loading ? <LoadingSpinner /> : <Items items={filteredItems} onAdd={addToCart} />}
      <Footer />
      <ToastContainer newestOnTop />
    </div>
  );
};

export default HomePage;
