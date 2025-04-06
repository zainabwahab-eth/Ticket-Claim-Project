require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const API_URL_KEY = process.env.SEPOLIA_RPC_URL;

module.exports = {
  solidity: "0.8.22",
  networks: {
    sepolia: {
      url: API_URL_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
