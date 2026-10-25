// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import axios from "axios";

// import GeneralContext from "./GeneralContext";

// import "./BuyActionWindow.css";

// const BuyActionWindow = ({ uid }) => {
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(0.0);

//   const handleBuyClick = () => {
//     axios.post("http://localhost:3002/newOrder", {
//       name: uid,
//       qty: stockQuantity,
//       price: stockPrice,
//       mode: "BUY",
//     });

//     GeneralContext.closeBuyWindow();
//   };

//   const handleCancelClick = () => {
//     GeneralContext.closeBuyWindow();
//   };

//   return (
//     <div className="container" id="buy-window" draggable="true">
//       <div className="regular-order">
//         <div className="inputs">
//           <fieldset>
//             <legend>Qty.</legend>
//             <input
//               type="number"
//               name="qty"
//               id="qty"
//               onChange={(e) => setStockQuantity(e.target.value)}
//               value={stockQuantity}
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Price</legend>
//             <input
//               type="number"
//               name="price"
//               id="price"
//               step="0.05"
//               onChange={(e) => setStockPrice(e.target.value)}
//               value={stockPrice}
//             />
//           </fieldset>
//         </div>
//       </div>

//       <div className="buttons">
//         <span>Margin required ₹140.65</span>
//         <div>
//           <Link className="btn btn-blue" onClick={handleBuyClick}>
//             Buy
//           </Link>
//           <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyActionWindow;


import React, { useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import { useAuth } from "./AuthContext";

import "./BuyActionWindow.css";

const API = "http://localhost:3002";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const { closeBuyWindow } = useContext(GeneralContext);
  const { user, logout } = useAuth();

  const handleOrderClick = async () => {
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);

    if (!Number.isInteger(qty) || qty < 1) {
      setError("Quantity must be a whole number, 1 or more");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setError("Enter a price greater than 0");
      return;
    }

    try {
      setBusy(true);
      setError("");
      await axios.post(`${API}/newOrder`, {
        name: uid,
        qty,
        price,
        mode, // "BUY" or "SELL"
      });
      closeBuyWindow();
    } catch (err) {
      if (err.response?.status === 401) {
        // The login expired: reset to the signed-out view
        setError("Your session expired. Please login again.");
        logout();
      } else {
        setError(err.response?.data?.message || "Order failed. Please try again.");
      }
      setBusy(false);
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h4 style={{ marginBottom: 4 }}>
          {mode} {uid}
        </h4>
        <p style={{ fontSize: "0.75rem", color: "#9b9b9b", marginBottom: 12 }}>
          Placing order as {user?.username}
        </p>
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => {
                setStockQuantity(e.target.value);
                setError("");
              }}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => {
                setStockPrice(e.target.value);
                setError("");
              }}
              value={stockPrice}
            />
          </fieldset>
        </div>
        {error && (
          <p style={{ color: "#df514c", fontSize: "0.8rem" }}>{error}</p>
        )}
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button
            className="btn btn-blue"
            style={{
              border: "none",
              cursor: "pointer",
              ...(mode === "SELL" ? { background: "#ff5722" } : {}),
            }}
            onClick={handleOrderClick}
            disabled={busy}
          >
            {busy ? "Please wait..." : mode === "SELL" ? "Sell" : "Buy"}
          </button>
          <button
            className="btn btn-grey"
            style={{ border: "none", cursor: "pointer" }}
            onClick={closeBuyWindow}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;