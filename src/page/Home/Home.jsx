import React from 'react'
import './Home.css'
import img1 from '../../assets/bg3.jpg'
const Home = () =>{
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
                        <input type="text" placeholder="Name" />
                        <input type="date" />
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