import React from "react";
import { Route, Routes } from "react-router-dom";
const Login = React.lazy(() => import("../Pages/Login"));

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AllRoutes;
