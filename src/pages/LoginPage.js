import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import GreyBtn from "../components/UI/GreyBtn";
import { baseURL } from "../api";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { homepageActions } from "../redux/homepage-slice";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {
  const isLoggedIn = useSelector((state) => state.homepage.isLoggedIn);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async () => {
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);

    if (email) setEmailError(false);
    if (password) setPasswordError(false);

    if (email && password) {
      setIsLoading(true);
      const payload = {
        email: email,
        password: password,
      };

      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (!data.status) {
        setError(true);
        setErrorMsg(data.message);
      } else {
        setSuccess(true);
        setSuccessMsg(data.message);

        dispatch(homepageActions.setToken(data.data.token));
        dispatch(homepageActions.setIsLoggedIn(true));
        dispatch(homepageActions.setUserData(data.data.user));

        if (data.data.user && data.data.token) {
          localStorage.setItem("tokenLonthon", data.data.token);
          localStorage.setItem("userDataLonthon", data.data.user);
        }

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      setIsLoading(false);
    }
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <>
      {!isLoading && (
        <div className={styles.container}>
          <div className={styles.container2}>
            <p className={styles.title}>LOGIN</p>
            <div>
              <p className={styles.formTitle}>Email</p>
              <input
                className={styles.inputText}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className={styles.errorTxt}>Please enter email!</p>
              )}
            </div>

            <div className={styles.passCon}>
              <p className={styles.formTitle}>Password</p>
              <input
                className={styles.inputText}
                type="password"
                onChange={(e) => setPassword(e.target.value.toString())}
              />
              {passwordError && (
                <p className={styles.errorTxt}>Please enter password!</p>
              )}
            </div>

            <div onClick={loginHandler}>
              <GreyBtn>LOGIN</GreyBtn>
            </div>
          </div>

          <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={handleCloseError}
          >
            <Alert
              onClose={handleCloseError}
              severity="warning"
              sx={{ width: "100%" }}
            >
              {errorMsg}
            </Alert>
          </Snackbar>

          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={handleCloseSuccess}
          >
            <Alert
              onClose={handleCloseSuccess}
              severity="success"
              sx={{ width: "100%" }}
            >
              {successMsg}
            </Alert>
          </Snackbar>
        </div>
      )}

      {isLoading && (
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
    </>
  );
};

export default LoginPage;
