// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Web3BridgeSBT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("Web3BridgeSBT", "WSBT") Ownable(msg.sender) {}

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = super._update(to, tokenId, auth);
        if (from != address(0) && to != address(0)) {
            revert("Soulbound tokens are non-transferable");
        }
        
        return from;
    }

    function safeMint(address to, string memory uri)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }
}


