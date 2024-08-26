import React from "react";
import styles from "./Footer.module.css";
import MN_Logo from "../../image/MN_Logo.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendBtn from "../UI/SendBtn";
import logo from "../../image/lonthon_logo.png";
import banner from "../../image/payment.jpg";
import { Link } from "react-router-dom";
import AdSlider from "../UI/AdSlider";
import { useSelector } from "react-redux";
import { homepageActions } from "../../redux/homepage-slice";

const Footer = ({businessSettings}) => {
  const ad = useSelector((state) => state.homepage.ads.footer);

  return (
    <>
      <div className={styles.content_world}>
        {/* <p className={styles.cw_text}>CONTENT WORLD</p>
        <img className={styles.cw_logo} alt="logo" src={logo} /> */}
        <img className={styles.banner} src={banner} alt="" />
      </div>

      <div style={{ margin: "20px 0" }}>
        <AdSlider ad={ad} />
      </div>

      <div className={styles.container}>
        <div className={styles.footer}>
          <div className={styles.socials}>
            <div>
              <img alt="logo" src={MN_Logo} className={styles.logo} />
              {/* <p className={styles.des}>
                Lorem ipsum dolor sit amet consectetur.
              </p> */}
            </div>

            <div className={styles.social_icons}>
              <div className={styles.sCon}>
                <a href={businessSettings.facebook_url} target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className={styles.icon} />
                </a>
              </div>
              <div className={styles.sCon}>
                <a href={businessSettings.twitter_url} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className={styles.icon} />
                </a>
              </div>
              <div className={styles.sCon}>
                <a href={businessSettings.instagram_url} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className={styles.icon} />
                </a>
              </div>
            </div>


          </div>

          <div className={styles.titleLinkContainer}>
            <p className={styles.title}>Content</p>
            <p className={styles.links}>New Content</p>
            <p className={styles.links}>Popular Content</p>
            <p className={styles.links}>Search Trend</p>
            <p className={styles.links}>Blog</p>
          </div>

          <div className={styles.titleLinkContainer}>
            <p className={styles.title}>Information</p>
            <p className={styles.links}>Plans & Pricing</p>
            <p className={styles.links}>About Us</p>
            <p className={styles.links}>Sell Your Content</p>
          </div>

          <div className={styles.titleLinkContainer}>
            <p className={styles.title}>Legal</p>
            <Link className={styles.links} to="/terms_condition">
              <p>Terms & Conditions</p>
            </Link>
            <Link className={styles.links} to="/privacy_policy">
              <p>Privacy Policy</p>
            </Link>
            <Link className={styles.links} to="/return_refund">
              <p>Return & Refund Policy </p>
            </Link>
          </div>

          <div>
            <p className={styles.title}>Contact</p>
            <p className={styles.des}>
              Address: 1509, Hazi Pada, Halishohor Road, South Agrabad,
              Doublemooring, Chittagong
              <br />
              Phone Number: 01756330000
              <br />
              Email: {businessSettings.email}
            </p>
            {/* <div className={styles.emailInput}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 0,
                    width: "100%",
                    background: "#D9D9D9",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="" variant="outlined" />
                <SendBtn />
              </Box>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
