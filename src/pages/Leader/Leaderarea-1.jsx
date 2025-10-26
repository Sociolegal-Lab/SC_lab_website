import React from 'react';
import './Leader.css';

export default function Leaderarea() {
  return (
    <div className="profile-wrap">
      <div className="profile-card">
        {/* LEFT: Avatar placeholder */}
        <div className="avatar-col">
          <div className="avatar" aria-label="avatar placeholder" />

          {/* Contact block (mobile moves below) */}
          <div className="contact">
            <div className="contact-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.08 4.2 2 2 0 014.06 2h3a2 2 0 012 1.72c.12.9.33 1.78.63 2.62a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0122 16.92z"
                  fill="currentColor"
                />
              </svg>
              <span>+886 2757575&nbsp; #80980</span>
            </div>
            <div className="contact-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm16 3.2l-7.1 5.32a2 2 0 01-1.8 0L4 7.2V6l8 6 8-6v1.2z"
                  fill="currentColor"
                />
              </svg>
              <a href="mailto:shaomanlee@gs.ncku.edu.tw">shaomanlee@gs.ncku.edu.tw</a>
            </div>
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="info-col">
          <h1 className="name">Shao‑Man Lee</h1>
          <p className="subtitle">
            AI and Law; Legal Text Mining; <br />Cultural Study of Law;<br />
            Constitutional Law
          </p>
          <p className="affil">
            NCKU Miin Wu School of Computing Assistant Professor
          </p>

          <p className="motto">Trained as a lawyer with advanced law degrees from Yale and UC Berkeley, Shao-Man Lee employs her legal expertise to apply natural language processing to scrutinize judicial language and social discourses.
          Trained as a lawyer with advanced law degrees from Yale and UC Berkeley, Shao-Man Lee employs her legal expertise to apply natural language processing to scrutinize judicial language and social discourses.
          Trained as a lawyer with advanced law degrees from Yale and UC Berkeley, Shao-Man Lee employs her legal expertise to apply natural language processing to scrutinize judicial language and social discourses.</p>

        </div>
      </div>
    </div>
  );
}

/*
// Optional: Mount directly if you have a <div id="root"></div>
import { createRoot } from 'react-dom/client';
const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<ShaoManProfileCard />);
*/
