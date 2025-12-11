import { useEffect, useState } from "react"
import Navbar from "../components/navbar"


const Habits = () => {

    const [habitInput, setHabitInput] = useState("")
    const [habitList, setHabitList] = useState(JSON.parse(localStorage.getItem("habitList")) || [])
    const [goal, setGoal] = useState("")
    const [priority, setPriority] = useState("")


    const handleNewHabit = () => {

    let newHabit = {
        title: habitInput,
        goal: Number(goal),
        priority,
        progress: 0
    }
    
    const updatedHabitList = [...habitList, newHabit]
    setHabitList(updatedHabitList)
    localStorage.setItem("habitList", JSON.stringify(updatedHabitList))

    setHabitInput("")
    setGoal("")
    setPriority("")
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        handleNewHabit();
    }

    //Funktioner för att öka-minska / progress
    const increment = (index) => {
        setHabitList(list => 
            list.map((habit, i) => {
                if (i === index) {
                    const addProgress =  habit.progress + 1

                    if (addProgress === habit.goal) {
                        alert(`Congratulations! You have reached your goal "${habit.title}"!`)
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

        useEffect(() =>  {
        localStorage.setItem("habitList", JSON.stringify(habitList))
    },[habitList])

    const removeHabit = (title) => {
        setHabitList(habitList.filter((h) => h.title !== title))
}

    const resetProgress = (title) => {
        set
    }

    return(
    <div className="container">
        <Navbar/>
        <h1>Habits</h1>
        <div className="addNewHabit">
            <form onSubmit={handleSubmit}>

                <label>Describe your habit: </label>
                <input 
                type="text" 
                value={habitInput} 
                id="title" 
                placeholder="Title"
                onChange={(e) => setHabitInput(e.target.value)}/>

                <br />

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

                <label htmlFor="priority">Priority:</label>
                <select 
                    value={priority}
                    id="priority"
                    onChange={(e) => setPriority(e.target.value)}>
                        <option value="priority">Choose Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                </select>
                
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
                            <div className="inc-dec-btn">
                            <button onClick={() => decrement(index)}>-</button>
                            <button onClick={() => increment(index)}>+</button>
                            </div><br />
                            <button className="delete-btn" onClick={() => removeHabit(habit.title)}>remove</button>
                    </div>
                ))}
                </div>

            </div>
        </div>

    </div>
    )
}

export default Habits