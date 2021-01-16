pragma solidity ^0.4.23;

contract CrowdFund {
  uint fundGoal;
  uint tokenPrice;
  uint amountRaised;
  mapping (address => uint256) balanceOfUsers;
  bool depositClosed;

  constructor(uint goal, uint price) public {
    fundGoal = goal;
    tokenPrice = price;
  }

  function depositFunds() payable public {
    require(!depositClosed);
    require(msg.value==tokenPrice * 1 ether);
 
    uint amount = msg.value;
    balanceOfUsers[msg.sender] += amount;
    amountRaised += amount;

    emit DepositComplete();
    if(amountRaised >= fundGoal * 1 ether){
      depositClosed = true;
      emit FundingGoalReached(amountRaised);
    }
  }

  event FundingGoalReached(uint amountRaisedValue);
  event DepositComplete();

}
