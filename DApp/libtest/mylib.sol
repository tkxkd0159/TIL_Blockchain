// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

struct Data {
    mapping(uint => uint) flags;
}

library Set {
    function insert(Data storage self, uint value)
        public
        returns (bool)
    {
        if (self.flags[value] == value)
            return false; // already there
        self.flags[value] = value;
        return true;
    }
}
