async function main() {
  // Get the deployer's wallet
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract to deploy
  const Web3BridgeSBT = await ethers.getContractFactory("Web3BridgeSBT");

  // Deploy the contract
  const sbt = await Web3BridgeSBT.deploy();

  await sbt.waitForDeployment()

  console.log("Web3BridgeSBT deployed to:", sbt.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
