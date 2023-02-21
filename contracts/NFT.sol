// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    uint256 public totalSupply;
    uint256 public circulatingSupply;
    uint256 public price;
    address payable[] public nftOwners;

    IERC20 public USDT;

    Counters.Counter private _tokenIdCounter;

    event safe_Mint(address nft_mint, uint256 _price);

    constructor(
        uint256 _totalSupply,
        uint256 _price,
        address address_of_USDT_contract
    ) ERC721("Antematter", "AM") {
        totalSupply = _totalSupply;
        price = _price * 10 ** 18;
        USDT = IERC20(address_of_USDT_contract);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/";
    }

    function safeMint(address to, string memory uri) public payable {
        require(USDT.balanceOf(msg.sender) >= price, "Insufficient funds");
        require(
            USDT.allowance(msg.sender, address(this)) >= price,
            "Insufficient allowance"
        );
        require(circulatingSupply < totalSupply, "Supply exceed");
        circulatingSupply++;
        nftOwners.push(payable(msg.sender));
        require(circulatingSupply == nftOwners.length, "Some thing wrong");
        if (circulatingSupply == 2) {
            uint256 contract_amount = price.mul(90).div(100);
            uint256 fee = price.sub(contract_amount);
            USDT.transferFrom(msg.sender, address(this), contract_amount);
            USDT.transferFrom(msg.sender, nftOwners[0], fee);
        } else if (circulatingSupply > 2) {
            uint256 contract_amount = price.mul(90).div(100);
            uint256 fee = (price.sub(contract_amount)).div(nftOwners.length);
            USDT.transferFrom(msg.sender, address(this), contract_amount);
            for (uint256 i = 0; i < nftOwners.length; i++) {
                USDT.transferFrom(msg.sender, nftOwners[i], fee);
            }
        } else if (circulatingSupply > 25) {
            uint256 contract_amount = price.mul(80).div(100);
            uint256 fee = price.sub(contract_amount).div(nftOwners.length);
            USDT.transferFrom(msg.sender, address(this), contract_amount);
            for (uint256 i = 0; i < nftOwners.length; i++) {
                USDT.transferFrom(msg.sender, nftOwners[i], fee);
            }
        } else {
            USDT.transferFrom(msg.sender, address(this), price);
        }
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        tokenURI(tokenId);
        _setTokenURI(tokenId, uri);
        emit safe_Mint (to, price);
        price += 10 * 10 ** 18;
    }

        // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
