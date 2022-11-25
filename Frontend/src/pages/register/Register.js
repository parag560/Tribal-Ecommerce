import React, { useState } from "react";
import "../register/Register.css";
import logim from "../../assets/4040107.jpg";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  register } from "../../redux/apiCalls";
import { publicRequest } from "../../publicrequest";

function Register() {
  //const api="http://localhost:5000/api/auth/test"
  const [username, setUsername] = useState("");
  const [uniqueEmail,setUniqueEmail]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        let data1;
        const data = await publicRequest
          .get(`/auth/findmail/${email}`)
          .then((res) => res.data)
          .then((res) => (data1 = res));
        if (data1 === "Present") {
          setUniqueEmail(true);

        } else {
          register(dispatch, { username, email, password, gender,isSailer:false });
          navigate("/");
        }
        console.log(data1);
      } catch (error) {
        console.log(error);
      }
      //console.log(username, email, password, confirmPassword, gender);
    } else {
      alert("password did not match");
    }
  };

  return (
    <div className="login">
      <div className="loginImage">
        <img className="loginImg" src={logim} alt="" />
      </div>
      <div className="loginForm">
        <div className="title">
          <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              size="50"
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              placeholder="Name"
            ></input>
          </div>
          <div className="form-row">
            <input
              size="50"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            ></input>
            {uniqueEmail && <p>This email already registered</p>}
          </div>
          <div className="form-row">
            <label htmlFor="gender">Gender</label>
            <select
              value={gender}
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              id="gender"
            >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-row">
            <input
              size="50"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            ></input>
          </div>
          <div className="form-row">
            <input
              size="50"
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            ></input>
          </div>
          <div className="form-row">
            <button type="submit" className="btn-submit">
              Register
            </button>
          </div>
          <div className="form-row">
            <div className="extra">
              <div className="register">
                <p>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/login"
                  >
                    Already have account? Login
                  </Link>
                </p>
                <p>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/registerSeller"
                  >
                    Register as a seller
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
