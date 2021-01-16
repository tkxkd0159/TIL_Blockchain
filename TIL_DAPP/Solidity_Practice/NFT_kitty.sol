pragma solidity ^0.4.24;

struct Kitty {
    uint256 genes;
    uint64 birthTime;
    uint64 cooldownEndBlock;
    uint32 matronId;
    uint32 sireId;
    uint32 siringWithId;
    uint16 cooldownIndex;
    uint16 generation;
}

Kitty[] kitties;

mapping (uint256 => address) public kittyIndexToOwner;   // 고양이의 ID와 소유자의 address를 mapping

function _transfer(address _from, address _to, uint256 _tokenId) internal {

    //소유자가 가지고 있는 전체 토큰 개수 증가시키고 해당 token ID를 전송받는 address가 mapping 된다.
    ownershipTokenCount[_to]++;
    kittyIndexToOwner[_tokenId] = _to;

    // 기존 소유자가 가지고 있는 토큰이였을 경우 관련 정보 삭제
    if (_from != address(0)) {
        ownershipTokenCount[_from]--;
        delete sireAllowedToAddress[_tokenId];
        delete kittyIndexToApproved[_tokenId];
    }

    Transfer(_from, _to, _tokenId);
}

contract KittyOwnership is KittyBase, ERC721 {

    modifier whenNotPaused{}

    function totalSupply() public view returns (uint) {
        return kitties.length - 1;  // genesis cat을 제외한 모든 cat 개수 반환
    }

    function balanceOf(address _owner) public view returns (uint256 count) {
        return ownershipTokenCount[_owner];  // 해당 소유자가 가지고 있는 토큰 개수 반환
    }

    function ownerOf(uint256 _tokenId) external view returns (address owner){
        owner = kittyIndexToOwner[_tokenId]; // 고양이에 대한 소유자 address 반환
        require(owner != address(0));        // 조건 만족하지 않으면 throw가 일어나고 처리 중단
    }

    // address가 특정 고양이를 전송하기 위한 승인 프로세스 진행
    function approve(address _to, uint256 _tokenId) external whenNotPaused {
        require(_owns(msg.sender, _tokenId));  // only an owner can grant transfer approval
        _approve(_tokenId, _to);               // Register the approval
        Approval(msg.sender, _to, _tokenId);
    }

    function _approve(uint256, _tokenId, address _approved) internal {
        kittyIndexToApproved[_tokenId] = _approved;
    }

    function transfer(address _to, uint256 _tokenId) external whenNotPaused {
        // genesis 및 현재 고양이 소유자의 auction 참여 제한
        require(_to != address(0));
        require(_to != address(this));

        // Auction contract의 address로 고양이가 보내지는 상황 방지
        require(_to != address(saleAuction));
        require(_to != address(siringAuction));

        // 오직 자기의 고양이만 전송 가능
        require(_approvedFor(msg.sender, _tokenId));
        require(_owns(msg.sender, _tokenId));

        // KittyBase에 정의된 _trasfer로  고양이 전송
        _transfer(msg.sender, _to, _tokenId);

    }

        function transferFrom(address _from, address _to, uint256 _tokenId) external whenNotPaused {
        require(_to != address(0));
        require(_to != address(this));

        require(_to != address(saleAuction));
        require(_to != address(siringAuction));

        require(_approvedFor(msg.sender, _tokenId));
        require(_owns(_from, _tokenId));

        _transfer(msg.sender, _to, _tokenId)

    }
}