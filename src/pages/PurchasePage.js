import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../api";
import GreyBtn from "../components/UI/GreyBtn";
import dp from "../image/dp.png";
import styles from "./DashboardPage.module.css";
import classes from "./PurchasePage.module.css";

import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const PurchasePage = () => {
  const isLoading = useSelector((state) => state.homepage.isLoading);
  const isLoggedIn = useSelector((state) => state.homepage.isLoggedIn);
  const token = useSelector((state) => state.homepage.token);

  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [dashboardData, setDashboardData] = useState();

  const [loading, setLoading] = useState(false);

  // DASHBOARD DATA
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
    setData(data.data.contents);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dashboardDataFetch();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (dashboardData) {
      const result = dashboardData.contents.filter((data) =>
        data.title.toLocaleLowerCase().match(search.toLocaleLowerCase())
      );
      setData(result);
    }
  }, [search]);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Price",
      selector: (row) => (row.price ? row.price : 0),
    },
    {
      name: "Author",
      selector: (row) => row.author,
    },
    {
      name: "",
      cell: (row) => (
        <>
          <Link className={styles.link} to={`/content/${row.id}`}>
            <GreyBtn>Details</GreyBtn>
          </Link>
          {/* <div
            className={`${styles.link} ${styles.p10}`}
            onClick={() => handleEdit(row.id)}
          >
            <GreyBtn>Edit</GreyBtn>
          </div> */}
        </>
      ),
    },
  ];

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
                  <p className={styles.role}>{dashboardData.user.role}</p>
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
                <p className={styles.active}>Purchase</p>
              </Link>

              <Link className={styles.link} to="/dashboard/favourites">
                <p className={styles.options}>Favourutes</p>
              </Link>
            </div>
          </div>

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

          <div className={classes.rightCon}>
            <div className={classes.rContainer}>
              <p className={classes.pTitle}>Purchase</p>

              <div className={classes.tableCon}>
                <DataTable
                  data={data}
                  columns={columns}
                  pagination
                  fixedHeader
                  fixedHeaderScrollHeight="500px"
                  highlightOnHover
                  subHeader
                  subHeaderComponent={
                    <input
                      type="text"
                      placeholder="Search"
                      className={classes.tableSearch}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  }
                />
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
    </>
  );
};
export default PurchasePage;
