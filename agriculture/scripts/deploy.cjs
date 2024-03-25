// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs')

function updateEnvVariable(filePath , newAddress) {
  // Read the .env file
  const configData = fs.readFileSync(filePath);
  const config = JSON.parse(configData);
  config.contractAddress = newAddress;
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
}


async function main() {
  const LandContract = await hre.ethers.getContractFactory("Land");

  // Deploy the contract
  const contract = await LandContract.deploy();

  // Wait for the deployment transaction to be mined
  await contract.waitForDeployment();
  const filePath = '../agriculture/backend/config.json'
  updateEnvVariable(filePath, await contract.getAddress())
  console.log('deployed to: ', await contract.getAddress())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
