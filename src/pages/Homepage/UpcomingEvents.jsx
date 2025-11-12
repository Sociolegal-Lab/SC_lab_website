import React from "react";
import styles from "./Homepage.module.css"; // ✅ 改成模組化導入

export default function UpcomingEvents() {
  return (
    <div className={styles["events-container"]}>
      <div className={styles["title"]}>Upcoming Events</div>
      <div style={{ marginTop: "2rem" }}>
/*      <iframe
        src="https://calendar.google.com/calendar/embed?src=c3e13d39067d947aao54c9eb2dd572914c82f9eebcaffa46ddoa83a5ede44249b%40group.calendar.google.com&ctz=Asia%2FTaipei"
        style={{ border: 0, width: "1000px", height: "600px", borderRadius: "8px" }}
        frameBorder="0"
        scrolling="no"
        title="Event Calendar"
        />
      </div>
    </div>
  );
}

