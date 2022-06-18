import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated,user,isAdmin } = useSelector((state) => state.user);
  return (
    <Fragment>
      {loading === false &&
        (isAuthenticated === true ? (
          isAdmin === true && user.role !== "admin" ? (
            <Navigate to="/login" />
          ) : (
            <Outlet />
          )
        ) : (
          <Navigate to="/login" />
        ))}
    </Fragment>
  );
};

export default ProtectedRoute;



// <Route
        //   {...rest}
        //   render={(props) => {
        //     if (isAuthenticated === false) {
        //       return <Navigate to="/login"/>;
        //     }

        //     // if (isAdmin === true && user.role !== "admin") {
        //     //   return <Redirect to="/login" />;
        //     // }

        //     return <Component {...props} />;
        //   }}
        // />