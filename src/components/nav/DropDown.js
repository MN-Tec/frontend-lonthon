import React from "react";
import styles from "./DropDown.module.css";
import { Link } from "react-router-dom";

const DropDown = (props) => {
  return (
    <div className={styles.container}>
      {props.links.map((link) => (
        <Link className={styles.link} to={`/contents/${props.catg}/${link.id}`}>
          <div className={styles.item}>{link.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default DropDown;
