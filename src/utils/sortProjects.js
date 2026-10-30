/**
 * 專案的展示順序規則（依序套用）：
 *   1. 結束時間越晚的排越前，ongoing 視為最晚（進行中的專案排最前面）
 *   2. 結束時間相同時，開始時間越晚的排越前
 *   3. 兩者都相同時，編號越大的排越前
 *
 * duration 的寫法在現有資料裡並不統一：半角 `-` 與全角 `–` 都有，
 * 也有只寫單一年份的（例如 2025），以及無法判讀的（例如 ?）。
 * 這裡一律正規化處理，無法判讀的視為沒有時間資訊，排在最後。
 */

/** 從 duration 取出開始年與結束年。結束年為 null 代表進行中（ongoing）。 */
export const parseDuration = (duration) => {
  const text = String(duration ?? '').replace(/[–—]/g, '-').trim();
  if (!text || text === '?') return { start: null, end: null, unknown: true };

  const parts = text.split('-').map((p) => p.trim());
  const ongoing = parts.some((p) => p.toLowerCase() === 'ongoing');
  const years = parts.map((p) => parseInt(p, 10)).filter((n) => Number.isFinite(n));

  if (!years.length) return { start: null, end: null, unknown: true };

  return {
    start: Math.min(...years),
    end: ongoing ? null : Math.max(...years),
    unknown: false,
  };
};

/** 比較兩個專案的展示先後。回傳負數代表 a 排在 b 前面。 */
export const compareProjects = (a, b) => {
  const da = parseDuration(a?.duration);
  const db = parseDuration(b?.duration);

  // 無法判讀時間的排在最後
  if (da.unknown !== db.unknown) return da.unknown ? 1 : -1;
  if (da.unknown && db.unknown) return (b?.id ?? 0) - (a?.id ?? 0);

  // 規則 1：ongoing（end 為 null）最前；否則結束年越大越前
  const aOngoing = da.end === null;
  const bOngoing = db.end === null;
  if (aOngoing !== bOngoing) return aOngoing ? -1 : 1;
  if (!aOngoing && da.end !== db.end) return db.end - da.end;

  // 規則 2：開始年越大越前
  if (da.start !== db.start) return (db.start ?? 0) - (da.start ?? 0);

  // 規則 3：編號越大越前
  return (b?.id ?? 0) - (a?.id ?? 0);
};

/** 篩掉未公開的專案，並依規則排序。published 未設定時視為公開。 */
export const sortProjects = (projects = []) =>
  projects.filter((p) => p?.published !== false).sort(compareProjects);

export default sortProjects;
