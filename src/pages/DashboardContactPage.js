import React, { useEffect, useState } from "react";
import contactStyles from "./DashboardContactPage.module.css";
import styles from "./DashboardPage.module.css";
import classes from "./EditProfile.module.css";
import dp from "../image/dp.png";
import { Link } from "react-router-dom";
import { baseURL } from "../api";
import GreyBtn from "../components/UI/GreyBtn";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";

const DashboardContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [userDataUpdate, setUserDataUpdate] = useState(false);
  const token = useSelector((state) => state.homepage.token);
  const isLoggedIn = useSelector((state) => state.homepage.isLoggedIn);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [contNum, setContNum] = useState("");

  const [fNameError, setFNameError] = useState(false);
  const [lNameError, setLNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contNumError, setContNumError] = useState(false);

  const userInfoDataFetch = async () => {
    setLoading(true);
    const response = await fetch(`${baseURL}/user-info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setLoading(false);
      return;
    }

    const userData = await response.json();

    setUserData(userData.data);
    // console.log(userData);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      userInfoDataFetch();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (userData) {
      setFName(userData.first_name || "");
      setLName(userData.last_name || "");
      setEmail(userData.email || "");
      setContNum(userData.contact_no || "");
    }
  }, [userData]);

  const handleUpdate = async () => {
    if (!fName) setFNameError(true);
    if (!lName) setLNameError(true);
    if (!email) setEmailError(true);
    if (!contNum) setContNumError(true);

    if (fName) setFNameError(false);
    if (lName) setLNameError(false);
    if (email) setEmailError(false);
    if (contNum) setContNumError(false);

    if (fName && lName && email && contNum) {
      try {
        const data = {
          first_name: fName,
          last_name: lName,
          email: email,
          contact_no: contNum,
        };

        const response = await fetch(`${baseURL}/update-user-info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          setIsLoading(false);
          return;
        }

        const updateUserInfo = await response.json();

        setUserDataUpdate(updateUserInfo.data);
        // console.log(fData);
        Swal.fire({
          title: "Updated!",
          text: "Your user information has been updated.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } catch (error) {
        console.error("Failed to update info:", error);
      }
    }
  };

  return (
    <div>
      {isLoggedIn && !loading && userData && (
        <div className={styles.container}>
          <div className={styles.leftCon}>
            <div className={styles.authorCon}>
              <div className={styles.authorSec}>
                <img className={styles.dp} src={dp} alt="author_dp" />

                <div>
                  <p className={styles.name}>
                    {userData.first_name} {userData.last_name}
                  </p>
                  <p className={styles.role}>{userData.role}</p>
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

              <Link className={styles.link} to="/dashboard/contents">
                <p className={styles.options}>Contents</p>
              </Link>

              <Link className={styles.link} to="/dashboard/withdraw">
                <p className={styles.options}>Withdraw</p>
              </Link>

              <Link className={styles.link} to="/dashboard/purchase">
                <p className={styles.options}>Purchase</p>
              </Link>

              <Link className={styles.link} to="/dashboard/favourites">
                <p className={styles.options}>Favourutes</p>
              </Link>
            </div>
          </div>

          <div className={classes.rightCon}>
            <div className={classes.rContainer}>
              <p className={classes.epTitle}>Contacts</p>

              <div className={contactStyles.container2}>
                <div>
                  <p className={contactStyles.formTitle}>First Name</p>
                  <input
                    className={contactStyles.inputText}
                    type="text"
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                  />
                  {fNameError && (
                    <p className={contactStyles.errorTxt}>
                      Please enter first name!
                    </p>
                  )}
                </div>
                <div>
                  <p className={contactStyles.formTitle}>Last Name</p>
                  <input
                    className={contactStyles.inputText}
                    type="text"
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                  />
                  {lNameError && (
                    <p className={contactStyles.errorTxt}>
                      Please enter last name!
                    </p>
                  )}
                </div>
                <div>
                  <p className={contactStyles.formTitle}>Email</p>
                  <input
                    className={contactStyles.inputText}
                    type="email"
                    value={email}
                    disabled
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className={contactStyles.errorTxt}>
                      Please enter email!
                    </p>
                  )}
                </div>

                <div>
                  <p className={contactStyles.formTitle}>Contact Number</p>
                  <input
                    className={contactStyles.inputText}
                    type="number"
                    value={contNum}
                    onChange={(e) => setContNum(e.target.value.toString())}
                  />
                  {contNumError && (
                    <p className={contactStyles.errorTxt}>
                      Please enter contact number!
                    </p>
                  )}
                </div>

                <div>
                  <button className={contactStyles.btn} onClick={handleUpdate}>
                    <GreyBtn>Update Info</GreyBtn>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
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
      )}
    </div>
  );
};

export default DashboardContactPage;
