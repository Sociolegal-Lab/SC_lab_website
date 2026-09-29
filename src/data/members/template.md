# members.json 資料模板

現任成員與畢業成員共用 `members.json` 一份檔案，
由 `status` 欄位決定顯示在網頁的哪一區：

- `"status": "current"` → 顯示在 **CURRENT MEMBERS**（同時會出現在首頁的成員輪播）
- `"status": "former"` → 顯示在 **FORMER MEMBERS**

成員畢業／離開時，**只要把 `status` 從 `current` 改成 `former`**，
不需要搬動資料，也不要另外建檔案。

## 欄位

```json
    {
        "id": "7",
        "status": "current",
        "Chinese_name": "",
        "English_name": "",
        "title": "",
        "email": "",
        "bio": [
            "",
            "",
            ""
        ],
        "socials": {
            "linkedin": null,
            "github": null,
            "facebook": null,
            "instagram": null
        },
        "short_bio": "",
        "photo": ""
    }
```

| 欄位 | 說明 |
| --- | --- |
| `id` | 成員編號，**全名單不可重複**（請用目前最大號碼 +1）。重複會導致照片、連結對到錯的人，`npm run validate-json` 會擋下來。 |
| `status` | 只能填 `current` 或 `former`。 |
| `Chinese_name` / `English_name` | 中英文姓名。卡片上顯示的是英文姓名。 |
| `title` | 卡片上姓名下方的一行頭銜。 |
| `email` | 沒有就填 `null`。 |
| `bio` | 卡片上的短列點，一行一個項目；不需要就填 `[]`。 |
| `socials` | 沒有的平台填 `null`。要新增平台需同步修改 `Ourmembers.jsx` 與 `Formermembers.jsx`。 |
| `short_bio` | 較長的自我介紹（首頁輪播使用）。 |
| `photo` | `src/data/members/` 底下的檔名，例如 `7.jpeg`。照片請一併放進同一個資料夾。 |

## 新增成員的步驟

1. 把照片放進 `src/data/members/`。
2. 在 `members.json` 陣列**最後**加一筆，`id` 用最大號碼 +1，`status` 填 `current`，`photo` 填剛才的檔名。
3. 執行 `npm run validate-json` 確認格式沒問題。
