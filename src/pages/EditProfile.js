import React, { useState } from "react";
import styles from "./DashboardPage.module.css";
import classes from "./EditProfile.module.css";
import dp from "../image/dp.png";
import { Link } from "react-router-dom";
import { FaUserCircle, FaPencilAlt } from "react-icons/fa";
import GreyBtn from "../components/UI/GreyBtn";

const EditProfile = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftCon}>
        <div className={styles.authorCon}>
          <div className={styles.authorSec}>
            <img className={styles.dp} src={dp} alt="author_dp" />

            <div>
              <p className={styles.name}>Ashraful Hauqe</p>
              <p className={styles.role}>Content Writter</p>
            </div>
          </div>
          <Link className={styles.link} to="/dashboard/edit_profile">
            <div className={styles.btn}>Edit Profile</div>
          </Link>
        </div>

        <div className={styles.optionsCon}>
          <Link className={styles.link} to="/dashboard">
            <p className={styles.options}>Dashboard</p>
          </Link>

          <Link className={styles.link} to="/dashboard/contact">
            <p className={styles.options}>Contact</p>
          </Link>

          <Link className={styles.link} to="/dashboard/products">
            <p className={styles.options}>Products</p>
          </Link>

          <Link className={styles.link} to="/dashboard/withdraw">
            <p className={styles.options}>Withdraw</p>
          </Link>
          <Link className={styles.link} to="/dashboard/purchase">
            <p className={styles.options}>Purchase</p>
          </Link>
        </div>
      </div>

      <div className={classes.rightCon}>
        <div className={classes.rContainer}>
          <p className={classes.epTitle}>Edit Profile</p>
          <div className={classes.userImgCon}>
            {!image && (
              <FaUserCircle
                className={classes.userIcon}
                onClick={() => document.querySelector(".input_img").click()}
              />
            )}
            {image && (
              <img
                src={image}
                className={classes.dp}
                alt="uploaded"
                onClick={() => document.querySelector(".input_img").click()}
              />
            )}
            <FaPencilAlt
              className={classes.pencilIcon}
              onClick={() => document.querySelector(".input_img").click()}
            />
            <input
              type="file"
              accept="image/*"
              className="input_img"
              hidden
              onChange={handleImageChange}
            />
          </div>
          <form className={classes.formSection}>
            <div className={classes.formTitle}>Name</div>
            <input className={classes.inputText} type="text" />

            <div className={classes.formTitle}>Profession</div>
            <input className={classes.inputText} type="text" />

            <div className={classes.formTitle}>About Yourself</div>
            <textarea className={classes.ayInput} />
            <div className={classes.btn}>
              <GreyBtn>Save</GreyBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
