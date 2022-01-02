import "./customer.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { employeeRows } from "../../dummyData.js";

export default function Customer() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [logged, setLogged] = useState(false);

  const getCustomerList = async () => {
    try {
      const res = await axios.get(
        "https://backend-apidoc.herokuapp.com/api/customer",
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

  useEffect(() => {
    if (localStorage["user"]) {
      setLogged(true);
      if (JSON.parse(localStorage["user"]).UserType === "Admin") {
        getCustomerList();
      } else {
        history.push("/rooms");
      }
    } else {
      history.push("/login");
    }
  }, [data]);

  const columns = [
    { field: "id", headerName: "ID", width: 350 },
    { field: "Customer_Name", headerName: "Customer Name", width: 350 },
    { field: "Customer_Id_Card", headerName: "ID Card Number", width: 350 },
    { field: "Phone_Number", headerName: "Phone Number", width: 350 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/customer/transaction/" + params.row.Phone_Number}>
              <button className="customerListTransaction">Transaction</button>
            </Link>
            <Link to={"/customer/payment/" + params.row.Phone_Number}>
              <button className="customerListPayment">Payment</button>
            </Link>
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
            <h1>CUSTOMERS LIST</h1>
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
