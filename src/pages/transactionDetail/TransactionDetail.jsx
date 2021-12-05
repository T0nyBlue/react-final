import "./transactionDetail.css";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function TransactionDetail() {
  const { transactionId } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  // const [Customer_Id_Card, setCustomer_Id_Card] = useState();
  const [Start_Date, setStart_Date] = useState("");
  const [Start_Date_State, setStart_Date_State] = useState(false);
  const [End_Date, setEnd_Date] = useState("");
  const [End_Date_State, setEnd_Date_State] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [cancelState, setCancelState] = useState(false);
  const [Payment_Method, setPayment_Method] = useState("");
  // const [Room_Num, setRoom_Num] = useState();
  // const [Payment_Id, setPayment_Id] = useState();
  // const [priceDetails, setPriceDetails] = useState([]);
  // const [Status, setStatus] = useState();
  // const [Status_Payment, setStatus_Payment] = useState();

  const history = useHistory();

  const getTrans = async (id) => {
    try {
      const res = await axios.get(`/api/trans/getone/${id}`, {
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

  const setCheckin = async (checkin) => {
    try {
      const res = await axios.patch(
        "/api/trans/check-in",
        {
          id: transactionId,
          Customer_Id_Card: data.Customer_Id_Card,
          Start_Date: checkin,
          End_Date: data.End_Date,
          Room_Num: data.Room_Num,
        },
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      return true;
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const setCheckout = async (checkout) => {
    try {
      const res = await axios.patch(
        "/api/trans/check-out",
        {
          id: transactionId,
          Room_Num: data.Room_Num,
          Payment_Id: data.Payment_Id,
          Start_Date: data.Start_Date,
          End_Date: checkout,
        },
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      // setPriceDetails(res);
      return true;
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const setPaymentCheckout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "/api/trans/pay",
        {
          id: transactionId,
          Payment_Id: data.Payment_Id,
          Payment_Method,
          Room_Num: data.Room_Num,
        },
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

  const setCancelTrans = async (id) => {
    try {
      const res = await axios.patch(`/api/trans/cancel/${id}`, {
        headers: {
          authorization:
            "Bearer " + JSON.parse(localStorage["user"]).accessToken,
        },
      });
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage["user"]) {
      getTrans(transactionId).then((res) => {
        setData(res.data);
      });
      if (Start_Date !== "" && Start_Date_State === false) {
        setCheckin(Start_Date).then((res) => {
          setStart_Date_State(res);
        });
      }
      if (End_Date !== "" && End_Date_State === false) {
        setCheckout(End_Date).then((res) => {
          setEnd_Date_State(res);
        });
      }
      if (cancel === true && cancelState === false) {
        setCancelTrans(transactionId);
        setCancelState(true);
      }
    } else {
      history.push("/login");
    }
  }, [data, Start_Date, End_Date, cancel]);

  return (
    <div className="transactionDetails">
      <div className="transactionTitleContainer">
        <h1 className="transactionTitle">TRANSACTION DETAIL</h1>
      </div>
      <div className="transactionContainer">
        <div className="transactionShow">
          <div className="transactionShowTop">
            <div className="transactionShowTopTitle">
              <span className="transactionShowUserName">#{data.id}</span>
            </div>
          </div>
          <div className="transactionShowBottom">
            <div className="accountDetail">
              <span className="transactionShowTitle">Customer Information</span>
              <div className="transactionShowInfo">
                <label>Customer name:</label>
                <span className="transactionShowInfoTitle">
                  {data.Customer_Name}
                </span>
              </div>
              <div className="transactionShowInfo">
                <label>Customer ID card:</label>
                <span className="transactionShowInfoTitle">
                  {data.Customer_Id_Card}
                </span>
              </div>
              <div className="transactionShowInfo">
                <label>Phone number:</label>
                <span className="transactionShowInfoTitle">
                  {data.Phone_Number}
                </span>
              </div>
            </div>
            <div className="contactDetail">
              <span className="transactionShowTitle">Booking Details</span>
              <div className="transactionShowInfo">
                <label>Room ID:</label>
                <span className="transactionShowInfoTitle">
                  {data.Room_Num}
                </span>
              </div>
              <div className="transactionShowInfo">
                <label>Booking status:</label>
                <span className="transactionShowInfoTitle">{data.Status}</span>
              </div>
              <div className="transactionShowInfo">
                <label>Start date:</label>
                <span className="transactionShowInfoTitle">
                  {data.Start_Date_Formatted}
                </span>
              </div>
              <div className="transactionShowInfo">
                <label>End date:</label>
                <span className="transactionShowInfoTitle">
                  {data.End_Date_Formatted}
                </span>
              </div>
              <div className="transactionShowInfo">
                <label>Payment method:</label>
                <span className="transactionShowInfoTitle">
                  {data.Payment_Method}
                </span>
              </div>
              <div className="transactionShowInfo">
                <label>Status:</label>
                <span className="transactionShowInfoTitle">
                  {data.Status_Payment}
                </span>
              </div>
            </div>
          </div>
          <div className="seperate">
            <div className="seperateLine"></div>
          </div>
          <div className="transactionShowMethodAndTotal">
            <form
              onSubmit={setPaymentCheckout}
              id="transactionSelectPaymentMethod"
            >
              <label>Payment Method:</label>
              <select
                name="paymentMethod"
                id="paymentMethod"
                className="paymentMethodSelect"
                onChange={(e) => setPayment_Method(e.target.value)}
              >
                <option value=""></option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
            </form>
            <div className="transactionShowPrice">
              {/* <div className="transactionShowTotal">
                <label>SURCHARGE :</label>
                <div className="transactionPrice">
                  ${String(priceDetails.Surcharge)}
                </div>
              </div> */}
              <div className="transactionShowTotal">
                <label>TOTAL :</label>
                <div className="transactionPrice">
                  ${Math.round((data.Total + Number.EPSILON) * 100) / 100}
                </div>
              </div>
            </div>
          </div>
          <div className="transactionShowButton">
            <button
              className="transactionButton Checkinout"
              onClick={() => setStart_Date(new Date())}
            >
              Check in
            </button>
            <button
              className="transactionButton Checkinout"
              onClick={() => setEnd_Date(new Date())}
            >
              Check out
            </button>
            <button
              type="submit"
              className="transactionButton Pay"
              form="transactionSelectPaymentMethod"
            >
              Pay
            </button>
            <button
              className="transactionButton Cancel"
              onClick={() => setCancel(true)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
