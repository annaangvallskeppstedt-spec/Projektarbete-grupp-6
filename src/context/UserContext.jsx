import { createContext, useState, useEffect, useContext } from "react";

//skapar och exporterar context för users
export const UserContext = createContext()

//skapar provider
export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userlist, setUserlist] = useState(JSON.parse(localStorage.getItem("users")) || [])

    const login = (username, password) => {
        const user = userlist.find((u) => u.username === username && u.password === password)
  

    if (user) {
            setCurrentUser(user)
            setIsLoggedIn(true)
            return true
            } else {
            return false
            }
    }
    
    const register = (username, password) => {
        const newUser = {
            username,
            password
        }
        const updatedUserlist = [...userlist, newUser]
        setUserlist(updatedUserlist)
        localStorage.setItem("users", JSON.stringify(updatedUserlist))
    }

    return(
        <UserContext.Provider value={{ currentUser, isLoggedIn, userlist, login, register }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}