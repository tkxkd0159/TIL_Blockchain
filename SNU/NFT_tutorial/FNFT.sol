pragma solidity  ^0.7.3;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";


contract FNFT is ERC20 {
    
    uint public sharePrice;
    uint public shareSupply;
    uint public end;
    
    uint public nftId;
    IERC721 public nft;
    IERC20 public decipher;
    
    address public admin;
    
    constructor(
        
        string memory _name,
        string memory _symbol,
        address _nftAddress,
        uint _nftId,
        uint _sharePrice,
        uint _shareSupply,
        address _decipherAddress) ERC20(_name, _symbol) {
            
            nftId = _nftId;
            nft = IERC721(_nftAddress);
            sharePrice = _sharePrice;
            shareSupply = _shareSupply;
            decipher = IERC20(_decipherAddress);
            admin = msg.sender;
        }
        
    // sda
    function beginIco() external {
        
        require(msg.sender == admin, "You are not an admin");
        nft.transferFrom(msg.sender, address(this), nftId);
        end = block.timestamp + 3 * 24 * 60 * 60;
    }
    
    function buyShare(uint shareAmount) external {
        
        require(end > 0, "not begun");
        require(block.timestamp <=end, 'Ended');
        require(totalSupply() + shareAmount < shareSupply, 'no more!');
        
        uint decipherAmount = shareAmount * sharePrice;
        decipher.transferFrom(msg.sender, address(this), decipherAmount);
        _mint(msg.sender, shareAmount);
    }
    
    function withdraw() external {
        
        require(msg.sender == admin, 'Only admin');
        require(block.timestamp > end, 'Not finished');
        
        uint decipherBalance = decipher.balanceOf(address(this));
        
        if(decipherBalance > 0) {
            decipher.transfer(admin, decipherBalance);
        }
        
        uint remainingShare = shareSupply - totalSupply();
        if (remainingShare > 0) {
            _mint(admin, remainingShare);
        }
    }
}
