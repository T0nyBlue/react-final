import './transaction.css';
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from '@material-ui/icons';
import {userRows} from '../../dummyData.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Transaction() {
    const [data, setData] = useState(userRows);
    
    const handleDelete = (id)=>{
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'user', headerName: 'User Name', width: 260, renderCell: (params) => { 
            return (
                <div className = "userListUser">
                    <img className = "userListImg" src={params.row.avatar} alt="" />
                    {params.row.username}
                </div>
            )
        }},
        { field: 'email', headerName: 'Email', width: 260 },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
        },
        {
            field: 'transaction',
            headerName: 'Transaction Volumn',
            width: 260,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return(
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)}/>
                    </>
                )
            }
        }
      ];

    return (
    <div className="transactionField">
        <div className="searchField">
            {/* <label>ID</label>
            <input type="text" placeholder="E.g. A123456789" />
            <button className="searchButton">Search</button> */}
            <span className="transactionTableTitle">TRANSACTION TABLE</span>
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
