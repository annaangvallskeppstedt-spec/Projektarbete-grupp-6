import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext";
import { useState } from "react"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {
        login,
        register,
    } = useContext(UserContext)


    const handleLogin = (e) => {
        e.preventDefault()
        const loggedIn = login(username, password)

        if(!loggedIn) {
            alert("Wrong username or password.")
        }
        
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userlist, setUserlist] = useState(null)

    const handleLogin = (e) => {
        e.preventDefault()
        const users = JSON.parse(localStorage.getItem("users") || [])
        const user = user.find(u => u.username === username && u.password === password)
        if (user) {
            setCurrentUserlist(user)
            setIsLoggedIn(true)
        } else {
            alert("Wrong username or password.")
        }

        setUsername("")
        setPassword("")
    }

        const handleRegister = (e) => {
        e.preventDefault()
        register(username, password)
        setUsername("")
        setPassword("")
    }

    return(
    <div>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Log in</button>
            <button onClick={handleRegister}>Register</button>
        </form>
    </div>
    )
}

export default Login