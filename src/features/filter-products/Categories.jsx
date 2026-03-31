import { useState, useEffect } from "react";
import clsx from "clsx";

const CATEGORIES = [
  { key: 0, name: "Все товары" },
  { key: 1, name: "Выпечка" },
  { key: 2, name: "Молочные продукты" },
  { key: 3, name: "Закуски" },
  { key: 4, name: "Яйца и мясо" },
  { key: 5, name: "Овощи" },
  { key: 6, name: "Макаронные изделия" },
  { key: 7, name: "Напитки" },
  { key: 8, name: "Фрукты" },
  { key: 10, name: "Консервация" },
  { key: 11, name: "Масло" },
  { key: 12, name: "Сладости" },
  { key: 13, name: "Специи" },
  { key: 14, name: "Готовые блюда" },
  { key: 15, name: "Зерновые продукты" },
  { key: 16, name: "Соусы и приправы" },
  { key: 17, name: "Колбасы и мясные деликатесы" },
];

const DESKTOP_BREAKPOINT = 768;

const useResponsive = () => {
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth > DESKTOP_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > DESKTOP_BREAKPOINT;
      setIsDesktop(desktop);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
};

const CategoryItem = ({ category, isActive, isExpanded, onClick }) => (
  <div
    className={clsx("category", {
      active: isActive,
      show: isExpanded,
    })}
    onClick={() => onClick(category.name)}
  >
    <span>{category.name}</span>
  </div>
);

const ToggleButton = ({ isExpanded, onClick }) => (
  <button
    className={clsx("show-more-btn", { expanded: isExpanded })}
    onClick={onClick}
  >
    {isExpanded ? "Скрыть" : "Показать все"}
  </button>
);

const Categories = ({ chooseCategory }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const isDesktop = useResponsive();

  useEffect(() => {
    if (isDesktop) {
      setIsExpanded(false);
    }
  }, [isDesktop]);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    chooseCategory(categoryName);
  };

  const toggleCategories = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="categories">
      {CATEGORIES.map((category) => (
        <CategoryItem
          key={category.key}
          category={category}
          isActive={activeCategory === category.name}
          isExpanded={isExpanded}
          onClick={handleCategoryClick}
        />
      ))}

      <ToggleButton isExpanded={isExpanded} onClick={toggleCategories} />
    </div>
  );
};

export default Categories;
