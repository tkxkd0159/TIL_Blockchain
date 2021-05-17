pragma solidity ^0.4.24;

// public : visible externally and internally(계약 내부 또는 메세지로 외부에서 호출), private : only visible in the current contract
// external[only for fuction] : only visible externally(외부 계약 및 거래에서 호출), internal : only visible internally => 계약 내부 또는 상속받는 계약에서 호출

contract StartSolidity{
    string public mymsg;
    address public owner;  // EOA or CA address
    uint8 public counter;

    //constructor는 smart contract 새로 만들 때 실행됨.
    constructor(string _msg) public {
        mymsg = _msg;
        owner = msg.sender;
        counter = 0;
    }

    function getMsg() constant public returns(string) {   // returns : return data type 지정
        return mymsg;
    }

    function setCounter() public {
        for (uint8 i=0; i<4; i++){
            counter++;
        }
    }

    modifier onlyOwner {
        require(msg.sender == owner);    // 조건 만족하지 않으면 throw가 일어나고 처리 중단
        _;                              // original function이 실행되는 위치
    }



    event MessageLog(string msg);

    function close() public onlyOwner {
        selfdestruct(owner);
    }

    function dividend() public payable {  // 이더를 주고받는 처리가 있는 함수는 payable을 꼭 붙여야 함.
        MessageLog("dividend");
    }
}
