"./crossChainNameServiceBoundAccount"
Project for the chainlinkConstellation hackathon.
AbstractedAccounts controled by a domainResolver from a nameService in the format of an erc721 NFT that can make TXs across all evmEcosystem by being linked to otherChainVersions.


My inspiration for this project came from 3 things:
- Wanting to use the erc6551 tokenBoundAccount standard
- Loving crossChain stuff
- A past experience trying to attach an ENS domain to an abstractedAccount / smartAcocunt.

This is how I came up with this "./crossChainNameServiceBoundAccount".


What it does===================================================================


It creates a resolver of a domain of a nameService in the format of a erc721 nonFungibleToken, then creates a erc6551 abstracted account that is controled by that nftFormatResolver and gives it the capacity to do crossChainTxs thanks to CCIP infrastructure. 

This erc6551Accounts are also created multichain, so if I create my nameServiceBoundAccount "mySampleAccount" on polygon, another version of "mySampleAccount" is created on ethereumMainnet and theyre linked. This means that with my polygonVersion of "mySampleAccount", I can control my ethereumMainnetVersion and this enables two important things for the whole evmEcosystem:

     - evmUxUnification:
With this arquitecture of crossChain linked nameServiceBoundAccounts, the average user doesnt has to worry about the average hassle of the EOAs; he can move freely and transact across ethereumMainnet and all layerTwos from a single evmChain without worrying about changing RPCs or switching networks by ordering the otherChainsVersions of the accounts what to do. An example of this is using a polygonAccount to control their otherChainsVersions of base, arbitrum, etc and viceversa, the base and arbitrum can also control the polygonVersion since theyre all linked and have permission.

     - gasAbstraction:
This lets any user pay any Tx on any chain with any nativeAsset of any evmChain, for example; I can pay Txs on arbitrum, base, optimism and linea with matic, this is up to the user so if he just has mainnetEth, he pays with that any Tx on any layerTwo. 
Just to be clear; this enables that the user can execute any tx on anyEvm chain as long as he has any nativeAsset of layerTwos or mainnet available.

Is important to note that the nameServices works in the chain is implemented but also as crossChain, so it can be used on multiples chains, aside from.



How we built it================================================================


I build a customErc721 contract that mints just one id (just one NFT), a customErc6551AccountImplementatation and a crossChainVersion of the erc6551Account that is linked to the anotherChainAccount and the erc6551Registry which in combination with CCIP infrastructure creates the ccNameServiceBoundAccounts and links them across chains so they can be controled.
Aside from the contracts I used the regular fullStackDapp stack; ethersJs, reactJs, tenderly, metamask.



What's next for "./crossChain6551NameService"==================================


Once CCIP adds more available chains, deploy the protocol / project there so that the user have more options to use and, in the case that CCIP starts being used on nonEvmCompatibleChains, develop that specific blockchain version of the crossChainNameServiceBoundAccount.




=============================================================================================================================================================================================


<img width="1180" alt="Captura de pantalla 2023-12-10 a la(s) 9 09 57 p m" src="https://github.com/Kanoopz/-.-crossChainNameServiceBoundAccounts-/assets/43384993/d5b8bc8f-786a-4e00-ab46-7b43b94c6908">




<img width="1217" alt="Captura de pantalla 2023-12-10 a la(s) 9 29 52 p m" src="https://github.com/Kanoopz/-.-crossChainNameServiceBoundAccounts-/assets/43384993/ecd34135-8d6d-4bc5-8e85-26ffa9cde596">




