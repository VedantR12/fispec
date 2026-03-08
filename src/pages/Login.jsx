import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {

  const { login, register } = useAuth();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");

  const handleLogin = async () => {
    await login(email,password,name);
  };

  const handleRegister = async () => {
    await register(email,password,name);
  };

  return (

    <div style={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>

      <div style={{
        border:"1px solid #ccc",
        padding:"40px",
        width:"320px"
      }}>

        <h2>FiSpec Login</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <button onClick={handleRegister}>Register</button>

      </div>

    </div>
  );
}

export default Login;