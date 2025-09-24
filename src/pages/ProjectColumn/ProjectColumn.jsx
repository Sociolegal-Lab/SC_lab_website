import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from "./ProjectColumn.module.css"
import ReactMarkdown from "react-markdown";

function ProjectColumn(){
    // Get id from path
    const {slug} = useParams(); // slug = project_x
    const [contentJSON, setContentJSON] = useState(null); // project_x.json
    const [contentMD, setContentMD] = useState(""); // project_x.md
    const [loading, setLoading] = useState(true); 

    useEffect(() =>{
        if (!slug) return;
        // TOUNDERSTAND: Abort controller
        const controller = new AbortController();
        const signal = controller.signal;

        async function load(){
            setLoading(true);
            try{
                // 1. Get content-version
                const v = await fetch("/data/content-version.txt")
                    .then((r) => r.text())
                    .catch(() => Date.now());

                // 2A. fetch project_x.json
                const response_json = await fetch(`/data/projects/${slug}.json?v=${encodeURIComponent(v)}`, {signal});
                if (!response_json.ok) throw new Error(`Failed to fetch ${slug}.json`);
                const data_json = await response_json.json();
                setContentJSON(data_json);
                
                // 2B fetch project_x.json
                const response_md = await fetch(`/data/projects/${slug}.md?v=${encodeURIComponent(v)}`, {signal});
                if (response_md.ok){
                    const data_md = await response_md.text();
                    setContentMD(data_md);
                }
                else{
                    setContentMD("");
                }
            }catch(err){
                if (err.name !== 'AbortError') {
                console.error('fetch error:', err);
                setContentJSON(null);
                }
            }finally{
                setLoading(false);
            }
        }
        load();
        // Cleanup function to abort fetch on unmount or slug change
        // TOUNDERSTAND
        return () => controller.abort();
        
    }, [slug]);

    if (loading) return <div>Loading. . .</div>
      if (!contentJSON) return (<>
        <div>OOPS! Project not found </div>
        <div><Link to="/projects" className={`${style.back}`}>Back to Projects</Link></div>
      </>)

    return (<>

        <div className={style.placeholder}>ProjectColumn Placeholder</div>

        {/* Change content (.json) depending on id */}

        

        {/* Change content (.md) depending on id */}
    
    
    
    
    </>
    )
}

export default ProjectColumn