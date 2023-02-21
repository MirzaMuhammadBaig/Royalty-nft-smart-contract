require("dotenv").config()
const { API_URL_INFURA, NFT_CONTRCT_ADDRESS, PRIVATE_KEY, PUBLIC_KEY, metaData } = process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL_INFURA)

const contract = require("../artifacts/contracts/NFT.sol/NFT.json")
const nftContract = new web3.eth.Contract(contract.abi, NFT_CONTRCT_ADDRESS)

async function mintNFT(to, tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: NFT_CONTRCT_ADDRESS,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.safeMint(to, tokenURI).encodeABI(),
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log("Promise failed:", err)
        })
}

mintNFT(PUBLIC_KEY, "QmbHtecwmXssGTxbW5tNjeeYVQb8hKiryCtaTu2a2uFLG4");
