import { useContext } from "react"
import { HabitContext } from "../context/HabitContext"

const Habitlist = () => {

    const {
        habitList,
        increment,
        decrement,
        removeHabit
    } = useContext(HabitContext)

    return(

        <div className="habitList">
            <h2>My Habits</h2>
            
            <div className="habit-card-container">
                {habitList.map((habit, index) => (
                    <div className="habit-card" key={index}>
                        <h4>{habit.title}</h4> 
                        <p>Goal: {habit.goal} times a day </p>
                        <p>Priority: {habit.priority} </p>
                        <p>Progress: {habit.progress} / {habit.goal}</p>  
                            
                            <button className="inc-dec-btn" onClick={() => increment(index)}>➕ Add</button>
                            <button className="inc-dec-btn" onClick={() => decrement(index)}>↩️ Undo</button>
                            <br />
                            <button className="delete-btn" onClick={() => removeHabit(habit.title)}>🗑️ Delete</button>
                    </div>
                ))}
                </div>

            </div>
    
    )
}

export default Habitlist