import style from "./Projects.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import extractIdFromFilePath from "../../utils/extractIdFromFilePath";
import getMarkdownWordCount from "../../utils/getMarkdownWordCount";

const project_data = import.meta.glob("../../data/projects/project_[0-9]*.json", {eager: true});
const project_covers = import.meta.glob("../../data/projects/project_[0-9]*.(jpg|jpeg|png|gif)", {eager: true, as: 'url'});
// Add markdown imports (raw) to count words
const project_markdowns = import.meta.glob("../../data/projects/project_[0-9]*.md", { eager: true, as: 'raw' });

function Projects() {
  const AMOUNT_OF_PROJECTS = 12;
  const [projectLimit, setProjectLimit] = useState(AMOUNT_OF_PROJECTS);

  // Prepare entries and slice according to projectLimit
  const projectEntries = Object.entries(project_data);



  // Sort entries in-place by markdown word count (descending). Missing .md yield -1 and go last.
  projectEntries.sort(([pathA], [pathB]) => {
    const { id: idA } = extractIdFromFilePath(pathA) || {};
    const { id: idB } = extractIdFromFilePath(pathB) || {};
    const countA = getMarkdownWordCount(idA, project_markdowns);
    const countB = getMarkdownWordCount(idB, project_markdowns);
    return countB - countA;
  });

  const displayedEntries = projectEntries.slice(0, projectLimit);

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
        {displayedEntries.map(([path, mod]) => {
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
              <div className={`${style.arrow_icon}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="white" class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"/>
                </svg>
              </div>

            </li></Link>
          );
        })}
      </ul>

      {/* More Projects (same logic as News.jsx lines 193-200) */}
      {projectLimit < projectEntries.length && (
        <div className={style.tag}>
          <div
            className={`${style.switch_page} ${style.marginLR} ${style.switch_wrapper} roboto-condensed-bold`}
            onClick={() => setProjectLimit((prev) => prev + 6)}
          >
            More Projects <span className="inter-bold">---&gt;</span>
          </div>
          <div className={style.space}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>

      )}

    </div>
  );
}

export default Projects;
