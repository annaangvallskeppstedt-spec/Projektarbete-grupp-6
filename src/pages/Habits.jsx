import { useState } from "react"
import Navbar from "../components/navbar"


const Habits = () => {

    const [habitInput, setHabitInput] = useState("")
    const [habitList, setHabitList] = useState([])

    const [priority, setPriority] = useState("")

    // //useState för räknare
    // const [increment, setIncrement] = useState(0)
    // const [decrement, setDecrement] = useState(0)

    // //funktioner för räknare
    // const Counter = () => {
    //     let count = 0
    // }
 
    // const handleIncrement = () => {
    //     count++;
    // };

    const handleSubmit = () => {
        e.preventDefault();

    const allHabits = [...setHabitInput, ...setPriority]  

    const newHabit = {
        habitInput,
        priority
    }

    allHabits(newHabit);
    }

    return(
    <div className="container">
        <Navbar/>
        <div className="addNew">
        <h2>Habits</h2>
            <form onSubmit={handleSubmit}>

                <label>Title </label>
                <input 
                type="text" 
                value={habitInput} 
                id="title" 
                placeholder="enter new habit"
                onChange={(e) => setHabitInput(e.target.value)}/>

                <br /><br />

                <select 
                value={priority}
                id="priority"
                onChange={(e) => setPriority(e.target.value)}>
                    <option value="priority">Choose Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                
                <br /><br />
                
                <button type="submit">Add habit</button>
            </form>
        </div>



    </div>
    )
}

export default Habits