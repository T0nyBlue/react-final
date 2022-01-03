import "./transaction.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { transactionRows } from "../../dummyData.js";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Transaction() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const history = useHistory();

  const getTrans = async () => {
    try {
      const res = await axios.get(
        "https://backend-apidoc.herokuapp.com/api/trans",
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      setData(res.data);
      console.log(data);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage["user"]) {
      getTrans();
    } else {
      history.push("/login");
    }
  }, []);

  const columns = [
    { field: "id", headerName: "Invoice", width: 190 },
    { field: "Room_Num", headerName: "Room ID", width: 200 },
    { field: "Customer_Name", headerName: "Customer Name", width: 340 },
    {
      field: "Start_Date",
      headerName: "Start Date",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.Start_Date_Formatted.substring(0, 9)}
          </div>
        );
      },
    },
    {
      field: "End_Date",
      headerName: "End Date",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.End_Date_Formatted.substring(0, 9)}
          </div>
        );
      },
    },
    { field: "Status", headerName: "Status", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`transaction/${params.row.id}`}>
              <button className="transactionDetail">Detail</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="transactionField">
      <div className="transactionFieldTitle">
        <h1>TRANSACTIONS LIST</h1>
      </div>
      <div className="transaction">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={11}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
