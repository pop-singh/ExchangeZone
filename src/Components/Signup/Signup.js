import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Alert,
  CircularProgress,
  Backdrop,
  Grid
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import Logo from "../../olx-logo.png";
import { Firebase } from "../../firebase/config";
import SignUpLoading from "../Loading/SignUpLoading";

export default function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return result.user.updateProfile({ displayName: name }).then(() => {
          return Firebase.firestore().collection("users").doc(result.user.uid).set({
            id: result.user.uid,
            name: name,
            phone: phone,
          });
        });
      })
      .then(() => {
        history.push("/login");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="primary" />
      </Backdrop>
      
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 450,
              borderRadius: 2,
            }}
          >
            {/* Logo */}
            <Box sx={{ mb: 3 }}>
              <img 
                src={Logo} 
                alt="OLX Logo" 
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  objectFit: 'contain' 
                }} 
              />
            </Box>

            {/* User Icon */}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', mb: 2 }}>
              <PersonAddIcon />
            </Avatar>

            {/* Title */}
            <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
              Sign Up
            </Typography>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Signup Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="tel"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 3,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      color: '#002f34', 
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
