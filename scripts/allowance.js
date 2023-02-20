require('dotenv').config();
const { ethers } = require('ethers');
const { API_URL_INFURA, CONTRCT_ADDRESS, PRIVATE_KEY, PUBLIC_KEY, Token_contract_address } = process.env;
const MyContract = require('../artifacts/contracts/TOKEN.sol/TOKEN.json');
const provider = new ethers.providers.JsonRpcProvider(API_URL_INFURA);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const approveAmount = ethers.BigNumber.from('12345678900000000000000000000000');

async function spend(to, amount) {
    
    let contract = new ethers.Contract(Token_contract_address, MyContract.abi, wallet);
    let allowance = await contract.approve(to, amount);
    let tx = await allowance.wait();
    console.log(`Your transaction record`);
    console.log(tx.transactionHash);
    console.log(`You have successfully approve ${approveAmount}`);
}

spend(CONTRCT_ADDRESS, approveAmount);
