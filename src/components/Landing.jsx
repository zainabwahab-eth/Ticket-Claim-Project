import React, { useContext, useState } from "react";
import styles from "./landing.module.css";
import { ethers } from "ethers";
import { useNavigate } from "react-router";
import { WalletContext } from "../App";

function Landing() {
  const {
    walletAddress,
    setWalletAddress,
    isEligible,
    setIsEligible,
    isChecking,
    setIsChecking,
  } = useContext(WalletContext);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const connectWallet = async () => {
    if (!isConnected) {
      if (typeof window === "undefined" || !window.ethereum) {
        setErrorMessage("Please Install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      try {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xA" }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            await window.etheruem.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0xA",
                  chainName: "Optimism Mainnet",
                  nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls: ["https://mainnet.optimism.io"],
                  blockExplorerUrls: ["https://optimistic.etherscan.io"],
                },
              ],
            });
          } else {
            throw switchError;
          }
        }
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setWalletAddress(address);
        setIsConnected(true);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(`Error: ${error.message}`);
      }
    } else {
      setIsConnected(false);
      setWalletAddress(null);
    }
  };

  console.log(isChecking);
  const VerifyNFT = async function () {
    setIsChecking(true);
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        setErrorMessage("Please install MetaMask to verify.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contractAddress = "0xc26066eC5915647868feEc5dC958dB4fb421B958";
      const abi = [
        "function balanceOf(address account, uint256 id) external view returns (uint256)",
      ];
      setErrorMessage(null);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const tokenId = 3;
      const balance = await contract.balanceOf(walletAddress, tokenId);
      const balanceNumber = Number(balance.toString());
      const eligible = balanceNumber >= 2;
      setIsEligible(eligible);

      if (isEligible) {
        navigate("/form");
      } else {
        navigate("/notEligible");
      }
    } catch (err) {
      console.error("Error checking NFT ownership:", err);
      setErrorMessage("Failed to verify NFT ownership");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <main>
      <section className={styles.landingCntn}>
        <h3>Claim Your Web3 Lagos 2025 Conference Ticket!</h3>
        <p>
          Own 2 or more Web3Bridge Newsletter NFTs? You're eligible for a free
          ticket to Web3 Lagos!
        </p>
        <div className={styles.btnCntn}>
          <button className="button" onClick={connectWallet}>
            {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
          {isConnected ? (
            <button className="button" onClick={VerifyNFT}>
              Check for NFT
            </button>
          ) : (
            ""
          )}
        </div>

        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </section>
    </main>
  );
}

export default Landing;
