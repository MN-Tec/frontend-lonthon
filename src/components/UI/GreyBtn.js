import React from "react";
import styles from "./GreyBtn.module.css";

const GreyBtn = (props) => {
  return (
    <div className={styles.btn}>
      <p>{props.children}</p>
    </div>
  );
};

export default GreyBtn;
