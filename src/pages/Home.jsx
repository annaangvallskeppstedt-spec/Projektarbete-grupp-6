import React from "react"
import Navbar from "../components/navbar"
import Login from "../components/login"
import { useUser } from "../context/UserContext"

const Home = () => {

    const { isLoggedIn } = useUser()

    return(<>

    <Navbar/>

        <h1>Productivity Assistant App</h1>
        
        {!isLoggedIn ? (<>
        <h3>Login</h3>
        <Login />
        </>
        ) : (
        <>    <h1>Översikt ?</h1> </>
        )
    }
    </>)
}

export default Home