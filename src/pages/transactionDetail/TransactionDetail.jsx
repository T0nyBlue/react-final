import './transactionDetail.css';

export default function TransactionDetail() {
    return (
        <div className="transaction">
            <div className="transactionTitleContainer">
                <h1 className="transactionTitle">TRANSACTION DETAIL</h1>
            </div>
            <div className="transactionContainer">
                <div className="transactionShow">
                    <div className="transactionShowTop">
                        <div className="transactionShowTopTitle">
                            <span className="transactionShowUserName">#01357924680</span>
                        </div>
                    </div>
                    <div className="transactionShowBottom">
                        <div className="accountDetail">
                            <span className="transactionShowTitle">Customer Information</span>
                            <div className="transactionShowInfo">
                                <label>Customer name:</label>
                                <span className="transactionShowInfoTitle">Bao Nam</span>
                            </div>
                            <div className="transactionShowInfo">
                                <label>ID card number:</label>
                                <span className="transactionShowInfoTitle">251254987</span>
                            </div>
                            <div className="transactionShowInfo">
                                <label>Phone number:</label>
                                <span className="transactionShowInfoTitle">0969066865</span>
                            </div>
                        </div>
                        <div className="contactDetail">
                            <span className="transactionShowTitle">Booking Details</span>
                            <div className="transactionShowInfo">
                                <label>Room ID:</label>
                                <span className="transactionShowInfoTitle">A101</span>
                            </div>
                            <div className="transactionShowInfo">
                                <label>Check in:</label>
                                <span className="transactionShowInfoTitle">15:12 p.m</span>
                            </div>
                            <div className="transactionShowInfo">
                                <label>Start date:</label>
                                <span className="transactionShowInfoTitle">11/26/2021</span>
                            </div>
                            <div className="transactionShowInfo">
                                <label>End date:</label>
                                <span className="transactionShowInfoTitle">11/27/2021</span>
                            </div>
                            <div className="transactionShowInfo">
                                <label>Payment method:</label>
                                <span className="transactionShowInfoTitle">Cash</span>
                            </div>
                            <div className="transactionShowInfo">
                                <label>Status:</label>
                                <span className="transactionShowInfoTitle">Unpaid</span>
                            </div>
                        </div>
                    </div>
                    <div className="transactionShowTotal">
                        <label>TOTAL :</label>
                        <div className="transactionPrice">$120</div>  
                    </div>
                    <div className="transactionShowButton">
                        <button className="transactionButton pay">Pay</button>
                        <button className="transactionButton Delete">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
