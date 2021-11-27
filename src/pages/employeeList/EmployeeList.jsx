import './employeeList.css';
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from '@material-ui/icons';
import {employeeRows} from '../../dummyData.js';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function EmployeeList(props) {
    const {type} = props;
    const history = useHistory();
    const [data, setData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true)

    useEffect(() => {
        if(isAdmin) {
            setData(employeeRows);
        } else {
            history.push('/rooms');
        }
    },[history])

    const handleDelete = (id)=>{
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'position', headerName: 'Position', width: 200 },
        { field: 'name', headerName: 'Employee Name', width: 250 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'phone', headerName: 'Phone Number', width: 200 },
        { field: 'email', headerName: 'Email', width: 300 },
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
        {isAdmin && (<div className="employeeList">
        <div className="employeeListContent">
            <h1>EMPLOYEES LIST</h1>
            <Link to="/newEmployee">
                <button className="employeeAddButton">Create</button>
            </Link>
        </div>
        <div className="employeeListTable">
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[5]}
                />
        </div>
    </div>)}
    </>
    )
}
