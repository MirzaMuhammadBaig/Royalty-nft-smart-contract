require('dotenv').config();
const { ethers } = require('ethers');
const { API_URL_INFURA, Token_contract_address, NFT_CONTRCT_ADDRESS, PUBLIC_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(API_URL_INFURA);

const MyContract = require('../artifacts/contracts/TOKEN.sol/TOKEN.json');

const contract = new ethers.Contract(Token_contract_address, MyContract.abi, provider);

async function checkAllowance(owner, spender) {
    const allowance = await contract.allowance(owner, spender);
    console.log(`This address ${NFT_CONTRCT_ADDRESS} allowance is ${allowance} from this address ${PUBLIC_KEY}`);
};
checkAllowance(PUBLIC_KEY, NFT_CONTRCT_ADDRESS);