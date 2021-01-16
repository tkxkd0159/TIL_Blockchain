pragma solidity  ^0.7.3;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract DecipherToken is ERC20 {
    constructor() ERC20("Decipher", "DE") {
        
        _mint(msg.sender, 1000);
        _setupDecimals(2);
    }
}