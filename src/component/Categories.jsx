import React from "react";
import "./styles/Categories.scss";

function Categories({ categoryId, onChangeCategory }) {
  let categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, idx) => {
          return (
            <li
              key={idx}
              onClick={() => onChangeCategory(idx)}
              className={categoryId === idx ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
