import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  setServices,
  deleteService,
  updateServices,
} from "../reducers/services/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

toast.configure();
const Home = () => {
  const [id, setId] = useState(0);
  const [title, setTilte] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState("");

  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      user_id: state.loginReducer.user_id,
      services: state.servicesReducer.services,
    };
  });
  const dispatch = useDispatch();

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
  /******************************** */
  const deleteOneService = async (id) => {
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
        getAllServices();
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
  const updateOneService = async (id) => {
    try {
      const res = await axios.put(
        `https://expert-picker.herokuapp.com/services/${id}`,
        { title, description, category, media },
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(updateServices({ id, title, description, category, media }));
        getAllServices();
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
  // ************************************************************
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
  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <>
      <div className="container pt-5">
        <div className="row">
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
          {/* **********************update modal ******************** */}

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
                    defaultValue={category}
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
          {/* ****************************************** */}
          {state.services.map((element, index) => {
            return (
              <div
                key={index}
                className="col-12 col-sm-6 col-xl-4 pb-4 bg-light "
              >
                <div className="card  ">
                  {/* <a><i className="bi bi-three-dots-vertical"></i></a>                                   */}

                  {element.user_id == state.user_id ? (
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
                        className="bi bi-three-dots-vertical position-absolute end-0  mt-2 "
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
                            onClick={() => {
                              setId(element.id);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              setCategory(element.category);
                              setTilte(element.title);
                              setDescription(element.description);
                              setId(element.id);
                            }}
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

                  {/* <a href="#" className="btn btn-primary ml-5 mr-5">
                    Go somewhere
                  </a> */}
                  <img
                    src={element.media}
                    className="card-img-top service-div "
                    onClick={() => {
                      if (state.isLoggedIn) {
                        navigate(`/service/${element.id}`);
                      } else {
                        navigate("/login");
                      }
                    }}
                    alt="..."
                  />
                  <div className="card-body ">
                    {" "}
                    <img
                      src={element.image}
                      className="user_image img-fluid  float-start mr-5 service-div"
                      alt="..."
                      onClick={() => {
                        if(state.isLoggedIn){
                          navigate(`/user_info/${element.user_id}`);
                        }else {
                          navigate('/login')
                        }                      }}
                    />
                    <h5
                      className="card-title text-capitalize service-div"
                      onClick={() => {
                        if(state.isLoggedIn){
                          navigate(`/user_info/${element.user_id}`);
                        }else {
                          navigate('/login')
                        }
                      }}
                    >
                      {element.userName}{" "}
                    </h5>
                    <br />
                    <p
                      className="card-text service-div"
                      onClick={() => {
                        if (state.isLoggedIn) {
                          navigate(`/service/${element.id}`);
                        } else {
                          navigate("/login");
                        }
                      }}
                    >
                      <strong>Title: </strong>
                      {element.title}
                    </p>
                    <p
                      className="card-text service-div"
                      onClick={() => {
                        if(state.isLoggedIn){
                          navigate(`/service/${element.id}`);
                        }else {
                          navigate('/login')
                        }
                      }}
                    >
                      <strong>Description: </strong>
                      {element.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
