const hre = require("hardhat");

async function main() {

  const TOKEN = await hre.ethers.getContractFactory("TOKEN");
  const token = await TOKEN.deploy(10000000, 1);
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(50, 10, token.address);

  await token.deployed();
  await nft.deployed();

  console.log(
    `TOKEN contract has been deployed at ${token.address}`
  );
  console.log(
    `NFT contract has been deployed at ${nft.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// TOKEN contract has been deployed at: 0xCC2E97F7190FD726966395b6C185f8989416ae71
// NFT contract has been deployed at: 0xA9a8E5BF85c129634C1aCe7a9dfe703D0ffC1B62
// On sepolia