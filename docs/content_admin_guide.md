# 網站內容管理後台 使用說明

後台網址：<https://sociolegal-lab.github.io/admin/>

這份說明分兩部分：

- **第一部分**給管理者（只需做一次的設定）
- **第二部分**給實驗室成員（日常更新網站用）

---

# 第一部分：管理者的初次設定

## 這個後台是什麼

網站的文字和照片都存放在 GitHub 上的檔案裡。後台提供一個**填表單的畫面**，
成員填完按儲存，系統會自動幫他們改檔案，網站接著自動重新產生。

成員不需要學 git，也不會看到任何程式碼。

使用的是 **Sveltia CMS**（開源、MIT 授權）。後台頁面就放在我們自己的網站上
（`public/admin/`），不依賴任何第三方服務的存活。

## 為什麼需要架一個 Cloudflare Worker

GitHub 登入的流程中，有一步必須在伺服器上進行（交換登入憑證時要用到一個
不能公開的密鑰）。我們的網站是純靜態的，沒有伺服器可以做這件事。

所以需要一個很小的中介程式。**它只做「幫使用者完成 GitHub 登入」這一件事**，
不碰你們的內容。Cloudflare 的免費方案每天 10 萬次請求，我們一天大概用不到 10 次。

> 補充：Sveltia 另有一種不需要 Worker 的方式，讓每個使用者自己產生並保管
> GitHub 存取權杖（access token）。官方建議那個方式只給技術使用者用，
> 對一般成員來說 Worker 這條路體驗好得多，所以我們選這個。

## 設定步驟

### 步驟 1：部署 Worker

1. 註冊 Cloudflare 帳號（免費）。
2. 打開 <https://github.com/sveltia/sveltia-cms-auth>，
   按 README 裡的 **Deploy to Cloudflare Workers** 按鈕。
3. 部署完成後，到 Cloudflare 後台找到 `sveltia-cms-auth` 這個 Worker，
   **把它的網址抄下來**，長得像 `https://sveltia-cms-auth.某個名稱.workers.dev`。

### 步驟 2：在 GitHub 註冊一個 OAuth 應用程式

建議**註冊在組織底下**（而不是個人帳號），這樣不會有「組織限制第三方應用程式」的問題：

<https://github.com/organizations/Sociolegal-Lab/settings/applications/new>

填寫：

| 欄位 | 填什麼 |
| --- | --- |
| Application name | `Sociolegal Lab CMS`（可自訂） |
| Homepage URL | `https://sociolegal-lab.github.io` |
| Authorization callback URL | **`<步驟 1 的 Worker 網址>/callback`** |

註冊完成後按 **Generate a new client secret**，
畫面會顯示 **Client ID** 和 **Client Secret**，兩個都先留著（Secret 只會顯示一次）。

### 步驟 3：把金鑰填進 Worker

回到 Cloudflare 的 `sveltia-cms-auth` Worker → **Settings** → **Variables**，
新增三個環境變數：

| 變數名稱 | 值 |
| --- | --- |
| `GITHUB_CLIENT_ID` | 步驟 2 的 Client ID |
| `GITHUB_CLIENT_SECRET` | 步驟 2 的 Client Secret（**務必按 Encrypt 加密**） |
| `ALLOWED_DOMAINS` | `sociolegal-lab.github.io` |

`ALLOWED_DOMAINS` 不要省略。它的作用是：只有從你們自己的網站開啟的後台才能
透過這個 Worker 登入，別的網站沒辦法拿它來用（既省額度也是安全措施）。

存檔並部署。

### 步驟 4：把 Worker 網址填進後台設定

打開 `public/admin/config.yml`，找到這一行：

```yaml
  base_url: https://CHANGE-ME.workers.dev
```

把它改成步驟 1 的 Worker 網址，然後推上 `main`。

**這一步沒做，後台就無法登入。**

### 步驟 5：邀請成員

GitHub repo → **Settings** → **Collaborators** → 把成員加進來。

**只有 repo 的協作者才能編輯。** 成員自己不需要做任何安裝或申請。

## 儲存之後會發生什麼

```
成員在後台按「儲存」
        ↓
內容被寫進 main 分支
        ↓
GitHub Actions 先檢查格式
        ↓                ↘ 格式有錯 → 中止，網站維持原樣
建置網站並部署（約 2～5 分鐘）
        ↓
官網更新完成
```

網站是「事先產生好的靜態網頁」，不是即時讀資料庫，所以**改完需要等幾分鐘**才會看到。

## 自動檢查會擋下什麼

- 必填欄位漏填
- **成員編號重複**（重複會讓照片、連結對到錯的人）
- JSON 格式被改壞
- 專案檔名不符規則

