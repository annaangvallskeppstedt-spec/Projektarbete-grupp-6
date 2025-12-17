import React from "react"
import Navbar from "../components/navbar"
import Login from "../components/login"

const Home = () => {

    return(<>

    <Navbar/>

        <h1>Productivity Assistant App</h1>
        <h3>Login</h3>
        <Login />
    </>)
}

export default Home