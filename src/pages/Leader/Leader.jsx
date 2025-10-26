import Leaderarea1 from "./Leaderarea-1"
import EducationCollapse from "./EducationCollapse"
import FellowshipsAndAwardsCollapse from  "./FellowshipsAndAwardsCollapse"
import PublicationCollapse from "./PublicationCollapse"
import InternationalConferenceCollapse from "./InternationalConferenceCollapse"
import Schedule from "./Schedule"
import PastSpeakingEngagementsCollapse from "./PastSpeakingEngagementsCollapse.jsx"
import UpcomingSpeakingEngagementsCollapse from "./OngoingProjectsCollapse.jsx"
import OngoingProjectsCollapse from "./OngoingProjectsCollapse.jsx"


function Leader(){
    return (
        <div>
        <Leaderarea1 />
        <EducationCollapse />
        <FellowshipsAndAwardsCollapse />
        <PublicationCollapse />
        <InternationalConferenceCollapse />
        <Schedule />
        <PastSpeakingEngagementsCollapse />
        <UpcomingSpeakingEngagementsCollapse />
        <OngoingProjectsCollapse />
        <p className="collapse-wrap">
            <br />
            <br />
            <br />
        </ p>
        </ div>
    )
}

export default Leader