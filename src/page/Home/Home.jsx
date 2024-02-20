import React, { useRef, useState ,useEffect } from 'react'
import axios from 'axios'
import './Home.css'
import img1 from '../../assets/bg3.jpg'
import '../DisplayData/DisplayData.css';
import { NavLink } from 'react-router-dom';


const FirstPage = ({onNext}) =>{

    const[birthDate, setBirthDate] = useState('');
    const[age, setAge] = useState(null);
    const[Name,setName]=useState('');
    const[Experience,setExperience]=useState('');
    const[Department,setDepartment]=useState('');
    
    
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
    


  const handleDepartment = (event) => {
    setDepartment(event.target.value);
    
  };


  
  const handleNext = ()=>{

    console.log(Name,birthDate,age,Experience,Department);
    onNext({Name,birthDate, age,Experience,Department});
  }
    
    return (
        <div className='Main_class'>
            <div className='form-con'> 
                <div className='form-box'>
                    <div className='text-area'>
                        <img src={img1} alt="Image1"  />
                    </div>  
                    <form  >
                        <div className='form-text-con'>
                            <p>Employee Details</p>
                            <p>Page 1</p>
                        </div>
                        
                        <div className='inpute'>
                            <input type="text" placeholder="Name"  onChange={(e)=>{setName(e.target.value)}} required/>
                            
                            <div className='date-age'>
                                <input type="date"  value={birthDate} className='age-input' 
                                onChange={handleBirthDateChange} placeholder='Date of Birth' required />
                                
                                <p>Age: {age==null ||age}</p>
                            </div>
                            <input type="number" placeholder='Experience'  onChange={(e)=>{setExperience(e.target.value)}} required/>
                            
                            <label for="Department" className='Depart'>Choose Department</label>
                            <select className='Departments' id="depart" name="Departments" onChange={handleDepartment}>
                                <option value="CSE">Choose</option>
                                <option value="CSE">CSE</option>
                                <option value="CSE">ECE</option>
                                <option value="CSE">IT</option>
                                <option value="CSE">AIDS</option>
                            </select>
                            

                            <button onClick={handleNext} >Next Page</button>
                        </div>    
           
                    </form>
                </div>
            </div>
            
                
            
        </div>
        
    )
}

const SecondPage = ({data,onSubmit}) =>{
    // console.log(data);
    // console.log(onSubmit);

    
    
    
    
    const[EmployeeID,setEmployeeID]=useState('');
    const[Salary,setSalary]=useState('');
    const[Destination,setDestination]=useState('');
    const[additionalData, setAdditionalData] = useState([]);
    const [formFinal, setFormFinal] =useState({...data});

    
    
   

    
    

   

    

    const handleSubmit = (e) => {
        e.preventDefault();
        // const additionalData={EmployeeID,Salary,Destination};
        setAdditionalData({EmployeeID,Salary,Destination})
        setFormFinal({
            Name: data.Name,
            birthDate: data.birthDate,
            age:data.age,
            Experience:data.Experience,
            Department:data.Department,
            EmployeeID,
            Salary,
            Destination
        })
        console.log(formFinal);
        onSubmit(formFinal)
    };

 
    return (
        <div className='Main_class'>
            <div className='form-con'> 
                <div className='form-box'>
                    <div className='text-area'>
                        <img src={img1} alt="Image1"  />
                    </div>  
                    <form >
                        <div className='form-text-con'>
                            <p>Employee Details</p>
                            <p>Page 2</p>
                        </div>
                        
                        <div className='inpute'>
                            
                            
                        
                            <input type="number" placeholder="Empy-ID" onChange={(e)=>{setEmployeeID(e.target.value)}} required/>  <input type="number" placeholder="Salary Details" onChange={(e)=>{setSalary(e.target.value)}} required/> 
                           <input type="text" placeholder="Designation" onChange={(e)=>{setDestination(e.target.value)}} required/> 
                                                    
                        </div>
                       
                        <button type="submit" className='sumbtn' onClick={handleSubmit}>Submit</button>
                        
           
                    </form>
                </div>
            </div>
            
                
            
        </div>
        
    )
}


const Home = ()=>{

    useEffect(() => {
    
        fetchEmployeeData();
    }, []);

   

    const [currentPage,setCurrentPage]=useState(1);
    const [formData,setFormData]=useState({});

    const handleNextPage = (data) =>{
        setCurrentPage(2);
        setFormData(data);
        // console.log(data)

        console.log('Next Button Get')
    }
    const [formSubmitted,setformsubmitted]=useState(false);
    
    const handleSubmit =(data)=>{
        
        console.log(data,1);
        
       
        axios.post('http://localhost:5000/Employee',{data})
        .then(res => {
            
            alert("Successfully Inserted ");
        })
        .catch(err => {
            console.error('Error submitting data:', err);
            alert("Error: Unable to submit data");
        });
        
        setformsubmitted(true);
        
        
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
   

    return(
        <div>
            {currentPage === 1 && <FirstPage onNext={handleNextPage} />}
            {currentPage === 2 && <SecondPage data={formData} onSubmit={handleSubmit} />}
            {formSubmitted && 
            <div className='table_show'>
                <h2>Employee Data</h2>
               
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