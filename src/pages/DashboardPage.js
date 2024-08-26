import React from "react";
import styles from "./DashboardPage.module.css";
import dp from "../image/dp.png";
import InfoCard from "../components/UI/InfoCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { homepageActions } from "../redux/homepage-slice";

const DUMMY_DATA = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 25 },
  { name: "Jan", value: 20 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 25 },
];

// const CList_DATA = [
//   { name: "Afraful Islam", img: dp },
//   { name: "Anika Rahnum", img: dp },
//   { name: "Riyana Ria", img: dp },
//   { name: "Electricity", img: dp },
//   { name: "M.M. Muhammad", img: dp },
//   { name: "Anika Rahnum", img: dp },
//   { name: "Afraful Islam", img: dp },
//   { name: "Riyana Ria", img: dp },
// ];

const DashboardPage = () => {
  const isLoggedIn = useSelector((state) => state.homepage.isLoggedIn);
  const token = useSelector((state) => state.homepage.token);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState();

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

    setDashboardData(data.data);
    dispatch(homepageActions.setDashboardData(data.data));
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dashboardDataFetch();
    }
  }, [isLoggedIn]);

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
                <p className={styles.active}>Dashboard</p>
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

          <div className={styles.rightCon}>
            <div className={styles.dashCon}>
              <p className={styles.title}>Dashboard</p>
              <div className={styles.info}>
                <InfoCard
                  title="Total Contents"
                  amount={dashboardData.total_contents}
                  sign=""
                />
                {/* <InfoCard
                  title="Total Visitors"
                  amount={dashboardData.total_visitors}
                  sign=""
                />
                <InfoCard
                  title="Total Orders"
                  amount={dashboardData.total_order}
                  sign=""
                /> */}
                <InfoCard
                  title="Balance"
                  amount={dashboardData.balance}
                  sign="BDT"
                />
              </div>

              {/* GRAPH */}

              {/* <div className={styles.graph}>
                <p className={styles.graphTitle}>Income</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={DUMMY_DATA}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />//
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#6F6D6D" />
                  </BarChart>
                </ResponsiveContainer>
              </div> */}
            </div>

            {/* <div className={styles.customerLi}>
              <p className={styles.clTitle}>Customar List</p>

              {CList_DATA.map((item, i) => (
                <>
                  <div key={i} className={styles.clItem}>
                    <img
                      className={styles.clDp}
                      src={item.img}
                      alt="author_dp"
                    />
                    <p className={styles.clName}>{item.name}</p>
                  </div>
                  {i !== CList_DATA.length - 1 && (
                    <hr className={styles.clHr} />
                  )}
                </>
              ))}
            </div> */}
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
    </>
  );
};

export default DashboardPage;
