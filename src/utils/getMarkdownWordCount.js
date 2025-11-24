// Helper: return word count for project_{id}.md, or -1 if missing (so missing are last)
const getMarkdownWordCount = (id, project_markdowns) => {
    const mdKey = Object.keys(project_markdowns).find((k) => k.includes(`project_${id}.md`));
    if (!mdKey) return -1;
    const content = project_markdowns[mdKey] || "";
    return String(content).split(/\s+/).filter(Boolean).length;
  };
  export default getMarkdownWordCount;