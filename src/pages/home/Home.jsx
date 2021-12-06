import "./home.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { userData } from "../../dummyData.js";
import Chart from "../../components/chart/Chart";
import { CloudDownload } from "@material-ui/icons";
import axios from "axios";

export default function Home() {
  const history = useHistory();
  const [revenueData, setRevenueData] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [error, setError] = useState(false);

  const getAllPayment = async () => {
    try {
      const res = await axios.get(
        "https://backend-apidoc.herokuapp.com/api/payment",
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      setRevenueData(res.data);
      console.log(revenueData);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

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
      setEmployeeList(res.data);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const revenueHeaders = [
    { label: "Payment ID", key: "id" },
    { label: "Customer ID Card", key: "Customer_Id_Card" },
    { label: "Create Date", key: "Create_Date_Formatted" },
    { label: "Create By", key: "Create_By" },
    { label: "Payment Method", key: "email" },
    { label: "Payment Status", key: "Payment_Status" },
    { label: "Surcharge", key: "Surcharge" },
    { label: "Total", key: "Total" },
  ];

  const employeeListHeader = [
    { label: "ID", key: "id" },
    { label: "Type", key: "Type" },
    { label: "Full Name", key: "Name" },
    { label: "Gender", key: "Gender" },
    { label: "Date of Birth", key: "Date_of_Birth" },
    { label: "Phone", key: "Phone" },
    { label: "Email", key: "Email" },
    { label: "Address", key: "Address" },
  ];

  useEffect(() => {
    if (localStorage["user"]) {
      const user = JSON.parse(localStorage["user"]);
      if (user.UserType !== "Admin") {
        history.push("/rooms");
      }
      getAllPayment();
      getEmployeeList();
    } else {
      history.push("/login");
    }
  }, [localStorage["user"]]);

  return (
    <div className="home">
      <div className="homeTitleContainer">
        <h1 className="homeTitle">HOME</h1>
      </div>
      <div className="homeTop">
        <Chart
          data={userData}
          title="Customer Analytics"
          grid
          dataKey="Customer"
        />
      </div>
      <div className="homeBottom">
        <div className="downloadReportbtn">
          <div className="downloadRevenueReport">
            <div className="downloadReportTitle">
              <CSVLink
                className="downloadbtn"
                filename={"EmployeeList.csv"}
                data={employeeList}
                headers={employeeListHeader}
              >
                Download Employee List
              </CSVLink>
            </div>
          </div>
        </div>
        <div className="downloadReportbtn">
          <div className="downloadRevenueReport">
            <div className="downloadReportTitle">
              <CSVLink
                className="downloadbtn"
                filename={"Revenue.csv"}
                data={revenueData}
                headers={revenueHeaders}
              >
                Download Revenue Report
              </CSVLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
