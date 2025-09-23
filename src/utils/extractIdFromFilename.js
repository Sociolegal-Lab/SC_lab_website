function extractIdFromFilename(filename) {
  if (typeof filename !== "string") return null;
  const m = filename.match(/^project_(\d+)\.(json|md)$/i);
  if (!m) return null;
  let info = {
    id: parseInt(m[1], 10),
    type: m[2].toLowerCase()
  }

  return info
}
export default extractIdFromFilename;