import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const [error, setError] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function register(event) {
    event.preventDefault();
    if (password === cpassword) {
      const user = {
        name,
        email,
        contact,
        password,
        cpassword,
      };

      try {
        const result = await axios.post("/api/users/register", user).data;
        alert("User Created Successfully");
        // setName("");
        // setEmail("");
        // setContact("");
        // setPassword("");
        // setCpassword("");
      } catch (error) {
        console.log(error);
        setError(true);
      }
      console.log(user);
    } else {
      alert("Passwords do not match");
    }
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <h1>
              Register
              <br />
              (New Account)
            </h1>
            <form>
              <input
                required
                type="text"
                className="form-control"
                placeholder="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                required
                type="text"
                className="form-control"
                placeholder="email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                required
                type="text"
                className="form-control"
                placeholder="mobile contact (+65)"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
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
              <input
                required
                type={passwordShown ? "text" : "password"}
                className="form-control"
                placeholder="confirm password"
                value={cpassword}
                onChange={(e) => {
                  setCpassword(e.target.value);
                }}
              />

              <button
                type="submit"
                className="btn btn-primary"
                onClick={register}
              >
                Register
              </button>
            </form>
            <button className="btn btn-primary" onClick={togglePassword}>
              {passwordShown ? "Hide Password" : "Show Password "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
