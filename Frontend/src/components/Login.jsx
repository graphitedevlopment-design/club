import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Close,
  Person,
  Email,
  Lock
} from '@mui/icons-material';

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for login form
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    showPassword: false
  });

  // State for register form
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });

  // Dialog states
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Handle login input changes
  const handleLoginChange = (prop) => (event) => {
    setLoginData({ ...loginData, [prop]: event.target.value });
    setLoginError('');
  };

  // Handle register input changes
  const handleRegisterChange = (prop) => (event) => {
    setRegisterData({ ...registerData, [prop]: event.target.value });
    setRegisterError('');
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setLoginData({ ...loginData, showPassword: !loginData.showPassword });
  };

  const handleClickShowRegisterPassword = () => {
    setRegisterData({ ...registerData, showPassword: !registerData.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setRegisterData({ ...registerData, showConfirmPassword: !registerData.showConfirmPassword });
  };

  // Form submissions
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempt:', loginData);
    // Simulate login validation
    if (!loginData.email || !loginData.password) {
      setLoginError('Please fill in all fields');
      return;
    }
    // Successful login logic would go here
    alert('Login successful!');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Register attempt:', registerData);
    
    // Validation
    if (!registerData.firstName || !registerData.lastName || !registerData.email || 
        !registerData.password || !registerData.confirmPassword) {
      setRegisterError('Please fill in all fields');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }

    if (registerData.password.length < 6) {
      setRegisterError('Password must be at least 6 characters long');
      return;
    }

    // Successful registration logic would go here
    alert('Registration successful!');
    setRegisterDialogOpen(false);
    // Reset form
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false
    });
  };

  // Open/close register dialog
  const handleRegisterOpen = () => {
    setRegisterDialogOpen(true);
    setRegisterError('');
  };

  const handleRegisterClose = () => {
    setRegisterDialogOpen(false);
    setRegisterError('');
    // Reset register form
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Poster Section */}
          {!isMobile && (
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="600"
                  image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Club Management System"
                  sx={{
                    objectFit: 'cover',
                    height: '100%'
                  }}
                />
              </Card>
            </Grid>
          )}

          {/* Login Form Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={24}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                maxWidth: 400,
                mx: 'auto',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
                }
              }}
            >
              <Box textAlign="center" mb={3}>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 1
                  }}
                >
                  Club Manager Pro
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Welcome back! Please sign in to your account.
                </Typography>
              </Box>

              {loginError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {loginError}
                </Alert>
              )}

              <Box component="form" onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange('email')}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={loginData.showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={handleLoginChange('password')}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {loginData.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    mb: 2
                  }}
                >
                  Sign In
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={handleRegisterOpen}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: '#667eea',
                    color: '#667eea',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      borderColor: '#764ba2',
                      backgroundColor: 'rgba(118, 75, 162, 0.04)'
                    }
                  }}
                >
                  Create Account
                </Button>
              </Box>

              <Box textAlign="center" mt={3}>
                <Typography variant="body2" color="text.secondary">
                  Secure club management system
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Register Dialog */}
      <Dialog
        open={registerDialogOpen}
        onClose={handleRegisterClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" component="h2" fontWeight="bold">
              Create Account
            </Typography>
            <IconButton onClick={handleRegisterClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {registerError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {registerError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={registerData.firstName}
                  onChange={handleRegisterChange('firstName')}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={registerData.lastName}
                  onChange={handleRegisterChange('lastName')}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={registerData.email}
              onChange={handleRegisterChange('email')}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={registerData.showPassword ? 'text' : 'password'}
              value={registerData.password}
              onChange={handleRegisterChange('password')}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowRegisterPassword}
                      edge="end"
                    >
                      {registerData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type={registerData.showConfirmPassword ? 'text' : 'password'}
              value={registerData.confirmPassword}
              onChange={handleRegisterChange('confirmPassword')}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {registerData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={handleRegisterClose}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRegister}
            variant="contained"
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              px: 4
            }}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;