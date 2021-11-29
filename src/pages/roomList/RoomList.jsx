import './roomList.css';
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from '@material-ui/icons';
import {roomRows} from '../../dummyData.js';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

//import data range picker
import * as React from 'react';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import TextField from '@mui/material/TextField';

export default function RoomList() {
    const [data, setData] = useState(roomRows);
    const [value, setValue] = React.useState([null, null]);

    const history = useHistory();

    useEffect(() => {
        if(localStorage['user']){
            history.push('/rooms');
        }else{
            history.push('/login');
        }
    },[])

    console.log(value);

    const columns = [
        { field: 'id', headerName: 'Room ID', width: 200 },
        { field: 'roomName', headerName: 'Room Name', width: 250, },
        { field: 'roomType', headerName: 'Room Type', width: 200 },
        { field: 'pricePerHour', headerName: 'Price per Hour', width: 200,
            renderCell: (params) => { 
                return (
                    <div className = "userListUser">
                        ${params.row.pricePerHour}
                    </div>
                )
            }
        },
        { field: 'pricePerDay', headerName: 'Price per Day', width: 200, 
            renderCell: (params) => { 
                return (
                    <div className = "userListUser">
                        ${params.row.pricePerDay}
                    </div>
                )
            }
        },
        { field: 'status', headerName: 'Status', width: 200 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return(
                    <>
                        <Link to={"/room/" + params.row.id}>
                            <button className="roomListBook">Book</button>
                        </Link>
                        {/* <DeleteOutline className="employeeListDelete" onClick={() => handleDelete(params.row.id)}/> */}
                    </>
                )
            }
        }
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
    )
}
