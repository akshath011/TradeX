import React, { useState, useEffect } from "react";
import axios from "axios";

import { VerticalGraph } from "./VerticalGraph";

const API = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL || "http://localhost:3002";;

const formatMoney = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// Shows 29,875.55 with the decimals in a smaller <span>, like before
const Money = ({ value }) => {
  const [whole, decimals] = formatMoney(value).split(".");
  return (
    <>
      {whole}.<span>{decimals}</span>
    </>
  );
};

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/allHoldings`)
      .then((res) => {
        setAllHoldings(Array.isArray(res.data) ? res.data : []);
        setError("");
      })
      .catch((err) => {
        console.error("Could not load holdings:", err);
        setError("Could not load holdings. Please try again.");
      });
  }, []);

  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + Number(stock.avg) * Number(stock.qty),
    0
  );
  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + Number(stock.price) * Number(stock.qty),
    0
  );
  const profitLoss = currentValue - totalInvestment;
  const profitLossPercent =
    totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  if (error) {
    return (
      <>
        <h3 className="title">Holdings</h3>
        <p style={{ color: "#df514c" }}>{error}</p>
      </>
    );
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{formatMoney(stock.avg)}</td>
                  <td>{formatMoney(stock.price)}</td>
                  <td>{formatMoney(curValue)}</td>
                  <td className={profClass}>
                    {formatMoney(curValue - stock.avg * stock.qty)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            <Money value={totalInvestment} />
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            <Money value={currentValue} />
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>
            {formatMoney(profitLoss)} ({profitLoss >= 0 ? "+" : ""}
            {profitLossPercent.toFixed(2)}%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>

      {allHoldings.length > 0 && <VerticalGraph data={data} />}
    </>
  );
};

export default Holdings;