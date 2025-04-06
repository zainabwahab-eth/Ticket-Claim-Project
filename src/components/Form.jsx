import React, { useContext } from "react";
import { useFormik } from "formik";
import { WalletContext } from "../App";
import { ethers } from "ethers";
import styles from "./form.module.css";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import Web3BridgeSBTABI from "../../artifacts/contracts/sbt.sol/Web3BridgeSBT.json";

// auto-claim-web\artifacts\contracts\sbt.sol\Web3BridgeSBT.json

function Form() {
  const navigate = useNavigate();
  const { walletAddress, setWalletAddress } = useContext(WalletContext);
  // console.log(walletAddress);

  const tokenURI = "https://web3bridge-placeholder.com/metadata.json";
  const contractAddress = "0xB736b853363Ce51a09DbD8714eBA6108e0FE7957";

  const mintSBT = async function (walletAddress) {
    try {
      if (window.ethereum) {
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

        alert("SBT minted successfully!");
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
      mintSBT(walletAddress);
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
