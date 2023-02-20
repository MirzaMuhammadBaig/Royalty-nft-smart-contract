require('dotenv').config();
const { API_URL_INFURA, CONTRCT_ADDRESS, PRIVATE_KEY, PUBLIC_KEY, metaData } = process.env;
const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(API_URL_INFURA);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = require("../artifacts/contracts/NFT.sol/NFT.json");

const nftContract = new ethers.Contract(CONTRCT_ADDRESS, contract.abi, wallet);

async function mint(to, uri) {
    const nonce = await provider.getTransactionCount(PUBLIC_KEY, 'latest'); // nonce starts counting from 0

    const tx = {
        to: CONTRCT_ADDRESS,
        nonce: nonce,
        gasPrice: ethers.utils.parseUnits("20", "gwei"),
        gasLimit: 210000,
        // gasLimit: 500000,
        // maxFeePerGas: ethers.utils.parseUnits("1.1", "gwei"),
        data: nftContract.interface.encodeFunctionData('safeMint', [to, uri]),
    };

    const signedTx = await wallet.signTransaction(tx);
    const txResponse = await provider.sendTransaction(signedTx);

    console.log("🎉 The hash of your transaction is: ", txResponse.hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
}

mint(PUBLIC_KEY, metaData);
