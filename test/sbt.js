// const { expect } = require("chai");
// const { ethers } = require("hardhat");

import { expect } from "chai";

describe("Web3BridgeSBT", function () {
  let sbt, owner, recipient, other;

  beforeEach(async function () {
    [owner, recipient, other] = await ethers.getSigners();
    const Web3BridgeSBT = await ethers.getContractFactory("Web3BridgeSBT");
    sbt = await Web3BridgeSBT.deploy();
    await sbt.waitForDeployment?.();
  });

  it("Should have correct name and symbol", async function () {
    expect(await sbt.name()).to.equal("Web3BridgeSBT");
    expect(await sbt.symbol()).to.equal("WSBT");
  });

  it("Should allow owner to mint tokens", async function () {
    const tokenURI = "ipfs://example";
    await sbt.safeMint(recipient.address, tokenURI);

    expect(await sbt.ownerOf(0)).to.equal(recipient.address);
    expect(await sbt.tokenURI(0)).to.equal(tokenURI);
  });

  it("Should not allow non-owners to mint", async function () {
    await expect(
      sbt.connect(recipient).safeMint(other.address, "ipfs://example")
    ).to.be.revertedWithCustomError(sbt, "OwnableUnauthorizedAccount");
  });

  it("Should prevent token transfers", async function () {
    await sbt.safeMint(recipient.address, "ipfs://example");

    await expect(
      sbt.connect(recipient).transferFrom(recipient.address, other.address, 0)
    ).to.be.revertedWith("Soulbound tokens are non-transferable");
  });

  it("Should allow owner to burn tokens", async function () {
    await sbt.safeMint(recipient.address, "ipfs://example");
    await sbt.burn(0);

    await expect(sbt.ownerOf(0)).to.be.reverted;
  });
});
