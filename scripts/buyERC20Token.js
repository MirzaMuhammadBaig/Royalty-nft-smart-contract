require('dotenv').config();
const { ethers } = require('ethers');
const { API_URL_INFURA, Token_contract_address, NFT_CONTRCT_ADDRESS, PUBLIC_KEY, user } = process.env;

const provider = new ethers.providers.JsonRpcProvider(API_URL_INFURA);

const MyContract = require('../artifacts/contracts/TOKEN.sol/TOKEN.json');

const contract = new ethers.Contract(Token_contract_address, MyContract.abi, provider);

const tokenAmount = ethers.utils.parseUnits("100", 18); // 100 tokens with 18 decimal places

async function buyToken(user, amount) {
    const buyToken = await contract.buy(user, amount);
    console.log(`${amount} successfully sent to ${user}`);
};
buyToken(user, tokenAmount);