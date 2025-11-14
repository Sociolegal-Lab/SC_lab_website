import MembersRoll from "./MembersRoll";
import NewsRoll from "./NewsRoll";
import ProjectsRoll from "./ProjectsRoll";
import UpcomingEvents from "./UpcomingEvents";
import Landing from "./Landing";
import AboutUs from "./AboutUs";


export default function HomePage(){
   return (
    <div className="body">
        <Landing />
        <ProjectsRoll />
        <MembersRoll />
        <NewsRoll />
        <UpcomingEvents/>
        
    </div>
        );
 }