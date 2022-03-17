import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/login";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";

toast.configure();
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const goTo = useNavigate();

  /* ************************* */
  const logInUser = async () => {
    try {
      const res = await axios.post("/login", {
        email: email,
        password: password,
      });
      if (res.data.success) {
        dispatch(login({ token: res.data.token, user_id: res.data.userId ,role:res.data.role }));
        goTo('/home');
                window.location.reload(false);
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
       
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return (error.response.data.message);
      }
    
    }
  };
  /* *************************** */
  const signUp = () => {
    axios
      .post("/users/", {
        userName: userName,
        email: email,
        phoneNumber: phoneNumber,
        role: role,
        country: country,
        password: password,
      })
      .then((result) => {
        if(result.data.success){
        toast.success(result.data.massage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });}else{
            toast.error(result.data.massage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          
          }
      })
      .catch((err) => {
        toast.error("Error happened while register, please try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });
  };
  /**************************************** */
  return (
    <div>
      <div className="signIn_signUp">
        <div className="Login">
          <div className="position-absolute top-50 start-50 translate-middle border p-5 bg-light">
            <p className="text-center fs-2 fw-bolder text-danger">Log In</p>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail11" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail11"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword11" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword11"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger position-relative top-50 start-50 translate-middle mt-4"
                onClick={() => {
                  logInUser();
                }}
              >
                Login
              </button>
              <br/>

              <small type="text" className="xs-text">you dont have account?   {'    '}</small>
              <a
                type="link"
                className="link position-relative top-50  translate-middle mt-3 service-div"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
              >
                Sign Up
              </a>
            </form>
          </div>
          <div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content  ">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Sign Up
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInput" className="form-label">
                          User Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInput"
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInput1" className="form-label">
                          country
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInput1"
                          aria-describedby="emailHelp"
                          onChange={(e) => {
                            setCountry(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInput2" className="form-label">
                          phoneNumber
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInput2"
                          aria-describedby="emailHelp"
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                          }}
                        />
                      </div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                      >
                        <option selected disabled>Sign Up As </option>
                        <option value="1">worker</option>
                        <option value="2">costemer</option>
                      </select>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        signUp();
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
