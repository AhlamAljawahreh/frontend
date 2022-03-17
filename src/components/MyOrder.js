import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

toast.configure();
const MyOrders = () => {
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
    getMyOrders();
  }, []);

  const [orders, setOrders] = useState([]);

  //   ********************************************************
  const getMyOrders = async () => {
    try {
      const res = await axios.get(`/orders`, {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        setOrders(res.data.results);
      }
      console.log(res.data.results);
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };

  return (
    <div className="container mt-5 mb-5">
        <div className="row">
        {orders.map((element, index) => {
          return (
            <div
              key={index}
              className="col-12 col-sm-6 col-xl-4 pb-4 bg-light service-div " 
              onClick={()=>{
                navigate(`/order/${element.id}`);

              }}
            >
              <div class="card">
                <img src={element.media} class="card-img-top " alt="..." />
                <div class="card-body">
                  {" "}
                  <div class="card-header">
                    <p>
                      <strong> Description:{"   "}</strong>{" "}
                      {element.order_desc}{" "}
                    </p>
                    {element.status == "approved" ? (
                      <p className="card-title  mt-3 text-success  ">
                        <strong>Status:{"   "}</strong> {element.status}{" "}
                      </p>
                    ) : (
                      <p className="card-title  mt-3 text-primary ">
                        <strong>Status:{"   "}</strong> {element.status}{" "}
                      </p>
                    )}

                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
    </div>
  );
};

export default MyOrders;
