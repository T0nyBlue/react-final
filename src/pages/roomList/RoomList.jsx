import './roomList.css';
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from '@material-ui/icons';
import {roomRows} from '../../dummyData.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function RoomList() {
    const [data, setData] = useState(roomRows);
    
    const handleDelete = (id)=>{
        setData(data.filter((item) => item.id !== id));
    };

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
        <div className="roomListTable">
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                />
        </div>
    </div>
    )
}
