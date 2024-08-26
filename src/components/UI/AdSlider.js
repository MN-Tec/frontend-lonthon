import styles from "./AdSlider.module.css";
import Slider from "react-slick";

// const arrowStyle = {
//   backgroundColor: "#6d6d6d",
//   width: "30px",
//   height: "30px",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   borderRadius: "50%",
//   color: "#ffff",
//   fontSize: "18px",
//   zIndex: 1,
//   border: "none",
//   cursor: "pointer",
//   position: "absolute",
//   top: "20px",
//   left: "-2vw",
// };

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...style, backgroundColor: "#6d6d6d", borderRadius: "50%" }}
      onClick={onClick}
    ></button>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...styles, backgroundColor: "#6d6d6d", borderRadius: "50%" }}
      onClick={onClick}
    ></button>
  );
}

const AdSlider = ({ ad, height }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrow: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      {ad && (
        <div
          className={styles.content_world}
          style={{ height: height ? height : "150px" }}
        >
          <Slider {...settings}>
            {ad.map((item) => (
              <div
                key={item.id}
                className={styles.adImgContainer}
                style={{ height: height ? height : "150px" }}
              >
                <img
                  src={item.banner}
                  className={styles.adImg}
                  style={{ height: height ? height : "150px" }}
                />
              </div>
            ))}
            {ad.map((item) => (
              <div
                key={item.id}
                className={styles.adImgContainer}
                style={{ height: height ? height : "150px" }}
              >
                <img
                  src={item.banner}
                  className={styles.adImg}
                  style={{ height: height ? height : "150px" }}
                />
              </div>
            ))}
            {ad.map((item) => (
              <div
                key={item.id}
                className={styles.adImgContainer}
                style={{ height: height ? height : "150px" }}
              >
                <img
                  src={item.banner}
                  className={styles.adImg}
                  style={{ height: height ? height : "150px" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default AdSlider;
