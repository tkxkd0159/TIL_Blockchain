pragma solidity ^0.4.22;

// Compile -> Deploy (Environment :Injected Web3)

contract Faucet {

    event Withdrawal(address indexed to, uint amount); // 누구에게 얼마를 빌려줄거냐
    event Deposit(address indexed from, uint amount);  // 누가보냈는지, 얼마를 보냈는지

    function withdraw(uint withdraw_amount) public {
        require(withdraw_amount <= 1000);
        msg.sender.transfer(withdraw_amount);

        emit Withdrawal(msg.sender, withdraw_amount);
    }

    function () public payable {
        emit Deposit(msg.sender, msg.value);
    }
}
