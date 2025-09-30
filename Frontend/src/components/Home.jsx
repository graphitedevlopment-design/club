import React from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import RegisterMember from './RegisterMember';
const Home = () => {
     const [data, setData] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/home/');
            console.log(response.data);
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    
      return (
        <>
          {/* <ul>
          {data.map((item,i) => (
             <li key={i}> Name: {item.Name}, Role: {item.Role}
        </li>
          ))}
        </ul> */}

    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Role</TableCell>

            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((item,i) => (
                <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {item.fname}
                </TableCell>
                <TableCell align="right">{item.role}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
            <br/>
    <RegisterMember/>
        </>
      )
  
}

export default Home