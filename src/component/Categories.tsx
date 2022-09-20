import React from "react";
import "./styles/Categories.scss";

type CategoriesProps={
  value: number,
  onChangeCategory: (idx:number)=>void,
}
const Categories: React.FC <CategoriesProps>=React.memo(({ value, onChangeCategory }) =>{
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
              className={value === idx ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
)
export default Categories;
