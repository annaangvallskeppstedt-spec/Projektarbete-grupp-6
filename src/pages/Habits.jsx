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
                        alert(`Congratualtions! You have reached your goal "${habit.title}"!`)
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
        <div className="addNewHabit">
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
            <div className="habit-card-container">
                {habitList.map((habit, index) => (
                    <div className="habit-card" key={index}>
                        <h4>{habit.title}</h4>
                        <p>Goal: {habit.goal} times a day </p>
                        <p>Priority: {habit.priority} </p>
                        <p>Progress: {habit.progress} / {habit.goal}</p>  
                        <div className="didHabitButtons">
                        <button onClick={() => decrement(index)}>-</button>
                        <button onClick={() => increment(index)}>+</button>
                        </div>
                    </div>
                ))}
                </div>

            </div>
        </div>

    </div>
    )
}

export default Habits