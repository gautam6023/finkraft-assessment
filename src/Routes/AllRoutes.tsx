import React from "react";
import { Route, Routes as RoutesWrapper } from "react-router-dom";
import Routes from "../utils/routes.constant";
import Dashboard from "../Pages/Dashboard";
const Login = React.lazy(() => import("../Pages/Login"));

const AllRoutes = () => {
  return (
    <RoutesWrapper>
      <Route path={Routes.Login.main()} element={<Login />} />
      <Route path={Routes.Dashboard.main()} element={<Dashboard />} />
    </RoutesWrapper>
  );
};

export default AllRoutes;
