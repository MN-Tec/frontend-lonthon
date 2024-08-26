import React from "react";
import styles from "./InfoCard.module.css";

const InfoCard = (props) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{props.title}</p>
      <p className={styles.num}>
        {props.sign} {props.amount}
      </p>
    </div>
  );
};

export default InfoCard;
