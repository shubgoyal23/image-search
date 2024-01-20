import {  Link, NavLink } from "react-router-dom"
import "./Header.css"

export default function Header(){
    return(
        <header className="header">
            <div className="logo"><Link to="#"><img src="./public/stock image-logo.png" alt="" /></Link></div>
            <nav>
            <ul>
                <li>
                    <NavLink to="/" className={({isActive}) => `${isActive? "active" : ""}`}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({isActive}) => `${isActive? "active" : ""}`}>about</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({isActive}) => `${isActive? "active" : ""}`}>contact</NavLink>
                </li>
                <li>
                    <NavLink to="/apikey" className={({isActive}) => `${isActive? "active" : ""}`}>ApiKey</NavLink>
                </li>
            </ul>
            </nav>
            <div className="login-btn-div">
                <button>Login</button>
                <button>Register</button>
            </div>
        </header>
    )
}
