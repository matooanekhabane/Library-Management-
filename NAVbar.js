import { NavLink, useNavigate } from "react-router-dom";
import { useLib } from "../context/Library";

export default function Navbar() {
  const { user, logout } = useLib();
  const nav = useNavigate();
  const cls = ({ isActive }) => (isActive ? "active" : "");

  return (
    <nav className="nav">
      <span className="brand">📖 Library</span>
      <ul>
        <li><NavLink to="/" end className={cls}>Dashboard</NavLink></li>
        <li><NavLink to="/books" className={cls}>Books</NavLink></li>
        <li><NavLink to="/transactions" className={cls}>Transactions</NavLink></li>
        {user?.role === "admin" && (
          <li><NavLink to="/users" className={cls}>Users</NavLink></li>
        )}
      </ul>
      <div>
        {user ? (
          <>
            <span>{user.name} · {user.role} </span>
            <button className="btn sm red"
              onClick={() => { logout(); nav("/login"); }}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="btn sm">Login</NavLink>
        )}
      </div>
    </nav>
  );
}