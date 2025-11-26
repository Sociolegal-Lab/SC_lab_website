import { Link, useLocation} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import style from "./Header.module.css";
import scl_logo_white from "../../assets/logo/3_scl_logo_white_trim.png";
import scl_logo_blue from "../../assets/logo/1_scl_logo_trim.png"
import Contact from "./Contact";

function Header() {
  // Change background color depending on different pages
  const {pathname} = useLocation();
  // Edit regex depending on final url: https://sociolegal-lab.github.io/
  const project_column_regex = /\/project-column\/.*/i
  const news_regex = /\/news/i
  const projects_regex = /\/projects/i
  const leader_regex = /\/leader/i
  const members_regex = /\/members/i


  // Give different logo and className base on class_name_location
  let logo_src;
  let logo_alt;

  let class_name_location = ""
  if (project_column_regex.test(pathname)){
    class_name_location = "project_column"
    logo_src = scl_logo_white;
    logo_alt = "scl_logo_white"
  }
  else if (news_regex.test(pathname)){
    class_name_location = "news"
    logo_src = scl_logo_blue;
    logo_alt = "scl_logo_blue"
  }
  else if(projects_regex.test(pathname)){
    class_name_location = "projects";
    logo_src = scl_logo_white;
    logo_alt = "scl_logo_white"
  }
  else if(leader_regex.test(pathname)){
    class_name_location = "leader";
    logo_src = scl_logo_white;
    logo_alt = "scl_logo_white"
  }
  else if(members_regex.test(pathname)){
    class_name_location = "members";
    logo_src = scl_logo_blue;
    logo_alt = "scl_logo_blue"
  }
  else{
    class_name_location = "homepage";
    logo_src = scl_logo_white;
    logo_alt = "scl_logo_white"
  }

  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when clicking area out of the menu
  const menu_ref = useRef(null);
  const handle_click_outside = (event) => {
    if (menu_ref.current && !menu_ref.current.contains(event.target)){
      setMenuOpen(false);
    }
  }
  useEffect(() => {
    if(menuOpen){
      document.addEventListener('mousedown', handle_click_outside);
    }

    return () =>{
      document.removeEventListener('mousedown', handle_click_outside);
    }
  }, [menuOpen])



  return (<>
  <header className={`${style.header} ${style[class_name_location]}`}>

    {/* Left side */}
    <div className={style.nav_bar}>

      <Link to="/" >
        <img src={logo_src} alt= {logo_alt}/>
      </Link>
      <div className={style.desktop_links}>
        <Link to="/projects" >
          <div className="inter-bold">Projects</div>
        </Link>
        <Link to="/members" >
          <div className="inter-bold">Members</div>
        </Link>      
        <Link to="/news" >
          <div className="inter-bold">News</div>
        </Link>
      </div>
      {/* 為 menu 系列的 dom 貼上標籤，限制 handle_click_outside 觸發範圍 */}
      <div ref={menu_ref}>
        <button className={style.menu_icon} onClick={() => setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </button>
        {menuOpen && (
          <div className={style.mobile_menu}>
            <Link to="/projects" onClick={()=>setMenuOpen(false)}>
              <div className="inter-bold">Projects</div>
            </Link>
            <Link to="/members" onClick={()=>setMenuOpen(false)}>
              <div className="inter-bold">Members</div>
            </Link>
            <Link to="/news" onClick={()=>setMenuOpen(false)}>
              <div className="inter-bold">News</div>
            </Link>
          </div>
        )}
      </div>

    </div>

    {/* Right side */}
    <div className={style.right_side}>
      <Contact class_name_location = {class_name_location}/>
    </div>

  </header>
  </>);
}

export default Header;
