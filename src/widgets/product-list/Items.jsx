import React from "react";
import Item from "../../entities/product/ui/Item";

const Items = ({ items, onAdd }) => {
  return (
    <main>
      {items.length > 0 ? (
        items.map((el) => <Item item={el} key={el.id} onAdd={onAdd} />)
      ) : (
        <div className="no-results">
          <h2>Товары не найдены</h2>
          <p>Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </main>
  );
};

export default Items;
