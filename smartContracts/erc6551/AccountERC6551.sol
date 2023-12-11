// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './interfaces/IERC6551Account.sol';
import './lib/ERC6551AccountLib.sol';
import './interfaces/IERC6551Registry.sol';

import '@openzeppelin/contracts/utils/introspection/IERC165.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol';
import '@openzeppelin/contracts/interfaces/IERC1271.sol';
import '@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol';

import 'hardhat/console.sol';

// import "hardhat/console.sol";

contract AccountERC6551 is IERC165, IERC1271, IERC6551Account 
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //      "customErrors"                                                                                                                                   ///
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    error NotAuthorized();
    error OwnershipCycle();



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //      "STORAGE"                                                                                                                                        ///
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //      "VARIABLES"                                        ///
    //////////////////////////////////////////////////////////////
    address public erc6551RegistryAddress;
    bool public alreadyInitialized;



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //      "FUNCTIONS"                                                                                                                                      ///
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //      "CONSTRUCTOR"                                      ///
    //////////////////////////////////////////////////////////////
    // constructor()
    // {
    //     erc6551RegistryAddress = msg.sender;
    // }

    function initializeRegistry() public
    {
        require(alreadyInitialized == false, "Registry already initialized.");

        erc6551RegistryAddress = msg.sender;
        alreadyInitialized = true;
    }

    function executeCrossChainOrderCall(address to, uint256 value, bytes memory data) public
    {
        require(msg.sender == owner(), "Caller not the owner of the TBA.");

        IERC6551Registry(erc6551RegistryAddress).executeCrossChainAccountOrder(to, data, value);   
    }

    // Transfer call must be called by Owner of the token
    function executeCall(address to, uint256 value, bytes calldata data) external payable returns (bytes memory) 
    {
        require(msg.sender == owner(), "Caller not the owner of the TBA.");

        emit TransactionExecuted(to, value, data);

        return _call(to, value, data);
    }

    function _call(address to, uint256 value, bytes calldata data) internal returns (bytes memory result) 
    {
        bool success;
        (success, result) = to.call{value: value}(data);

        if (!success) 
        {
            assembly 
            {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function owner() public view returns (address) 
    {
        (uint256 chainId, address tokenContract, uint256 tokenId) = ERC6551AccountLib.token();

        if (chainId != block.chainid) return address(0);

        return IERC721(tokenContract).ownerOf(tokenId);
    }

    function token() external view returns (uint256 chainId, address tokenContract, uint256 tokenId) 
    {
        return ERC6551AccountLib.token();
    }

    //++++++++++++++++++++++++++++Support Function+++++++++++++++++++++++++++++++++++++++++++++
    function supportsInterface(bytes4 interfaceId) public pure override returns (bool) 
    {
        bool defaultSupport = interfaceId == type(IERC165).interfaceId ||
            interfaceId == type(IERC1155Receiver).interfaceId ||
            interfaceId == type(IERC6551Account).interfaceId;

        if (defaultSupport) return true;
        return false;
    }

    function isValidSignature(bytes32 hash, bytes memory signature) external view returns (bytes4 magicValue) 
    {
        address _owner = owner();
        // Default - check if signature is valid for account owner
        if (SignatureChecker.isValidSignatureNow(_owner, hash, signature)) 
        {
            return IERC1271.isValidSignature.selector;
        }

        return '';
    }

    function getContratAddress() public view returns(address)
    {
        return address(this);
    }

    receive() external payable {}

    fallback() external payable {}
}