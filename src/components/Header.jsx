import React, { useContext } from "react";
import { WalletContext } from "../App";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

  const handleClick = function () {
    navigate("/adminLogin");
  };

  const { walletAddress } = useContext(WalletContext);
  return (
    <div>
      <div className="logo">
        <h3>LOGO</h3>
      </div>
      <div className="right">
        <button className="button" onClick={handleClick}>
          Admin Login
        </button>
        <div className="address">
          <h3>
            Wallet Address:{" "}
            {walletAddress
              ? `${walletAddress?.slice(0, 3)}...${walletAddress?.slice(-2)}`
              : null}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
