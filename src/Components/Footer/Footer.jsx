import { Link, NavLink } from "react-router-dom";
import "./Footer.css"
export default function Footer() {
   return (
      <footer>
         <div className="info">
            <div className="c-1">
                <img src="./public/stock image-logo.png" alt="" />
            </div>
            <div className="c-2">
                <h5>Navigate</h5>
            <ul>
                <li>
                    <NavLink to="/" className={({isActive}) => `${isActive? "active-b" : ""}`}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({isActive}) => `${isActive? "active-b" : ""}`}>about</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({isActive}) => `${isActive? "active-b" : ""}`}>contact</NavLink>
                </li>
            </ul>
            </div>
            <div className="c-3">
            <h5>Connect</h5>
            <ul>
                <li>
                    <Link to="mailto:contact@stockimagesearch.online" target="_blank">Email</Link>
                </li>
                <li>
                    <Link to="https://github.com/shubgoyal23" target="_blank">Github</Link>
                </li>
                <li>
                    <Link to="tel:9988776655" target="_blank">Phone</Link>
                </li>
            </ul>
            </div>
         </div>
         <div className="copywrite">
            <hr />
            <h6>&#169; 2024 Stock Image</h6>
         </div>
      </footer>
   );
}
