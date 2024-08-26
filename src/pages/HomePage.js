import React from "react";
import styles from "./HomePage.module.css";
import TransBgBtn from "../components/UI/TransBgBtn";
import LiteratureSection from "../components/body/home/LiteratureSection";
import { useSelector } from "react-redux";
import background from "../image/background_home.png";

const HomePage = () => {
  const homepageData = useSelector((state) => state.homepage.homepageData);
  const contentByCat = useSelector((state) => state.homepage.contentByCat);

  return (
    <>
      <div className={styles.cover_container}>
        <img
          className={styles.cover}
          alt="cover_image"
          src={background}
          // src={homepageData.homepage_banner_image}
        />
        <div>
          <img
            className={styles.coverImg}
            src={homepageData.homepage_banner_image}
            alt=""
          />
        </div>
        <div className={styles.text_area}>
          <p className={styles.title}>{homepageData.homepage_title}</p>
          <p className={styles.des}>{homepageData.homepage_description}</p>
          <div style={{ margin: "30px 0" }}>
            <TransBgBtn>Read more →</TransBgBtn>
          </div>
        </div>
      </div>
      <div className={styles.ad_section}>
        <img
          className={styles.ad1}
          alt="ad"
          src={homepageData.homepage_promotional_banner1}
        />
        <img
          className={styles.ad1}
          alt="ad"
          src={homepageData.homepage_promotional_banner2}
        />
      </div>

      {contentByCat.map((item, i) => (
        <div key={i} className={styles.content_container}>
          <LiteratureSection data={item} />
        </div>
      ))}

      <div className={styles.about}>
        <p className={styles.about_title}>About Us</p>
        <hr className={styles.hr} />
        <p className={styles.about_des}>{homepageData.about_us}</p>
      </div>
    </>
  );
};

export default HomePage;
