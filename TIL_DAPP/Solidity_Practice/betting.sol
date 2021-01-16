pragma solidity ^0.4.18;

contract Ownable {
  address owner;
  function Ownable() public {
    owner = msg.sender;
  }

  modifier Owned {
    require(msg.sender == owner);
    _;
  }
}

contract Mortal is Ownable {
  function kill() public Owned { 
    selfdestruct(owner);
  }
}


contract Betting is Mortal {
  uint minBet; // 최소 베팅액 (wei)
  uint winRate; // 배당률 (%)

  event Won(bool _result, uint _amount);  // logging 용

  function Betting(uint _minBet, uint _winRate) payable public {
    require(_minBet > 0);
    require(_winRate <= 100);
    minBet = _minBet;
    winRate = _winRate;
  }
  
  // contract는 아무런 argument도 없고 return값도 없는 단 한개의 fallback 함수를 가진다.
  // undefined한 상황에 대해 default로 동작하는 function
  // It is executed on a call to the contract if none of the other functions match the given function identifier (or if no data was supplied at all)
  function() public { 
    revert();
  }

  function bet(uint _num) payable public {
    require(_num > 0 && _num <= 5);
    require(msg.value >= minBet);

    uint winNum = random();
    if (_num == winNum) {
      uint amtWon = msg.value * (100 - winRate)/10;
      if(!msg.sender.send(amtWon)) revert();
      Won(true, amtWon);
    } else {
      Won(false, 0);
    }
  }

  function getBalance() Owned public view returns(uint) {
    return address(this).balance;       // address(this) : the address of the contract  -> contract 소유자가 현재 contract의 잔액 확인
  }

  function random() public view returns (uint) {
  	return uint(keccak256(block.difficulty, block.number, now)) % 5 + 1;
  }
}
