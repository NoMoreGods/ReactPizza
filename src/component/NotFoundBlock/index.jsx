import React from "react";
import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        {" "}
        😕
        <br />
        Корзина пустая
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
}

export default NotFoundBlock;
