import React from "react";
import { Link } from "react-router-dom";
import styles from "./LiteratureSection.module.css";
import MultipleItems from "./Slider";

const LiteratureSection = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleCon}>
        <p className={styles.title}>{data.category_name}</p>
        <Link className={styles.link} to={`/${data.category_name}`}>
          <p className={styles.view_all}></p>
        </Link>
      </div>
      <div className={styles.carausel_section}>
        <MultipleItems data={data.content} />
      </div>
    </div>
  );
};

export default LiteratureSection;
