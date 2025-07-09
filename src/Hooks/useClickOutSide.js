// Хук для клика вне элемента

import { useEffect, useRef } from "react";

const useClickOutside = (isOpen, setIsOpen) => {
  const cartRef = useRef(null);
  const cartIconRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        cartRef.current &&
        cartIconRef.current &&
        !cartRef.current.contains(event.target) &&
        !cartIconRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  return { cartRef, cartIconRef };
};

export default useClickOutside;
