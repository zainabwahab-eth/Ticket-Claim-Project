import React, { useContext } from "react";
import { useFormik } from "formik";
import { WalletContext } from "../App";
import styles from "./form.module.css";
import * as Yup from "yup";

function Form() {
  const { walletAddress } = useContext(WalletContext);
  console.log(walletAddress);

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
    },
  });

  return (
    <div className={styles.formCntn} onClick={null}>
      <button className={styles.homeBtn} onClick={null}>
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