檢查沒過就不會部署，所以壞掉的內容不會出現在官網上。

## 之後想升級 Sveltia 版本

`public/admin/index.html` 裡的版號是固定的（目前 `0.224.0`），
避免上游更新造成非預期變動。要升級就改那個版號，部署後自己先試一次再通知成員。

---

# 第二部分：成員的操作方式

## 開始之前

你需要一個 GitHub 帳號，並且已經被加入實驗室的 repo。
如果登入後看不到東西，表示還沒被加入，請找管理者。

## 登入

1. 打開 <https://sociolegal-lab.github.io/admin/>
2. 按 GitHub 登入
3. 左邊會看到「成員名單」和「最新消息」

介面語言會跟著你的瀏覽器，中文環境下會顯示中文。

## 新增一位成員

1. 點左邊的「**成員名單**」
2. 按新增的按鈕，加一筆新的成員
3. 填寫欄位：

| 欄位 | 怎麼填 |
| --- | --- |
| 目前狀態 | 選「現任成員」 |
| 中文姓名 | 例如：王小明 |
| 英文姓名 | 例如：Hsiao-Ming Wang（**網頁上顯示的是這個**） |
| 頭銜 | 例如：Master's student |
| 照片 | 按上傳，選你的照片檔 |
| Email | 沒有可以留空 |
| 卡片列點 | 卡片上的短列點，一行一個項目；沒有就留空 |
| 自我介紹 | 較長的一段介紹 |
| 社群連結 | 有的填，沒有的留空 |
| 編號 | **看現有名單裡最大的號碼，然後 +1**。不可以跟別人一樣 |

4. 儲存
5. 等幾分鐘，重新整理官網就會看到

## 修改自己的資料

點「成員名單」→ 在清單中點自己的名字 → 改完儲存。

清單上每一筆會顯示「中文姓名（狀態）」，方便找人。

## 畢業或離開實驗室

**不要刪除自己的資料。** 只要做一件事：

1. 點「成員名單」→ 點自己的名字
2. 把「**目前狀態**」從「現任成員」改成「**已離開（畢業／離職）**」
3. 儲存

你的資料會自動從 `CURRENT MEMBERS` 移到 `FORMER MEMBERS`，
照片和介紹都會跟著過去，不需要重新填寫。

## 真的要移除一個人

在清單中把該筆刪除。

**注意：這會把資料永久刪掉。** 如果只是畢業，請用上面的改狀態，不要刪除。

## 新增一則消息

1. 點左邊的「**最新消息**」→ 新增一筆
2. 填標題、日期、內容，有相關連結就填
3. 編號填目前最大號碼 +1
4. 儲存

**消息的封面圖沒辦法在這裡上傳。** 封面圖是靠檔名對應編號的：
如果你的消息編號是 `9`，圖片就要命名成 `9.jpg` 放進 `src/data/news/` 資料夾。
這一步需要請管理者或熟悉 GitHub 的人幫忙。

## 常見問題

**Q：我改完了，但官網沒變？**
A：網站需要幾分鐘重新產生。等 5 分鐘再重新整理。如果超過 10 分鐘還沒變，
可能是格式檢查沒通過，請找管理者看 GitHub 上有沒有紅色錯誤。

**Q：照片上傳了但沒顯示？**
A：確認檔案是圖片格式（jpg、jpeg、png、gif、webp），而且檔名不要用空白或特殊符號。

**Q：編號要填什麼？**
A：看現有名單最大的號碼 +1。**絕對不要跟別人重複** —— 重複會讓照片對到錯的人。
如果不小心重複了，系統會擋下來並顯示錯誤，網站不會被弄壞。

**Q：我改錯了，可以回復嗎？**
A：可以。所有修改都有完整紀錄，找管理者可以還原到任何一個之前的版本。

**Q：專案（Projects）為什麼不能在後台改？**
A：專案的顯示順序是人工排定的（哪個排最前面、哪些不顯示），而且每個專案由
好幾個檔案組成。放進後台會破壞這些設定，所以專案仍然由熟悉 GitHub 的人維護。

---

## 不想架 Worker 的替代方式

如果不想架 Cloudflare Worker，成員仍然可以直接在 GitHub 網站上編輯：

1. 打開 <https://github.com/Sociolegal-Lab/SC_lab_website>
2. 進入 `src/data/members/members.json`
3. 按鉛筆圖示編輯，照 `src/data/members/template.md` 的格式填
4. 送出 Pull Request，通過自動檢查後合併

這個方式不需要架任何東西，但成員必須直接面對 JSON 格式。
