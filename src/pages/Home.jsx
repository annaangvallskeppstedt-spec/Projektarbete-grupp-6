import React from "react"
import Navbar from "../components/Navbar"
import Login from "../components/login"
import { useUser } from "../context/UserContext"
import { HabitContext } from "../context/HabitContext"
import { useContext } from "react"

const Home = () => {

    const { isLoggedIn } = useUser()

        const {
            sortedHabits,
        } = useContext(HabitContext)

    return(<>

    
    <div className="container">
      <Navbar/>
      <h1>Productivity Assistant App</h1>
        
        {!isLoggedIn ? (<>
        <h3>Login</h3>
        <Login />
        </>
        ) : (
        <div className="container-overview">    <h1>Overview</h1> 

        <div className="todo-overview">
        <h3>My Todos</h3>
        
        </div>

        <div className="event-overview">
            <h3>My Events</h3>
        </div>

        <div className="habits-overview">
            <h3>My Habits</h3>
            <ul>
                {sortedHabits && sortedHabits.length > 0 ? (
                sortedHabits.map(habit => (
                    <li key={habit.id}>{habit.title}</li>
                ))
            ) : ( 
                <li>No habits yet</li>
            )}
            </ul>
        </div>

        </div>
        )
    }
    </div>
    </>)

}
export default Home