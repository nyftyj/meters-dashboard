import { useState, useEffect } from "react";
import { APIKEY, URL } from "../constants.js";

import MetersTable from "./MetersTable";

const LandingPage = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await fetch(URL, {
            method: "GET",
            headers: {
              "API-KEY": APIKEY,
              "Content-Type": "application/json",
            },
          })
          const data = await res.json();
          setTableData(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();

  }, []);

  return (
    <MetersTable data={tableData} />
  );
};

export default LandingPage;
