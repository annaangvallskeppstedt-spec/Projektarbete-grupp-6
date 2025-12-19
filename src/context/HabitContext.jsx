import { createContext, useState, useEffect, useMemo } from "react";

export const HabitContext = createContext()

export const HabitProvider = ({ children }) => {

    const [habitInput, setHabitInput] = useState("")
    const [habitList, setHabitList] = useState(JSON.parse(localStorage.getItem("habitList")) || [])
    const [goal, setGoal] = useState("")
    const [priority, setPriority] = useState("")
    const [filter, setFilter] = useState("all")
    const [sortBy, setSortBy] = useState("")
    const [sortOrder, setSortOrder] = useState("")


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

    const sortHabits = (habits, sortBy, sortOrder) => {
        if(!sortBy || !sortOrder) return habits;

        const priorityOrder = { high: 3, medium: 2, low: 1 }

        return [...habits].sort((habit1, habit2) => {
            let result = 0;

            if (sortBy === "priority") {
                result =
                priorityOrder[habit1.priority.toLowerCase()] - 
                priorityOrder[habit2.priority.toLowerCase()]
            } else if (sortBy === "repetitions") {
                result = habit1.progress - habit2.progress
            } 

            return sortOrder === "asc" ? result : -result
        })
    }

    const filteredHabits = useMemo(() => {
        return filter === "all" 
        ? habitList : habitList.filter(habit => habit.priority.toLowerCase() === filter.toLowerCase());
    }, [habitList, filter])

    const sortedHabits = useMemo(() => {
    return sortHabits(filteredHabits, sortBy, sortOrder)
    }, [filteredHabits, sortBy, sortOrder])

    useEffect(() =>  {
        localStorage.setItem("habitList", JSON.stringify(habitList))
    },[habitList])

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
            sortOrder,
            setSortOrder,
            }}>
            {children}
        </HabitContext.Provider>
    )
}