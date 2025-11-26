import Leaderarea1 from "./Leaderarea-1"
import EducationCollapse from "./EducationCollapse"
import FellowshipsAndAwardsCollapse from  "./FellowshipsAndAwardsCollapse"
import PublicationCollapse from "./PublicationCollapse"
import InternationalConferenceCollapse from "./InternationalConferenceCollapse"
import PastSpeakingEngagementsCollapse from "./PastSpeakingEngagementsCollapse.jsx"
import UpcomingSpeakingEngagementsCollapse from "./UpcomingSpeakingEngagementsCollapse.jsx"
import OngoingProjectsCollapse from "./OngoingProjectsCollapse.jsx"
import Blank from "./Blank.jsx"
import CoursesCollapse from "./CourseCollapse.jsx"
import ProjectsCollapse from "./ProjectsCollapse.jsx"


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
        <InternationalConferenceCollapse />
        <PastSpeakingEngagementsCollapse />
        <UpcomingSpeakingEngagementsCollapse />
        <OngoingProjectsCollapse />
        <Blank />
        </div>
    )
}

export default Leader