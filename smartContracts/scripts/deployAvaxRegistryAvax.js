// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {ethers} = require("hardhat");

async function main() 
{
   const contractFactory = await ethers.getContractFactory("ERC6551RegistryAvax");
   const contractInstance = await contractFactory.deploy("0x93A8fE00B91829763A797E933686318e89401c46", "0x44bA2D56A98176533E14167Be30F3e6a8B721fb8", "0xF694E193200268f9a4868e4Aa017A0118C9a8177");
   await contractInstance.waitForDeployment();

   console.log("Contract deploy at address:", await contractInstance.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
