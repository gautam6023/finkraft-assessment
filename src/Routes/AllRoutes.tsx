import React from "react";
import { Route, Routes as RoutesWrapper } from "react-router-dom";
import Routes from "../utils/routes.constant";
const Login = React.lazy(() => import("../Pages/Login"));

const AllRoutes = () => {
  return (
    <RoutesWrapper>
      <Route path={Routes.Login.main()} element={<Login />} />
    </RoutesWrapper>
  );
};

export default AllRoutes;
