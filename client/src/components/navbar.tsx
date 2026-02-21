import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css"
export const Navbar= ()=>{
    return (
    <div className="navbar">
        <div className="navbar-tittle">
            <h1>Reputation Roots</h1>
        </div>
        <div className="navbar-links">
            <Link to="/">Shop</Link>
            <Link to="/purchased-items">Purchases</Link>
            <Link to="/checkout">
                <FontAwesomeIcon icon={faShoppingCart}/>
            </Link>
            
        </div>

    </div>
    );
};