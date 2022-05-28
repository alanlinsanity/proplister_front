import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function login() {
    const user = {
      email,
      password,
    };
    try {
      const result = await axios.post("/api/users/login", user).data;
    } catch (error) {
      console.log(error);
    }
    console.log(user);
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
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
