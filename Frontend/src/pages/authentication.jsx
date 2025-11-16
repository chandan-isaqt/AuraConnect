import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
  Fade,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../contexts/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
    },
    secondary: {
      main: "#ec4899",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState(0);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setFormState(0);
        setError("");
      }
    } catch (err) {
      console.error("Auth error:", err);
      const msg =
        err?.response?.data?.message || err?.message || "Something went wrong!";
      setError(msg);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <CssBaseline />

        <Grid
          container
          component={Paper}
          elevation={6}
          square
          sx={{
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            px: { xs: 3, sm: 6 },
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar sx={{ m: "auto", bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ mt: 2, fontWeight: 700 }}
            >
              {formState === 0 ? "Welcome Back " : "Create an Account "}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {formState === 0
                ? "Sign In and Unlock Your AuraConnect Dashboard"
                : "Step Into AuraConnect"}
            </Typography>
          </Box>

          <Fade in timeout={600}>
            <Box component="form" noValidate sx={{ width: "100%" }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  borderRadius: "10px",
                  textTransform: "none",
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Sign In" : "Sign Up"}
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: "black" }}
              >
                {formState === 0
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <Link
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                  onClick={() => setFormState(formState === 0 ? 1 : 0)}
                >
                  {formState === 0 ? "Sign Up" : "Sign In"}
                </Link>
              </Typography>
            </Box>
          </Fade>
        </Grid>

        <Grid
          container
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "auto", height: "auto" }}
          />
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
