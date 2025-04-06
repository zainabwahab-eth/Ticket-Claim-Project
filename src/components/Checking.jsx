import React from "react";
import styles from "./checking.module.css";
import { Player } from "@lottiefiles/react-lottie-player";

function Checking({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className={styles.checkingOverlay}>
      <div className={styles.overlayContent}>
        <Player
          src="https://lottie.host/80b497df-d686-4790-a384-b3e4633e2719/tGJCRPOicg.json"
          className={styles.lottie}
          loop
          autoplay
        />
        <h3>Checking Eligibility...</h3>
      </div>
    </div>
  );
}

export default Checking;
