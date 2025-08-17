import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Firebase } from "../../firebase/config";
import firebase from "firebase/compat/app";
import Logo from "../../olx-logo.png";
import RoundLoading from "../Loading/RoundLoading";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const validateForm = () => {
    if (!email.trim()) {
      setError("Please enter your email.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      setError("Please enter your password.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await Firebase.auth().setPersistence(
        remember
          ? firebase.auth.Auth.Persistence.LOCAL
          : firebase.auth.Auth.Persistence.SESSION
      );
      await Firebase.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Enter your email above to receive a reset link.");
      return;
    }
    try {
      await Firebase.auth().sendPasswordResetEmail(email);
      alert("Password reset email sent.");
    } catch (err) {
      setError(err.message || "Could not send reset email");
    }
  };

  return (
    <>
      {loading && <RoundLoading />}
      <div>
        <div className="loginParentDiv">
          <img width="200px" height="200px" src={Logo} alt="logo"></img>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <br />
            <input
              className="input"
              type="email"
              placeholder="xyz@gmail.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password</label>
            <br />
            <div style={{ position: "relative" }}>
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  height: 28,
                  padding: "0 8px",
                  borderRadius: 6,
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <input
                id="rememberMe"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="rememberMe" style={{ margin: 0 }}>Remember me</label>
            </div>
            {error ? (
              <p style={{ color: "#e11d48", marginTop: 8, marginBottom: 0 }}>{error}</p>
            ) : null}
            <br />
            <button type="submit">Login</button>
          </form>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <button type="button" className="btn-outline" onClick={handleResetPassword}>Forgot password?</button>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
