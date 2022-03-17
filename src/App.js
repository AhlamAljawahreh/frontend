import "./App.css";
import Login from "./components/Login";
import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import NewService from "./components/NewService";
import Service from "./components/Service";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserInfo from "./components/UserInfo";
import Order from "./components/Order";
import MyOrders from "./components/MyOrder";
import Chatbot from "./components/Chatbot";
import About from "./components/About";

function App() {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  return (
    <>
      <Navigation />
      <div className="App ">
        <div className="Home">
          <Routes>
            <Route path="/new_service" element={<NewService />} />
            <Route path="/home" element={<Home />} />
            <Route path="/service/:id" element={<Service />} />
            <Route path="/user_info/:id" element={<UserInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/orders" element={<MyOrders />} />

            <Route path="/" element={<About />} />
          </Routes>
        </div>
        {/* {!state.isLoggedIn ? <></> : <Home />} */}
        <Chatbot />
      </div>
    </>
  );
}

export default App;
