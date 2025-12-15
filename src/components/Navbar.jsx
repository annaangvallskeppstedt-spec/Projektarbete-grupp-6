import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/Todos">Todos</Link>
        <Link to="/Habits">Habits</Link>
        <Link to="/Events">Events</Link>
        </nav>
    )
}

export default Navbar