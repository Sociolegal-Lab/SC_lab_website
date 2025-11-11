import React from "react";
import styles from "./Homepage.module.css"; // ✅ 改成模組化導入
import events from "../../data/homepage/upcomingEvents.json"; // ✅ 可改為從 .json 匯入資料（可選）
import "../../styles/font.css"

export default function UpcomingEvents() {
  return (
    <div className={styles["events-container"]}>
      <div className={styles["title"]}>Upcoming Events</div>
      <table className={styles["events-table"]}>
        <thead>
          <tr>
            <th>日期</th>
            <th>活動名稱</th>
            <th>活動地點</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev, idx) => (
            <tr key={idx}>
              <td>{ev.date}</td>
              <td>{ev.name}</td>
              <td>{ev.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
