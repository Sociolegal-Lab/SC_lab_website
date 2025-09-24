import { useState, useEffect } from "react";
import style from "./Projects.module.css";
import extractIdFromFilename from "../../utils/extractIdFromFilename"; "../../utils/extractIdFromFilename.js";
import { Link } from "react-router-dom";

const fallback_projectFiles = import.meta.glob("../../data/projects/*");

function Projects() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // 1. 取得 content-version
        const v = await fetch("/data/content-version.txt")
          .then((r) => r.text())
          .catch(() => Date.now()); // fallback 使用當前時間

        // 2. fetch 最新 projects_index.json
        const response1 = await fetch(
          `/data/projects/projects_index.json?v=${encodeURIComponent(v)}`
        );
        if (!response1.ok)
          throw new Error("Failed to fetch projects_index.json");
        const projects_index = await response1.json();

        // 3. 根據 projects_index 動態載入專案檔案
        const filePromises = projects_index.map(async (filename) => {
          const url = `/data/projects/${filename}?v=${encodeURIComponent(v)}`;
          const response2 = await fetch(url);
          if (!response2.ok) throw new Error(`Failed to fetch ${filename}`);
          let content;
          if (filename.endsWith(".json")) {
            content = await response2.json();
          } else {
            content = await response2.text();
          }
          return { filename, content };
        });

        const data = await Promise.all(filePromises);

        // 4. 更新 state
        setProjects(data);
        console.log(data);
      } catch (err) {
        // 5. fetch 失敗時使用 fallback
        console.error("Failed to fetch news:", err);
        setProjects(fallback_projectFiles);
      }
    }

    fetchProjects();
  }, []);

  if (!projects) {
    return <>Loading. . .</>;
  }





  return (
    <>
      <div className={`${style.title} ${style.marginLR} rufina-bold`}>
        Featured Projects
      </div>

      <div className={`${style.subtitle} ${style.marginLR} inter-bold`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis augue sed dolor euismod pulvinar. Morbi placerat nunc ac massa auctor, at tempus ex viverra. 
        Integer ut dolor dictum, tincidunt tortor at, euismod mauris. Donec egestas leo a venenatis pellentesque. Vestibulum hendrerit tortor sapien, et fermentum turpis lacinia eu. 
        Nulla facilisi. Proin elementum porta est, at sollicitudin justo fermentum at. Mauris ligula sapien, vestibulum, enim a sodales hendrerit, est libero sagittis ante, sed venenatis dui nunc eget tellus.
      </div>

      {/* MAYBE TODO: search bar */}

      <ul
        className={`${style.shelf} ${style.marginLR}`}
        style={{ backgroundColor: "gray" }}
      >
        {projects.map((p) => {
          // Destructuring Assignment
          const { id, type } = extractIdFromFilename(p.filename) || {};
          const {name, brief_introduction} = p.content;
          return (
            <Link to={`/project-column/project_${id}`} key={p.filename}><li className={style.piece}>
              <div className={style.img43}>
                <img src={`/data/projects/${id}.png`} alt="cover of project" />
              </div>
              <div className={`${style.headline} inter-bold`}>{name}</div>
              <div className={`${style.content} inter-medium`}>{brief_introduction}</div>
            </li></Link>
          );
        })}
      </ul>
    </>
  );
}

export default Projects;
