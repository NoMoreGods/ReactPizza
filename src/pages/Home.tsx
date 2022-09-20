import React from "react";
import { useSelector} from "react-redux";

import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../component/Categories";
import Pagination from "../component/Pagination";
import PizzaBlock from "../component/PizzaBlock";
import Skeleton from "../component/PizzaBlock/Skeleton";
import Sort, { sortList } from "../component/Sort";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/slice/filter/selectors";
import { selectPizzaData } from "../redux/slice/pizza/selectors";
import { setCategotyId, setCurrentPage, setFilters } from "../redux/slice/filter/slice";
import { fetchPizzas } from "../redux/slice/pizza/slice";
import { SearchPizzaParams } from "../redux/slice/pizza/types";

const Home: React.FC=()=> {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  const onChangeCategory=React.useCallback((id:number)=> {
    dispatch(setCategotyId(id));
  },[])

  function onChangePage(page:number) {
    dispatch(setCurrentPage(page));
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
      const params= qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortBy
      );
      
      dispatch(setFilters({ 
        categoryId: Number(params.category),
        searchValue: params.search,
        currentPage: params.currentPage,
        sort: sort || sortList[0]},));
      
    }
isMounted.current = true;
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {

      const params = {categoryId:categoryId>0 ? categoryId : null,
        sortType: sort.sortProperty,
      currentPage,}

      const queryString = qs.stringify(params, {skipNulls: true})
      navigate(`?${queryString}`);
    }
if(!window.location.search){
  dispatch(fetchPizzas({} as SearchPizzaParams))
}

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const pizzas = items.map((obj) => (
          <PizzaBlock key={obj.id} sizes={[]} types={[]} {...obj} />
      ));
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort value={sort} />
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
