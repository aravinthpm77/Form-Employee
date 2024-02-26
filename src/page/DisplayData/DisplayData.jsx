import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayData.css'
import { NavLink } from 'react-router-dom';
const DisplayData = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('https://font-emp.onrender.com//employee');
      
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  return (
    <div>
        <h2>Employee Data</h2>
        <div className='head'>
            <NavLink to='/'>
                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/back.png" alt="back" />
            </NavLink>
            
        </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Experience</th>
            <th>Department</th>
            <th>Address</th>
            <th>Employee ID</th>
            <th>Salary</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.Name}</td>
              
              <td>{employee.age}</td>
              <td>{employee.Experience}</td>
              <td>{employee.Department}</td>
              <td>{employee.Address}</td>
              <td>{employee.EmployeeID}</td>
              <td>{employee.Salary}</td>
              <td>{employee.Destination}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
