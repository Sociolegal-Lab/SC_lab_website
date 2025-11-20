import React from "react";
import styles from "./Members.module.css"; 
import thelabinactionImg from "../../data/carousel/2.jpg";

export default function Thelabinaction() {
  return (
    <div className={`rufina-bold ${styles["thelabinaction"]}`}>
      <h2>The Lab In Action</h2>
      <br />
      <img
        src={thelabinactionImg}
        alt="The Lab in Action"
        className={styles["members-picture"]}
        />
    </div>
  );
}
