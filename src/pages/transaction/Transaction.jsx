import './transaction.css';
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from '@material-ui/icons';
import {transactionRows} from '../../dummyData.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Transaction() {
    const [data, setData] = useState(transactionRows);
    
    const handleDelete = (id)=>{
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'Invoice', width: 150 },
        // { field: 'user', headerName: 'User Name', width: 260,
        // renderCell: (params) => { 
        //     return (
        //         <div className = "userListUser">
        //             {/* <img className = "userListImg" src={params.row.avatar} alt="" /> */}
        //             {params.row.username}
        //         </div>
        //     )
        // }
        // },
        { field: 'roomId', headerName: 'Room ID', width: 150 },
        { field: 'customerName', headerName: 'Customer Name', width: 260 },
        { field: 'checkIn', headerName: 'Check in', width: 150 },
        { field: 'startDate', headerName: 'Start Date', width: 150 },
        { field: 'endDate', headerName: 'End Date', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
        },
        {
            field: 'total',
            headerName: 'Total',
            width: 120,
            renderCell: (params) => { 
                return (
                    <div className = "userListUser">
                        ${params.row.total}
                    </div>
                )
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return(
                    <>
                        <Link to={"/transaction/" + params.row.id}>
                            <button className="transactionDetail">Detail</button>
                        </Link>
                        {/* <DeleteOutline className="transactionDelete" onClick={() => handleDelete(params.row.id)}/> */}
                    </>
                )
            }
        }
      ];

    return (
    <div className="transactionField">
        <div className="transactionFieldTitle">
            <h1>TRANSACTIONS</h1>
        </div>
        <div className="transaction">
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
