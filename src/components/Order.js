import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

toast.configure();
const Order = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      user_id: state.loginReducer.user_id,
      role: state.loginReducer.role,
      services: state.servicesReducer.services,
    };
  });
  const navigate = useNavigate();

  useEffect(() => {
    getOrder();
  }, []);
  const [order, setOrder] = useState({});
  const [worker, setWorker] = useState({});
  const [user, setUser] = useState({});
  const [order_desc, setOrderDesc] = useState("");
  const { id } = useParams();
  const goTo = useNavigate();
  //   ********************************************************
  const getOrder = async () => {
    try {
      const res = await axios.get(`https://expert-picker.herokuapp.com/orders/one/${id}`, {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        setOrder(res.data.results);
        getWorkerInfo(res.data.results.user_id);
        getorderedBYInfo(res.data.results.order_by);
      }
      console.log(res.data);
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  //   ****************************************************************
  const getorderedBYInfo = async (id) => {
    try {
      const res = await axios.get(`https://expert-picker.herokuapp.com/users/${id}`, {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        setUser(res.data.results);
      }
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  //   ****************************************************************
  const deleteOneOrder = async () => {
    try {
      const res = await axios.put(
        `https://expert-picker.herokuapp.com/orders/delete/${id}`,
        {},
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.massage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        goTo("/home");
      } else {
        toast.error(res.data.massage, {
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
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
//   ********************************************************
  const getWorkerInfo = async (id) => {
    try {
      const res = await axios.get(`https://expert-picker.herokuapp.com/users/${id}`, {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        setWorker(res.data.results);
      }
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
    /******************************** */
    const updateOneOrder = async () => {
        try {
          const res = await axios.put(
            `/orders/${id}`,
            { order_desc },
            {
              headers: {
                Authorization: ` Bearer ${state.token}`,
              },
            }
          );
          if (res.data.success) {
              getOrder()
            toast.success(res.data.massage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(res.data.massage, {
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
          if (!error.response.data.success) {
            return console.log(`error`);
          }
        }
      };
          /******************************** */
    const approveAnOrder = async () => {
        try {
          const res = await axios.put(
            `https://expert-picker.herokuapp.com/orders/status/${id}`,
            { status:"approved" },
            {
              headers: {
                Authorization: ` Bearer ${state.token}`,
              },
            }
          );
          if (res.data.success) {
              getOrder()
            toast.success(res.data.massage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(res.data.massage, {
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
          if (!error.response.data.success) {
            return console.log(`error`);
          }
        }
      };
  return (
    <div className="container">
      {/* ***************** delete modal ******************* */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are You Sure..!</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
deleteOneOrder()
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ******************** update ********************** */}
      
      <div
        className="modal fade"
        id="exampleModa2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Updata Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3 p-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="description"
                  defaultValue={order_desc}
                  onChange={(e) => {
                    setOrderDesc(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">Description</label>
              </div>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                    updateOneOrder()
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ******************************************************** */}
      <div
        className="modal fade"
        id="exampleModa3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Approve Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are You Sure..!</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
approveAnOrder()
                }}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ******************** update ********************** */}
      <div className="row mt-5 mb-5">
        <div className="col-md-2">{"   "}</div>
        <div className="col-md-8">
          <div class="card">
              <div className="dropdown">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="bi bi-three-dots-vertical position-absolute 
                          mt-2 "
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                    {state.role == 2 ? <li>
                    <button
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Delete
                    </button>
                  </li>:<></> }
                  {state.role == 2 ?<li>
                    <button
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModa2" 
                      onClick={()=>{
                        setOrderDesc(order.order_desc);
                      }}
                    >
                      Update
                    </button>
                  </li>:<li>
                    <button
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModa3"
                    >
                      Approve Order
                    </button>
                  </li> }

                </ul>
              </div>

            <img src={order.media} class="card-img-top " alt="..." />
            <div class="card-body">
              {" "}
              <div class="card-header">
                <img
                  src={user.image}
                  className="user_image img-fluid service-div float-start mr-5  "
                  alt="..."
                  onClick={() => {
                    navigate(`/user_info/${user.id}`);
                  }}
                />
                <h5
                  className="card-title service-div  text-capitalize text-danger mt-3"
                  onClick={() => {
                    navigate(`/user_info/${user.id}`);
                  }}
                >
                  {user.userName}{" "}
                </h5>
                <br/>
                <p>
                  <strong>Description:{"   "}</strong> {order.order_desc}{" "}
                </p>
                {order.status == "approved" ? (
                  <p className="card-title  mt-3 text-success  ">
                    <strong>Status:{"   "}</strong> {order.status}{" "}
                  </p>
                ) : (
                  <p className="card-title  mt-3 text-primary ">
                    <strong>Status:{"   "}</strong> {order.status}{" "}
                  </p>
                )}

                <br />
              </div>
              <div
                className="service-div"
                onClick={() => {
                  navigate(`/service/${order.service_id}`);
                }}
              >
                <h5
                  className="card-title service-div mt-3 text-capitalize "
                  onClick={() => {
                    navigate(`/service/${order.service_id}`);
                  }}
                >
                  Service Detailes{" "}
                </h5>
                <p className="card-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-person-circle me-3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                  <strong>{worker.userName}</strong>
                </p>
                <p className="card-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-arrow-right-circle-fill me-3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                  <strong>{order.title}</strong>
                </p>
                <p className="card-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-arrow-right-circle-fill me-3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                  {order.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2">{"   "}</div>
      </div>
    </div>
  );
};

export default Order;
