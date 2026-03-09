import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack
} from "@mui/material";

function Login() {

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {

    try {

      await login(email, password);
      navigate("/");

    } catch (err) {

      console.error(err);
      alert(err.message);

    }

  };

  const handleRegister = async () => {

    try {

      await register(email, password, name);
      navigate("/");

    } catch (err) {

      console.error(err);
      alert(err.message);

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        pt: { xs: 15},
        justifyContent: "center",
        px: 2
      }}
    >

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          border: "1px solid #686868",
          background: "#212121"
        }}
      >

        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            mb: 4,
            fontSize: {
              xs: "1.8rem",
              sm: "2.2rem"
            }
          }}
        >
          FISPEC Account
        </Typography>


        <Stack spacing={2}>

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "14px",
              mt: 1
            }}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleRegister}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "14px"
            }}
          >
            Register
          </Button>

        </Stack>

      </Paper>

    </Box>

  );

}

export default Login;