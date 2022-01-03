import "./paymentDetail.css";
import { useState, useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import emailjs from "emailjs-com";
import axios from "axios";

export default function PaymentDetail() {
  const { paymentId } = useParams();
  const [data, setData] = useState([]);
  const [createDate, setCreateDate] = useState("");
  const [sendState, setSendState] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();
  const form = useRef();

  const getPayment = async (id) => {
    try {
      const res = await axios.get(
        `https://backend-apidoc.herokuapp.com/api/payment/getone/${id}`,
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage["user"]).accessToken,
          },
        }
      );
      return res;
      // console.log(data);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_wklxvnw",
        "template_bjnj2hc",
        form.current,
        "user_wV18sGAE7WlMtmpI6RzHa"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Successful!");
        },
        (error) => {
          console.log(error.text);
          alert(`${error.text}`);
        }
      );
  };

  useEffect(() => {
    if (localStorage["user"]) {
      getPayment(paymentId).then((res) => {
        setData(res.data);
        setCreateDate(res.data.Create_Date_Formatted);
      });
      if (
        document.getElementById("paymentId") ||
        document.getElementById("customerIdCard") ||
        document.getElementById("paymentMethod") ||
        document.getElementById("surcharge") ||
        document.getElementById("total")
      ) {
        document.getElementById("paymentId").value = `Payment ID: ${data.id}`;
        document.getElementById(
          "customerIdCard"
        ).value = `Customer Id Card: ${data.Customer_Id_Card}`;
        document.getElementById(
          "paymentMethod"
        ).value = `Payment Method: ${data.Payment_method}`;
        document.getElementById(
          "surcharge"
        ).value = `Surcharge: ${data.Surcharge}`;
        document.getElementById("total").value = `Total: ${data.Total}`;
        setSendState(true);
      }
    } else {
      history.push("/login");
    }
  }, [data, sendState]);

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
        <div className="sendPayment">
          <form ref={form} onSubmit={sendEmail} className="sendEmailForm">
            <div className="messageBox">
              <label>Name:</label>
              <input type="text" name="to_name" />
            </div>
            <div className="messageBox">
              <label>Email:</label>
              <input type="email" name="reply_to" />
            </div>
            <div className="messageBox" id="sendPaymentEmail">
              <label>Payment:</label>
              <input type="text" id="paymentId" name="paymentId" />
              <input type="text" id="customerIdCard" name="customerIdCard" />
              <input type="text" id="paymentMethod" name="paymentMethod" />
              <input type="text" id="surcharge" name="surcharge" />
              <input type="text" id="total" name="total" />
            </div>
            <div className="messageBox">
              <label>Noted:</label>
              <input type="text" id="noted" name="noted" />
            </div>
            <button
              className="submitEmailbtn"
              type="submit"
              value="Send"
              // onClick={() => setSendState(false)}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
