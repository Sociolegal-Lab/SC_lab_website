import React from "react";
import './Leader.css';

export default function PublicationCollapse() {
  return (
    <div className="collapse-wrap">
      <details className="collapse" open={false}>
        <summary className="collapse-sum">
          <span className="collapse-title">Publication</span>
          <span className="collapse-plus" aria-hidden="true" />
        </summary>

        <div className="collapse-body">
          {/* 這裡放你的內容*/}
          <p className="collapse-text-title" >
            Journal Articles
          </p>
          <p className="collapse-text">
            Individualism, Economic Development, and Democracy as Determinants of COVID-19 Risk Information on 132 Government Websites, Preventive Medicine Reports, Volume 34, 102242 (Co-authored with Jiun-Yi Tsai, Tsung-Jen Shih, Tien-Yi Tsai, Chih-Ming Liang, fourth author, 2023)
          </ p>
          <p className="collapse-text-title" >
            Book Chapters
          </p>
          <p className="collapse-text">
            The Use of Foreign Precedents by the Constitutional Court of Taiwan, in Irene Spigno et al. (Eds.), Ten Years Later: The Use of Foreign Precedents by Constitutional Judges (forthcoming 2023, under contract with Hart Publishing) (Co-authored with Wen-Chen Chang, first author)
          </ p>
        </div>
      </details>
    </div>
  );
}
