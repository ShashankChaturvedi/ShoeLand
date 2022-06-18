import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";
import React from "react";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/Resetpassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/account" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
        </Route>
        <Route exact path="/me/update" element={<ProtectedRoute />}>
          <Route exact path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route exact path="/shipping" element={<ProtectedRoute />}>
          <Route exact path="/shipping" element={<Shipping />} />
        </Route>
        <Route exact path="/password/update" element={<ProtectedRoute />}>
          <Route exact path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route exact path="/success" element={<ProtectedRoute />}>
          <Route exact path="/success" element={<OrderSuccess />} />
        </Route>
        <Route exact path="/order/confirm" element={<ProtectedRoute />}>
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        </Route>
        <Route exact path="/orders" element={<ProtectedRoute />}>
          <Route exact path="/orders" element={<MyOrders />} />
        </Route>
        <Route exact path="/order/:id" element={<ProtectedRoute />}>
          <Route exact path="/order/:id" element={<OrderDetails />} />
        </Route>
        <Route
          isAdmin={true}
          exact
          path="/admin/dashboard"
          element={<ProtectedRoute />}
        >
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          isAdmin={true}
          exact
          path="/admin/products"
          element={<ProtectedRoute />}
        >
          <Route exact path="/admin/products" element={<ProductList />} />
        </Route>
        <Route
          isAdmin={true}
          exact
          path="/admin/product/:id"
          element={<ProtectedRoute />}
        >
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>
        <Route
          isAdmin={true}
          exact
          path="/admin/product"
          element={<ProtectedRoute />}
        >
          <Route exact path="/admin/product" element={<NewProduct />} />
        </Route>
        <Route
          isAdmin={true}
          exact
          path="/admin/orders"
          element={<ProtectedRoute />}
        >
          <Route exact path="/admin/orders" element={<OrderList />} />
        </Route>
        <Route
          isAdmin={true}
          exact
          path="/admin/users"
          element={<ProtectedRoute />}
        >
          <Route exact path="/admin/users" element={<UsersList />} />
        </Route>
        <Route
          isAdmin={true}
          exact
          path="/admin/user/:id"
          element={<ProtectedRoute />}
        >
          <Route exact path="/admin/user/:id" element={<UpdateUser />} />
        </Route>

        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
      </Routes>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/payment/process" element={<ProtectedRoute />}>
              <Route exact path="/payment/process" element={<Payment />} />
            </Route>
          </Routes>
        </Elements>
      )}
      <Footer />
    </Router>
  );
}

export default App;
