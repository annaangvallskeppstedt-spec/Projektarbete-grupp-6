import { createContext, useState, useEffect } from "react";

//skapar och exporterar context för users
export const UserContext = createContext()

//skapar provider
export const UserProvider = ({ children }) => {

    //skapa states för login + password samt sparade users och inloggade users
    const [users, setUsers] = useState([])

    //lägga till localstorage
    //funktion för att lägga till ny användare
    //samt ett objekt för ny användare

    return(
        <UserContext.Provider value={ users }>
            {children}
        </UserContext.Provider>
    )
}