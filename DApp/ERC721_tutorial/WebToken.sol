// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "myERC721.sol";

contract WebSiteToken is MyERC721 {

    mapping(uint256 => string) values;
    mapping(string => uint256) uriMap;

    constructor() MyERC721("WebSiteToken", "WST") public {
        mint(msg.sender, "google.com");
        mint(msg.sender, "naver.com");
        mint(msg.sender, "facebook.com");
    }

    function mint(address to, string memory uri) public {
        require(uriMap[uri] == 0);
        uint256 newTokenId = totalSupply() + 1;
        _mint(to, newTokenId);

        values[newTokenId] = uri;
        uriMap[uri] = newTokenId;
    }

    function getUri(uint256 tokenId) public view returns (string memory) {
        return values[tokenId];
    }

    function getTokenIdByUri(string memory uri) public view returns (uint256) {
        return uriMap[uri];
    }

    function whoHasUri(string memory uri) public view returns (address) {
        uint256 tokenId = getTokenIdByUri(uri);

        return ownerOf(tokenId);
    }

}