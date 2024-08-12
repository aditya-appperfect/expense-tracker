import React, { useRef, useState } from "react";
import "./assets/Auth.css";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";

function Auth() {
  const nav = useNavigate();
  const login = useRef(null);
  const signup = useRef(null);

  const [loginCred, setLoginCred] = useState({
    username: "",
    password: "",
  });
  const [signupCred, setSignupCred] = useState({
    username: "",
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

  const handleSignup = () => {
    const data = {
      username: signupCred.username,
      password: bcrypt.hashSync(
        signupCred.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      ),
    };
    const prevAuth = JSON.parse(localStorage.getItem("auth"));
    if (!prevAuth) {
      localStorage.setItem("auth", JSON.stringify([data]));
      nav("/");
      localStorage.setItem("Token", "LoggedIn");
      return;
    }
    let flag = 0;
    prevAuth?.map((prev) => {
      if (prev.username == data.username) {
        flag = 1;
        return;
      }
    });
    if (flag) {
      alert("Username exists");
      return;
    }
    prevAuth.push(data);
    localStorage.removeItem("auth");
    localStorage.setItem("auth", JSON.stringify(prevAuth));
    nav("/");
    localStorage.setItem("Token", "LoggedIn");
  };

  const handleLogin = () => {
    const data = JSON.parse(localStorage.getItem("auth"));
    let flag = 0;
    data?.map((d) => {
      if (
        d.username == loginCred.username &&
        bcrypt.compareSync(loginCred.password, d.password)
      ) {
        nav("/");
        localStorage.setItem("Token", "LoggedIn");
        flag = 1;
        return;
      }
    });
    if (!flag) {
      alert("Username or password incorrect");
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
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                value={loginCred.username}
                onChange={(e) => {
                  setLoginCred((prev) => {
                    return {
                      ...prev,
                      username: e.target.value,
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
              <label>Username</label>
              <input
                value={signupCred.username}
                onChange={(e) => {
                  setSignupCred((prev) => {
                    return {
                      ...prev,
                      username: e.target.value,
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
