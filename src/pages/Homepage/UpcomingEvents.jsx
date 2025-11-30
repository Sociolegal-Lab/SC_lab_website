import React from "react";
import styles from "./Homepage.module.css"; // ✅ 改成模組化導入

export default function UpcomingEvents() {
  return (
    <div className={styles["events-container"]}>
      <div className={`rufina-bold ${styles["title"]}`}>Events</div>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c_3e13d39067d947aa054c9eb2dd572914c82f9eebcaffa46dd0a83a5ede44249b%40group.calendar.google.com&ctz=Asia%2FTaipei"
        style={{ border: 0, width: "80vw", height: "500px", borderRadius: "8px" }}
        title="Event Calendar"
      />
      <br/>
      <br/>
    </div>
  );
}

