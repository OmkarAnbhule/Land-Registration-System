// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs')

function updateEnvVariable(filePath, key, value) {
  // Read the .env file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Replace the existing key-value pair with the updated value
    const updatedData = data.replace(
      new RegExp(`^${key}=.*`, 'gm'),
      `${key}=${value}`
    );

    // Write the updated content back to the .env file
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Environment variable '${key}' updated successfully.`);
    });
  });
}


async function main() {
  const LandContract = await hre.ethers.getContractFactory("Land");

  // Deploy the contract
  const contract = await LandContract.deploy();

  // Wait for the deployment transaction to be mined
  await contract.waitForDeployment();
  const filePath = 'C:/Users/ASUS/OneDrive/Desktop/Land-Registration-System-1/agriculture/backend/.env'
  updateEnvVariable(filePath, "CONTRACT_ADDRESS", await contract.getAddress())
  console.log('deployed to: ', await contract.getAddress())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
