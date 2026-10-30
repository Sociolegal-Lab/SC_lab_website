import React from "react";
import styles from "./Homepage.module.css"; // ✅ 改成模組化導入
import landingInfo from "../../data/homepage/landinginfo.json";

// 日曆網址改由 landinginfo.json 決定，換日曆不需要改程式
const calendarUrl = landingInfo.events?.calendar_url ?? "";

export default function UpcomingEvents() {
  return (
    <div className={styles["events-container"]}>
      <div className={`rufina-bold ${styles["title"]}`}>Events</div>
      {calendarUrl && (
        <iframe
          src={calendarUrl}
          style={{ border: 0, width: "80vw", height: "500px", borderRadius: "8px" }}
          title="Event Calendar"
        />
      )}
      <br/>
      <br/>
    </div>
  );
}

