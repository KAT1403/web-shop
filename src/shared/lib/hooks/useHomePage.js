import { useState, useMemo, useCallback } from 'react';
import useShoppingCart from './useShoppingCart';
import useFirebaseProducts from './useFirebaseProducts';

const useHomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все товары");
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useShoppingCart();
  const { products: items, loading } = useFirebaseProducts();

  const filteredItems = useMemo(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      return items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "Все товары") {
      return items.filter((item) => item.category === selectedCategory);
    }

    return items;
  }, [selectedCategory, searchQuery, items]);



  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return {
    filteredItems,
    handleCategoryChange,
    handleSearch,
    loading,
    ...cart,
  };
};

export default useHomePage;