import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./ProjectColumn.module.css";
import ReactMarkdown from "react-markdown";
import extractIdFromFilePath from "../../utils/extractIdFromFilePath";

const projects_json = import.meta.glob("../../data/projects/project_[0-9]*.json", {eager: true});
const projects_md = import.meta.glob("../../data/projects/project_[0-9]*.md", {eager: true, as: 'raw'});
const projects_image = import.meta.glob("../../data/projects/project_[0-9]*.(jpg|jpeg|png|gif)", {eager: true, as: 'url'});

function ProjectColumn() {
  // Get id from path
  const { slug } = useParams(); // slug = project_x

    // Extract x from slug
    const match = slug.match(/^project_(\d+)$/);
    const id = match[1];
    
    // Get json file with id
    const mod_json = projects_json[`../../data/projects/project_${id}.json`];
    const content_json = mod_json?.default ?? mod_json;
    const {name, duration, contributors, link, brief_introduction, introduction} = content_json;

    // Get name of next and prev projects
    const id_list = [];
    Object.entries(projects_json).map(([path, mod]) => {
      // path = "../../data/projects/project_1.json"
      // mod  = { default: { name: "...", brief_introduction: "..." } }
    const { id:n_of_ids, type } = extractIdFromFilePath(path) || {};
    id_list.push(n_of_ids);
    });

    let prev_name = null;
    const prev_id = parseInt(id, 10) - 1;
    if (id_list.includes(prev_id)){
      const mod_json_prev = projects_json[`../../data/projects/project_${prev_id}.json`];
      const content_json_prev = mod_json_prev?.default ?? mod_json_prev;
      prev_name = content_json_prev.name;
    }

    let next_name = null;
    const next_id = parseInt(id, 10) + 1;
    if (id_list.includes(next_id)){
      const mod_json_next = projects_json[`../../data/projects/project_${next_id}.json`];
      const content_json_next = mod_json_next?.default ?? mod_json_next;
      next_name = content_json_next.name;
    }

    // Get md(raw) file with id 
    const mod_md = projects_md[`../../data/projects/project_${id}.md`];
    const content_md = mod_md?.default ?? mod_md ?? "";

    // Get image file with id 
    const img_key = Object.keys(projects_image).find(k => k.includes(`project_${id}.`));
    const image_src = img_key ? projects_image[img_key] : null;

  return (
    <>
      {/* Head */}
      <div className={style.head}>
        {/* Left side */}
        <div>
          <div>{name}</div>
          <div>{duration}</div>
          <div>
            Contributors:
            <br />
            {contributors.map((member, id)=> (
                <span key={id}>
                     {member}{id < contributors.length - 1 ? ', ' : ''}
                </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
                window.open(link, '_blank', 'noopener,noreferrer')
            }
          >
            <svg
              className={`${style.icon} icon bi bi-github`}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </button>
        </div>
        {/* Right side */}
        <div>{introduction}</div>
      </div>

      {/* image */}
      {image_src && (
        <img className={style.img43} src={image_src} alt="Project image" />
      )}

      {/* content_md */}
      {content_md &&( 
        <article className={style.markdown}>
            <ReactMarkdown>{content_md}</ReactMarkdown>
        </article>
      )}

      {/* Switch page */}
      <div>
        {prev_name && (
          <Link to={`/SC_lab_website/project-column/${`project_${parseInt(slug.match(/^project_(\d+)$/)?.[1] || 0, 10) - 1}`}`} className={style.switch}>
            &lt;--- {prev_name}
          </Link>
        )}
        {next_name && (
          <Link to={`/SC_lab_website/project-column/${`project_${parseInt(slug.match(/^project_(\d+)$/)?.[1] || 0, 10) + 1}`}`} className={style.switch}>
            {next_name} ---&gt;
          </Link>
        )}
      </div>
    </>
  );
}

export default ProjectColumn;
