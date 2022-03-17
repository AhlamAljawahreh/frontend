import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/login";
import { setServices } from "../reducers/services/index";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      role: state.loginReducer.role,
      services: state.servicesReducer.services,
      user_id: state.loginReducer.user_id,

    };
  });
  /******************************** */

  const getAllServicesByCategory = async (id) => {
    try {
      const res = await axios.get(`https://expert-picker.herokuapp.com/services/${id}`, {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        dispatch(setServices(res.data.results));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  /******************************** */
  const getAllServices = async () => {
    try {
      const res = await axios.get("https://expert-picker.herokuapp.com/services", {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        dispatch(setServices(res.data.results));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  // ************************** search *************************
  const search = (str) => {
    let services = state.services.filter((element, index) => {
      return element.title.includes(str) || element.description.includes(str);
    });
    if (services.length == 0) {
      getAllServices();
    } else {
      dispatch(setServices(services));
    }
  };
  // ***********************************************************
  return (
    <nav className="navbar navbar-expand-lg navbar-light border">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="https://res.cloudinary.com/aaaaahlllaaaam/image/upload/v1646832423/logo_njkyc1.png"
            alt=""
            width="30"
            height="30"
          />
        </a>{" "}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-bold">
            <li className="nav-item">
              <a
                className="nav-link active fw-bolder"
                aria-current="page"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </a>
            </li>
            {state.role == 1 && state.isLoggedIn ? (
              <li className="nav-item">
                <a
                  className="nav-link active fw-bolder"
                  onClick={() => {
                    navigate("/new_service");
                  }}
                >
                  New service
                </a>
              </li>
            ) : (
              <></>
            )}
            {state.isLoggedIn ? (
              <li className="nav-item">
                <a
                  className="nav-link active fw-bolder"
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  My Orders
                </a>
              </li>
            ) : (
              <></>
            )}

            {/* {state.role == 2  && state.isLoggedIn ? <li className="nav-item">
              <a className="nav-link active fw-bolder" onClick={()=>{
                  navigate("/new_service");
                }}>
                New Orders
              </a>
            </li>:<></>} */}
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle  active fw-bolder"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/home");
                      getAllServices();
                    }}
                  >
                    all
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/home");
                      getAllServicesByCategory("1");
                    }}
                  >
                    Mantanance
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/home");
                      getAllServicesByCategory("2");
                    }}
                  >
                    Cleaning
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/home");
                      getAllServicesByCategory("3");
                    }}
                  >
                    farniture moving
                  </button>
                </li>
              </ul>
            </li>
          </ul>

          <form className="d-flex position-absolute top-50 start-50 translate-middle ">
            <input
              className="form-control me-2"
              type="search"
              defaultValue=""
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                if (!e.target.value) {
                  getAllServices();
                } else {
                  search(e.target.value);
                }
              }}
            />
          </form>
          <ul className="navbar-nav  mb-2 mb-lg-0 text-bold">
            {state.isLoggedIn ? (
              <>
                            <li className="nav-item">
                <a
                  className="nav-link active text  fw-bolder"
                  href=""
                  onClick={() => {
                    navigate(`/user_info/${state.user_id}`);
                  }}
                >
                  My Information
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active text text-danger fw-bolder"
                  href=""
                  onClick={() => {
                    dispatch(logout());
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout
                </a>
              </li></>
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link active text  fw-bolder"
                  href=""
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
