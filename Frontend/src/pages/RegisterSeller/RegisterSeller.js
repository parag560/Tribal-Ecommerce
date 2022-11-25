import React, { useState, useRef, useEffect } from "react";
import "../RegisterSeller/RegisterSeller.css";
import logim from "../../assets/4040107.jpg";
import emailjs from "@emailjs/browser";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/apiCalls";
import { publicRequest } from "../../publicrequest";

function RegisterSeller() {
  const form = useRef();
  const [username, setUsername] = useState("");
  const [uniqueEmail, setUniqueEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailverified, setEmailVerified] = useState(false);
  const [otpgen, setOtpgen] = useState(0);
  const [otpsend, setotpsend] = useState(false);
  const [otpview, setotpView] = useState(false);
  const [userOtp,setUserOtp]=useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genreateOtp = () => {
    const ot = Math.floor(100000 + Math.random() * 900000);
    setOtpgen(ot);
    return ot;
  };
  const handleverifymail = async () => {
    let data1;
    const data = await publicRequest
      .get(`/auth/findmail/${email}`)
      .then((res) => res.data)
      .then((res) => (data1 = res));
    console.log(data1);

    if (data1 === "Present") {
      setUniqueEmail(true);
    } else {
      setotpView(true);
      const g = genreateOtp();
      setOtpgen(g);
      emailjs
        .sendForm(
          "service_pkdikmj",
          "template_34wegc7",
          form.current,
          "i8rx1E6k5Yt3WIEWf"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
        setotpsend(true);
        
    }
  };

  const verifyOTP=()=>{
    console.log(otpgen);
    console.log(userOtp);
    if(otpgen==userOtp){
      setEmailVerified(true);
      console.log("working")
      alert("OTP is Correct")
    }
    else{
      console.log("not");
      alert("OTP is InCorrect")
    }
  }

  const handleSubmit = async (e) => {
    
    //e.preventDefault();
    if(password===confirmPassword){
      register(dispatch, { username, email, password, gender,isSailer:true });
      navigate("/seller");
    }
    else{
      alert("Passwords did not matched")
    }
    
  };

  return (
    <div className="login">
      <div className="loginImage">
        <img className="loginImg" src={logim} alt="" />
      </div>
      <div className="loginForm">
        <div className="title">
          <h2>Start Selling</h2>
        </div>
        <form ref={form}>
          <div className="form-row">
            <input
              size="50"
              required
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              name="name_p"
              placeholder="Name"
            ></input>
          </div>
          <input type="text" hidden name="otp_g" value={otpgen} />
          <div className="form-row">
            <input
              size="50"
              type="email"
              required
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            ></input>
            {uniqueEmail && <p>This email already registered</p>}
            {otpsend && <p>OTP send</p>}
          </div>
          <div className="form-row">
            <label htmlFor="gender">Gender</label>
            <select required
              value={gender}
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              id="gender"
            >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button
              type="button"
              onClick={() => handleverifymail()}
              className="emailverify"
            >
              Verify Mail
            </button>
          </div>
          {otpview && (
            <div className="form-row">
              <input size="50" type="number" required onChange={(e)=>setUserOtp(e.target.value)}  placeholder="OTP"></input>
              <button type="button" onClick={()=>verifyOTP()}
                style={{
                  backgroundColor: "#ffc801",
                  border: "none",
                  color: "white",
                  textAlign: "center",
                  padding: "2px 10px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Verify
              </button>
            </div>
          )}

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
            <button
              type="button"
             onClick={()=>handleSubmit()}
              disabled={!emailverified ? true : false}
              className="btn-submit"
            >
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
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterSeller;
