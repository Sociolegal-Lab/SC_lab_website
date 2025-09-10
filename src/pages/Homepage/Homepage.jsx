import MembersRoll from "./MembersRoll";
import NewsRoll from "./NewsRoll";
import ProjectsRoll from "./ProjectsRoll";
import UpcomingEvents from "./UpcomingEvents";


export default function HomePage(){
   return (
    <div className="body">
        <div className="landing">landing</div>
        <div className="aboutus">about us</div>
        <ProjectsRoll />
        <MembersRoll />
        <NewsRoll />
        <UpcomingEvents/>
        
    </div>
        );
 }