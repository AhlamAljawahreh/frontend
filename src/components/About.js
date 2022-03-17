import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="About">
        <button
          type="button"
          class="btn  btn-outline-danger my_button fs-5"
          onClick={() => {
            navigate("/home");
          }}
        >
          {" "}
          Let Start{" "}
        </button>
      </div>

      <div className="row mb-5" id="About">

      <div class="card mb-3 bg-light" >
  <div class="row ">
      <div className="col-md-1">{   }</div>
    <div class="col-md-5 ps-5">
      <img src="https://res.cloudinary.com/aaaaahlllaaaam/image/upload/v1647432850/Maintenance_2_wxfvm1.gif" class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-5 bg-light">
      <div class="card-body ms-0 mt-5">
        <h1 class="card-title fw-bolder text-center mb-4">About</h1>
        <p class="card-text fs-5 ">Exper picker is a website specialized in services that allows the user to order any maintenance ,cleaning or furniture moving service , and as worker allows you to present your services with details. And to connect between the worker and customers from the same country or the city directly and faster.</p>
      </div>
    </div>
    <div className="col-md-1">{   }</div>

  </div>
</div>
</div>
<div class="container">
  <footer class="py-3 my-4 ">
    <ul class="nav justify-content-center border-bottom pb-3 ">
      <li class="nav-item"><a href="/home" class="nav-link px-2 text-muted">Home</a></li>
      <li class="nav-item"><a href="/login" class="nav-link px-2 text-muted">Login</a></li>
      <li class="nav-item"><a href="#About" class="nav-link px-2 text-muted">About</a></li>
    </ul>
    <p class="text-center text-muted">&copy; 2022 Ahlam Aljawahreh</p>
  </footer>
</div>
    </div>
  );
};

export default About;
