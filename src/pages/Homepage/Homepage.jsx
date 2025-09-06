import MembersRoll from "./MembersRoll";

export default function HomePage(){
   return (
    <div className="body">
        <div className="landing">landing</div>
        <div className="aboutus">about us</div>
        <MembersRoll />
        <MembersRoll />
        <MembersRoll />
        <div className="upcomingevents">upcomingevents</div>
    </div>
        );
 }