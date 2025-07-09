import { useState, useMemo, useCallback } from 'react';
import useShoppingCart from './useShoppingCart';
import itemsList from '../Data/ItemsList';

const items = itemsList;

const useHomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все товары");
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useShoppingCart();

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
  }, [selectedCategory, searchQuery]);



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
    ...cart,
  };
};

export default useHomePage;