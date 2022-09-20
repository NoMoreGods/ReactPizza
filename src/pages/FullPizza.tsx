import React from "react";
import "../component/styles/App.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{imageUrl:string, title:string, price: number
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://62bdf0d9c5ad14c110c9619e.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Не возможно загрузить пиццу, ошибки");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>Цена {pizza.price} р</h4>
    </div>
  );
};

export default FullPizza;
