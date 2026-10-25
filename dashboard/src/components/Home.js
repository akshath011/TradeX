// import React from "react";

// import Dashboard from "./Dashboard";
// import TopBar from "./TopBar";

// const Home = () => {
//   return (
//     <>
//       <TopBar />
//       <Dashboard />
//     </>
//   );
// };

// export default Home;


//Auth

import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { AuthProvider } from "./AuthContext";

const Home = () => {
  return (
    <AuthProvider>
      <TopBar />
      <Dashboard />
    </AuthProvider>
  );
};

export default Home;