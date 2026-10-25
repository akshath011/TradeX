// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// const Menu = () => {
//   const location = useLocation();

//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

//   const menuClass = "menu";
//   const activeMenuClass = "menu selected";

//   const getSelectedMenu = () => {
//     const paths = {
//       "/": 0,
//       "/orders": 1,
//       "/holdings": 2,
//       "/positions": 3,
//       "/funds": 4,
//       "/apps": 6,
//     };

//     return paths[location.pathname] ?? 0;
//   };

//   const selectedMenu = getSelectedMenu();

//   const handleProfileClick = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   return (
//     <div className="menu-container">
//       <img src="/logo.png" alt="TradeX Logo" style={{ width: "50px" }} />

//       <div className="menus">
//         <ul>
//           <li>
//             <Link style={{ textDecoration: "none" }} to="/">
//               <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
//                 Dashboard
//               </p>
//             </Link>
//           </li>

//           <li>
//             <Link style={{ textDecoration: "none" }} to="/orders">
//               <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
//                 Orders
//               </p>
//             </Link>
//           </li>

//           <li>
//             <Link style={{ textDecoration: "none" }} to="/holdings">
//               <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
//                 Holdings
//               </p>
//             </Link>
//           </li>

//           <li>
//             <Link style={{ textDecoration: "none" }} to="/positions">
//               <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
//                 Positions
//               </p>
//             </Link>
//           </li>

//           <li>
//             <Link style={{ textDecoration: "none" }} to="/funds">
//               <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
//                 Funds
//               </p>
//             </Link>
//           </li>

//           <li>
//             <Link style={{ textDecoration: "none" }} to="/apps">
//               <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
//                 Apps
//               </p>
//             </Link>
//           </li>
//         </ul>

//         <hr />

//         <div className="profile" onClick={handleProfileClick}>
//           <div className="avatar">ZU</div>
//           <p className="username">USERID</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;


// //c for delete of Apps section
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// const Menu = () => {
//   const location = useLocation();

//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

//   const menuClass = "menu";
//   const activeMenuClass = "menu selected";

//   const getSelectedMenu = () => {
//     const paths = {
//       "/": 0,
//       "/orders": 1,
//       "/holdings": 2,
//       "/positions": 3,
//       "/funds": 4,
//     };

//     return paths[location.pathname] ?? 0;
//   };

//   const selectedMenu = getSelectedMenu();

//   const handleProfileClick = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   return (
//     <div className="menu-container">
//       <img src="/logo.png" alt="TradeX Logo" style={{ width: "50px" }} />

//       <div className="menus">
//         <ul>
//           <li>
//             <Link style={{ textDecoration: "none" }} to="/">
//               <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
//                 Dashboard
//               </p>
//             </Link>
//           </li>

//           <li>
//             <Link style={{ textDecoration: "none" }} to="/orders">
//               <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
//                 Orders
//               </p>
//             </Link>
//           </li>

//           <li>
//             <Link style={{ textDecoration: "none" }} to="/holdings">
//               <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
//                 Holdings
//               </p>
//             </Link>
//           </li>

//           <li>
//             <Link style={{ textDecoration: "none" }} to="/positions">
//               <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
//                 Positions
//               </p>
//             </Link>
//           </li>

//           <li>
//             <Link style={{ textDecoration: "none" }} to="/funds">
//               <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
//                 Funds
//               </p>
//             </Link>
//           </li>
//         </ul>

//         <hr />

//         <div className="profile" onClick={handleProfileClick}>
//           <div className="avatar">ZU</div>
//           <p className="username">USERID</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;


//Auth and Signup
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAuth } from "./AuthContext";
import OpenAccountModal from "./OpenAccountModal";

const Menu = () => {
  const location = useLocation();
  const { user, loading, logout } = useAuth();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const profileRef = useRef(null);

  // Close the dropdown when clicking anywhere outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const getSelectedMenu = () => {
    const paths = {
      "/": 0,
      "/orders": 1,
      "/holdings": 2,
      "/positions": 3,
      "/funds": 4,
    };

    return paths[location.pathname] ?? 0;
  };

  const selectedMenu = getSelectedMenu();

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    setIsProfileDropdownOpen(false);
    await logout();
  };

  const initials = (user?.username || "").slice(0, 2).toUpperCase();

  return (
    <div className="menu-container">
      <img src="/logo.png" alt="TradeX Logo" style={{ width: "50px" }} />

      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/">
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to="/orders">
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings">
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to="/positions">
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link style={{ textDecoration: "none" }} to="/funds">
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        {loading ? null : user ? (
          <div
            className="profile"
            ref={profileRef}
            onClick={handleProfileClick}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <div className="avatar">{initials}</div>
            <p className="username">{user.username}</p>

            {isProfileDropdownOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 8,
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 4,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  padding: "10px 16px",
                  minWidth: 150,
                  zIndex: 50,
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#9b9b9b",
                    marginBottom: 8,
                  }}
                >
                  Signed in as <strong>{user.username}</strong>
                </p>
                <button
                  onClick={handleLogout}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#df514c",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    padding: 0,
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            style={{
              background: "#387ed1",
              color: "#fff",
              border: "none",
              borderRadius: 2,
              padding: "7px 18px",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Login / Sign Up
          </button>
        )}
      </div>

      {showAuth && (
        <OpenAccountModal
          openAccount={false}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
};

export default Menu;