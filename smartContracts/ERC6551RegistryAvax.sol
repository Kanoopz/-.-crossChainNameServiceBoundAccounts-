// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Create2.sol";

import "./erc6551/interfaces/IERC6551Registry.sol";
import "./erc6551/interfaces/IERC6551Account.sol";
import "./erc6551/interfaces/IERC6551CrossChainAccount.sol";
import "./erc6551/lib/ERC6551BytecodeLib.sol";

import "./ccipInfrastructure.sol";
import "./customErc721.sol";
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract ERC6551RegistryAvax is IERC6551Registry, ccipInfrastructure
{
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //      "customErrors"                                                                                                                                   ///
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    error InitializationFailed();



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //      "EVENTS"                                                                                                                                         ///
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    event erc6551AccountCreatedEvent(string msg, string name, address nameServiceNftResolverCreatedAddress, address erc6551AccountCreatedAddress);
    event crossChainErc6551AccountCreatedEvent(string msg, string name, address nameServiceNftResolverCreatedAddress, address erc6551AccountCreatedAddress);
    event crossChainCallOrderedEvent(string msg, address erc6551AccountAddress, address to, bytes data, uint256 value);
    event nameServiceCreatedForEoaEvent(string msg, string name, address nameServiceNftResolverCreatedAddress, address eoa);



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //      "STORAGE"                                                                                                                                        ///
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //      "VARIABLES"                                        ///
    //////////////////////////////////////////////////////////////
    address public otherChainRegistryAddress;
    address public erc6551AccountImplementationAddress;
    address public erc6551AccountCrossChainImplementationAddress;


    uint256 public saltCounter; 
    uint256 public crossChainSaltCounter;

    uint64 public fujiChainId = 43113;
    uint64 public mumbaiChainId = 80001;

    uint64 public thisChainSelector;
    uint64 public otherChainSelector;
    uint64 public fujiChainSelector = 14767482510784806043;
    uint64 public mumbaiChainSelector = 12532609583862916517;

    address public thisChainRouter;
    address public otherChainRouter;
    address public fujiRouter = 0xF694E193200268f9a4868e4Aa017A0118C9a8177;
    address public mumbaiRouter = 0x70499c328e1E2a3c41108bd3730F6670a44595D1;

    //////////////////////////////////////////////////////////////
    //      "MAPPINGS"                                         ///
    //////////////////////////////////////////////////////////////
    mapping(string => bool) public nameTaken;
    mapping(string => bool) public createdOnThisChain;
    mapping(string => address) nameToNftResolverContract;	

    // mapping(address => address) nftContractsToOwnersEOAs;
    mapping(address => address) nftContractsToTbaAccounts;
    mapping(address => address) tbaAccountsToNftContracts;
    mapping(address => string) tbaAccountsToName;


    mapping(string => address) otherChain_nameToNftResolverContract;
    // mapping(address => address) otherChain_nftContractsToOwnersEOAs;		
    mapping(address => address) otherChain_nftContractsToTbaAccounts;		
    mapping(address => address) otherChain_tbaAccountsToNftContracts;	



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //      "FUNCTIONS"                                                                                                                                      ///
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //      "CONSTRUCTOR"                                      ///
    //////////////////////////////////////////////////////////////
    //constructor(address paramNftNameServiceResolver, address paramErc6551AccountImplementationAddress)
    constructor(address paramErc6551AccountImplementationAddress, address paramErc6551CrossChainAccountImplementationAddress, address router) ccipInfrastructure(router)
    {
        erc6551AccountImplementationAddress = paramErc6551AccountImplementationAddress;
        erc6551AccountCrossChainImplementationAddress = paramErc6551CrossChainAccountImplementationAddress;

        if(block.chainid == fujiChainId)
        {
            thisChainSelector = fujiChainSelector;
            otherChainSelector = mumbaiChainSelector;

            thisChainRouter = fujiRouter;
            otherChainRouter = mumbaiRouter;
        }
        else if(block.chainid == mumbaiChainId)
        {
            thisChainSelector = mumbaiChainSelector;
            otherChainSelector = fujiChainSelector;

            thisChainRouter = mumbaiRouter;
            otherChainRouter = fujiRouter;
        }


        whitelistDestinationChain(otherChainSelector);
        whitelistSourceChain(otherChainSelector);
        whitelistChain(otherChainSelector);
    }

    //////////////////////////////////////////////////////////////
    //      "customFunctions"                                  ///
    //////////////////////////////////////////////////////////////
    function generateErc6551NameServiceAccount(string memory name) public
    {
        require(nameTaken[name] == false, "Name already taken.");

        customErc721 newNameServiceNftResolver = new customErc721("nameServiceNftResolver", "NSNR", msg.sender, name, address(this));
        address newNameServiceNftResolverAddress = newNameServiceNftResolver.getContratAddress();


        saltCounter = saltCounter + 1;

        bytes memory emptyData;
        address erc6551AccountAddress = createAccount(erc6551AccountImplementationAddress, block.chainid, newNameServiceNftResolverAddress, 0, saltCounter, emptyData);
        IERC6551Account(erc6551AccountAddress).initializeRegistry();


        nameTaken[name] = true;
        createdOnThisChain[name] = true;
        nameToNftResolverContract[name] = newNameServiceNftResolverAddress;

        nftContractsToTbaAccounts[newNameServiceNftResolverAddress] = erc6551AccountAddress;
        tbaAccountsToNftContracts[erc6551AccountAddress] = newNameServiceNftResolverAddress;
        tbaAccountsToName[erc6551AccountAddress] = name;


        makeCrossChainCall(otherChainSelector, otherChainRegistryAddress, 0, name, newNameServiceNftResolverAddress, "", 0);


        emit erc6551AccountCreatedEvent("erc6551Account created successfully.", name, newNameServiceNftResolverAddress, erc6551AccountAddress);
    }

    function generateNameServiceForEoa(string memory name) public
    {
        require(nameTaken[name] == false, "Name already taken.");

        customErc721 newNameServiceNftResolver = new customErc721("nameServiceNftResolver", "NSNR", msg.sender, name, address(this));
        address newNameServiceNftResolverAddress = newNameServiceNftResolver.getContratAddress();


        nameTaken[name] = true;
        createdOnThisChain[name] = true;
        nameToNftResolverContract[name] = newNameServiceNftResolverAddress;

        emit nameServiceCreatedForEoaEvent("nameService created successfully.", name, newNameServiceNftResolverAddress, msg.sender);
    }

    function executeCrossChainAccountOrder(address to, bytes memory data, uint256 value) public
    {
        string memory tbaLinkedName = tbaAccountsToName[msg.sender];

        require(nameTaken[tbaLinkedName] == true, "Caller not a erc6551Account or not registered in this registry.");

        makeCrossChainCall(otherChainSelector, otherChainRegistryAddress, 1, tbaLinkedName, to, data, value);
    }

    function setOtherChainRegistryAddress(address paramOtherChainAddress) public onlyOwner
    {
        otherChainRegistryAddress = paramOtherChainAddress;
        whitelistSender(paramOtherChainAddress);
    }

    function getNftResolver(string memory name) public view returns(address)
    {
        address resolverNftFormatAddress = nameToNftResolverContract[name];
        return IERC721(resolverNftFormatAddress).ownerOf(0);
    }

    function getNftResolverLinkedErc6551Tba(string memory name) public view returns(address)
    {
        address resolverNftFormatAddress = nameToNftResolverContract[name];
        return nftContractsToTbaAccounts[resolverNftFormatAddress];
    }

    //////////////////////////////////////////////////////////////
    //      "crossChainFunctions"                              ///
    //////////////////////////////////////////////////////////////
    function makeCrossChainCall(uint64 _destinationChainSelector, address smartContractReceiverAddress, uint256 operation, string memory name, address nftOrTo, bytes memory data, uint256 value) internal
    {
        //ccipFuncs/////////////////////////////////////////////////////////////////
        Client.EVM2AnyMessage memory funcEvm2AnyMessage = _funcsBuildCCIPMessage(
            smartContractReceiverAddress,
            address(0),
            operation,
            name,
            nftOrTo,
            data,
            value
        );

        IRouterClient funcRouter = IRouterClient(this.getRouter());

        uint256 fees = funcRouter.getFee(_destinationChainSelector, funcEvm2AnyMessage);

        if (fees > address(this).balance)
            revert NotEnoughBalance(address(this).balance, fees);
            
        // Send the CCIP message through the router and store the returned CCIP message ID
        bytes32 funcMessageId = funcRouter.ccipSend{value: fees}(
            _destinationChainSelector,
            funcEvm2AnyMessage
        );
    }

    function _ccipReceive(Client.Any2EVMMessage memory any2EvmMessage) internal override
        onlyWhitelistedSourceChain(any2EvmMessage.sourceChainSelector) // Make sure source chain is whitelisted
        onlyWhitelistedSenders(abi.decode(any2EvmMessage.sender, (address))) // Make sure the sender is whitelisted
    {
        (uint256 operation, 
        string memory name, 
        address nftOrTo, 
        bytes memory data, 
        uint256 value)
        =
        abi.decode(any2EvmMessage.data, 
        (uint256,
         string,
         address,
         bytes,
         uint256));

        emit MessageReceived
        (
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            "received"
        );


         if(operation == 0)
         {
            require(nameTaken[name] == false, "Error on crossChainNameServiceRegistration.");

            nameTaken[name] = true;
            createdOnThisChain[name] = false;

            crossChainSaltCounter = crossChainSaltCounter + 1;

            bytes memory emptyData;
            address erc6551AccountAddress = createAccount(erc6551AccountCrossChainImplementationAddress, block.chainid, nftOrTo, 0, saltCounter, emptyData);
            IERC6551CrossChainAccount(erc6551AccountAddress).initializeRegistry();

            otherChain_nameToNftResolverContract[name] = nftOrTo;	
            otherChain_nftContractsToTbaAccounts[nftOrTo] = erc6551AccountAddress;		
            otherChain_tbaAccountsToNftContracts[erc6551AccountAddress] = nftOrTo;	

            emit  crossChainErc6551AccountCreatedEvent("crossChainErc6551Account created successfully.", name, nftOrTo, erc6551AccountAddress);
         }
         else if(operation == 1)
         {
            address nftContract = otherChain_nameToNftResolverContract[name];
            address erc6551Account = otherChain_nftContractsToTbaAccounts[nftContract];

            IERC6551CrossChainAccount(erc6551Account).executeCrossChainOrderCall(nftOrTo, value, data);
            emit crossChainCallOrderedEvent("crossChain 6551Account callExecution ordered.", erc6551Account, nftOrTo, data, value);
         }
    }

    //////////////////////////////////////////////////////////////
    //      "erc6551Functions"                                 ///
    //////////////////////////////////////////////////////////////
    function createAccount(address implementation, uint256 chainId, address tokenContract, uint256 tokenId, uint256 salt, bytes memory initData) public returns (address) 
    {
        bytes memory code = ERC6551BytecodeLib.getCreationCode(implementation, chainId, tokenContract, tokenId,  salt);

        address _account = Create2.computeAddress(bytes32(salt), keccak256(code));

        if (_account.code.length != 0) return _account;

        emit AccountCreated(_account, implementation, chainId, tokenContract, tokenId, salt);

        _account = Create2.deploy(0, bytes32(salt), code);

        if (initData.length != 0) 
        {
            (bool success, ) = _account.call(initData);
            if (!success) revert InitializationFailed();
        }

        return _account;
    }

    function account(address implementation, uint256 chainId, address tokenContract, uint256 tokenId, uint256 salt) public view returns (address) 
    {
        bytes32 bytecodeHash = keccak256(ERC6551BytecodeLib.getCreationCode(implementation, chainId, tokenContract, tokenId, salt));

        return Create2.computeAddress(bytes32(salt), bytecodeHash);
    }
}