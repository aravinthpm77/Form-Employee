import React, { useRef, useState ,useEffect } from 'react'
import axios from 'axios'
import './Home.css'
import img1 from '../../assets/bg3.jpg'
import '../DisplayData/DisplayData.css';
import { NavLink } from 'react-router-dom';
const Home = () =>{

    useEffect(() => {
    
        fetchEmployeeData();
    }, []);

    
    const[birthDate, setBirthDate] = useState('');
    const[age, setAge] = useState(null);
    const[Name,setName]=useState('');
    const[Experience,setExperience]=useState('');
    const[Department,setDepartment]=useState('');
    const[Address,setAddress]=useState('');
    const[EmployeeID,setEmployeeID]=useState('');
    const[Salary,setSalary]=useState('');
    const[Destination,setDestination]=useState('');

    const [formSubmitted,setformsubmitted]=useState(false);
    
    const formRef=useRef(null);
    
    
    const handleReset = () => {
        
        const shouldReset = window.confirm("Are you sure you want to reset the form?");
        if (shouldReset) {
         
          formRef.current.reset();
         
          setBirthDate('');
          setAge(null);
          setName('');
          setExperience('');
          setDepartment('');
          setAddress('');
          setEmployeeID('');
          setSalary('');
          setDestination('');
        }
        
    }
    
    const calculateAge = (birthDate) => {
        const currentDate = new Date();
        const birthDateObj = new Date(birthDate);
    
        if (isNaN(birthDateObj.getTime())) {
            console.error('Invalid date format. Please use YYYY-MM-DD.');
            return null;
        }
        let calculatedAge = currentDate.getFullYear() - birthDateObj.getFullYear();

        if(
            currentDate<birthDateObj){
                calculatedAge=0;
            } 
        else if (
        currentDate.getMonth() < birthDateObj.getMonth() ||
        (currentDate.getMonth() === birthDateObj.getMonth() &&
            currentDate.getDate() < birthDateObj.getDate())
        ) {
        calculatedAge--;
        }
        return calculatedAge;
    };
    const handleBirthDateChange = (e) => {
        const newBirthDate = e.target.value;
        setBirthDate(newBirthDate);
        
        console.log(newBirthDate);
        try {
        const calculatedAge = calculateAge(newBirthDate);
        
        setAge(calculatedAge);
        
        } 
        catch (error) {
        console.error('Invalid date format. Please use YYYY-MM-DD.');
        setAge(null);
        }
    };
    const handleSubmit =(e)=>{
        e.preventDefault();
        
        console.log(Name,birthDate, age,Experience,Department,Address,EmployeeID,Salary,Destination,11);
        axios.post('http://localhost:5000/Employee',{Name,birthDate, age,Experience,Department,Address,EmployeeID,Salary,Destination})
        .then(
        res=>alert("Successfully Inserted "))
        
        .catch(err=>alert(err,"error"));
        
        setformsubmitted(true);
        
        formRef.current.reset();
    }

    const [employeeData, setEmployeeData] = useState([]);

    

    const fetchEmployeeData = async () => {
        try {
        const response = await axios.get('http://localhost:5000/employee');
        
        setEmployeeData(response.data);
        } catch (error) {
        console.error('Error fetching employee data:', error);
        }
    };
    
    return (
        <div className='Main_class'>
            <div className='form-con'> 
                <div className='form-box'>
                    <div className='text-area'>
                        <img src={img1} alt="Image1"  />
                    </div>  
                    <form  ref={formRef} onSubmit={handleSubmit}>
                        <div className='form-text-con'>
                            <p>Employee Details</p>
                        </div>
                        
                        <div className='inpute'>
                            <input type="text" placeholder="Name"  onChange={(e)=>{setName(e.target.value)}} required/>
                            
                            <div className='date-age'>
                                <input type="date"  value={birthDate} className='age-input' 
                                onChange={handleBirthDateChange} placeholder='Date of Birth' required />
                                
                                <p>Age: {age==null ||age}</p>
                            </div>
                            <input type="number" placeholder='Experience'  onChange={(e)=>{setExperience(e.target.value)}} required/>
                            <input type="text" placeholder="Dept you worked" onChange={(e)=>{setDepartment(e.target.value)}} required/>
                            <input type="text" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}} required/>
                            <input type="number" placeholder="Empy-ID" onChange={(e)=>{setEmployeeID(e.target.value)}} required/>
                            <input type="number" placeholder="Salary Details" onChange={(e)=>{setSalary(e.target.value)}} required/>
                            <input type="text" placeholder="Designation" onChange={(e)=>{setDestination(e.target.value)}} required/>
                            
                        </div>
                        <button type="submit" className='sumbtn' >Submit</button>
                        <button type="reset" className='rstbtn' id='rstbtn' onClick={handleReset}>Reset</button>
                                    
                    </form>
                </div>
            </div>
            {formSubmitted && 
            <div className='table_show'>
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
            </div>}
                
            
        </div>
        
    )
}
export default Home