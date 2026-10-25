// import React from "react";
// import { Link } from "react-router-dom";

// const Funds = () => {
//   return (
//     <>
//       <div className="funds">
//         <p>Instant, zero-cost fund transfers with UPI </p>
//         <Link className="btn btn-green">Add funds</Link>
//         <Link className="btn btn-blue">Withdraw</Link>
//       </div>

//       <div className="row">
//         <div className="col">
//           <span>
//             <p>Equity</p>
//           </span>

//           <div className="table">
//             <div className="data">
//               <p>Available margin</p>
//               <p className="imp colored">4,043.10</p>
//             </div>
//             <div className="data">
//               <p>Used margin</p>
//               <p className="imp">3,757.30</p>
//             </div>
//             <div className="data">
//               <p>Available cash</p>
//               <p className="imp">4,043.10</p>
//             </div>
//             <hr />
//             <div className="data">
//               <p>Opening Balance</p>
//               <p>4,043.10</p>
//             </div>
//             <div className="data">
//               <p>Opening Balance</p>
//               <p>3736.40</p>
//             </div>
//             <div className="data">
//               <p>Payin</p>
//               <p>4064.00</p>
//             </div>
//             <div className="data">
//               <p>SPAN</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Delivery margin</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Exposure</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Options premium</p>
//               <p>0.00</p>
//             </div>
//             <hr />
//             <div className="data">
//               <p>Collateral (Liquid funds)</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Collateral (Equity)</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Total Collateral</p>
//               <p>0.00</p>
//             </div>
//           </div>
//         </div>

//         <div className="col">
//           <div className="commodity">
//             <p>You don't have a commodity account</p>
//             <Link className="btn btn-blue">Open Account</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Funds;


// //Funds in C
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API = "http://localhost:3002";

// const round2 = (n) => Math.round(Number(n) * 100) / 100;

// const formatMoney = (value) =>
//   Number(value || 0).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

// const formatDate = (value) =>
//   new Date(value).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

// const Funds = () => {
//   const [funds, setFunds] = useState(null);
//   const [mode, setMode] = useState(null); // "ADD", "WITHDRAW" or null
//   const [amount, setAmount] = useState("");
//   const [error, setError] = useState("");
//   const [notice, setNotice] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     axios
//       .get(`${API}/funds`)
//       .then((res) => setFunds(res.data))
//       .catch((err) => console.error("Could not load funds:", err));
//   }, []);

//   // Hide the success message after 4 seconds
//   useEffect(() => {
//     if (!notice) return;
//     const timer = setTimeout(() => setNotice(""), 4000);
//     return () => clearTimeout(timer);
//   }, [notice]);

//   const openModal = (type) => {
//     setMode(type);
//     setAmount("");
//     setError("");
//   };

//   const closeModal = () => {
//     setMode(null);
//     setAmount("");
//     setError("");
//   };

//   const handleSubmit = async () => {
//     const value = round2(amount);

//     if (!Number.isFinite(value) || value <= 0) {
//       setError("Enter an amount greater than 0");
//       return;
//     }
//     if (mode === "WITHDRAW" && value > round2(funds.balance)) {
//       setError("Insufficient funds");
//       return;
//     }

