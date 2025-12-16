import Navbar from "../components/navbar"
import Habitform from "../components/Habitform"
import Habitlist from "../components/Habitlist"


const Habits = () => {

    return(
    <div className="container">

        <Navbar/>
        
        <Habitform/>
        <Habitlist/>

    </div>

    )
}

export default Habits