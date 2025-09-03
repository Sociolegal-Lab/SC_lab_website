import { Link } from "react-router-dom";
import style from "./Header.module.css";

function Header() {
  return (
    <>
      <Link to="/">
        <div>Homepage</div>
      </Link>
      <Link to="/Leader">
        <div>Leader</div>
      </Link>
      <Link to="/Members">
        <div>Members</div>
      </Link>
      <Link to="/News">
        <div>News</div>
      </Link>
      <Link to="/Projects">
        <div>Projects</div>
      </Link>
    </>
  );
}

export default Header;
