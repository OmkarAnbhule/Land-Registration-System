const hre = require("hardhat");

async function main() {
  const LandContract = await hre.ethers.getContractFactory("Land");

  const contract = await LandContract.deploy()

  await contract.waitForDeployment();
  console.log('deployed to: ', await contract.getAddress())
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
