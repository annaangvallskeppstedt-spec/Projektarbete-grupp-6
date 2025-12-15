import Navbar from "../components/navbar"
import Habitform from "../components/Habitform"
import Habitlist from "../components/Habitlist"


const Habits = () => {

    return(
    <div className="container">

        <Navbar/>

            <h1>Habits</h1>
        
        <Habitform/>
        <Habitlist/>

    </div>

    )
}

export default Habits