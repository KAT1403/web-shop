import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../shared/api/firebase/firebaseConfig";
const PRODUCTS_COLLECTION = "products";
export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(
      productsRef,
      where("isActive", "==", true),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      delete data.id;
      return {
        id: doc.id,
        ...data,
      };
    });
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(
      productsRef,
      where("category", "==", category),
      where("isActive", "==", true),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      delete data.id;
      return {
        id: doc.id,
        ...data,
      };
    });
  } catch (error) {
    console.error("Ошибка при получении товаров по категории:", error);
    throw error;
  }
};

export const searchProducts = async (searchTerm) => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const snapshot = await getDocs(productsRef);

    const allProducts = snapshot.docs.map((doc) => {
      const data = doc.data();
      delete data.id;
      return {
        id: doc.id,
        ...data,
      };
    });

    const filtered = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return filtered;
  } catch (error) {
    console.error("Ошибка при поиске товаров:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    const productDoc = await getDoc(productRef);

    if (productDoc.exists()) {
      const data = productDoc.data();
      delete data.id;
      return {
        id: productDoc.id,
        ...data,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении товара:", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const docRef = await addDoc(productsRef, {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });

    return {
      id: docRef.id,
      ...productData,
    };
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(productRef, {
      ...productData,
      updatedAt: new Date(),
    });

    return {
      id,
      ...productData,
    };
  } catch (error) {
    console.error("Ошибка при обновлении товара:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(productRef, {
      isActive: false,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Ошибка при удалении товара:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const snapshot = await getDocs(productsRef);

    const categories = new Set();
    snapshot.docs.forEach((doc) => {
      const product = doc.data();
      if (product.isActive) {
        categories.add(product.category);
      }
    });

    return Array.from(categories).sort();
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    throw error;
  }
};
