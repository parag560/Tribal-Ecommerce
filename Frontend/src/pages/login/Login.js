import React, {useState} from "react";
import "../login/Login.css";
import logim from "../../assets/4040107.jpg";
import { useDispatch,useSelector } from "react-redux";
import {login} from "../../redux/apiCalls"
import { Link,useNavigate } from "react-router-dom";



function Login() {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const {isFetching}=useSelector((state)=>state.user);
  const {error}=useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      login(dispatch,{email,password})
    
    } catch (error) {
      console.log(error);
    }
    console.log(email,password);
  };
  return (
    <div className="login">
      <div className="loginImage">
        <img className="loginImg" src={logim} alt="" />
      </div>
      <div className="loginForm">
        <div className="title">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              size="50"
              type="text"
              autoFocus
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            ></input>
          </div>
          <div className="form-row">
            <input size="50" required onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
          </div>
          <div className="form-row">
            <button type="submit" disabled={isFetching} className="btn-submit">Login</button>
          {error&& <p style={{color:"red",display:"flex",justifyContent:"center",alignItems:"center"}}>Wrong Credentials</p>}
          </div>
          <div className="form-row">
            <div className="extra">
              <div className="fp">
                <p>Forgot Password ?</p>
              </div>
              <div className="register">
                <p><Link style={{ textDecoration: 'none',color:"black" } } to="/register">Don't have account? Register</Link></p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
