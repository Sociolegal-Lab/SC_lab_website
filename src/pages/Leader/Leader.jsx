import Leaderarea1 from "./Leaderarea-1"
import EducationCollapse from "./EducationCollapse"
import FellowshipsAndAwardsCollapse from  "./FellowshipsAndAwardsCollapse"
import PublicationCollapse from "./PublicationCollapse"
import InternationalConferenceCollapse from "./InternationalConferenceCollapse"
import PastSpeakingEngagementsCollapse from "./PastSpeakingEngagementsCollapse.jsx"
import UpcomingSpeakingEngagementsCollapse from "./UpcomingSpeakingEngagementsCollapse.jsx"
import OngoingProjectsCollapse from "./OngoingProjectsCollapse.jsx"


function Leader(){
    return (
        <div>
        <Leaderarea1 />
        <EducationCollapse />
        <FellowshipsAndAwardsCollapse />
        <PublicationCollapse />
        <InternationalConferenceCollapse />
        <PastSpeakingEngagementsCollapse />
        <UpcomingSpeakingEngagementsCollapse />
        <OngoingProjectsCollapse />
        </div>
    )
}

export default Leader