import { useState } from "react"
import Navbar from "../components/navbar"


const Habits = () => {

    const [habitInput, setHabitInput] = useState("")
    const [habitList, setHabitList] = useState([])
    const [goal, setGoal] = useState("")
    const [priority, setPriority] = useState("")

    //Add habit
    const handleSubmit = (e) => {
        e.preventDefault();

    //habit objekt
    const newHabit = {
        title: habitInput,
        goal: Number(goal),
        priority,
        progress: 0
    }
    
    setHabitList([...habitList, newHabit])

    setHabitInput("")
    setGoal("")
    setPriority("")
    }

    //Funktioner för att öka-minska / progress
    const increment = (index) => {
        setHabitList(list => 
            list.map((habit, i) => {
                if (i === index) {
                    const addProgress =  habit.progress + 1

                    if (addProgress === habit.goal) {
                        alert(`Congratualtions! You have reach your goal "${habit.title}"!`)
                    }

                    return {...habit, progress: addProgress}
                }
                return habit 
            })
        )
    }

    const decrement = (index) => {
        setHabitList(list => 
            list.map((habit, i) => {
                if (i === index) {
                    const undoProgress = habit.progress - 1;
                    return {...habit, progress: undoProgress}
                }
                 return habit
            })
        )
    }


    return(
    <div className="container">
        <Navbar/>
        <div className="addNew">
        <h1>Habits</h1>
            <form onSubmit={handleSubmit}>

                <label>Describe habit: </label>
                <input 
                type="text" 
                value={habitInput} 
                id="title" 
                placeholder="..."
                onChange={(e) => setHabitInput(e.target.value)}/>

                <br />

                <select 
                value={goal}
                id="goal"
                onChange={(e) => setGoal(e.target.value)}>
                    <option value="">Goal per day:</option>
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
        
        <div className="habitList">
            <h2>My Habits</h2>
            <ul>
                {habitList.map((habit, index) => (
                    <li key={index}>
                        <strong>{habit.title}</strong> <br />
                        Goal: {habit.goal} times a day <br />
                        Priority: <strong>{habit.priority}</strong><br />
                        Progress: {habit.progress} / {habit.goal}  <br />
                        <button className="incdecButton" onClick={() => decrement(index)}>-</button><button className="incdecButton" onClick={() => increment(index)}>+</button>
                    </li>
                ))}
            </ul>

            </div>
        </div>

    </div>
    )
}

export default Habits