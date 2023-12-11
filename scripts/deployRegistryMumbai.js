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
   const contractInstance = await contractFactory.deploy("0x387F8A9B8E66ED8d8100e355b9db5b11eC741506", "0x23729e0C74c9fa9F483baAb8E34f5ee04d0D3Cf2", "0x70499c328e1E2a3c41108bd3730F6670a44595D1");
   await contractInstance.waitForDeployment();

   console.log("Contract deploy at address:", await contractInstance.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
