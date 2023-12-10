import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./page/Home/Home.jsx";
import DisplayData from './page/DisplayData/DisplayData.jsx'
const AllRoutes= ()=>{
    return(
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/DisplayData' element={<DisplayData/>}/>
        </Routes>
    )
}
export default AllRoutes