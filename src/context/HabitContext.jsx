import { createContext, useState, useEffect } from "react";

//skapar och exporterar context för habits
export const HabitContext = createContext()

//skapar en habit provider
export const HabitProvider = ({ children }) => {

    //flyttar states från habits.jsx
    const [habitInput, setHabitInput] = useState("")
    const [habitList, setHabitList] = useState(JSON.parse(localStorage.getItem("habitList")) || [])
    const [goal, setGoal] = useState("")
    const [priority, setPriority] = useState("")
    const [filter, setFilter] = useState("all")

    
    //Flyttar in funktioner och useEffect från habits.jsx

    const handleNewHabit = () => {

    let newHabit = {
        id: Date.now(),
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

    const increment = (id) => {
        setHabitList(list => 
            list.map(habit =>
                habit.id === id ? {...habit, progress: habit.progress + 1} : habit
            )
        )
    }

    const decrement = (id) => {
        setHabitList(list => 
            list.map(habit => 
                habit.id === id ? {...habit, progress: habit.progress - 1} : habit
            )
        );
    }
    
    const resetHabit = (id) => {
        setHabitList(list => 
            list.map(habit => 
                habit.id === id ? {...habit, progress: 0} : habit
            )
        )
    }

    const filteredHabits = filter === "all" ? habitList : habitList.filter(habit => habit.priority.toLowerCase() === filter);

        useEffect(() =>  {
        localStorage.setItem("habitList", JSON.stringify(habitList))
    },[habitList])

    const removeHabit = (title) => {
        setHabitList(habitList.filter((h) => h.title !== title))
}

    return(
        <HabitContext.Provider value={{ habitInput, setHabitInput, habitList, setHabitList, goal, setGoal, priority, setPriority, handleSubmit, increment, decrement, removeHabit, resetHabit, filter, setFilter, filteredHabits }}>
            {children}
        </HabitContext.Provider>
    )
}