// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;



import "./mylib.sol";


contract C {

    Data knownValues;

    function register(uint value) public {
        // The library functions can be called without a
        // specific instance of the library, since the
        // "instance" will be the current contract.
        require(Set.insert(knownValues, value));
    }

    function getData(uint value) public view returns (uint) {
        return knownValues.flags[value];
    }
}