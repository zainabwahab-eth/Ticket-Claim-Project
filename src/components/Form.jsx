import React, { useContext } from "react";
import { useFormik } from "formik";
import { WalletContext } from "../App";
import { ethers } from "ethers";
import styles from "./form.module.css";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import Web3BridgeSBTABI from "../constants/web3bridgeSBT.json";
import { analytics } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function Form() {
  const navigate = useNavigate();
  const { walletAddress, setWalletAddress } = useContext(WalletContext);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const tokenURI = "https://web3bridge-placeholder.com/metadata.json";
  const contractAddress = "0xB569c5Ebf731F4Da3e0A899B83aA826f48728166";

  const SEPOLIA_CHAIN_ID = "0xaa36a7";
  const switchToSepolia = async () => {
    try {
      // Request to switch to Sepolia
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
      return true;
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: SEPOLIA_CHAIN_ID,
                chainName: "Sepolia",
                nativeCurrency: {
                  name: "Sepolia Ether",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.sepolia.org"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error("Error adding Sepolia network:", addError);
          return false;
        }
      }
      console.error("Error switching to Sepolia network:", switchError);
      return false;
    }
  };

  const storeUserData = async function (userData) {
    try {
      const docRef = await addDoc(collection(analytics, "verifiedUsers"), {
        fullname: userData.fullname,
        email: userData.email,
        gender: userData.gender,
        walletAddress: userData.address,
        timestamp: Timestamp.now(),
        verificationStatus: "verified",
      });

      console.log("User data stored with ID: ", docRef.id);
      return true;
    } catch (err) {
      console.error("Error saving to Firestore:", err);
      return false;
    }
  };

  const mintSBT = async function (walletAddress, userData) {
    try {
      if (window.ethereum) {
        const switchSuccessful = await switchToSepolia();

        if (!switchSuccessful) {
          alert("Please switch to Sepolia network to mint the SBT");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          Web3BridgeSBTABI.abi,
          signer
        );
        const tx = await contract.safeMint(walletAddress, tokenURI);

        console.log("Transaction sent:", tx);

        await tx.wait();

        const stored = await storeUserData(userData);
        if (stored) {
          alert("SBT minted successfully! Your data has been recorded.");
          // navigate("/success");
        } else {
          alert(
            "SBT minted successfully, but there was an issue recording your data."
          );
        }
      } else {
        console.error(
          "MetaMask not found. Please install MetaMask to use this application."
        );
      }
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Minting failed. Please try again.");
    }
  };

  const handleGoHome = function () {
    navigate("/");
    setWalletAddress(null);
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      gender: "Select",
      address: `${walletAddress}`,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Please enter your fullname"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email"),
      gender: Yup.string().required("Please pick a gender"),
    }),

    onSubmit: (values) => {
      console.log(values);
      mintSBT(walletAddress, values);
    },
  });

  return (
    <div className={styles.formCntn}>
      <button className={styles.homeBtn} onClick={handleGoHome}>
        Go home
      </button>

      <p>You're eligible! Fill the form below to claim your ticket.</p>

      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label>
          Wallet Address
          <input
            type="text"
            name="address"
            value={formik.values.address}
            readOnly
          />
        </label>

        <label>
          Fullname
          <input
            type="text"
            name="fullname"
            placeholder="eg John Doe"
            onChange={formik.handleChange}
            value={formik.values.fullname}
          />
          <div className={styles.error}>{formik.errors.fullname}</div>
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="eg Johndoe@gmail.com"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className={styles.error}>{formik.errors.email}</div>
        </label>

        <label>
          Select Gender
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="">-- Select --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <div className={styles.error}>{formik.errors.gender}</div>
          )}
        </label>

        <button className="button" type="submit">
          Submit Form
        </button>
      </form>
    </div>
  );
}

export default Form;
