import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Box } from '@mui/material';
import axios from 'axios';

const RegisterMember = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    mid: '',
    phone: '',
    role: '',
    address:'',
  });

  // Handle input changes 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('data',formData);
        
      const response = await axios.post('http://localhost:3000/home/addevent', formData);
      console.log('Success:', response.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/*First Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </Grid>
         {/* Last Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </Grid>
          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          {/*membership Id */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Membership Id"
              name="mid"
              type="text"
              value={formData.mid}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Role  */}
          <Grid item xs={12}>
            <FormControl fullWidth required sx={{ minWidth: 150 }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="member">Member</MenuItem>
                <MenuItem value="secratary">Secratary</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        <Grid item xs={12} >
            <TextField 
          id="filled-multiline-flexible"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          multiline
          maxRows={4}
        />
        </Grid>
          {/* Submit Button */} 
          <Grid item xs={12}  sx={{ mt: 2 }}>
            <Button variant="contained" fullWidth type="submit">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterMember;
