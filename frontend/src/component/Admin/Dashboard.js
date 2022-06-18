import React, { useEffect } from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
 import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
const Dashboard = () => {
   const dispatch = useDispatch();

     const { products } = useSelector((state) => state.products);

     useEffect(() => {

      dispatch(getAdminProduct());
    }, [dispatch]);
    const { orders } = useSelector((state) => state.allOrders);

   const { users } = useSelector((state) => state.allUsers);


  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);


  return (
    <div className="sidebar">
      <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <div className="sitename">
          <h1>ShoeLand</h1>
        </div>
        <div className="centerdiv">
          <Link to="/admin/product">
            <p>
              <ListAltIcon />
              Create Product
            </p>
          </Link>
          <Link to="/admin/products">
            <p>
              <ListAltIcon />
              View All Products
            </p>
          </Link>
          <Link to="/admin/orders">
            <p>
              <ListAltIcon />
              Orders
            </p>
          </Link>
          <Link to="/admin/users">
            <p>
              <PeopleIcon /> Users
            </p>
          </Link>
        </div>
        <div className="data">
          <ul>
            No.of products
            <li>{products && products.length} </li>
          </ul>
          <ul>
            No.of users
            <li> {users && users.length}</li>
          </ul>
          <ul>
            No.of orders
            <li>{orders && orders.length}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

