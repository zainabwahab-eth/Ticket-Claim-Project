# Web3Bridge Auto-Claim App

This application allows eligible users to verify NFT ownership on the Optimism network, and claim a Soulbound Token (SBT) on the Sepolia network. Verified user data is stored in Firebase for admin access and future reference.

## Setup Instructions

1. Clone the Repository

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install Dependencies

```
npm install
```

3. Set up Environment Variables
   Create a .env file in the root directory with firebase config details. You can find these credentials in your Firebase console.

## Architecture Overview

- Frontend
  React + Vite for UI

Ethers.js v6 for blockchain interaction

Firebase for user data storage

Vercel for hosting

- Smart Contracts
  Written in Solidity

Deployed using Hardhat to:

NFT ownership checked on Optimism

SBT minted on Sepolia

## Data Flow

User connects wallet

App checks NFT ownership on Optimism

If eligible:

Form is shown

On submit, SBT is minted on Sepolia

Details are saved to Firebase

## Assumptions

Users will have MetaMask installed and connected.

Users have the eligible NFT on Optimism before accessing the form.

Firebase access is secure and restricted to admins for reading user data.

Minting is only allowed after successful verification.

Sepolia is used for minting to reduce gas cost.

SBT Contract (Sepolia): 0xB569c5Ebf731F4Da3e0A899B83aA826f48728166

NFT Verification Contract (Optimism): 0xc26066eC5915647868feEc5dC958dB4fb421B958

Check out the [deployed app on Vercel](https://ticket-claim-project.vercel.app/).
