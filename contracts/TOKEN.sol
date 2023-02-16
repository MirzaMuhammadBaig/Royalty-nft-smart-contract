// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TOKEN is ERC20, Ownable {

    uint256 public price;

    constructor(uint256 initialSupply, uint256 _price) ERC20("Antematter", "AM") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
        price = _price * 10 ** decimals();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function buy(address to, uint256 amount) public payable{
        uint256 tokens = amount * 10 ** decimals();
        require(balanceOf(owner()) >= tokens,"Not enough funds in smart contract");
        require(msg.value >= price * amount,"Insufficent deposite");
        payable(owner()).transfer(msg.value);
        _mint(to, tokens);
        _burn(owner(), tokens);
    }
}
