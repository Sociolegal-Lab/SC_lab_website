import { Link } from "react-router-dom";
import style from "./Header.module.css";
import short_logo from "../../assets/short_logo.png";
import Contact from "../gadgets/Contact";

function Header() {
  return (<>
  <header className={style.header}>
    {/* TODO 2ed: RWD*/}

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
    {/* TODO 1th: Activating email app when user click the contact button */}
    <div>
      <Contact/>
    </div>

  </header>
  </>);
}

export default Header;
