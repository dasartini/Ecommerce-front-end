import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import LoginStyle from "../styles/LoginStyle";
import { login } from "../../api";

const Login = () => {
  const { authToken, setAuthToken } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((data)=>{
        
        setAuthToken(data)
        console.log("logged in as" , data.user.name)
    }).catch((err)=>{
      console.error(err)})
  };

  return (
    <LoginStyle>
        <div className="loginForm">
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Login</button>
      {authToken && <button onClick={() => setAuthToken(null)}>Logout</button>}

    </form>
    </div>
    </LoginStyle>
  );
};

export default Login;
