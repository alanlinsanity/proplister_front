import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);


  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function login() {
    const user = {
      email,
      password,
    };
    try {
      setError(false)
      const result = (await axios.post("/api/users/login", user)).data;
      setSuccess(true)
      localStorage.setItem("currentUser", JSON.stringify(result))
      window.location.href='/listings'

    } catch (error) {
      console.log(error);
      setSuccess(false)
      setError(true)
    }
    console.log(user);
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
        {success && <div className=" alert alert-success" role="alert">Login Successful</div>}
        {error && <div className=" alert alert-danger" role="alert">Invalid Credentials</div>}

          <div className="bs">
            <h1>
              Login
              <br />
              (Existing Users)
            </h1>
            <input
              required
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              required
              type={passwordShown ? "text" : "password"}
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={togglePassword}> 
              {passwordShown ? "Hide Password" : "Show Password "}
            </button>

            <button className="btn btn-primary" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
