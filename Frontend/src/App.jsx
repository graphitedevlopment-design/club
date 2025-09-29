
import { useEffect } from 'react'
import './App.css'
import axios from 'axios';
import { useState } from 'react';
function App() {

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
      <ul>
      {data.map((item,i) => (
         <li key={i}> Name: {item.Name}, Role: {item.Role}
    </li>
      ))}
    </ul>
    </>
  )
}

export default App
