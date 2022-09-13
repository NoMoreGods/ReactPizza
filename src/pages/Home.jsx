import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategotyId,
  setCurrentPage,
  setFilter,
} from "../redux/slice/filterSlice";
import { fetchPizzas } from "../redux/slice/pizzaSlice";

import qs from "qs";
import { Link, useNavigate } from "react-router-dom";

import Categories from "../component/Categories";
import Pagination from "../component/Pagination";
import PizzaBlock from "../component/PizzaBlock";
import Skeleton from "../component/PizzaBlock/Skeleton";
import Sort, { sortNames } from "../component/Sort";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizza);

  const sortType = sort.sortProperty;

  function onChangeCategory(id) {
    dispatch(setCategotyId(id));
  }

  function onChangePage(number) {
    dispatch(setCurrentPage(number));
  }

  const getPizzas = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchPizzas({ order, sortBy, category, search, currentPage }));

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortNames.find(
        (obj) => obj.sortProperty === params.sortType
      );

      dispatch(setFilter({ ...params, sort }));
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const pizzas = items.map((obj) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ощибка 😕 </h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте обратиться позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
