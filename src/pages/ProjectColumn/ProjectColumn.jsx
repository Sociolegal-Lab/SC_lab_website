import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import style from "./ProjectColumn.module.css";
import ReactMarkdown from "react-markdown";
import extractIdFromFilePath from "../../utils/extractIdFromFilePath";
import title_size from "./title_size";
import getMarkdownWordCount from "../../utils/getMarkdownWordCount";

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

    // Regex condition for link
    const github_regex = /^https?:\/\/(www\.)?github\.com\/.+$/i;
    const is_github_link = link && github_regex.test(link);

    // Get name of next and prev projects
    const id_array = [];
    Object.entries(projects_json).map(([path, mod]) => {
      // path = "../../data/projects/project_1.json"
      // mod  = { default: { name: "...", brief_introduction: "..." } }
    const { id:n_of_ids, type } = extractIdFromFilePath(path) || {};
    id_array.push(n_of_ids);
    });

    id_array.sort((a, b) =>{
      const countA = getMarkdownWordCount(a, projects_md);
      const countB = getMarkdownWordCount(b, projects_md);
    return countB - countA;
    })

    const index_of_id_array = id_array.indexOf(parseInt(id, 10));
    
    let prev_name = null;
    if (id_array[index_of_id_array - 1] !== undefined){
      const mod_json_prev = projects_json[`../../data/projects/project_${id_array[index_of_id_array - 1]}.json`];
      const content_json_prev = mod_json_prev?.default ?? mod_json_prev;
      prev_name = content_json_prev.name;
    }

    let next_name = null;
    if (id_array[index_of_id_array + 1] !== undefined){
      const mod_json_next = projects_json[`../../data/projects/project_${id_array[index_of_id_array + 1]}.json`];
      const content_json_next = mod_json_next?.default ?? mod_json_next;
      next_name = content_json_next.name;
    }

    // Get md(raw) file with id 
    const mod_md = projects_md[`../../data/projects/project_${id}.md`];
    const content_md = mod_md?.default ?? mod_md ?? "";

    // Get image file with id 
    const img_key = Object.keys(projects_image).find(k => k.includes(`project_${id}.`));
    const image_src = img_key ? projects_image[img_key] : null;

  // --- NEW: popup state + ref + handler (same behavior as in News) ---
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSrc, setPopupSrc] = useState('');
  const popupRef = useRef(null);

  const openCoverPopup = (src) => {
    setPopupSrc(src);
    setPopupOpen(true);
  };

  useEffect(() => {
    if (!popupOpen) return;

    const handleOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setPopupOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setPopupOpen(false);
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [popupOpen]);
  // --- end new ---

  return (<>
  <div className={`${style.background}`} lang="eng">
    <div className={`${style.marginLR}`}>
      {/* Head */}
      <div className={`${style.head}`}>
        {/* Left side */}
        <div className={style.circle_background} lang="eng">
          <div className= {` ${style.title} ${style[title_size(name)]} rufina-bold`}>{name}</div>
          <div className={`${style.subtitle} inter-bold`}>{duration}</div>
          <div className={`${style.subtitle} inter-bold`}>
            Contributors:
            <br />
            {contributors.map((member, id)=> (
                <span key={id}>
                     {member}{id < contributors.length - 1 ? ', ' : ''}
                </span>
            ))}
          </div>
          { link &&
            (<button
            type="button"
            onClick={() =>
                window.open(link, '_blank', 'noopener,noreferrer')
            }>

            <div className={style.circle_icon_wrapper}>
              {
                is_github_link ?(
                <svg
                className={`${style.icon} icon bi bi-github`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>) :(
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
              </svg>
              )
              }

            </div>
          </button>
          )}
        </div>
        {/* Right side */}
        <div className={`${style.introduction} inter-bold`}>{introduction}</div>
      </div>
      

      {/* image */}
      <div className={style.img_wrapper}>
        {image_src && (
        // make the image clickable/keyboard accessible to open popup
        <div
          className={`${style.img43}`}
          onClick={() => openCoverPopup(image_src ?? '')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") openCoverPopup(image_src ?? ''); }}
        >
          <img src={image_src} alt="Project image" />
        </div>
        )}

      </div>


      

      {/* content_md */}
      {content_md &&( 
        <article className={`${style.markdown} `}>
            <ReactMarkdown>{content_md}</ReactMarkdown>
        </article>
      )}

      {/* Switch page */}
      <div className={` ${style.switch} roboto-condensed-bold`} lang="eng">
          <Link to={`/project-column/project_${id_array[index_of_id_array - 1]}`}
          className={style.switch_left}
          style={{visibility: prev_name ? "visible" : "hidden"}}>
            <span className="inter-bold">&lt;---</span> <br/> {prev_name}
          </Link>
          <Link to={`/project-column/project_${id_array[index_of_id_array + 1]}`}
          className={style.switch_right}
          style={{visibility: next_name ? "visible" : "hidden"}}>
            <span className="inter-bold">---&gt;</span><br/> {next_name} 
          </Link>
      </div>
    </div>
  </div>

  {/* popup overlay + centered image (same pattern as News) */}
  {popupOpen && (
    <>
      <div
        // overlay
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 999,
        }}
        onClick={() => setPopupOpen(false)}
      />
      <div
        ref={popupRef}
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          maxWidth: '90vw',
          maxHeight: '90vh',
          boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
          borderRadius: 12,
          background: '#fff',
          padding: 8,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={popupSrc}
          alt="project cover"
          style={{
            display: 'block',
            maxWidth: 'calc(90vw - 16px)',
            maxHeight: 'calc(90vh - 16px)',
            borderRadius: 8,
          }}
        />
      </div>
    </>
  )}

  <div style={{background: "#CDD3FE", height: "6px", width:"100%"}}> </div>
  </>);
}

export default ProjectColumn;
