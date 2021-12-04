import "./roomList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { roomRows } from "../../dummyData.js";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//import data range picker
import * as React from "react";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import TextField from "@mui/material/TextField";

export default function RoomList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [value, setValue] = React.useState([null, null]);

  const history = useHistory();

  const getRoomListBetween = async (a, b) => {
    try {
      const res = await axios.patch(
        "/api/room/checkRoom",
        { Start_Date: a, End_Date: b },
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
      getRoomListBetween(value[0], value[1]);
    } else {
      history.push("/login");
    }
  }, [value]);

  // console.log(value);

  const columns = [
    { field: "id", headerName: "Room ID", width: 250 },
    { field: "Room_Name", headerName: "Room Name", width: 450 },
    // { field: 'roomType', headerName: 'Room Type', width: 200 },
    {
      field: "Price_per_Hour",
      headerName: "Price per Hour",
      width: 380,
      renderCell: (params) => {
        return <div className="userListUser">${params.row.Price_per_Hour}</div>;
      },
    },
    {
      field: "Price_per_Day",
      headerName: "Price per Day",
      width: 380,
      renderCell: (params) => {
        return <div className="userListUser">${params.row.Price_per_Day}</div>;
      },
    },
    // { field: 'Status', headerName: 'Status', width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* {(params.row.Status == 'unbooked')?( */}
            <Link to={`room/${params.row.id}/${value[0]}/${value[1]}`}>
              <button className="roomListBook">Book</button>
            </Link>
            {/* <DeleteOutline className="employeeListDelete" onClick={() => handleDelete(params.row.id)}/> */}
            {/* ):null} */}
          </>
        );
      },
    },
  ];

  return (
    <div className="roomList">
      <div className="rommListContent">
        <h1>ROOMS LIST</h1>
        {/* <Link to="/newEmployee">
                <button className="employeeAddButton">Create</button>
            </Link> */}
      </div>
      <div className="roomListSelectDate">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            disablePast
            startText="Check-in"
            endText="Check-out"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </div>
      <div className="roomListTable">
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
