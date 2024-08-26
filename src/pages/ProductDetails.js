import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import Slider from "react-slick";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

import { Link, useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../api";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const audioRef = React.createRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const isLoggedIn = useSelector((state) => state.homepage.isLoggedIn);
  const token = useSelector((state) => state.homepage.token);
  const headers = {
    "Content-Type": "application/json",
  };

  if (isLoggedIn) {
    headers.Authorization = `Bearer ${token}`;
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const prevHandler = () => {
    if (pageNumber === 1) {
      setPageNumber(numPages);
    } else {
      setPageNumber(pageNumber - 1);
    }
  };

  const nextHandler = () => {
    if (pageNumber === numPages) {
      setPageNumber(1);
    } else {
      setPageNumber(pageNumber + 1);
    }
  };

  const [liked, setLiked] = useState(false);

  const likeHandler = async () => {
    if (isLoggedIn) {
      setLiked(!liked);
      const formData = new FormData();
      formData.append("content_id", content.id);
      try {
        const response = await axios.post(`${baseURL}/save-content`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login");
    }
  };

  //Fetch Data
  const dataFetch = async () => {
    setLoading(true);
    const response = await fetch(`${baseURL}/content/${parseInt(params.id)}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) return;

    const data = await response.json();
    setContent(data.data);
    console.log(data.data);
    setLoading(false);
  };
  const handlePayment = async (contentId) => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    try {
      const response = await axios.post(
        `${baseURL}/initiate-payment`,
        {
          contentId: contentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.status) {
        window.location.href = data.data.redirectUrl;
      } else {
        console.error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    try {
      dataFetch();
    } catch (error) {
      console.error(error);
    }
  }, []);

  // AUDIO PLAYER
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeekAdd = (time) => {
    audioRef.current.currentTime += time;
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const handleLoadedMetadata = (event) => {
    const audioElement = event.target;
    setDuration(audioElement.duration);
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
      }
    };
  }, []);

  const handleSeek = (event) => {
    if (audioRef.current) {
      const seekPosition =
        event.clientX - event.target.getBoundingClientRect().left;
      const percent = seekPosition / event.target.offsetWidth;
      const newTime = percent * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <>
      {loading && (
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
              marginBottom: "500px",
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        </div>
      )}

      {!loading && (
        <>
          <div>
            <div className={styles.cover}>
              <div className={styles.coverText}>
                <p className={styles.title}>{content.sub_category.name}</p>
                <p className={styles.route}>
                  {content.category.name} &gt; {content.sub_category.name}
                </p>
              </div>
            </div>

            <div className={styles.contentSec}>
              <div className={styles.contentBox}>
                <div className={styles.part1}>
                  <div className={styles.productData}>
                    <p className={styles.productTitle}>{content.title}</p>
                    <p className={styles.productDes}>{content.summary}</p>

                    <div className={styles.authorSec}>
                      {/* <img
                        className={styles.authorDp}
                        src={author_dp}
                        alt="author"
                      /> */}
                      <div>
                        <p className={styles.authorName}>{content.author}</p>
                      </div>
                    </div>

                    <div>
                      {content.price != 0 && (
                        <div
                          style={{
                            backgroundColor: "white",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                            Price:{" "}
                            <span
                              style={{ fontWeight: "bold", color: "green" }}
                            >
                              {content.price} BDT
                            </span>
                          </p>
                        </div>
                      )}
                      {/* <select className={styles.filterOp} name="download">
                        <option value="" disabled selected>
                          Download With
                        </option>
                        <option value="PDF">PDF</option>
                        <option value="JPG">JPG</option>
                        <option value="PHP">PHP</option>
                      </select> */}

                      <div className={styles.likeContainer}>
                        {!liked && (
                          <HiOutlineHeart
                            className={styles.unlike}
                            onClick={likeHandler}
                          />
                        )}
                        {liked && (
                          <HiHeart
                            className={styles.like}
                            onClick={likeHandler}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <img
                    className={styles.banner}
                    src={content.feature_image}
                    alt="banner"
                  />
                </div>

                <div className={styles.part2}>
                  <div className={styles.part2Content}>
                    <div>
                      <div>
                        {/* TEXT */}
                        {content.media_type == 2 && (
                          <div
                            className={styles.htmlContent}
                            dangerouslySetInnerHTML={{
                              __html: content.media[0].media_text,
                            }}
                          />
                        )}
                        {/* IMAGE */}
                        {content.media_type == 0 && (
                          <Slider {...settings}>
                            {content.media.map((item, i) => (
                              <img
                                key={i}
                                className={styles.sliderImg}
                                src={item.media_url}
                                alt=""
                              />
                            ))}
                          </Slider>
                        )}

                        {/* PDF */}
                        {content.media_type == 1 && (
                          <div className={styles.pdfCon}>
                            <Document
                              file={`data:application/pdf;base64,${content.media[0].pdf_url}`}
                              onLoadSuccess={onDocumentLoadSuccess}
                              onLoadError={console.error}
                            >
                              <Page width="600" pageNumber={pageNumber} />
                            </Document>
                          </div>
                        )}
                      </div>
                      {content.media_type == 1 && (
                        <div className={styles.pdfBtnCon}>
                          <BsFillArrowLeftCircleFill
                            className={styles.pdfBtn}
                            onClick={prevHandler}
                          />
                          <BsFillArrowRightCircleFill
                            className={styles.pdfBtn}
                            onClick={nextHandler}
                          />
                        </div>
                      )}

                      {/* VIDEO */}
                      {content.media_type == 4 && (
                        <div className={styles.videoPlayerCon}>
                          <video
                            src={content.media[0].media_url}
                            height={500}
                            controls
                          />
                        </div>
                      )}

                      {/* AUDIO */}
                      {content.media_type == 3 && (
                        <div className={styles.audioSection}>
                          <img
                            className={styles.audioThumbnail}
                            src={content.thumbnail_image}
                          />
                          <audio
                            ref={audioRef}
                            src={content.media[0].media_url}
                            height={500}
                            controls
                            controlslist="nofullscreen nodownload foobar"
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            hidden
                          />
                          <div className={styles.audioContainer}>
                            <div className={styles.seekerContainer}>
                              <div>{formatTime(currentTime)}</div>
                              <div
                                style={{
                                  width: "100%",
                                  height: "10px",
                                  background: "#f7f7f7",
                                  borderRadius: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={handleSeek}
                              >
                                <div
                                  style={{
                                    width: `${(currentTime / duration) * 100}%`,
                                    height: "100%",
                                    background: "#7c7c7c",
                                    borderRadius: "10px",
                                  }}
                                ></div>
                              </div>
                            </div>

                            <div className={styles.audioBtnContainer}>
                              <button
                                className={styles.audioBtn}
                                onClick={() => handleSeekAdd(-10)}
                              >
                                <FaBackward className={styles.audioIcons} />
                              </button>
                              {!isPlaying && (
                                <button
                                  className={styles.audioBtn}
                                  onClick={togglePlay}
                                >
                                  <FaPlay className={styles.audioIcons} />
                                </button>
                              )}
                              {isPlaying && (
                                <button
                                  className={styles.audioBtn}
                                  onClick={togglePlay}
                                >
                                  <FaPause className={styles.audioIcons} />
                                </button>
                              )}
                              <button
                                className={styles.audioBtn}
                                onClick={() => handleSeekAdd(10)}
                              >
                                <FaForward className={styles.audioIcons} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {content.download_status == 0 && content.type == 1 ? (
                      <div className={styles.blurOverlay}></div>
                    ) : null}

                    {content.download_status == 0 && content.type == 1 ? (
                      <div className={styles.centeredDiv}>
                        <button
                          className={
                            isDisabled
                              ? styles.disabledButton
                              : styles.payNowButton
                          }
                          onClick={() => handlePayment(content.id)}
                        >
                          Pay Now
                        </button>
                        <p className={styles.helperText}>
                          <label style={{ backgroundColor: "grey" }}>
                            <input
                              type="checkbox"
                              checked={!isDisabled}
                              onChange={(e) => setIsDisabled(!isDisabled)}
                            />
                            Accept our{" "}
                            <Link
                              className={styles.links}
                              to="/terms_condition"
                            >
                              Terms & Conditions
                            </Link>
                            ,{" "}
                            <Link className={styles.links} to="/privacy_policy">
                              Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link className={styles.links} to="/return_refund">
                              Return & Refund Policy
                            </Link>{" "}
                            and Click the button to complete the payment
                          </label>
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
