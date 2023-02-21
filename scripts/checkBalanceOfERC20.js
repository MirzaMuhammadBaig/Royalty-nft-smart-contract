require('dotenv').config();
const { ethers } = require('ethers');
const { API_URL_INFURA, Token_contract_address, NFT_CONTRCT_ADDRESS, PUBLIC_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(API_URL_INFURA);

const MyContract = require('../artifacts/contracts/TOKEN.sol/TOKEN.json');

const contract = new ethers.Contract(Token_contract_address, MyContract.abi, provider);

async function checkBalance(address) {
    const balance = await contract.balanceOf(address);
    console.log(`This address ${address} balance is ${balance}`);
};
checkBalance(PUBLIC_KEY);
