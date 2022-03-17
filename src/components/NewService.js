import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { addServices } from "../reducers/services/index";
import {toast } from "react-toastify";



toast.configure();
const NewService = () => {
  const [title, setTilte] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [media, setMedia] = useState('');


  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
    };
  });

  const dispatch = useDispatch();

  /******************************** */
  const createNewService = async () => {
    try {
      const res = await axios.post(
        "https://expert-picker.herokuapp.com/services",
        { title, description, category ,media},
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(addServices({ title, description, category,media }));
        toast.success(res.data.massage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

      } else{
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
    console.log(file)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sab8a4tg");

    await axios
      .post("https://api.cloudinary.com/v1_1/aaaaahlllaaaam/image/upload", formData)
      .then((response) => {
        setMedia(response.data.secure_url);
      })
      .catch((err) => {
          console.log('error')
        throw err;
      });
  };
  return (
    <>
      <div className="container ">
        <div className="  position-absolute top-50 start-50 translate-middle border ps-5 pe-5 pt-3 pb-3 bg-light">
        <p className="text-center fs-2  text-danger">New Service</p>
        <div className="form-floating mb-3 p-2">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Title"
            onChange={(e) => {
              setTilte(e.target.value);
            }}
          />
          <label for="floatingInput">Title</label>
        </div>
        <div className="form-floating mb-3 p-2">
          <input
            type="text"
            className="form-control"
            id="floatingPassword"
            placeholder="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <label for="floatingPassword">Description</label>
        </div>
        <div className="mb-3">
                <input className="form-floating" type="file"    onChange={(e) => {
                  uploadimage(e.target.files[0])
                        }}/>
              </div>
        <select
                        className="form-select form-floating mb-3 p-2"
                        aria-label="Default select example"
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option selected disabled>Category </option>
                        <option value="1">mantanance</option>
                        <option value="2">cleaning</option>
                        <option value="3">furniture moving</option>

                      </select>
                      <button
                      type="button"
                      className="btn btn-danger"
                      onClick={()=>{
                        createNewService()
                    }}
                    >
                      Create New Service
                    </button>
                    </div>
      </div>
    </>
  );
};

export default NewService;
