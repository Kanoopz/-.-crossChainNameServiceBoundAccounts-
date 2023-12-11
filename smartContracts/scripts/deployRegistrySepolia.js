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
   const contractFactory = await ethers.getContractFactory("ERC6551Registry");
   const contractInstance = await contractFactory.deploy("0xe9c4E2F129803e6BA03EE385ab24E2D2773bc1b5", "0xD91de94F6E0857f61333Fc147e4293585bc894de", "0xD0daae2231E9CB96b94C8512223533293C3693Bf");
   await contractInstance.waitForDeployment();

   console.log("Contract deploy at address:", await contractInstance.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
