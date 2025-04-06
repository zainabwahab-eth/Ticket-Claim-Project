import React, { useContext } from "react";
import { WalletContext } from "../App";

function Header() {
  const { walletAddress } = useContext(WalletContext);
  return (
    <div>
      <div className="logo">
        <h3>LOGO</h3>
      </div>

      <div className="address">
        <h3>
          Wallet Address:{" "}
          {walletAddress
            ? `${walletAddress?.slice(0, 3)}...${walletAddress?.slice(-2)}`
            : null}
        </h3>
      </div>
    </div>
  );
}

export default Header;
