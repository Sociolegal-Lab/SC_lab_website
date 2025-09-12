import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./Header.module.css";
import scl_logo_white from "../../assets/logo/3_scl_logo_white_trim.png";
import Contact from "../gadgets/Contact";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (<>
  <header className={style.header}>

    {/* Left side */}
    <div className={style.nav_bar}>
      <Link to="/" >
        <img src={scl_logo_white} alt= "scl_logo_white"/>
      </Link>
      <div className={style.desktop_links}>
        <Link to="/Projects" >
          <div className="inter-bold">Projects</div>
        </Link>
        <Link to="/Members" >
          <div className="inter-bold">Members</div>
        </Link>      
        <Link to="/News" >
          <div className="inter-bold">News</div>
        </Link>
      </div>
      <button className={style.menu_icon} onClick={() => setMenuOpen(!menuOpen)}>
        {/* Maybe change this icon to no-radius bar */}
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
      </button>
      {menuOpen && (
        <div className={style.mobile_menu}>
          <Link to="/Projects" onClick={()=>setMenuOpen(false)}>
            <div className="inter-bold">Projects</div>
          </Link>
          <Link to="/Members" onClick={()=>setMenuOpen(false)}>
            <div className="inter-bold">Members</div>
          </Link>
          <Link to="/News" onClick={()=>setMenuOpen(false)}>
            <div className="inter-bold">News</div>
          </Link>
        </div>
      )}
    </div>

    {/* Right side */}
    {/* TODO: Alter Contact component */}
    <div className={style.right_side}>
      <Contact
        email="Amy@example.edu"
        subject="Inquiry About Lab Information and Scheduling a Meeting / Request for a Meeting with Professor / (Other request...)"
        body="Hi there —
Please briefly describe your request below.
If you are asking to schedule an appointment, please provide at least three time slots when you are available (include date, start time, and time zone).
Please sign your full name — anonymous messages will not be answered.
Optional contact info (if different from this email): [phone / alternative email]
Thanks,
[Your full name]"
        cc="shaomanlee@gs.ncku.edu.tw"
      />
    </div>

  </header>
  </>);
}

export default Header;
