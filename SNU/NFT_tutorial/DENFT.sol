pragma solidity ^0.7.3;


import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERCC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";


contract NFT is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}
    
    function mint(address to, uint amount) external {
        _mint(to, amount);
    }
}