import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { watchlist } from "../data/data";

ChartJS.register(ArcElement, Tooltip, Legend);

const SLIDE_MS = 300;

const formatMoney = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const AnalyticsPanel = ({ uid, onClose }) => {
  const [visible, setVisible] = useState(false);

  // Slide up right after the panel is added to the page
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(timer);
  }, []);

  // Slide down, then tell the parent to remove the panel
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, SLIDE_MS);
  };

  // Escape key closes the panel
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const total = watchlist.reduce((sum, stock) => sum + Number(stock.price), 0);
  const selected = watchlist.find((stock) => stock.name === uid);
  const share =
    selected && total > 0 ? (Number(selected.price) / total) * 100 : 0;

  const data = {
    labels: watchlist.map((stock) => stock.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => Number(stock.price)),
        backgroundColor: watchlist.map(
          (_, i) =>
            `hsla(${Math.round((i * 360) / watchlist.length)}, 70%, 60%, 0.8)`
        ),
        borderColor: "#fff",
        borderWidth: 2,
        // The stock you clicked is pulled out of the pie
        offset: watchlist.map((stock) => (stock.name === uid ? 24 : 0)),
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right" },
    },
  };

  return createPortal(
    <>
      {/* Dimmed background: click it to close */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          background: visible ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0)",
          transition: `background ${SLIDE_MS}ms ease`,
          zIndex: 150,
        }}
      />

      {/* The panel that slides up from the bottom */}
      <div
        role="dialog"
        aria-label={`Analytics for ${uid}`}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          background: "#fff",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
          padding: "20px 28px 28px",
          maxHeight: "75vh",
          overflowY: "auto",
          zIndex: 151,
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: `transform ${SLIDE_MS}ms ease`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h4 style={{ margin: 0, fontWeight: 500 }}>Analytics · {uid}</h4>
          <button
            onClick={handleClose}
            aria-label="Close analytics"
            style={{
              border: "none",
              background: "transparent",
              fontSize: "1.3rem",
              cursor: "pointer",
              color: "#666",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 320px",
              position: "relative",
              height: "40vh",
              minHeight: 260,
            }}
          >
            <Pie data={data} options={options} />
          </div>

          {selected && (
            <div style={{ flex: "0 1 240px" }}>
              <p style={{ color: "#9b9b9b", fontSize: "0.8rem" }}>Price</p>
              <p style={{ fontSize: "1.3rem", marginBottom: 14 }}>
                ₹{formatMoney(selected.price)}
              </p>

              <p style={{ color: "#9b9b9b", fontSize: "0.8rem" }}>Day change</p>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginBottom: 14,
                  color: selected.isDown ? "#df514c" : "#4caf50",
                }}
              >
                {selected.percent}
              </p>

              <p style={{ color: "#9b9b9b", fontSize: "0.8rem" }}>
                Share of watchlist
              </p>
              <p style={{ fontSize: "1.1rem", marginBottom: 14 }}>
                {share.toFixed(1)}%
              </p>

              <p style={{ color: "#9b9b9b", fontSize: "0.75rem" }}>
                The pie shows each stock's price as a share of your whole
                watchlist.
              </p>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default AnalyticsPanel;