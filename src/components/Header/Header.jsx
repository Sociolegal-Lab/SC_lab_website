import { Link } from "react-router-dom";
import style from "./Header.module.css";
import short_logo from "../../assets/short_logo.png";
import Contact from "../gadgets/Contact";

function Header() {
  return (<>
  <div className={style.header} >

    {/* Left side */}
    <div className={style.nav_bar}>
      <Link to="/" >
        <img src={short_logo} alt= "short_logo"/>
      </Link>
      <Link to="/Projects" >
        <div className="inter-bold">Projects</div>
      </Link>
      <Link to="/Members" >
        <div className="inter-bold">Members</div>
      </Link>      
      <Link to="/Leader" >
        <div className="inter-bold">Leader</div>
      </Link>
      <Link to="/News" >
        <div className="inter-bold">News</div>
      </Link>

    </div>

    {/* Right side */}
    <div>
      <Contact/>
    </div>

  </div>
  </>);
}

export default Header;
