import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLib } from "../context/Library";

export default function Login() {
  const { login, user } = useLib();
  const nav = useNavigate();
  const [mid, setMid] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  if (user)
    return (
      <div className="card">
        <h3>Logged in as {user.name}</h3>
        <button className="btn blue" onClick={() => nav("/")}>Dashboard</button>
      </div>
    );

  const submit = (e) => {
    e.preventDefault();
    if (!mid || !pw) return setErr("Fill in all fields.");
    if (login(mid, pw)) nav("/");
    else setErr("Invalid credentials.");
  };

  return (
    <div className="card login">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Membership ID
          <input value={mid} onChange={(e) => setMid(e.target.value)} />
        </label>
        <label>Password
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
        </label>
        {err && <p className="err">{err}</p>}
        <button className="btn blue" type="submit">Log In</button>
      </form>
      <p className="muted small">
        Demo: ADMIN001 / admin123 · MEM001 / member123
      </p>
    </div>
  );
}