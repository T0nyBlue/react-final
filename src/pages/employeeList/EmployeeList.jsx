import "./employeeList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { employeeRows } from "../../dummyData.js";

export default function EmployeeList() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [logged, setLogged] = useState(false);

  const getEmployeeList = async () => {
    try {
      const res = await axios.get(
        "https://backend-apidoc.herokuapp.com/api/manage",
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      setData(res.data);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(
        `https://backend-apidoc.herokuapp.com/api/manage/${id}`,
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage["user"]) {
      setLogged(true);
      if (JSON.parse(localStorage["user"]).UserType === "Admin") {
        getEmployeeList();
      } else {
        history.push("/rooms");
      }
    } else {
      history.push("/login");
    }
  }, [data]);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "Type", headerName: "Position", width: 200 },
    { field: "Name", headerName: "Employee Name", width: 350 },
    { field: "Gender", headerName: "Gender", width: 200 },
    { field: "Phone", headerName: "Phone Number", width: 250 },
    { field: "Email", headerName: "Email", width: 340 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/employee/" + params.row.id}>
              <button className="employeeListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="employeeListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      {logged === true && (
        <div className="employeeList">
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
              sx={{
                boxShadow: 2,
                border: 10,
                borderColor: "blue",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
