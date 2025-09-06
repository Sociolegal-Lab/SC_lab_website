import MembersRoll from "./MembersRoll";
import ProjectsRoll from "./ProjectsRoll";

export default function HomePage(){
   return (
    <div className="body">
        <div className="landing">landing</div>
        <div className="aboutus">about us</div>
        <ProjectsRoll />
        <div className="upcomingevents">upcomingevents</div>
        
    </div>
        );
 }