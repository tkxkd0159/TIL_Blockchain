// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract myToken is ERC20 {




    constructor(uint256 initialSupply) public ERC20("JS Token", "LJS") {
        _mint(msg.sender, initialSupply);
        _setupDecimals(2);
    }

}