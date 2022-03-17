import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

toast.configure();
const UserInfo = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      user_id: state.loginReducer.user_id,
      services: state.servicesReducer.services,
      role: state.loginReducer.role,
    };
  });

  const { id } = useParams();
  const goTo = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [rate, setRate] = useState([]);
  const [value, setValue] = useState(0);
  const [sum, setSum] = useState(0);
  const [rated, setRated] = useState(false);



  //   ********************************************************
  const getUserInfo = async () => {
    try {
      const res = await axios.get(`https://expert-picker.herokuapp.com/users/${id}`, {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        setImage(res.data.results.image);
        setUser(res.data.results);
      }
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  //   ****************************************************************
  const getUserRate = async () => {
    try {
      const res = await axios.get(`https://expert-picker.herokuapp.com/rate/${id}`, {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        setRate(res.data.results);
        sumRate(res.data.results);
        checkRated(res.data.results)
      }
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  // ************************************************************
  const sumRate = (array) => {
    let sumRate = 0;
    array.forEach((element) => {
      sumRate += element.rate;
    });
    setSum(sumRate / array.length);
  };
  // ************************************************************
  const checkRated =(array)=>{
const found = array.filter(element=>{
  return element.coustomer_id == state.user_id
})

if(found.length == 0){
setRated(true)
}else{
  setRated(false)
}
  }
// *****************************************************
  const putUserRate = async (rate) => {
    try {
      const res = await axios.post(
        "https://expert-picker.herokuapp.com/rate",
        { worker_id: id, rate: rate },
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success('you rate this user', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload(false);
      } 
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  // **************************************************************
  const updateUserInformation = async () => {
    try {
      const res = await axios.put(
        `https://expert-picker.herokuapp.com/users`,
        { userName, email, country, phoneNumber },
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        getUserInfo();
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
  //   ********************************************************
  const updateUserImage = async (image) => {
    try {
      const res = await axios.put(
        `https://expert-picker.herokuapp.com/users/image`,
        { image },
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        getUserInfo();
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
  //   ****************************************************************
  const uploadimage = async () => {
    const formData = new FormData();
    formData.append("file", uploadedImage);
    formData.append("upload_preset", "sab8a4tg");

    await axios
      .post(
        "https://api.cloudinary.com/v1_1/aaaaahlllaaaam/image/upload",
        formData
      )
      .then((response) => {
        setImage(response.data.secure_url);
        updateUserImage(response.data.secure_url);
      })
      .catch((err) => {
        console.log("error");
        throw err;
      });
  };

  // **************************************************************
  const firstExample = {
    size: 20,
    edit: false,
  };
  const secondExample = {
    size: 30,
    

  };
  //   ****************************************************************
  useEffect(() => {
    getUserInfo();
    getUserRate();
  }, [sum]);
  // ****************************************
  return (
    <div className="container  overflow-hidden mt-5 me-5">
      {/* ****************update image modal******************** */}
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
                Update image
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <img className="modal-image rounded" src={user.image} />
              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => {
                    setUploadedImage(e.target.files[0]);
                  }}
                />
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
                  uploadimage();
                }}
              >
                update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* *********************update modal*********************** */}
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
                Updata User Information
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
                  placeholder="User Name"
                  defaultValue={user.userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">user Name</label>
              </div>
              <div className="form-floating mb-3 p-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="email"
                  defaultValue={user.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">Email</label>
              </div>
              <div className="form-floating mb-3 p-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="country"
                  defaultValue={user.country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">Country</label>
              </div>
              <div className="form-floating mb-3 p-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="email"
                  defaultValue={user.phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">Phone Number</label>
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
                  updateUserInformation();
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ********************************************** */}
      <div className="card col-9 bg-light ">
        <div className="row justify-content-center ">
          <div className="col-md-4">
            {user.id == state.user_id ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModa2"
                  className="bi bi-pencil position-absolute end-0  mt-2 me-3 fs-5 fw-bolder"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    setCountry(user.country);
                    setPhoneNumber(user.phoneNumber);
                    setUserName(user.userName);
                    setEmail(user.email);
                  }}
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#fff"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="bi bi-camera position-absolute start-0  mt-2 ms-3 fs-5 fw-bolder "
                  viewBox="0 0 16 16"
                  onClick={() => {
                    setImage(user.image);
                  }}
                >
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                </svg>
              </>
            ) : (
              <></>
            )}
            <img
              src={user.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body ">
              <h5 className="card-title text-danger fw-bolder fs-4 text-capitalize ">
                {user.userName}
              </h5>
              {user.role == 1 ? (<>{sum != 0?<><ReactStars  value= {sum}
                {...firstExample} /></>:<></>}</>

              ) : (
                <></>
              )}
              {user.role == 1 ?<>{ !rated? <small >you and {rate.length -1 } people rated this user</small>:<small > {rate.length  } people rated this user</small>}</>:<></>}
            
              <p className="card-text fs-5 pt-4">
                <i className="bi bi-telephone-fill fill-danger me-3  pb-2"></i>
                {user.phoneNumber}
              </p>
              <p className="card-text fs-5 ">
                <i className="bi bi-geo-alt-fill fill-danger me-3  pb-2"></i>
                {user.country}
              </p>
              <p className="card-text fs-5 ">
                <i className="bi bi-envelope-fill fill-danger me-3 pb-2"></i>
                {user.email}
              </p>

              {user.role == 1 && state.role == 2 && rated ? (<ReactStars
                className="pb-4"
                {...secondExample}
                edit={true}
                value= {value}
                onChange={ (newValue) => {
                  putUserRate(newValue);
                }}/>
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

export default UserInfo;
