import { useContext } from "react"
import { HabitContext } from "../context/HabitContext"

const Habitlist = () => {

    const {
        habitList,
        increment,
        decrement,
        removeHabit,
        resetHabit,
        filter, 
        setFilter,
        filteredHabits
    } = useContext(HabitContext)

    return(

        <div className="habitList">
            <h2>My Habits</h2>
            <label>Filter by priority</label>
            <select name="priority" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="high">High priority</option>
                <option value="medium">Medium priority</option>
                <option value="low">Low priority</option>
            </select>

            
            <div className="habit-card-container">
                {filteredHabits.map((habit) => (
                    <div className="habit-card" key={habit.title}>
                        <h4>{habit.title}</h4> 
                        <p>Goal: {habit.goal} times a day </p>
                        <p>Priority: {habit.priority} </p>
                        <p>Progress: {habit.progress} / {habit.goal}</p>  
                            
                            <button className="inc-dec-btn" onClick={() => increment(habit.id)}>➕ Add</button>
                            <button className="inc-dec-btn" onClick={() => decrement(habit.id)}>↩️ Undo</button>
                            <button className="reset-btn" onClick={() => resetHabit(habit.id)}>Reset</button>
                            <br />
                            <button className="delete-btn" onClick={() => removeHabit(habit.title)}>🗑️ Delete</button>
                            
                    </div>
                ))}
                </div>

            </div>
    
    )
}

export default Habitlist