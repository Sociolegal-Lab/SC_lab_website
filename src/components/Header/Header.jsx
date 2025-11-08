import { Link, useLocation} from "react-router-dom";
import { useState } from "react";
import style from "./Header.module.css";
import scl_logo_white from "../../assets/logo/3_scl_logo_white_trim.png";
import Contact from "./Contact";

function Header() {
  // Change background color depending on different pages
  const {pathname} = useLocation();
  // Edit regex depending on final url: https://sociolegal-lab.github.io/
  const project_column_regex = /\/project-column\/.*/
  const news_regex = /\/news/
  const projects_regex = /\/projects/
  const leader_regex = /\/leader/
  const members_regex = /\/members/

  let class_name_location = ""
  if (project_column_regex.test(pathname)){
    class_name_location = "project_column"
  }
  else if (news_regex.test(pathname)){
    class_name_location = "news"
  }
  else if(projects_regex.test(pathname)){
    class_name_location = "projects";
  }
  else if(leader_regex.test(pathname)){
    class_name_location = "leader";
  }
  else if(members_regex.test(pathname)){
    class_name_location = "members";
  }
  else{
    class_name_location = "homepage";
  }

  const [menuOpen, setMenuOpen] = useState(false);
  return (<>
  <header className={`${style.header} ${style[class_name_location]}`}>

    {/* Left side */}
    <div className={style.nav_bar}>

      <Link to="/SC_lab_website/" >
        {/* TODO:  Replace depend class_name_location*/}
        <img src={scl_logo_white} alt= "scl_logo_white"/>
      </Link>
      <div className={style.desktop_links}>
        <Link to="/SC_lab_website/projects" >
          <div className="inter-bold">Projects</div>
        </Link>
        <Link to="/SC_lab_website/members" >
          <div className="inter-bold">Members</div>
        </Link>      
        <Link to="/SC_lab_website/news" >
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
      <Contact/>
    </div>

  </header>
  </>);
}

export default Header;
