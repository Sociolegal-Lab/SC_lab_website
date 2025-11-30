import Leaderarea1 from "./Leaderarea-1"
import EducationCollapse from "./EducationCollapse"
import FellowshipsAndAwardsCollapse from  "./FellowshipsAndAwardsCollapse"
import PublicationCollapse from "./PublicationCollapse"
import Blank from "./Blank.jsx"
import CoursesCollapse from "./CourseCollapse.jsx"
import ProjectsCollapse from "./ProjectsCollapse.jsx"
import InvitedTalksCollapse from "./InvitedTalksCollapse.jsx"


function Leader(){
    return (
        <div>
        <Leaderarea1 />
        <Blank />
        <EducationCollapse />
        <FellowshipsAndAwardsCollapse />
        <PublicationCollapse />
        <ProjectsCollapse />
        <CoursesCollapse />
        <InvitedTalksCollapse />
        <Blank />
        </div>
    )
}

export default Leader