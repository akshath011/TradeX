// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { VerticalGraph } from "./VerticalGraph";

// const Holdings = () => {
//   const [allHoldings, setAllHoldings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch holdings from the backend
//   useEffect(() => {
//     let isMounted = true;

//     const fetchHoldings = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3002/allHoldings"
//         );

//         if (!Array.isArray(response.data)) {
//           throw new Error("Invalid holdings data received from the server.");
//         }

//         if (isMounted) {
//           setAllHoldings(response.data);
//           setError("");
//         }
//       } catch (err) {
//         console.error("Error fetching holdings:", err);

//         if (isMounted) {
//           setError(
//             "Unable to load holdings. Please check whether the backend server is running."
//           );
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchHoldings();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // Safely convert values into numbers
//   const getNumber = (value) => {
//     const number = Number(value);
//     return Number.isFinite(number) ? number : 0;
//   };

//   // Format currency values
//   const formatNumber = (value) =>
//     value.toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//   // Calculate total investment
//   const totalInvestment = allHoldings.reduce((total, stock) => {
//     return total + getNumber(stock.avg) * getNumber(stock.qty);
//   }, 0);

//   // Calculate current portfolio value
//   const currentValue = allHoldings.reduce((total, stock) => {
//     return total + getNumber(stock.price) * getNumber(stock.qty);
//   }, 0);

//   // Calculate profit or loss
//   const profitLoss = currentValue - totalInvestment;

//   // Calculate profit or loss percentage
//   const profitLossPercentage =
//     totalInvestment !== 0
//       ? (profitLoss / totalInvestment) * 100
//       : 0;

//   // Prepare graph data
//   const labels = allHoldings.map((stock) => stock.name);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Stock Price",
//         data: allHoldings.map((stock) => getNumber(stock.price)),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Loading state
//   if (loading) {
//     return <h3 className="title">Loading holdings...</h3>;
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="title">
//         <h3>Holdings</h3>
//         <p style={{ color: "red" }}>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <h3 className="title">Holdings ({allHoldings.length})</h3>

//       {/* Holdings Table */}
//       <div className="order-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Instrument</th>
//               <th>Qty.</th>
//               <th>Avg. cost</th>
//               <th>LTP</th>
//               <th>Cur. val</th>
//               <th>P&amp;L</th>
//               <th>Net chg.</th>
//               <th>Day chg.</th>
//             </tr>
//           </thead>

//           <tbody>
//             {allHoldings.length > 0 ? (
//               allHoldings.map((stock, index) => {
//                 const qty = getNumber(stock.qty);
//                 const avg = getNumber(stock.avg);
//                 const price = getNumber(stock.price);

//                 const investment = avg * qty;
//                 const curValue = price * qty;
//                 const stockProfitLoss = curValue - investment;

//                 const profClass =
//                   stockProfitLoss >= 0 ? "profit" : "loss";

//                 const dayChange = getNumber(stock.day);

//                 const dayClass =
//                   dayChange >= 0 ? "profit" : "loss";

//                 return (
//                   <tr key={stock.name || index}>
//                     <td>{stock.name || "N/A"}</td>

//                     <td>{qty}</td>

//                     <td>{formatNumber(avg)}</td>

//                     <td>{formatNumber(price)}</td>

//                     <td>{formatNumber(curValue)}</td>

//                     <td className={profClass}>
//                       {formatNumber(stockProfitLoss)}
//                     </td>

//                     <td className={profClass}>
//                       {stock.net ?? "N/A"}
//                     </td>

//                     <td className={dayClass}>
//                       {stock.day ?? "N/A"}
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center" }}>
//                   No holdings available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Portfolio Summary */}
//       <div className="row">
//         <div className="col">
//           <h5>{formatNumber(totalInvestment)}</h5>
//           <p>Total investment</p>
//         </div>

//         <div className="col">
//           <h5>{formatNumber(currentValue)}</h5>
//           <p>Current value</p>
//         </div>

//         <div className="col">
//           <h5 className={profitLoss >= 0 ? "profit" : "loss"}>
//             {formatNumber(profitLoss)} (
//             {profitLossPercentage.toFixed(2)}%)
//           </h5>
//           <p>P&amp;L</p>
//         </div>
//       </div>

//       {/* Holdings Graph */}
//       {allHoldings.length > 0 && <VerticalGraph data={data} />}
//     </>
//   );
// };

// export default Holdings;
// ChatGPT


//Holdings
import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { VerticalGraph } from "./VerticalGraph";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      // console.log(res.data);
      setAllHoldings(res.data);
    });
  }, []);

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);

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

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
//apna Clg