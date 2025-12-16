import { useContext } from "react"
import { HabitContext } from "../context/HabitContext"

const Habitform = () => {

    const {
        habitInput,
        setHabitInput,
        goal,
        setGoal,
        priority,
        setPriority,
        handleSubmit
    } = useContext(HabitContext)

    return(

        <div className="addNewHabit">
            
            <form onSubmit={handleSubmit}>
                    <h1>Habits</h1>
                <label>Describe your habit: </label>
                <input 
                type="text" 
                value={habitInput} 
                id="title" 
                placeholder="Title"
                onChange={(e) => setHabitInput(e.target.value)}/>


                <label htmlFor="goal">My daily goal:</label>
                <select 
                value={goal}
                id="goal"
                onChange={(e) => setGoal(e.target.value)}>
                    <option value="">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <label>Priority:</label>
                <select 
                    value={priority}
                    id="priority"
                    onChange={(e) => setPriority(e.target.value)}>
                        <option value="">Choose Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                </select>
                
                <button type="submit">Add habit</button>
            </form>
        </div>
        )
}

export default Habitform