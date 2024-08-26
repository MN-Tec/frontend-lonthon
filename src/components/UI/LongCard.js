import React from "react";
import styles from "./LongCard.module.css";
import GreyBtn from "../UI/GreyBtn";
import { Link, useLocation } from "react-router-dom";

const LongCard = ({ data }) => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const authorList = data.author ? data.author.split(",") : [];
  const firstAuthor = authorList[0];
  let otherAuthors = "";

  authorList.map((author, i) => {
    if (i !== 0) {
      otherAuthors += `, ${author}`;
    }
  });

  const literatureCardDescription = data.summary
    .split(" ")
    .slice(0, 40)
    .join(" ");
    const textOverlayStyle = {
      backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with slight transparency
      padding: "10px 15px", // Padding around the text
      borderRadius: "5px", // Optional: rounded corners for the background
      zIndex: 2, // Ensure the text is above the image
      textAlign: "center", // Center text
    };
    const overlayTextStyle = {
      margin: 0, // Reset default margin
      fontSize: "18px", // Adjust font size as needed
      color: "#000", // Text color
    };
  return (
    <div
      className={`${styles.container} ${
        isHomepage ? styles.container : styles.containerReSize
      }`}
    >
      <div
        className={styles.imgCon}
        style={{ backgroundImage: `url(${data.thumbnail_image})` }}
      >
        <div className={styles.textOverlay}>
          <p className={styles.overlayText}>{data.thumbnail_image_text}</p>
        </div>
      </div>
      <div className={styles.contentCon}>
        <div className={styles.text_area}>
          <p className={styles.type}>{data.subcategory_name}</p>
          <p className={styles.title}>{data.title}</p>
          <p className={styles.author2}>
            <strong className={styles.authorLarger}>{firstAuthor}</strong>
            <br />
            {otherAuthors.slice(1)}
          </p>
          <p className={styles.des}>{literatureCardDescription}</p>
        </div>
      </div>

      <Link className={styles.link} to={`/content/${data.id}`}>
        <GreyBtn>Read More</GreyBtn>
      </Link>

      <div className={styles.price}>
        {data.type == 0
          ? "Free"
          : data.type == 1
          ? `${data.price} Tk`
          : data.type == 2
          ? "Nego"
          : ""}
      </div>
    </div>
  );
};

export default LongCard;
