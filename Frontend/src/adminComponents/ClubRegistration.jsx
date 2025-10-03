import React, { useState, useCallback, useMemo } from 'react';
import {
  Box, Container, Paper, TextField, Button, Typography, Grid, Card, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, InputAdornment, Alert, useTheme, useMediaQuery,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  Close, Home, CalendarToday, Category, Description, Group
} from '@mui/icons-material';

const ClubRegistration = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for club registration form
  const [clubData, setClubData] = useState({
    clubName: '',
    category: '',
    description: '',
    // email: '',
    // phone: '',
    address: '',
    establishedDate: '',
  });

  const [descriptionLength, setDescriptionLength] = useState(0);
  // Dialog states
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  // Memoize categories to prevent unnecessary re-renders
  const categories = useMemo(() => [
    'Sports',
    'Academic',
    'Cultural',
    'Technology',
    'Arts',
    'Social',
    'Professional',
    'Hobby',
    'Community Service',
    'Other'
  ], []);

  // Optimized handleChange for text fields
  const handleChange = useCallback((prop) => (event) => {
    const value = event.target.value;
    
    // Use functional update to prevent unnecessary re-renders
    setClubData(prevData => ({
      ...prevData,
      [prop]: value
    }));
    
    // Clear error without causing immediate re-render
    if (registrationError) {
      setRegistrationError('');
    }
  }, [registrationError]);

  // Special handler for description to avoid performance issues with character counting
  const handleDescriptionChange = useCallback((event) => {
    const value = event.target.value;
    setDescriptionLength(value.length);
    setClubData(prevData => ({
      ...prevData,
      description: value
    }));
    if (registrationError) {
      setRegistrationError('');
    }
  }, [registrationError]);

  // Optimized form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Validation
    if (!clubData.clubName || !clubData.category || !clubData.description || 
         !clubData.address || !clubData.establishedDate ) {
      setRegistrationError('Please fill in all required fields');
      return;
    }

    // Description length validation
    if (clubData.description.length < 10) {
      setRegistrationError('Description must be at least 10 characters long');
      return;
    }

    // Successful registration
    console.log('Club registration submitted:', clubData);
    setSuccessDialogOpen(true);
  }, [clubData]);

  // Close success dialog and reset form
  const handleSuccessClose = useCallback(() => {
    setSuccessDialogOpen(false);
    // Reset form
    setClubData({
      clubName: '',
      category: '',
      description: '',
    //   email: '',
    //   phone: '',
      address: '',
      establishedDate: '',
    });
    setDescriptionLength(0);
  }, []);

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
          {/* Hero Section */}
          {!isMobile && (
            <Grid size={{ xs: 12, md: 6 }}>
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
                <Box
                  sx={{
                    height: 600,
                    background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    p: 4
                  }}
                >
                  <Group sx={{ fontSize: 80, mb: 3 }} />
                  <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Start Your Club
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                    Join thousands of successful clubs in our community
                  </Typography>
                  <Box sx={{ textAlign: 'left', maxWidth: 400 }}>
                    <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: 8 }}>✓</span> Easy registration process
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: 8 }}>✓</span> Access to club resources
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: 8 }}>✓</span> Member management tools
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: 8 }}>✓</span> Event planning features
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          )}

          {/* Registration Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={24}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                maxWidth: 500,
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
                  Club Registration
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Register club
                </Typography>
              </Box>

              {registrationError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {registrationError}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                {/* Club Name */}
                <TextField
                  fullWidth
                  label="Club Name"
                  value={clubData.clubName}
                  onChange={handleChange('clubName')}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Group color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                  placeholder="Enter your club's name"
                />

                {/* Category - Fixed Select with better accessibility */}
                <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={clubData.category}
                    onChange={handleChange('category')}
                    label="Category"
                    required
                    MenuProps={{
                      // This helps with the aria-hidden issue
                      disablePortal: false,
                      MenuListProps: {
                        'aria-labelledby': 'category-label',
                      },
                    }}
                    inputProps={{
                      'aria-label': 'Category selection',
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Description - Optimized with separate length state */}
                <TextField
                  fullWidth
                  label="Club Description"
                  value={clubData.description}
                  onChange={handleDescriptionChange}
                  margin="normal"
                  required
                  multiline
                  rows={4}
                  placeholder="Describe your club's purpose, activities, and goals (minimum 10 characters)"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                  helperText={`${descriptionLength}/10 characters minimum`}
                />

                {/* Contact Information Section */}
                {/* <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'primary.main' }}>
                  Contact Information
                </Typography> */}

                {/* <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={clubData.email}
                  onChange={handleChange('email')}
                  margin="normal"
                  required
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                /> */}

                {/* <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  value={clubData.phone}
                  onChange={handleChange('phone')}
                  margin="normal"
                  required
                  placeholder="+1 (555) 123-4567"
                  autoComplete="tel"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                  helperText="Enter your primary contact number"
                /> */}

                <TextField
                  fullWidth
                  label="Address"
                  value={clubData.address}
                  onChange={handleChange('address')}
                  margin="normal"
                  required
                  multiline
                  rows={2}
                  placeholder="Enter your club's physical address or meeting location"
                  autoComplete="street-address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Home color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Established Date"
                  type="date"
                  value={clubData.establishedDate}
                  onChange={handleChange('establishedDate')}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday color="action" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mb: 2 }}
                  helperText="When was your club established?"
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
                    mb: 2,
                    // Optimize button rendering
                    '&:active': {
                      transform: 'scale(0.98)',
                    }
                  }}
                >
                  Register Club
                </Button>
              </Box>

              <Box textAlign="center" mt={3}>
                <Typography variant="body2" color="text.secondary">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={handleSuccessClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3
          }
        }}
        // Add accessibility improvements
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" component="h2" fontWeight="bold" color="success.main">
              Registration Successful!
            </Typography>
            <IconButton 
              onClick={handleSuccessClose}
              aria-label="Close success dialog"
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box textAlign="center" py={2}>
            <Group sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Welcome to Our Community!
            </Typography>
            <Typography variant="body1" color="text.secondary" id="success-dialog-description">
              Your club <strong>"{clubData.clubName}"</strong> has been successfully registered.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
          <Button
            onClick={handleSuccessClose}
            variant="contained"
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              px: 4
            }}
          >
            Continue to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClubRegistration;