import "./paymentDetail.css";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function PaymentDetail() {
  const { paymentId } = useParams();
  const [data, setData] = useState([]);
  const [createDate, setCreateDate] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const getPayment = async (id) => {
    try {
      const res = await axios.get(`/api/payment/getone/${id}`, {
        headers: {
          authorization:
            "Bearer " + JSON.parse(localStorage["user"]).accessToken,
        },
      });
      return res;
      // console.log(data);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage["user"]) {
      getPayment(paymentId).then((res) => {
        setData(res.data);
        setCreateDate(res.data.Create_Date_Formatted);
      });
    } else {
      history.push("/login");
    }
  }, [data]);

  return (
    <div className="paymentDetails">
      <div className="paymentTitleContainer">
        <h1 className="paymentTitle">PAYMENT DETAIL</h1>
      </div>
      <div className="paymentContainer">
        <div className="paymentShow">
          <div className="paymentShowTop">
            <div className="paymentShowTopTitle">
              <span className="paymentShowId">#{data.id}</span>
            </div>
          </div>
          <div className="paymentShowBottom">
            <div className="paymentShowDetail">
              <div className="paymentShowInfo">
                <label>Transaction ID:</label>
                <span className="transactionShowInfoTitle">{data.id}</span>
              </div>
              <div className="paymentShowInfo">
                <label>Customer ID card:</label>
                <span className="transactionShowInfoTitle">
                  {data.Customer_Id_Card}
                </span>
              </div>
              <div className="paymentShowInfo">
                <label>Payment Method:</label>
                <span className="transactionShowInfoTitle">
                  {data.Payment_Method}
                </span>
              </div>
              <div className="paymentShowInfo">
                <label>Payment Status:</label>
                <span className="transactionShowInfoTitle">
                  {data.Payment_Status}
                </span>
              </div>
              <div className="paymentShowInfo">
                <label>Create Date:</label>
                <span className="transactionShowInfoTitle">
                  {createDate.substring(0, 10)}
                </span>
              </div>
              <div className="paymentShowInfo">
                <label>Create By:</label>
                <span className="transactionShowInfoTitle">
                  {data.Create_By}
                </span>
              </div>
              <div className="paymentShowInfo">
                <label>Surcharge:</label>
                <span className="transactionShowInfoTitle">
                  {data.Surcharge}
                </span>
              </div>
              <div className="paymentShowInfo">
                <label>Total:</label>
                <span className="transactionShowInfoTitle">${data.Total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
