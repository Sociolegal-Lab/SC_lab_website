function extractIdFromFilePath(path) {
  if (typeof path !== "string") return null;
  // Match any path ending with project_<id>.<ext> (json|png|jpg|jpeg)
  const m = path.match(/(?:^|[\/])project_(\d+)\.(json|png|jpg|jpeg)$/i);
  if (!m) return null;
  let info = {
    id: parseInt(m[1], 10),
    type: m[2].toLowerCase()
  }

  return info;
}
export default extractIdFromFilePath;