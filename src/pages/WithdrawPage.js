import React, { useState, useEffect } from "react";
import styles from "./DashboardPage.module.css";
import { Link, useNavigate } from "react-router-dom";

import dp from "../image/dp.png";

import classes from "./WithdrawPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { homepageActions } from "../redux/homepage-slice";
import { baseURL } from "../api";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import InfoCard from "../components/UI/InfoCard";
import GreyBtn from "../components/UI/GreyBtn";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "#eae9e9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WithdrawPage = () => {
  const isLoggedIn = useSelector((state) => state.homepage.isLoggedIn);
  const token = useSelector((state) => state.homepage.token);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState();
  const [openModal, setOpenModal] = React.useState(false);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState();
  const [transactions, setTransactions] = useState([]);

  const [insuffErr, setInsuffErr] = useState(false);
  const [inputErr, setInputErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethodError, setPaymentMethodError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [bkashSel, setBkashSel] = useState();
  const [nagadSel, setNagadSel] = useState();
  const [bankSel, setBankSel] = useState();

  const [bnAccNum, setBnAccNum] = useState();
  const [bankAccNum, setBankAccNum] = useState();
  const [bankBranchName, setBankBranchName] = useState("");
  const [bankAccDistrict, setBankAccDistrict] = useState("");

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setInsuffErr(false);
    setInputErr(false);
    setPaymentMethodError(false);
    setOpenModal(false);
  };

  const clearHandler = () => {
    setBkashSel(false);
    setNagadSel(false);
    setBankSel(false);
    setBnAccNum();
    setBankAccNum();
    setBankBranchName("");
    setBankAccDistrict("");
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    setSuccessMsg("");
  };

  const dashboardDataFetch = async () => {
    setLoading(true);
    const response = await fetch(`${baseURL}/dashboard`, {
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

    const data = await response.json();

    //withdraw-dashboard
    const res = await fetch(`${baseURL}/withdraw-dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data2 = await res.json();
    setBalance(data2.data.balance);
    setTransactions(data2.data.last_transactions);

    setDashboardData(data.data);
    dispatch(homepageActions.setDashboardData(data.data));
    setLoading(false);
  };

  const withdrawHandler = async () => {
    if (amount > balance) setInsuffErr(true);
    if (amount < balance) setInsuffErr(false);
    if (typeof amount !== "number") setInputErr(true);
    if (typeof amount === "number") setInputErr(false);
    if (!bkashSel && !nagadSel && !bankSel) setPaymentMethodError(true);
    if (bkashSel || nagadSel || bankSel) setPaymentMethodError(false);
    const temp = bkashSel || nagadSel || bankSel ? true : false;

    let temp2 = false;
    if (bkashSel || nagadSel) temp2 = bnAccNum ? true : false;
    if (bankSel)
      temp2 = bankAccNum && bankBranchName && bankAccDistrict ? true : false;

    if (!temp2) {
      setPaymentMethodError(true);
    }

    if (amount < balance && typeof amount === "number" && temp && temp2) {
      setInsuffErr(false);
      setInputErr(false);
      setPaymentMethodError(false);

      let payload;
      if (bkashSel || nagadSel) {
        payload = {
          account_number: bnAccNum,
          account_type: bkashSel ? "Bkash" : "Nagad",
          amount: amount,
        };
      }
      if (bankSel) {
        payload = {
          account_number: bankAccNum,
          account_type: "Bank",
          amount: amount,
          branch_name: bankBranchName,
          district: bankAccDistrict,
        };
      }

      const response = await fetch(`${baseURL}/withdraw-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      clearHandler();

      setOpenModal(false);
      setSuccess(true);
      setSuccessMsg(data.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dashboardDataFetch();
    }
  }, [isLoggedIn]);

  const bkashSelectHandler = () => {
    setBkashSel(true);
    setNagadSel(false);
    setBankSel(false);
  };

  const nagadSelectHandler = () => {
    setBkashSel(false);
    setNagadSel(true);
    setBankSel(false);
  };
  const bankSelectHandler = () => {
    setBkashSel(false);
    setNagadSel(false);
    setBankSel(true);
  };

  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate("/login");
  }

  return (
    <>
      {isLoggedIn && !loading && dashboardData && (
        <div className={styles.container}>
          <div className={styles.leftCon}>
            <div className={styles.authorCon}>
              <div className={styles.authorSec}>
                <img className={styles.dp} src={dp} alt="author_dp" />

                <div>
                  <p className={styles.name}>
                    {dashboardData.user.first_name}{" "}
                    {dashboardData.user.last_name}
                  </p>
                  <p className={styles.role}>
                    {dashboardData.user.role.charAt(0).toUpperCase() +
                      dashboardData.user.role.slice(1)}
                  </p>
                </div>
              </div>
              <Link className={styles.link} to="/dashboard/edit_profile">
                <div className={styles.btn}>Edit Profile</div>
              </Link>
            </div>

            <div className={styles.optionsCon}>
              <Link className={styles.link} to="/dashboard">
                <p className={styles.option}>Dashboard</p>
              </Link>

              <Link className={styles.link} to="/dashboard/contact">
                <p className={styles.options}>Contact</p>
              </Link>

              <Link className={styles.link} to="/dashboard/contents">
                <p className={styles.options}>Contents</p>
              </Link>

              <Link className={styles.link} to="/dashboard/withdraw">
                <p className={styles.active}>Withdraw</p>
              </Link>

              <Link className={styles.link} to="/dashboard/purchase">
                <p className={styles.options}>Purchase</p>
              </Link>

              <Link className={styles.link} to="/dashboard/favourites">
                <p className={styles.options}>Favourutes</p>
              </Link>
            </div>
          </div>

          <div className={styles.rightCon}>
            <div className={styles.dashCon}>
              <p className={styles.title}>Withdraw</p>
              <div className={classes.firstCon}>
                <InfoCard title="Current Balance" amount={balance} sign="$" />

                <div className={classes.payDet}>
                  <p className={styles.graphTitle}>Select Payment Method:</p>

                  <div className={classes.buttons}>
                    <div
                      className={classes.btnCon}
                      onClick={bkashSelectHandler}
                    >
                      <GreyBtn>Bkash</GreyBtn>
                    </div>

                    <div
                      className={classes.btnCon}
                      onClick={nagadSelectHandler}
                    >
                      <GreyBtn>Nagad</GreyBtn>
                    </div>
                    <div className={classes.btnCon} onClick={bankSelectHandler}>
                      <GreyBtn>Bank</GreyBtn>
                    </div>
                  </div>

                  {(bkashSel || nagadSel) && (
                    <div>
                      <p className={classes.bnTitle}>
                        Enter Bkash/Nagad number:
                      </p>
                      <input
                        className={classes.inputText}
                        type="number"
                        onChange={(e) => setBnAccNum(e.target.value)}
                      />
                    </div>
                  )}
                  {bankSel && (
                    <div>
                      <p className={classes.bnTitle}>Enter Account Number:</p>
                      <input
                        className={classes.inputText}
                        type="number"
                        onChange={(e) => setBankAccNum(e.target.value)}
                      />
                      <p className={classes.bnTitle}>Enter Branch Name:</p>
                      <input
                        className={classes.inputText}
                        type="text"
                        onChange={(e) => setBankBranchName(e.target.value)}
                      />
                      <p className={classes.bnTitle}>Enter District:</p>
                      <input
                        className={classes.inputText}
                        type="text"
                        onChange={(e) => setBankAccDistrict(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className={classes.wdBtn} onClick={handleOpen}>
                  <GreyBtn>Request to withdraw</GreyBtn>
                </div>
              </div>

              <div className={classes.wdList}>
                <p className={styles.graphTitle}>Withdraw Requests</p>
                {transactions.map((data, i) => (
                  <div key={i} className={classes.listCardCon}>
                    <div className={classes.infoCon}>
                      <p className={classes.listText}>{data.date}</p>
                      <p className={classes.listText}>
                        Status:{" "}
                        {data.status === 0 ? (
                          <span className={classes.pending}>Pending</span>
                        ) : (
                          <span className={classes.status}>Approved</span>
                        )}
                      </p>
                    </div>

                    <div className={classes.amountCon}>
                      <p className={classes.listText}>${data.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className={classes.wdList}>
                <p className={styles.graphTitle}>Content Sold</p>
                {WD_LIST.map((data, i) => (
                  <div className={classes.listCardConCS}>
                    <div className={classes.infoConCS}>
                      <p className={classes.listText}>Name: {data.name}</p>
                      <p className={classes.listText}>
                        Content Type: {data.type}
                      </p>
                      <p className={classes.listText}>
                        Content Title: {data.title}
                      </p>
                      <p className={classes.listText}>Date: {data.date}</p>
                    </div>

                    <div className={classes.amountCon}>
                      <p className={classes.listText}>${data.amount}</p>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      )}

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className={styles.graphTitle}>Amount</p>
          <input
            className={classes.inputText}
            type="number"
            onChange={(e) => {
              setAmount(parseFloat(e.target.value));
            }}
          />
          {insuffErr && <p className={classes.error}>Insufficient balance!</p>}
          {inputErr && (
            <p className={classes.error}>Please enter amount correctly!</p>
          )}
          {paymentMethodError && (
            <p className={classes.error}>Please Select a Payment Method!</p>
          )}
          <div className={classes.confirmBtn} onClick={withdrawHandler}>
            <GreyBtn>Confirm</GreyBtn>
          </div>
        </Box>
      </Modal>

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
    </>
  );
};

export default WithdrawPage;
