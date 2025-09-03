import { useParams } from "react-router"
import style from "./ProjectColumn.module.css"

function ProjectColumn(){
    // Get id from path
    const params_from_url = useParams();
    const id = params_from_url.id;

    return (<>

        <div className={style.placeholder}>ProjectColumn Placeholder</div>

        {/* Change content (.json) depending on id */}

        

        {/* Change content (.md) depending on id */}
    
    
    
    
    </>
    )
}

export default ProjectColumn