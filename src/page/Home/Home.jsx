import React from 'react'
import './Home.css'
import img1 from '../../assets/bg1.jpg'
const Home = () =>{
    return (
        <div className='form-con'> 
            <div className='text-area'>
                <img src={img1} alt="Image1"  width='200px' height='150px'/>
            </div>  
            <form>
                <input type="text" placeholder="Name" />
                <input type="date" />
                <input type="text" placeholder="Dept you worked"/>
                <input type="text" placeholder="Address"/>
                <input type="number" placeholder="Empy-ID"/>
                <input type="number" placeholder="Salary Details"/>
                <input type="text" placeholder="Destination"/>
                <button type="button" >Submit</button>
            </form>
        </div>
    )
}
export default Home