//     try {
//       setLoading(true);
//       const url = mode === "ADD" ? "/funds/add" : "/funds/withdraw";
//       const res = await axios.post(`${API}${url}`, { amount: value });
//       setFunds(res.data);
//       setNotice(
//         `₹${formatMoney(value)} ${
//           mode === "ADD" ? "added to" : "withdrawn from"
//         } your account`
//       );
//       closeModal();
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!funds) {
//     return <h3 className="title">Loading funds...</h3>;
//   }

//   // Newest first, with the balance after each transaction.
//   // The newest row's balance is the current balance; every older row is
//   // worked out by undoing the transaction above it.
//   const history = [];
//   let runningBalance = round2(funds.balance);
//   [...(funds.transactions || [])].reverse().forEach((t) => {
//     history.push({ ...t, balanceAfter: runningBalance });
//     runningBalance = round2(
//       t.type === "ADD" ? runningBalance - t.amount : runningBalance + t.amount
//     );
//   });

//   return (
//     <>
//       <div className="funds">
//         <p>Instant, zero-cost fund transfers with UPI </p>
//         <button
//           className="btn btn-green"
//           style={{ border: "none", cursor: "pointer" }}
//           onClick={() => openModal("ADD")}
//         >
//           Add funds
//         </button>
//         <button
//           className="btn btn-blue"
//           style={{ border: "none", cursor: "pointer" }}
//           onClick={() => openModal("WITHDRAW")}
//         >
//           Withdraw
//         </button>
//       </div>

//       {notice && (
//         <p
//           style={{
//             color: "#4caf50",
//             fontSize: "0.85rem",
//             margin: "0 0 12px 0",
//             textAlign: "right",
//           }}
//         >
//           ✓ {notice}
//         </p>
//       )}

//       <div className="row">
//         <div className="col">
//           <span>
//             <p>Equity</p>
//           </span>

//           <div className="table">
//             <div className="data">
//               <p>Available margin</p>
//               <p className="imp colored">{formatMoney(funds.balance)}</p>
//             </div>
//             <div className="data">
//               <p>Used margin</p>
//               <p className="imp">{formatMoney(funds.usedMargin)}</p>
//             </div>
//             <div className="data">
//               <p>Available cash</p>
//               <p className="imp">{formatMoney(funds.balance)}</p>
//             </div>
//             <hr />
//             <div className="data">
//               <p>Opening Balance</p>
//               <p>{formatMoney(funds.openingBalance)}</p>
//             </div>
//             <div className="data">
//               <p>Payin (added)</p>
//               <p>{formatMoney(funds.payin)}</p>
//             </div>
//             <div className="data">
//               <p>Payout (withdrawn)</p>
//               <p>{formatMoney(funds.payout)}</p>
//             </div>
//             <div className="data">
//               <p>SPAN</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Delivery margin</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Exposure</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Options premium</p>
//               <p>0.00</p>
//             </div>
//             <hr />
//             <div className="data">
//               <p>Collateral (Liquid funds)</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Collateral (Equity)</p>
//               <p>0.00</p>
//             </div>
//             <div className="data">
//               <p>Total Collateral</p>
//               <p>0.00</p>
//             </div>
//           </div>
//         </div>

//         <div className="col">
//           <div className="commodity">
//             <p>You don't have a commodity account</p>
//             <button
//               className="btn btn-blue"
//               style={{ border: "none", cursor: "pointer" }}
//             >
//               Open Account
//             </button>
//           </div>
//         </div>
//       </div>

//       <h3 className="title" style={{ marginTop: 40 }}>
//         Transaction history ({history.length})
//       </h3>

//       <div className="order-table">
//         {history.length === 0 ? (
//           <p style={{ color: "#9b9b9b" }}>
//             No transactions yet. Click "Add funds" to get started.
//           </p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Date &amp; time</th>
//                 <th>Type</th>
//                 <th>Amount (₹)</th>
//                 <th>Balance after (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((t, index) => (
//                 <tr key={t._id || index}>
//                   <td>{formatDate(t.date)}</td>
//                   <td className={t.type === "ADD" ? "profit" : "loss"}>
//                     {t.type === "ADD" ? "Added" : "Withdrawn"}
//                   </td>
//                   <td className={t.type === "ADD" ? "profit" : "loss"}>
//                     {t.type === "ADD" ? "+" : "-"}
//                     {formatMoney(t.amount)}
//                   </td>
//                   <td>{formatMoney(t.balanceAfter)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {mode && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.4)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 200,
//           }}
//           onClick={closeModal}
//         >
//           <div
//             style={{
//               background: "#fff",
//               padding: 24,
//               borderRadius: 6,
//               width: 340,
//               boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h4 style={{ marginBottom: 6 }}>
//               {mode === "ADD" ? "Add funds" : "Withdraw funds"}
//             </h4>
//             <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: 14 }}>
//               Available balance: ₹{formatMoney(funds.balance)}
//             </p>

//             <input
//               type="number"
//               min="1"
//               step="0.01"
//               autoFocus
//               placeholder="Amount (₹)"
//               value={amount}
//               onChange={(e) => {
//                 setAmount(e.target.value);
//                 setError("");
//               }}
//               onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 fontSize: "1rem",
//                 border: "1px solid #ddd",
//                 borderRadius: 4,
//                 boxSizing: "border-box",
//               }}
//             />

//             {error && (
//               <p style={{ color: "#df514c", fontSize: "0.8rem", marginTop: 8 }}>
//                 {error}
//               </p>
//             )}

//             <div style={{ marginTop: 18, textAlign: "right" }}>
//               <button
//                 className="btn btn-blue"
//                 style={{ border: "none", cursor: "pointer" }}
//                 onClick={handleSubmit}
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Please wait..."
//                   : mode === "ADD"
//                   ? "Add"
//                   : "Withdraw"}
//               </button>
//               <button
//                 className="btn btn-grey"
//                 style={{ border: "none", cursor: "pointer" }}
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Funds;



//Auth
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "./AuthContext";
import OpenAccountModal from "./OpenAccountModal";

const API = "http://localhost:3002";

const round2 = (n) => Math.round(Number(n) * 100) / 100;

const formatMoney = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDate = (value) =>
  new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const Funds = () => {
  const { user, loading: authLoading, logout } = useAuth();

  const [funds, setFunds] = useState(null);
  const [mode, setMode] = useState(null); // "ADD", "WITHDRAW" or null
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/funds`)
      .then((res) => setFunds(res.data))
      .catch((err) => console.error("Could not load funds:", err));
  }, []);

  // Hide the success message after 4 seconds
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  const openModal = (type) => {
    setMode(type);
    setAmount("");
    setError("");
  };

  const closeModal = () => {
    setMode(null);
    setAmount("");
    setError("");
  };

  const handleSubmit = async () => {
    if (!user) {
      setError("Please login first");
      return;
    }

    const value = round2(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setError("Enter an amount greater than 0");
      return;
    }
    if (mode === "WITHDRAW" && value > round2(funds.balance)) {
      setError("Insufficient funds");
      return;
    }

    try {
      setLoading(true);
      const url = mode === "ADD" ? "/funds/add" : "/funds/withdraw";
      const res = await axios.post(`${API}${url}`, { amount: value });
      setFunds(res.data);
      setNotice(
        `₹${formatMoney(value)} ${
          mode === "ADD" ? "added to" : "withdrawn from"
        } your account by ${user.username}`
      );
      closeModal();
    } catch (err) {
      if (err.response?.status === 401) {
        // The login expired: reset the page to the signed-out view
        setError("Your session expired. Please login again.");
        logout();
      } else {
        setError(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!funds) {
    return <h3 className="title">Loading funds...</h3>;
  }

  // Newest first, with the balance after each transaction.
  // The newest row's balance is the current balance; every older row is
  // worked out by undoing the transaction above it.
  const history = [];
  let runningBalance = round2(funds.balance);
  [...(funds.transactions || [])].reverse().forEach((t) => {
    history.push({ ...t, balanceAfter: runningBalance });
    runningBalance = round2(
      t.type === "ADD" ? runningBalance - t.amount : runningBalance + t.amount
    );
  });

  // The 8 newest entries go in the Recent activity panel
  const recentActivity = history.slice(0, 8);

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>

        {authLoading ? null : user ? (
          <>
            <button
              className="btn btn-green"
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => openModal("ADD")}
            >
              Add funds
            </button>
            <button
              className="btn btn-blue"
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => openModal("WITHDRAW")}
            >
              Withdraw
            </button>
          </>
        ) : (
          <button
            className="btn btn-blue"
            style={{ border: "none", cursor: "pointer" }}
            onClick={() => setShowAuth(true)}
          >
            Login / Signup
          </button>
        )}
      </div>

      {notice && (
        <p
          style={{
            color: "#4caf50",
            fontSize: "0.85rem",
            margin: "0 0 12px 0",
            textAlign: "right",
          }}
        >
          ✓ {notice}
        </p>
      )}

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{formatMoney(funds.balance)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{formatMoney(funds.usedMargin)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{formatMoney(funds.balance)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{formatMoney(funds.openingBalance)}</p>
            </div>
            <div className="data">
              <p>Payin (added)</p>
              <p>{formatMoney(funds.payin)}</p>
            </div>
            <div className="data">
              <p>Payout (withdrawn)</p>
              <p>{formatMoney(funds.payout)}</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        {/* Recent activity: fills the white space on the right */}
        <div className="col">
          <div style={{ paddingLeft: 24 }}>
            <p style={{ marginBottom: 14 }}>Recent activity</p>

            {recentActivity.length === 0 ? (
              <p style={{ color: "#9b9b9b", fontSize: "0.85rem" }}>
                No activity yet.
              </p>
            ) : (
              recentActivity.map((t, index) => {
                const isAdd = t.type === "ADD";
                const color = isAdd ? "#4caf50" : "#df514c";

                return (
                  <div
                    key={t._id || index}
                    style={{
                      borderLeft: `3px solid ${color}`,
                      background: "#fafafa",
                      padding: "10px 14px",
                      marginBottom: 10,
                      borderRadius: 2,
                    }}
                  >
                    <p style={{ fontSize: "0.9rem", margin: 0 }}>
                      {t.username ? <strong>{t.username}</strong> : "Someone"}{" "}
                      {isAdd ? "added" : "withdrew"}{" "}
                      <span style={{ color, fontWeight: 500 }}>
                        ₹{formatMoney(t.amount)}
                      </span>
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#9b9b9b",
                        margin: "4px 0 0 0",
                      }}
                    >
                      {formatDate(t.date)} · Balance ₹
                      {formatMoney(t.balanceAfter)}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <h3 className="title" style={{ marginTop: 40 }}>
        Transaction history ({history.length})
      </h3>

      <div className="order-table">
        {history.length === 0 ? (
          <p style={{ color: "#9b9b9b" }}>
            No transactions yet.
            {user ? ' Click "Add funds" to get started.' : ""}
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date &amp; time</th>
                <th>User</th>
                <th>Type</th>
                <th>Amount (₹)</th>
                <th>Balance after (₹)</th>
              </tr>
            </thead>
            <tbody>
              {history.map((t, index) => (
                <tr key={t._id || index}>
                  <td>{formatDate(t.date)}</td>
                  <td>{t.username || "—"}</td>
                  <td className={t.type === "ADD" ? "profit" : "loss"}>
                    {t.type === "ADD" ? "Added" : "Withdrawn"}
                  </td>
                  <td className={t.type === "ADD" ? "profit" : "loss"}>
                    {t.type === "ADD" ? "+" : "-"}
                    {formatMoney(t.amount)}
                  </td>
                  <td>{formatMoney(t.balanceAfter)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {mode && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 6,
              width: 340,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 style={{ marginBottom: 6 }}>
              {mode === "ADD" ? "Add funds" : "Withdraw funds"}
            </h4>
            <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: 14 }}>
              Available balance: ₹{formatMoney(funds.balance)}
            </p>

            <input
              type="number"
              min="1"
              step="0.01"
              autoFocus
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: 4,
                boxSizing: "border-box",
              }}
            />

            {error && (
              <p style={{ color: "#df514c", fontSize: "0.8rem", marginTop: 8 }}>
                {error}
              </p>
            )}

            <div style={{ marginTop: 18, textAlign: "right" }}>
              <button
                className="btn btn-blue"
                style={{ border: "none", cursor: "pointer" }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : mode === "ADD"
                  ? "Add"
                  : "Withdraw"}
              </button>
              <button
                className="btn btn-grey"
                style={{ border: "none", cursor: "pointer" }}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAuth && (
        <OpenAccountModal
          openAccount={false}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
};

export default Funds;