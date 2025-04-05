import React, { useContext } from "react";
import styles from "./notEligible.module.css";
import { useNavigate } from "react-router";
import { WalletContext } from "../App";

function NotEligible() {
  const navigate = useNavigate();
  const { setWalletAddress } = useContext(WalletContext);

  const handleGoHome = function () {
    navigate("/");
    setWalletAddress(null);
  };

  return (
    <main>
      <div className={styles.cntn}>
        {/* <img src="" /> */}
        <h3>Not Eligible</h3>
        <p>
          Sorry, you need to own at least 2 Web3Bridge Newsletter NFTs to claim
          a ticket.
        </p>
        <button className="button" onClick={handleGoHome}>
          Go Home
        </button>
      </div>
    </main>
  );
}

export default NotEligible;
