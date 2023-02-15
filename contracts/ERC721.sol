// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.1/contracts/token/ERC20/IERC20.sol";

contract Antematter is ERC721, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    uint256 public totalSupply;
    uint256 public circulatingSupply;
    uint256 public price;
    address payable[] public nftOwners;

    IERC20 public USDT;

    Counters.Counter private _tokenIdCounter;

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
        return "https://";
    }

    function safeMint(address to) public payable {
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
        price += 1 * 10 ** 18;
    }
}
