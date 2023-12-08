import React, { useRef, useState } from 'react'
import axios from 'axios'
import './Home.css'
import img1 from '../../assets/bg3.jpg'
const Home = () =>{


    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState(null);
    const[Name,setName]=useState('');
    const[Experience,setExperience]=useState('')
    const[Department,setDepartment]=useState('');
    const[Address,setAddress]=useState('');
    const[EmployeeID,setEmployeeID]=useState('');
    const[Salary,setSalary]=useState('');
    const[Destination,setDestination]=useState('');

    const formRef=useRef(null);

    
    
    const calculateAge = (birthDate) => {
        const currentDate = new Date();
        const birthDateObj = new Date(birthDate);

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

        .catch(err=>console.log(err,"error"));

         formRef.current.reset();
    }
    
    return (
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
                        <input type="text" placeholder="Name"  onChange={(e)=>{setName(e.target.value)}} />
                        
                        <div className='date-age'>
                            <input type="date"  value={birthDate} className='age-input' 
                            onChange={handleBirthDateChange} placeholder='Date of Birth'  />
                            
                            <p>Age: {age==null ||age}</p>
                        </div>
                        <input type="number" placeholder='Experience'  onChange={(e)=>{setExperience(e.target.value)}}/>
                        <input type="text" placeholder="Dept you worked" onChange={(e)=>{setDepartment(e.target.value)}}/>
                        <input type="text" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}}/>
                        <input type="number" placeholder="Empy-ID" onChange={(e)=>{setEmployeeID(e.target.value)}}/>
                        <input type="number" placeholder="Salary Details" onChange={(e)=>{setSalary(e.target.value)}}/>
                        <input type="text" placeholder="Destination" onChange={(e)=>{setDestination(e.target.value)}}/>
                        
                    </div>
                    <button type="submit" >Submit</button>
                                
                </form>
            </div>
            
        </div>
    )
}
export default Home