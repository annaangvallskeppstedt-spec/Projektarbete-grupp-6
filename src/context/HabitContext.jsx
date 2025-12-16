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

    
    //Flyttar in funktioner och useEffect från habits.jsx

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
    
    const resetHabit = (index) => {
        setHabitList(list => 
            list.map((habit, i) => 
                i === index
                ? {...habit, progress: 0}
                : habit
            )
        )
    }

        useEffect(() =>  {
        localStorage.setItem("habitList", JSON.stringify(habitList))
    },[habitList])

    const removeHabit = (title) => {
        setHabitList(habitList.filter((h) => h.title !== title))
}

    return(
        <HabitContext.Provider value={{ habitInput, setHabitInput, habitList, setHabitList, goal, setGoal, priority, setPriority, handleSubmit, increment, decrement, removeHabit, resetHabit }}>
            {children}
        </HabitContext.Provider>
    )
}