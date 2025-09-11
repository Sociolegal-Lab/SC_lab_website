import React from "react";
import "./Homepage.css";
import logo from "../../assets/logo_full_white_font.png";

export default function Landing() {
  return (
    <section className="landing" role="banner" aria-labelledby="brand">
      <div>
          <img src={logo} className="brand-img"/>
      </div>
      <div className="landing__inner">
        {/* 左側：Logo圖片 + 三行小字 */}
      <div className="landing__left">
          <ul className="mini-list">
            <li>Data</li>
            <li>Law</li>
            <li>Society</li>
          </ul>
      </div>

        {/* 右側：學校資訊 */}
        <div className="landing__right">
          <p>
            National Cheng Kung University
            <br />
            Min Wu School of Computing
          </p>
        </div>
      </div>
    </section>
  );
}
