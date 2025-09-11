import React from "react";
import "./Homepage.css";

const events = [
  { date: "08/25", name: "08456132c", location: "adasdcasc" },
  { date: "08/30", name: "adasdcasc", location: "adasdcasc" },
  { date: "09/02~09/03", name: "adasdcasc", location: "adasdcasc" },
  { date: "10/15", name: "adasdcasc", location: "adasdcasc" }
];

export default function UpcomingEvents() {
  return (
    <div className="events-container">
      <div className="title">Upcoming Events</div>
      <table className="events-table">
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
