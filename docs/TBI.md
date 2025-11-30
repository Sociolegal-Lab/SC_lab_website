# TODO
- All pages: 圖片矩形邊角圓化
- Projectcolumn 右箭頭沒對齊(只有手機上無法對齊，為什麼？？)
- 轉換舊版網站的 https://sociolegal-lab.github.io/leaderBoard.html(https://github.com/Sociolegal-Lab/SClab-website/blob/a495c0d74bb46933c4d9d3c1fa616f997f8a6312/frontend/pages/leaderBoard.html#L3)（project_1: Intersectional Moral Biases in Large Language Models）為 React 架構（轉換的負擔有點大，暫時擱置）

- 處理 browser 發送瀏覽子頁面之請求，gh-page找不到子資料夾的問題 [解決方法參見](https://gemini.google.com/share/9ac9c41d9796)



## 已解決（pluviophilezack負責之部分）
- 不同種類的間隔距離拉開
- text-align 不要置中，嘗試平均分布或靠左
- footer: 集中一些，subtitle 縮小一點
- news title 太大，盡量簡潔
- feature project title 太大
- news 圖片可以再更小一點
- 幫俊傑調整名字
- projectcolumn.jsx 圖片小一點，跟著字縮放
- 更改所有的 Link to= (包含手機頁面的header隱藏選單)

- project column: dynamic icon depending on hyperlink
- 在手機上，怎麼增加feature project可點擊感覺?
    - 在段落前加上一個+號

# 待討論
- Leader: 老師title 的兩個項目最左側加上｜，並靠左


# 已討論
- Header Contact button 點擊後，若直接開啟使用者的系統預設email App 或是開啟email網頁，可能有些突兀。參考英語文化圈的Lab網頁，點擊Contact連結後，一般都是連結到Contact資訊頁。
    - 維持現狀即可
- gif 檔案 > 50MB
    - 沒關係，但大小要小於100MB。
    - 儘量不要用gif，或是要壓小至25MB
- 注意Github-page Access 的總流量限制
- Contact button 直接呼叫mailto 會不會不直觀？是否要改叫Contact via Email? 雖然醜，但意義明確
    - 不用
- 未來網站內容更新形式：統一地端更新（tutorial）
- ScrollToTop.module.css 的fade in 效果暫時凍結，若要恢復，將opacity改為0