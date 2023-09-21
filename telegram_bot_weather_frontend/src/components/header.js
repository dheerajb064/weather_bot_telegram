import { Link } from "react-router-dom";

const Header = () =>{
    return(
        <header id="nav-header">
            <Link to="/">
                <div className="link">Account</div>
            </Link>
            <Link to="/settings" >
                <div className="link">Bot Setting</div>
            </Link>
        </header>
    )
}

export default Header;