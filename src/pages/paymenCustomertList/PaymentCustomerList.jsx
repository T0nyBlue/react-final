import "./paymentCustomerList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { roomRows } from "../../dummyData.js";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PaymentCustomerList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const { phoneNumber } = useParams();

  const history = useHistory();

  const getAllPayment = async (phoneNumber) => {
    try {
      const res = await axios.get(
        `https://backend-apidoc.herokuapp.com/api/customer/getCustomerPays/${phoneNumber}`,
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
      getAllPayment(phoneNumber);
    } else {
      history.push("/login");
    }
  }, []);

  const columns = [
    { field: "id", headerName: "Payment ID", width: 280 },
    { field: "Customer_Id_Card", headerName: "Customer ID Card", width: 300 },
    { field: "Payment_method", headerName: "Payment Method", width: 300 },
    {
      field: "Surcharge",
      headerName: "Surcharge",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            ${Math.round((params.row.Surcharge + Number.EPSILON) * 100) / 100}
          </div>
        );
      },
    },
    {
      field: "Total",
      headerName: "Total",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            ${Math.round((params.row.Total + Number.EPSILON) * 100) / 100}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`getPaymentDetail/${params.row.id}`}>
              <button className="transactionListDetail">Detail</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="transactionList">
      <div className="transactionListContent">
        <h1>PAYMENTS LIST</h1>
      </div>
      <div className="transactionListTable">
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
