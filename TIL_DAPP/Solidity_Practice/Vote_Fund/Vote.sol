pragma solidity ^0.4.23;

contract Vote {
  bytes32[] public optionList;
  mapping (address => bytes32) public uservotes;
  mapping (bytes32 => uint8) public votes;


  constructor(bytes32[] options) public {
    optionList = options;
  }

  function voting(bytes32 option) public {
    require(uservotes[msg.sender]=='');
    uservotes[msg.sender] = option;
    votes[option] += 1;

    emit VoteCompleted(option, votes[option]);
  }

  function totalVotesFor(bytes32 option) view public returns (uint8) {
    require(validOption(option));
    return votes[option];
  }

  function validOption(bytes32 option) view public returns (bool) {
    for(uint i = 0; i < optionList.length; i++) {
      if (optionList[i] == option) {
        return true;
      }
    }
    return false;
  }

  function getOptionList() public view returns(bytes32[] options) {
  	return optionList;
  }


  event VoteCompleted(bytes32 option, uint8 count);
}
