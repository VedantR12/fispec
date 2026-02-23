import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, login, register, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
      {!user ? (
        <>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => login(email, password)}>Login</button>
          <button onClick={() => register(email, password)}>Register</button>
        </>
      ) : (
        <>
          <span>{user.email}</span>
          <button
            onClick={async () => {
              await logout();
              setEmail("");
              setPassword("");
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;