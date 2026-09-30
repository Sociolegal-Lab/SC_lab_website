# 專案資料維護說明

## 檔案結構

每個專案由這些檔案組成，編號必須一致：

| 檔案 | 必要 | 說明 |
| --- | --- | --- |
| `project_<編號>.json` | 必要 | 專案資料 |
| `project_<編號>.md` | 選用 | 專案內頁的詳細內容 |
| `project_<編號>.<圖片副檔名>` | 選用 | 封面圖，支援 png / jpg / jpeg / gif / webp |

## 展示順序

**網站上的顯示順序由 `projects_index.json` 決定，不是依編號。**
只有列在這個檔案裡的專案才會出現在網站上，沒列到的不會顯示。

排序規則如下，依序套用：

1. **結束時間越晚的排越前**，`ongoing` 視為最晚（所以進行中的專案排在最前面）
2. 結束時間相同時，**開始時間越晚的排越前**
3. 兩者都相同時，**編號越大的排越前**

目前的順序即依此規則產生：

| 位置 | 專案 | duration |
| --- | --- | --- |
| 1 | project_9 | 2026-ongoing |
| 2 | project_5 | 2025–ongoing |
| 3 | project_6 | 2024–ongoing |
| 4 | project_7 | 2025 |
| 5 | project_1 | 2024-2025 |
| 6 | project_8 | 2022-2025 |
| 7 | project_2 | 2023 |

**這個排序目前是人工維護的**，不會自動重算。改動任何專案的 `duration`
或新增專案之後，請依上面的規則自行調整 `projects_index.json` 的順序。

> 注意：`npm run verify_project_data_filename` 預設**只檢查檔名**，不會動
> `projects_index.json`。只有明確加上 `--write` 才會重新產生，而那會用檔名的
> 字母順序覆蓋掉上面的人工排序，並把刻意排除的專案加回來。除非你確定要這樣，
> 否則不要加 `--write`。

## duration 的寫法

目前資料裡混用了半角 `-` 與全角 `–` 兩種連字號，單一年份也有（例如 `2025`）。
排序時兩種連字號都視為相同，但**新增資料時建議統一用半角 `-`**。

進行中的專案寫成 `<開始年>-ongoing`。

## 未列入展示的專案

`project_4.json`（CrowdEyes）的 `duration` 是 `?`，且不在 `projects_index.json`
裡，因此不會顯示在網站上。若要納入展示，需要先補上實際時間才能決定它的位置。

## 新增一個專案

1. 準備 `project_<新編號>.json`，編號用目前最大號碼 +1。
2. 需要內頁就加 `project_<同編號>.md`，需要封面圖就加 `project_<同編號>.<副檔名>`。
3. 依上面的排序規則，把 `project_<新編號>.json` 插入 `projects_index.json` 的正確位置。
4. 執行 `npm run validate-json` 與 `npm run verify_project_data_filename` 確認格式無誤。
