import React, { useRef, useState } from "react";
import "../assets/Auth.css";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";
import { loginUser, signupUser } from "../APIs/Auth";

function Auth() {
  const nav = useNavigate();
  const login = useRef(null);
  const signup = useRef(null);

  const [loginCred, setLoginCred] = useState({
    email: "",
    password: "",
  });
  const [signupCred, setSignupCred] = useState({
    email: "",
    password: "",
  });

  const toggleActiveClass = () => {
    if (!login.current.classList.value.includes("inactiveLogin")) {
      login.current.classList.add("inactiveLogin");
      login.current.classList.remove("activeLogin");
      signup.current.classList.add("activeSignup");
      signup.current.classList.remove("inactiveSignup");
    } else {
      login.current.classList.remove("inactiveLogin");
      login.current.classList.add("activeLogin");
      signup.current.classList.remove("activeSignup");
      signup.current.classList.add("inactiveSignup");
    }
  };

  const handleSignup = async () => {
    const res = await signupUser(signupCred.email, signupCred.password);
    if (res.status == "success") {
      localStorage.setItem("Token", JSON.stringify(res.Token));
      nav("/");
    }
  };

  const handleLogin = async () => {
    const res = await loginUser(loginCred.email, loginCred.password);
    if (res.status == "success") {
      localStorage.setItem("Token", JSON.stringify(res.Token));
      nav("/");
    } else {
      setLoginCred((prev) => {
        return { ...prev, password: "" };
      });
    }
  };

  return (
    <div className="authContainer">
      <div className="authLeftCont">
        <div className="companyHeading">
          <h1>EXPENSE TRACKER</h1>
        </div>
      </div>
      <div className="authRightCont">
        <div className="activeLogin login" ref={login}>
          <h1 className="heading">Login</h1>
          <div>
            <div className="individualInput">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="text"
                value={loginCred.email}
                onChange={(e) => {
                  setLoginCred((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleLogin();
                  }
                }}
              ></input>
            </div>
            <div className="individualInput">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="text"
                value={loginCred.password}
                onChange={(e) => {
                  setLoginCred((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleLogin();
                  }
                }}
              ></input>
            </div>
            <button onClick={handleLogin} className="authButton">
              Login
            </button>
            <div className="bottomOption">
              Don't have an account
              <span onClick={toggleActiveClass}>Signup</span>
            </div>
          </div>
        </div>
        <div className="inactiveSignup signup" ref={signup}>
          <h1>Signup</h1>
          <div>
            <div className="individualInput">
              <label>Email</label>
              <input
                value={signupCred.email}
                onChange={(e) => {
                  setSignupCred((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleSignup();
                  }
                }}
              ></input>
            </div>
            <div className="individualInput">
              <label>Password</label>
              <input
                value={signupCred.password}
                onChange={(e) => {
                  setSignupCred((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleSignup();
                  }
                }}
              ></input>
            </div>
            <button onClick={handleSignup} className="authButton">
              SignUp
            </button>
            <div className="bottomOption">
              Already have an account
              <span onClick={toggleActiveClass}>Login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
