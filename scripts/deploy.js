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

// TOKEN contract has been deployed at 0x5071D8d2E23fda87aBC0618Cb42c6f6AC8237B58
// NFT contract has been deployed at 0x3C33a368E219aa7ab784A1D5cd13F334e705e318
// On sepolia
// metadat: QmPHMN49mwjB54NF8hZRH9ERrP4oybcFr7jx3x5MhtSHrg
// 🎉 The hash of your transaction is:  0xafa63d401204820a5292f165eeea969ca8502ec95f060ca65e82e7c2d1ff1d41
// approve 0xa6a0c0fc851ad21d642dadada534bd62ab4b93df9590f4f2c94d93b3e119502b
//🎉 The hash of your transaction is:  0xf76b5758320f0ecb3044f486cefaeef578d91578d746027f4ef4ef4213b98c99
// 🎉 The hash of your transaction is:  0xd49c2303e3e2c425b7da148fdd481b20b774405b12cd38857b6fd15ef1580efc 