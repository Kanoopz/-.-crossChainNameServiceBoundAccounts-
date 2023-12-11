import { useState } from "react";

import { ethers } from "ethers";
import ReactBorderWrapper from "react-border-wrapper";

function RegistryComponent(props)
{
    let userAddress = props.addressData;  
    let signer = props.signerData;

    let smartContractAddress = "0x21c8ebffF37bcbC4A598dE7814fA85b85d826CEF";

    let smartContractAbi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "paramErc6551AccountImplementationAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "paramErc6551CrossChainAccountImplementationAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "router",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "Create2EmptyBytecode",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "Create2FailedDeployment",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "Create2InsufficientBalance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "destinationChainSelector",
            "type": "uint64"
          }
        ],
        "name": "DestinationChainNotWhitelisted",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "FailedToWithdrawEth",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "InitializationFailed",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "router",
            "type": "address"
          }
        ],
        "name": "InvalidRouter",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "currentBalance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "calculatedFees",
            "type": "uint256"
          }
        ],
        "name": "NotEnoughBalance",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "NothingToWithdraw",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "SenderNotWhitelisted",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "sourceChainSelector",
            "type": "uint64"
          }
        ],
        "name": "SourceChainNotWhitelisted",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "implementation",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "chainId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "salt",
            "type": "uint256"
          }
        ],
        "name": "AccountCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "messageId",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "uint64",
            "name": "sourceChainSelector",
            "type": "uint64"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "text",
            "type": "string"
          }
        ],
        "name": "MessageReceived",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "messageId",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "uint64",
            "name": "destinationChainSelector",
            "type": "uint64"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "text",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "feeToken",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fees",
            "type": "uint256"
          }
        ],
        "name": "MessageSent",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferRequested",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "messageId",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "uint64",
            "name": "destinationChainSelector",
            "type": "uint64"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "feeToken",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fees",
            "type": "uint256"
          }
        ],
        "name": "TokensTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "msg",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "erc6551AccountAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "crossChainCallOrderedEvent",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "msg",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "nameServiceNftResolverCreatedAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "erc6551AccountCreatedAddress",
            "type": "address"
          }
        ],
        "name": "crossChainErc6551AccountCreatedEvent",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "msg",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "nameServiceNftResolverCreatedAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "erc6551AccountCreatedAddress",
            "type": "address"
          }
        ],
        "name": "erc6551AccountCreatedEvent",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "implementation",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "salt",
            "type": "uint256"
          }
        ],
        "name": "account",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "messageId",
                "type": "bytes32"
              },
              {
                "internalType": "uint64",
                "name": "sourceChainSelector",
                "type": "uint64"
              },
              {
                "internalType": "bytes",
                "name": "sender",
                "type": "bytes"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              },
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Client.EVMTokenAmount[]",
                "name": "destTokenAmounts",
                "type": "tuple[]"
              }
            ],
            "internalType": "struct Client.Any2EVMMessage",
            "name": "message",
            "type": "tuple"
          }
        ],
        "name": "ccipReceive",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "implementation",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "chainId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "tokenContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "salt",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "initData",
            "type": "bytes"
          }
        ],
        "name": "createAccount",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "createdOnThisChain",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "crossChainSaltCounter",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_sender",
            "type": "address"
          }
        ],
        "name": "denySender",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "_destinationChainSelector",
            "type": "uint64"
          }
        ],
        "name": "denylistChain",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "_destinationChainSelector",
            "type": "uint64"
          }
        ],
        "name": "denylistDestinationChain",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "_sourceChainSelector",
            "type": "uint64"
          }
        ],
        "name": "denylistSourceChain",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "erc6551AccountCrossChainImplementationAddress",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "erc6551AccountImplementationAddress",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "executeCrossChainAccountOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          }
        ],
        "name": "generateErc6551NameServiceAccount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getRouter",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "mumbaiChainId",
        "outputs": [
          {
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "mumbaiChainSelector",
        "outputs": [
          {
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "mumbaiRouter",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "nameTaken",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "otherChainRegistryAddress",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "otherChainRouter",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "otherChainSelector",
        "outputs": [
          {
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "saltCounter",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "sepoliaChainId",
        "outputs": [
          {
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "sepoliaChainSelector",
        "outputs": [
          {
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "sepoliaRouter",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "paramOtherChainAddress",
            "type": "address"
          }
        ],
        "name": "setOtherChainRegistryAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "thisChainRouter",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "thisChainSelector",
        "outputs": [
          {
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "_destinationChainSelector",
            "type": "uint64"
          }
        ],
        "name": "whitelistChain",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "_destinationChainSelector",
            "type": "uint64"
          }
        ],
        "name": "whitelistDestinationChain",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_sender",
            "type": "address"
          }
        ],
        "name": "whitelistSender",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "_sourceChainSelector",
            "type": "uint64"
          }
        ],
        "name": "whitelistSourceChain",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
          }
        ],
        "name": "whitelistedChains",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
          }
        ],
        "name": "whitelistedDestinationChains",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "whitelistedSenders",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "",
            "type": "uint64"
          }
        ],
        "name": "whitelistedSourceChains",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_beneficiary",
            "type": "address"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ];
    
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    
    let smartContractInstance = new ethers.Contract(smartContractAddress, smartContractAbi, provider);



    const [accountsCreated, setAccountsCreated] = useState(null);
    const [newAccountName, setNewAccountName] = useState(null);
    const [otherChainRegistry, setOtherChainRegistry] = useState(null);

    async function getAccountsCreatedData()
    {
        let accountsCreatedData = await smartContractInstance.saltCounter();
        let _accountsCreatedData = accountsCreatedData.toString();
        setAccountsCreated(_accountsCreatedData);
        console.log(accountsCreatedData);
    }

    async function createNew6551Account()
    {
        const tx = await smartContractInstance.connect(signer).generateErc6551NameServiceAccount(newAccountName);
        const txReceipt = await tx.wait();

        const events = txReceipt?.events; // # => Event[] | undefined
        console.log(events);

        console.log(events[5]);
        console.log(events[5].args);
        console.log("Erc6551AccounCreatedCorrectly.");
        console.log(`accountNameInNftFormat; ${events[5].args[1]}`);
        console.log(`nameResolverNftFormatScAddress: ${events[5].args[2]}`);
        console.log(`crossChain6551AccountAddress: ${events[5].args[3]}`);

        alert
        ( 
          "Erc6551AccounCreatedCorrectly." + '\n' +  
          " " + '\n' +
          `accountNameInNftFormat; ${events[5].args[1]}` + '\n' +  
          " " + '\n' +
          `nameResolverNftFormatScAddress: ${events[5].args[2]}` + '\n' +  
          " " + '\n' +
          `crossChain6551AccountAddress: ${events[5].args[3]}`
        );  


        //window.location.reload(false);
    }

    async function setRegistry()
    {
        const tx = await smartContractInstance.connect(signer).setOtherChainRegistryAddress(otherChainRegistry);
        const txReceipt = await tx.wait();
        

        window.location.reload(false);
    }

    async function withdrawFunds()
    {
      const tx = await smartContractInstance.connect(signer).withdraw(userAddress);
      const txReceipt = await tx.wait();
        

        window.location.reload(false);
    }









    getAccountsCreatedData();

    return(
        <div>
            <ReactBorderWrapper>
                <div>
                    RegistryComponent 
                </div>

                <div style={{paddingTop: '2rem'}}>
                    user: {userAddress}
                </div>

                <div style={{paddingTop: '2rem'}}>
                    accountsCreatedData: {accountsCreated}
                </div>

                <div>
                    <h4>setOtherChainRegistry:</h4>
                    <input type="text" placeholder="registry" onChange={e => setOtherChainRegistry(e.target.value)}></input>
                    <button onClick={setRegistry}>set</button>
                </div>

                <div>
                    <h4>setNewAccountName:</h4>
                    <input type="text" placeholder="newAccountName" onChange={e => setNewAccountName(e.target.value)}></input>
                    <button onClick={createNew6551Account}>set</button>
                </div>

                <div>
                  <button onClick={withdrawFunds}>getFunds</button>
                </div>
            </ReactBorderWrapper>
        </div>
    );
}

export default RegistryComponent;