import style from "./Projects.module.css";
import { Link } from "react-router-dom";
import extractIdFromFilePath from "../../utils/extractIdFromFilePath";

const project_data = import.meta.glob("../../data/projects/project_[0-9]*.json", {eager: true});
const project_covers = import.meta.glob("../../data/projects/project_[0-9]*.(jpg|jpeg|png|gif)", {eager: true, as: 'url'});


function Projects() {
  return (
    <div className={style.back}>
      <div className={`${style.title} ${style.marginLR} inter-bold`}>
        Featured Projects
      </div>

      <div className={`${style.subtitle} ${style.marginLR} inter-medium`}>
        This portfolio showcases research projects conducted by lab members, exploring AI applications in legal technology, public health communication, and multimodal systems. From few-shot learning for legal NER to cultural bias auditing in LLMs, our work bridges machine learning methodologies with real-world social science challenges through collaborative, empirical investigation.
      </div>

      {/* MAYBE TODO: search bar */}

      <ul
        className={`${style.shelf} ${style.marginLR}`}
      >
        {Object.entries(project_data).map(([path, mod]) => {
          // path = "../../data/projects/project_1.json"
          // mod  = { default: { name: "...", brief_introduction: "..." } }

          // Destructuring Assignment(json)
          const { id, type } = extractIdFromFilePath(path) || {};
          // console.log("id: ", id, "type: ", type);
          const {name, brief_introduction} = mod;

          // Destructuring Assignment(covers)
          // 找到 project_id 對應的第一個圖檔
          const image_path = Object.keys(project_covers).find((key) =>
            key.includes(`project_${id}.`)
          );
          const cover = project_covers[image_path];

          return (
            <Link to={`/project-column/project_${id}`} key={path}><li className={style.piece}>
              <div className={style.img43}>
                <img src={cover} alt="cover of project" />
              </div>
              <div className={`${style.headline} inter-bold`}>{name}</div>
              <div className={`${style.content} inter-medium`}>{brief_introduction}</div>
            </li></Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Projects;
