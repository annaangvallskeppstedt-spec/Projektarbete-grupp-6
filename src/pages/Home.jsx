import React from "react"
import Navbar from "../components/Navbar"
import { HabitContext } from "../context/HabitContext"
import { useContext } from "react"

const Home = () => {

        const {
            sortedHabits,
        } = useContext(HabitContext)

    return(
        
    <div className="container">
      
      <Navbar/>
      <h1>Productivity Assistant App</h1>

        <div className="container-overview">   
            <div className="todo-overview">
                <h3>My Todos</h3>
                
            </div>

                <div className="event-overview">
                    <h3>My Events</h3>
                </div>

                    <div className="habits-overview">
                    <h3>My Habits</h3>

                        {sortedHabits && sortedHabits.length > 0 ? (
                            sortedHabits
                            .sort((a, b) => b.progress - a.progress) //flest repetitioner först
                            .slice(0, 3) //tar de 3 första
                        .map(habit => <p key={habit.id}>{habit.title} - {habit.progress} repetitions</p>)
                    ) : ( 
                        <p>No habits yet</p>
                    )}
                    </div>

            </div>
        </div>
        

    )

}
export default Home