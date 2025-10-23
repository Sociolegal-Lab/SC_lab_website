import React from "react";
import "./members.css";
import membersData from "./Ourmembers.json";

export default function Members() {
  return (
    <section className="members-section">
      <h2>OUR MEMBERS</h2>
      <div className="subtitle">LAB TEAM</div>

      <div className="member-grid">
        {membersData.map((member, index) => (
          <div className="member-card" key={index}>
            <div className="member-avatar"></div>
            <div className="member-name">{member.name}</div>
            <div className="member-title">{member.title}</div>

            <ul className="member-bio">
              {member.bio.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <span className="member-email">{member.email}</span>

            <div className="socials">
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  in
                </a>
              )}
              {member.socials.github && (
                <a href={member.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  GH
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
