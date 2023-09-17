import { useState, useEffect } from "react";
import {
  APIKEY,
  URL,
  UPDATE_METER_FORM,
  DELETE_METER_FORM,
} from "../constants.js";

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

  console.log({ tableData })
  return (
    <MetersTable data={tableData} />
  );
};

export default LandingPage;
