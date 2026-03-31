import { useState, useEffect, useCallback } from "react";
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
  getCategories,
} from "../../../entities/product/api/productService";

const useFirebaseProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const getProductsByCategoryHandler = useCallback(async (category) => {
    try {
      setLoading(true);
      setError(null);

      if (category === "Все товары") {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } else {
        const categoryProducts = await getProductsByCategory(category);
        setProducts(categoryProducts);
      }
    } catch (err) {
      console.error("Ошибка при фильтрации по категории:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProductsHandler = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);

      if (!searchTerm.trim()) {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } else {
        const searchResults = await searchProducts(searchTerm);
        setProducts(searchResults);
      }
    } catch (err) {
      console.error("Ошибка при поиске:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (err) {
      console.error("Ошибка при обновлении товаров:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    getProductsByCategory: getProductsByCategoryHandler,
    searchProducts: searchProductsHandler,
    refreshProducts,
  };
};

export default useFirebaseProducts;
