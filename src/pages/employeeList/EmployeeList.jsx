import './employeeList.css';
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import { employeeRows } from '../../dummyData.js';

export default function EmployeeList() {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    const getEmployeeList = async () => {
        try {
            const res = await axios.get("/api/manage");
            setData(res.data);
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    useEffect(() => {
        if(localStorage['user']){
            const user = JSON.parse(localStorage['user']);
            if(user.UserType === 'Admin') {
                getEmployeeList();
                console.log(data);
            } else {
                history.push('/rooms');
            }
        }else{
            history.push('/login');
        }
    },[localStorage['user']])

    const handleDelete = (id)=>{
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'Type', headerName: 'Position', width: 200 },
        { field: 'Name', headerName: 'Employee Name', width: 250 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'Phone', headerName: 'Phone Number', width: 200 },
        { field: 'Email', headerName: 'Email', width: 300 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return(
                    <>
                        <Link to={"/employee/" + params.row.id}>
                            <button className="employeeListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="employeeListDelete" onClick={() => handleDelete(params.row.id)}/>
                    </>
                )
            }
        }
      ];

    return (
        <>
            {/* {user.UserType === 'Admin' && ( */}
                <div className="employeeList">
                    <div className="employeeListContent">
                        <h1>EMPLOYEES LIST</h1>
                        <Link to="/newEmployee">
                            <button className="employeeAddButton">Create</button>
                        </Link>
                    </div>
                    <div className="employeeListTable">
                        <DataGrid
                            rows={employeeRows}
                            disableSelectionOnClick
                            columns={columns}
                            pageSize={12}
                            rowsPerPageOptions={[5]}
                        />
                    </div>
                </div>
            {/* )} */}
        </>
    )
}
