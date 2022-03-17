import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { deleteService, updateServices } from "../reducers/services/index";

toast.configure();
const Service = () => {
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
    getServices();
  }, []);
  const [service, setService] = useState({});
  const [title, setTilte] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState("");
  const [order_desc, setOrderDesc] = useState("");


  const { id } = useParams();
  const goTo = useNavigate();
  const dispatch = useDispatch();
  //   ********************************************************
  const getServices = async () => {
    try {
      const res = await axios.get(`/services/one/${id}`, {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        console.log(res.data.results);
        setService(res.data.results);
        setCategory(res.data.results.category);
        setTilte(res.data.results.title);
        setDescription(res.data.results.description);
      }
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  //   ****************************************************************
  /******************************** */
  const deleteOneService = async () => {
    try {
      const res = await axios.put(
        `/services/delete/${id}`,
        {},
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(deleteService(id));
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
  /******************************** */
  const updateOneService = async () => {
    try {
      const res = await axios.put(
        `/services/${id}`,
        { title, description, category, media },
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(updateServices(id));
        getServices();
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
  const createOrder = async () => {
    try {
      const res = await axios.post(
        `/orders/`,
        { service_id: id ,order_desc },
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(updateServices(id));
        getServices();
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
  // ***********************************************
  const uploadimage = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sab8a4tg");

    await axios
      .post(
        "https://api.cloudinary.com/v1_1/aaaaahlllaaaam/image/upload",
        formData
      )
      .then((response) => {
        setMedia(response.data.secure_url);
      })
      .catch((err) => {
        console.log("error");
        throw err;
      });
  };
  return (
    <div className="container ">
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
                Delete Service
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
                  deleteOneService(id);
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
                Updata Service
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
                  id="floatingInput"
                  placeholder="Title"
                  defaultValue={title}
                  onChange={(e) => {
                    setTilte(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Title</label>
              </div>
              <div className="form-floating mb-3 p-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="description"
                  defaultValue={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">Description</label>
              </div>
              <div className="mb-3">
                <input
                  className="form-floating"
                  type="file"
                  onChange={(e) => {
                    uploadimage(e.target.files[0]);
                  }}
                />
              </div>
              <select
                className="form-select form-floating mb-3 p-2"
                aria-label="Default select example"
                defaultValue={service.category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option disabled>Category </option>
                <option value="1">mantanance</option>
                <option value="2">cleaning</option>
                <option value="3">furniture moving</option>
              </select>
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
                  updateOneService(id);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ******************** create order ********************** */}

      <div
        className="modal fade"
        id="exampleModa4"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Order
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
                  createOrder();
                }}
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card mb-3 mt-5
      col-12 col-sm-6 col-xl-9 bg-light position-by-me"
      >
        <div className="row g-0">
          <div className="col-md-6">
            {service.user_id == state.user_id ? (
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
                  <li>
                    <button
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Delete
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModa2"
                    >
                      Update
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
            <img
              src={service.media}
              className="img-fluid image-card"
              alt="..."
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              {" "}
              <img
                src={service.image}
                className="user_image img-fluid service-div float-start mr-5"
                alt="..."
                onClick={() => {
                  navigate(`/user_info/${service.user_id}`);
                }}
              />
              <h5
                className="card-title service-div text-danger"
                onClick={() => {
                  navigate(`/user_info/${service.user_id}`);
                }}
              >
                {service.userName}{" "}
              </h5>
              <br />
              <p className="card-text">
                <strong>Title: </strong>
                {service.title}
              </p>
              <p className="card-text">
                <strong>Description: </strong>
                {service.description}
              </p>
              <p className="card-text">
                <strong>PhoneNumber: </strong>
                {service.phoneNumber}
              </p>
              <p className="card-text">
                <strong>Country: </strong>
                {service.country}
              </p>
              {state.role == 2 ? (
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModa4"
                  className="btn btn-danger ms-5"
                  onClick={() => {}}
                >
                  {" "}
                  order Now{" "}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
