import { createContext, useState, useEffect, useMemo } from "react";

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
    const [sortBy, setSortBy] = useState("priority")

    
    //Flyttar in funktioner och useEffect från habits.jsx

    const handleNewHabit = () => {

    let newHabit = {
        id: Date.now(),
        title: habitInput,
        goal: Number(goal),
        priority,
        progress: 0,
        completed: false
    }
    
    const updatedHabitList = [...habitList, newHabit]
    setHabitList(updatedHabitList)

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
            list.map(habit => {
                if (habit.id !== id) return habit;

                if (habit.completed) return habit;

                const updatedHabit = {...habit, progress: habit.progress + 1}
                
                if (updatedHabit.progress >= updatedHabit.goal) {
                alert(`🎉 ${habit.title} completed!`)
                updatedHabit.completed = true
                }
                return updatedHabit
            })
            .filter(habit => !habit.completed)
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


    //Funktion för sortering och filtrering

    const sortHabits = (habits, sortBy) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 }

        return [...habits].sort((habit1, habit2) => {
            if (sortBy === "priority") {
                return priorityOrder[habit1.priority.toLowerCase()] - priorityOrder[habit2.priority.toLowerCase()]
            } else if (sortBy === "repetitions") {
                return habit2.progress - habit1.progress
            } else {
                return 0;
            }
        })
    }

    const filteredHabits = useMemo(() => {
        return filter === "all" 
        ? habitList : habitList.filter(habit => habit.priority.toLowerCase() === filter);
    }, [habitList, filter])

    const sortedHabits = useMemo(() => {
    return sortHabits(filteredHabits, sortBy)
    }, [filteredHabits, sortBy])

    //useEffect för att spara varje ändring i localStorage

    useEffect(() =>  {
        localStorage.setItem("habitList", JSON.stringify(habitList))
    },[habitList])

    //delete funktion

    const removeHabit = (id) => {
        setHabitList(habitList.filter(h => h.id !== id))
}



    return(
        <HabitContext.Provider value={{ 
            habitInput, 
            setHabitInput, 
            habitList, 
            setHabitList, 
            goal, 
            setGoal, 
            priority, 
            setPriority, 
            handleSubmit, 
            increment, 
            decrement, 
            removeHabit, 
            resetHabit, 
            filter, 
            setFilter, 
            sortedHabits, 
            sortBy, 
            setSortBy,
            }}>
            {children}
        </HabitContext.Provider>
    )
}