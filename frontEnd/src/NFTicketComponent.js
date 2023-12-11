import { useState } from 'react';
// import { ethers } from 'ethers';

import BorderWrapper from 'react-border-wrapper';

function NFTicketComponent(props)
{
    // let smartContractAddress = "0x9E67bc8e748653F8821303AF29A0B65680e43620";
    // let smartContractAbi = 
    // [
    //     {
    //         "inputs": [
    //             {
    //             "internalType": "string",
    //             "name": "name_",
    //             "type": "string"
    //             },
    //             {
    //             "internalType": "string",
    //             "name": "symbol_",
    //             "type": "string"
    //             }
    //         ],
    //       "stateMutability": "nonpayable",
    //       "type": "constructor"
    //     },
    //     {
    //       "anonymous": false,
    //       "inputs": [
    //         {
    //           "indexed": true,
    //           "internalType": "address",
    //           "name": "owner",
    //           "type": "address"
    //         },
    //         {
    //           "indexed": true,
    //           "internalType": "address",
    //           "name": "approved",
    //           "type": "address"
    //         },
    //         {
    //           "indexed": true,
    //           "internalType": "uint256",
    //           "name": "tokenId",
    //           "type": "uint256"
    //         }
    //       ],
    //       "name": "Approval",
    //       "type": "event"
    //     },
    //     {
    //       "anonymous": false,
    //       "inputs": [
    //         {
    //           "indexed": true,
    //           "internalType": "address",
    //           "name": "owner",
    //           "type": "address"
    //         },
    //         {
    //           "indexed": true,
    //           "internalType": "address",
    //           "name": "operator",
    //           "type": "address"
    //         },
    //         {
    //           "indexed": false,
    //           "internalType": "bool",
    //           "name": "approved",
    //           "type": "bool"
    //         }
    //       ],
    //       "name": "ApprovalForAll",
    //       "type": "event"
    //     },
    //     {
    //       "anonymous": false,
    //       "inputs": [
    //         {
    //           "indexed": true,
    //           "internalType": "address",
    //           "name": "from",
    //           "type": "address"
    //         },
    //         {
    //           "indexed": true,
    //           "internalType": "address",
    //           "name": "to",
    //           "type": "address"
    //         },
    //         {
    //           "indexed": true,
    //           "internalType": "uint256",
    //           "name": "tokenId",
    //           "type": "uint256"
    //         }
    //       ],
    //       "name": "Transfer",
    //       "type": "event"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "address",
    //           "name": "to",
    //           "type": "address"
    //         },
    //         {
    //           "internalType": "uint256",
    //           "name": "tokenId",
    //           "type": "uint256"
    //         }
    //       ],
    //       "name": "approve",
    //       "outputs": [],
    //       "stateMutability": "nonpayable",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "address",
    //           "name": "owner",
    //           "type": "address"
    //         }
    //       ],
    //       "name": "balanceOf",
    //       "outputs": [
    //         {
    //           "internalType": "uint256",
    //           "name": "",
    //           "type": "uint256"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "uint256",
    //           "name": "tokenId",
    //           "type": "uint256"
    //         }
    //       ],
    //       "name": "getApproved",
    //       "outputs": [
    //         {
    //           "internalType": "address",
    //           "name": "",
    //           "type": "address"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "address",
    //           "name": "paramAddressToCheck",
    //           "type": "address"
    //         }
    //       ],
    //       "name": "getOwnedNFTicketsId",
    //       "outputs": [
    //         {
    //           "internalType": "uint256[]",
    //           "name": "",
    //           "type": "uint256[]"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "address",
    //           "name": "owner",
    //           "type": "address"
    //         },
    //         {
    //           "internalType": "address",
    //           "name": "operator",
    //           "type": "address"
    //         }
    //       ],
    //       "name": "isApprovedForAll",
    //       "outputs": [
    //         {
    //           "internalType": "bool",
    //           "name": "",
    //           "type": "bool"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [],
    //       "name": "mintNFTicket",
    //       "outputs": [],
    //       "stateMutability": "nonpayable",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [],
    //       "name": "name",
    //       "outputs": [
    //         {
    //           "internalType": "string",
    //           "name": "",
    //           "type": "string"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "uint256",
    //           "name": "tokenId",
    //           "type": "uint256"
    //         }
    //       ],
    //       "name": "ownerOf",
    //       "outputs": [
    //         {
    //           "internalType": "address",
    //           "name": "",
    //           "type": "address"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "address",
    //           "name": "from",
    //           "type": "address"
    //         },
    //         {
    //           "internalType": "address",
    //           "name": "to",
    //           "type": "address"
    //         },
    //         {
    //           "internalType": "uint256",
    //           "name": "tokenId",
    //           "type": "uint256"
    //         }
    //       ],
    //       "name": "safeTransferFrom",
    //       "outputs": [],
    //       "stateMutability": "nonpayable",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "address",
    //           "name": "from",
    //           "type": "address"
    //         },
    //         {
    //           "internalType": "address",
    //           "name": "to",
    //           "type": "address"
    //         },
    //         {
    //           "internalType": "uint256",
    //           "name": "tokenId",
    //           "type": "uint256"
    //         },
    //         {
    //           "internalType": "bytes",
    //           "name": "data",
    //           "type": "bytes"
    //         }
    //       ],
    //       "name": "safeTransferFrom",
    //       "outputs": [],
    //       "stateMutability": "nonpayable",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "address",
    //           "name": "operator",
    //           "type": "address"
    //         },
    //         {
    //           "internalType": "bool",
    //           "name": "approved",
    //           "type": "bool"
    //         }
    //       ],
    //       "name": "setApprovalForAll",
    //       "outputs": [],
    //       "stateMutability": "nonpayable",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "bytes4",
    //           "name": "interfaceId",
    //           "type": "bytes4"
    //         }
    //       ],
    //       "name": "supportsInterface",
    //       "outputs": [
    //         {
    //           "internalType": "bool",
    //           "name": "",
    //           "type": "bool"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [],
    //       "name": "symbol",
    //       "outputs": [
    //         {
    //           "internalType": "string",
    //           "name": "",
    //           "type": "string"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "uint256",
    //           "name": "index",
    //           "type": "uint256"
    //         }
    //       ],
    //       "name": "tokenByIndex",
    //       "outputs": [
    //         {
    //           "internalType": "uint256",
    //           "name": "",
    //           "type": "uint256"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "address",
    //           "name": "owner",
    //           "type": "address"
    //         },
    //         {
    //           "internalType": "uint256",
    //           "name": "index",
    //           "type": "uint256"
    //         }
    //       ],
    //       "name": "tokenOfOwnerByIndex",
    //       "outputs": [
    //         {
    //           "internalType": "uint256",
    //           "name": "",
    //           "type": "uint256"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "uint256",
    //           "name": "tokenId",
    //           "type": "uint256"
    //         }
    //       ],
    //       "name": "tokenURI",
    //       "outputs": [
    //         {
    //           "internalType": "string",
    //           "name": "",
    //           "type": "string"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [],
    //       "name": "totalSupply",
    //       "outputs": [
    //         {
    //           "internalType": "uint256",
    //           "name": "",
    //           "type": "uint256"
    //         }
    //       ],
    //       "stateMutability": "view",
    //       "type": "function"
    //     },
    //     {
    //       "inputs": [
    //         {
    //           "internalType": "address",
    //           "name": "from",
    //           "type": "address"
    //         },
    //         {
    //           "internalType": "address",
    //           "name": "to",
    //           "type": "address"
    //         },
    //         {
    //           "internalType": "uint256",
    //           "name": "tokenId",
    //           "type": "uint256"
    //         }
    //       ],
    //       "name": "transferFrom",
    //       "outputs": [],
    //       "stateMutability": "nonpayable",
    //       "type": "function"
    //     }
    // ];
    
    // let provider = new ethers.providers.Web3Provider(window.ethereum);
    // let smartContractInstance = new ethers.Contract(smartContractAddress, smartContractAbi, provider);





    // const [userNfts, setUserNfts] = useState(0);






    // async function mintNftFunc()
    // {
    //     let user = props.userConnectedFromApp;
    //     await smartContractInstance.connect(user).mintNFTicket;

    //     /*
    //     let address = props.addressFromApp;
    //     let balance = await smartContractInstance.balanceOf(address);
    //     setUserNfts(balance);
    //     */
    // }

    // async function getNftBalanceFunc()
    // {
    //     let balance = await smartContractInstance.balanceOf(props.addressFromApp);
    //     setUserNfts(balance);
    // }







    return(
        <div>
            <BorderWrapper>
                <div>
                    <h3>nftComponent:</h3>
                </div>


                <div>
                    <h3>nft: </h3>
                </div>
            </BorderWrapper>
        </div>
    )
}

export default NFTicketComponent;