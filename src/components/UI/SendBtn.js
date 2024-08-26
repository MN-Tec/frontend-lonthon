import React from "react";
import styles from "./SendBtn.module.css";
import { FaPaperPlane } from "react-icons/fa";

const SendBtn = () => {
  return (
    <div className={styles.btn}>
      <FaPaperPlane className={styles.icon} />
      <p className={styles.text}>Send</p>
    </div>
  );
};

export default SendBtn;
