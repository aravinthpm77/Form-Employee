import React, { useState } from 'react'
import './Home.css'
import img1 from '../../assets/bg3.jpg'
const Home = () =>{
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState(null);

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

       
    
    return (
        <div className='form-con'> 
            <div className='form-box'>
                <div className='text-area'>
                    <img src={img1} alt="Image1"  />
                </div>  
                <form>
                    <div className='form-text-con'>
                        <p>Employee Details</p>
                    </div>
                    <div className='inpute'>
                        <input type="text" placeholder="Name"  />
                        
                        <div className='date-age'>
                            <input type="date"  
                            value={birthDate}
                            className='age-input' onChange={handleBirthDateChange} placeholder='Date of Birth'  />
                            
                            <p>Age: {age==null ||age}</p>
                        </div>
                        
                        <input type="text" placeholder="Dept you worked"/>
                        <input type="text" placeholder="Address"/>
                        <input type="number" placeholder="Empy-ID"/>
                        <input type="number" placeholder="Salary Details"/>
                        <input type="text" placeholder="Destination"/>
                        <button type="button" >Submit</button>
                    </div>
                    
                </form>
            </div>
            
        </div>
    )
}
export default Home