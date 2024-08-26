import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import GreyBtn from "../components/UI/GreyBtn";
import { useDispatch } from "react-redux";
import { homepageActions } from "../redux/homepage-slice";
import { baseURL } from "../api";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contNum, setContNum] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPass, setCPass] = useState(null);

  const [otpInput, setOtpInput] = useState(null);
  const [otpError, setOtpError] = useState(false);

  const [fNameError, setFNameError] = useState(false);
  const [lNameError, setLNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contNumError, setContNumError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cPassError, setCPassError] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const [signupSection, setSignupSection] = useState(true);
  const [otpSection, setOtpSection] = useState(false);

  const [signupSucc, setSignupSucc] = useState();
  const [signupSuccMsg, setSignupSuccMsg] = useState();
  const [otpSucc, setOtpSucc] = useState();
  const [otpSuccMsg, setOtpSuccMsg] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const signupHandler = async () => {
    if (!fName) setFNameError(true);
    if (!lName) setLNameError(true);
    if (!email) setEmailError(true);
    if (!contNum) setContNumError(true);
    if (!password) setPasswordError(true);
    if (!cPass) setCPassError(true);

    if (fName) setFNameError(false);
    if (lName) setLNameError(false);
    if (email) setEmailError(false);
    if (contNum) setContNumError(false);
    if (password) setPasswordError(false);
    if (cPass) setCPassError(false);

    if (fName && lName && email && contNum && password && cPass) {
      if (password === cPass) {
        setIsLoading(true);
        const data = {
          first_name: fName,
          last_name: lName,
          email: email,
          contact_no: contNum,
          password: password,
          password_confirmation: cPass,
        };

        const response = await fetch(`${baseURL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          setIsLoading(false);
          setErrorMsg("Invalid");
          setError(true);
          return;
        }

        const fData = await response.json();

        setSignupSection(false);
        setOtpSection(true);
        setSignupSucc(true);
        setSignupSuccMsg(fData.message);
        setIsLoading(false);
      } else {
        setCPassError(true);
      }
    }
  };

  const otpHandler = async () => {
    if (!otpInput) setOtpError(true);
    if (otpInput) setOtpError(false);

    if (otpInput) {
      setIsLoading(true);
      const payload = {
        email: email,
        otp: otpInput,
      };

      const response = await fetch(`${baseURL}/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setIsLoading(false);
        setErrorMsg("Error! Try Again");
        setError(true);
        return;
      }

      const data = await response.json();

      if (!data.status) {
        setIsLoading(false);
        setErrorMsg(data.message);
        setError(true);
        return;
      }

      setOtpSuccMsg(data.message);
      setOtpSucc(true);

      setIsLoading(false);

      dispatch(homepageActions.setToken(data.data.token));
      dispatch(homepageActions.setUserData(data.data.user));
      dispatch(homepageActions.setIsLoggedIn(true));

      setTimeout(() => {
        setRedirect(true);
        navigate("/");
      }, 2000);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSignupSucc(false);
    setError(false);
  };

  const handleCloseOtp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOtpSucc(false);
  };

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      <div className={styles.container}>
        {signupSection && (
          <div className={styles.container2}>
            <p className={styles.title}>SIGNUP</p>
            <div>
              <p className={styles.formTitle}>First Name</p>
              <input
                className={styles.inputText}
                type="text"
                onChange={(e) => setFName(e.target.value)}
              />
              {fNameError && (
                <p className={styles.errorTxt}>Please enter first name!</p>
              )}
            </div>

            <div>
              <p className={styles.formTitle}>Last Name</p>
              <input
                className={styles.inputText}
                type="text"
                onChange={(e) => setLName(e.target.value)}
              />
              {lNameError && (
                <p className={styles.errorTxt}>Please enter last name!</p>
              )}
            </div>

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

            <div>
              <p className={styles.formTitle}>Contact Number</p>
              <input
                className={styles.inputText}
                type="number"
                onChange={(e) => setContNum(e.target.value.toString())}
              />
              {contNumError && (
                <p className={styles.errorTxt}>Please enter contact number!</p>
              )}
            </div>

            <div>
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

            <div className={styles.passCon}>
              <p className={styles.formTitle}>Confirm Password</p>
              <input
                className={styles.inputText}
                type="password"
                onChange={(e) => setCPass(e.target.value.toString())}
              />
              {cPassError && (
                <p className={styles.errorTxt}>Please re-enter password!</p>
              )}
            </div>

            <div onClick={signupHandler}>
              <GreyBtn>SIGNUP</GreyBtn>
            </div>
          </div>
        )}

        {otpSection && (
          <div className={styles.container2}>
            <p className={styles.title}>Enter OTP</p>
            <div>
              <p className={styles.formTitle}>OTP</p>
              <input
                className={styles.inputText}
                type="numebr"
                onChange={(e) => setOtpInput(e.target.value)}
              />
              {otpError && <p className={styles.errorTxt}>Please enter otp!</p>}
            </div>

            <div onClick={otpHandler}>
              <GreyBtn>CONFIRM</GreyBtn>
            </div>
          </div>
        )}
      </div>

      <Snackbar open={signupSucc} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {signupSuccMsg}
        </Alert>
      </Snackbar>

      <Snackbar open={otpSucc} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleCloseOtp}
          severity="success"
          sx={{ width: "100%" }}
        >
          {otpSuccMsg}
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Signup;
