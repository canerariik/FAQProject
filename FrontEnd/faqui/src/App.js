import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import HomePage from "./AdminPanel/HomePage";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("tkn") != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    axios
      .get("https://sso_prod.halic.edu.tr/api/Auth/GetToken", {
        headers: {
          Authorization: localStorage.getItem("tkn"),
        },
      })
      .then(function (res) {})
      .catch(function (error) {
        setIsLogin(false);
      });
  }, []);

  if (isLogin === true) {
    return <HomePage></HomePage>;
  }

  const login = () => {
    axios
      .post("https://sso_prod.halic.edu.tr/api/Ldap/Login", {
        email: email,
        password: password,
        appCode: "101",
      })
      .then(function (response) {
        localStorage.setItem("tkn", "Bearer " + response.data.data.token);
        window.location.reload();
      })
      .catch(function (error) {
        alert("Böyle bir kullanıcı bulunamadı.\nBilgilerinizi kontrol ediniz.");
      });
  };

  return (
    <div className="app">
      <form className="login">
        <input
          className="txt"
          type="text"
          placeholder="Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <br />

      <div>
        <button
          className="loginButton"
          onClick={() => {
            login();
          }}
          type="button"
        >
          Login
        </button>
      </div>
      <br />
    </div>
  );
}

export default App;
