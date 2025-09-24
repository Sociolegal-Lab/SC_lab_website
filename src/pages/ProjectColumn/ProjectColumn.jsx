import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./ProjectColumn.module.css";
import ReactMarkdown from "react-markdown";
import openNewTab from "../../utils/openNewTab";

function ProjectColumn() {
  // Get id from path
  const { slug } = useParams(); // slug = project_x
  const [contentJSON, setContentJSON] = useState(null); // project_x.json
  const [contentMD, setContentMD] = useState(""); // project_x.md
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  const [prevName, setPrevName] = useState(null);
  const [nextName, setNextName] = useState(null);

  useEffect(() => {
    if (!slug) return;
    // TOUNDERSTAND: Abort controller
    const controller = new AbortController();
    const signal = controller.signal;

    async function load() {
      setLoading(true);
      try {
        // 1. Get content-version
        const v = await fetch("/data/content-version.txt")
          .then((r) => r.text())
          .catch(() => Date.now());

        // 2A. fetch project_x.json
        const response_json = await fetch(
          `/data/projects/${slug}.json?v=${encodeURIComponent(v)}`,
          { signal }
        );
        if (!response_json.ok) throw new Error(`Failed to fetch ${slug}.json`);
        const data_json = await response_json.json();
        setContentJSON(data_json);

        // 2B fetch project_x.json
        const response_md = await fetch(
          `/data/projects/${slug}.md?v=${encodeURIComponent(v)}`,
          { signal }
        );
        if (response_md.ok) {
          const data_md = await response_md.text();
          setContentMD(data_md);
        } else {
          setContentMD("");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("fetch error:", err);
          setContentJSON(null);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    // Cleanup function to abort fetch on unmount or slug change
    // TOUNDERSTAND
    return () => controller.abort();
  }, [slug]);

  // Fetch image
  useEffect(() => {
    if (!slug) return;
    const exts = ['png', 'jpg', 'jpeg'];
    let found = false;
    (async () => {
      for (const ext of exts) {
        try {
          const res = await fetch(`/data/projects/${slug}.${ext}`);
          if (res.ok) {
            setImageSrc(`/data/projects/${slug}.${ext}`);
            found = true;
            break;
          }
        } catch {}
      }
      if (!found) setImageSrc(null);
    })();
  }, [slug]);

  // Fetch previous and next projects data
  useEffect(() => {
    if (!slug) {
      setPrevName(null);
      setNextName(null);
      return;
    }
    // Extract x from slug
    const match = slug.match(/^project_(\d+)$/);
    if (!match) {
      setPrevName(null);
      setNextName(null);
      return;
    }
    const x = parseInt(match[1], 10);
    const prevSlug = `project_${x - 1}`;
    const nextSlug = `project_${x + 1}`;

    // Fetch previous project name
    fetch(`/data/projects/${prevSlug}.json`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setPrevName(data ? data.name : null))
      .catch(() => setPrevName(null));

    // Fetch next project name
    fetch(`/data/projects/${nextSlug}.json`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setNextName(data ? data.name : null))
      .catch(() => setNextName(null));
  }, [slug]);

  if (loading) return <div>Loading. . .</div>;
  if (!contentJSON)
    return (
      <>
        <div>OOPS! Project not found </div>
        <div>
          <Link to="/projects" className={`${style.back}`}>
            Back to Projects
          </Link>
        </div>
      </>
    );

  let { name, duration, contributors, link, brief_introduction, introduction } = contentJSON;

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
      {imageSrc && (
        <img className={style.img43} src={imageSrc} alt="Project image" />
      )}

      {/* contentMD */}
      {contentMD &&( 
        <article className={style.markdown}>
            <ReactMarkdown>{contentMD}</ReactMarkdown>
        </article>
      )}

      {/* Switch page */}
      <div>
        {prevName && (
          <Link to={`/project-column/${`project_${parseInt(slug.match(/^project_(\d+)$/)?.[1] || 0, 10) - 1}`}`} className={style.switch}>
            &lt;--- {prevName}
          </Link>
        )}
        {nextName && (
          <Link to={`/project-column/${`project_${parseInt(slug.match(/^project_(\d+)$/)?.[1] || 0, 10) + 1}`}`} className={style.switch}>
            {nextName} ---&gt;
          </Link>
        )}
      </div>
    </>
  );
}

export default ProjectColumn;
