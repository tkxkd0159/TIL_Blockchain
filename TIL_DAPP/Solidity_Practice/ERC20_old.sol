pragma solidity ^0.4.24;

// function (<parameter types>) {internal|external} [pure|view|payable] [returns (<return types>)]
// msg.sender : the person who currently connecting with the contract

contract TokenContract {
    mapping(address => unit256) balances;                    // address를 넣으면 그 address의 잔액이 나오는 상태변수. mapping은 요소 개수는 모름
    mapping(address => mapping(address => uint256)) allowed; // 보내는 address에서 보내는 토큰을 받는 address가 얼마만큼 받을 수 있는지 허용하는 매핑

    function balanceOf(address tokenOwner) public constant returns(uint balance) {
        return balances[tokenOwner];
    }

    function trasfer(address to, uint tokens) public returns (bool success) {

        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        Transfer(msg.sender, to, tokens);

        return true;
    }

    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        // transfer랑 거의 똑같지만 승인된 만큼의 허용 토큰을 감소시킴

        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        Transfer(from, to, tokens);

        return true;
    }

    function approve(address spender, uint tokens) public returns (bool success) {

        allowed[msg.sender][spender] = tokens;
        Approval(msg.sender, spender, tokens);

        return true

    }
}