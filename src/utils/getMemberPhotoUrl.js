/**
 * 取得成員照片的實際網址。
 *
 * photo 欄位可能出現三種寫法，都要能正確解析：
 *   1. 純檔名，例如 "3.jpeg"（手動編輯 members.json 時的寫法）
 *   2. 帶路徑，例如 "/members/3.jpeg"（內容管理後台寫入的格式）
 *   3. 完整外部網址，例如 "https://..."
 *
 * 照片實際存放在 src/data/members/，因此 1 與 2 都只取檔名再組路徑，
 * 這樣無論資料是誰寫入的都不會壞。
 */
export default function getMemberPhotoUrl(photo) {
  if (!photo) return "";
  if (/^https?:\/\//i.test(photo)) return photo;

  const filename = photo.split("/").pop();
  if (!filename) return "";

  try {
    return new URL(`../data/members/${filename}`, import.meta.url).href;
  } catch {
    return "";
  }
}
