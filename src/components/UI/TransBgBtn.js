import React from "react";
import styles from "./TransBgBtn.module.css";

const TransBgBtn = (props) => {
  return <div className={styles.btn}>{props.children}</div>;
};

export default TransBgBtn;
