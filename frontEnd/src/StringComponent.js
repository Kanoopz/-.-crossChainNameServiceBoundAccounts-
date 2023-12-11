import { useState } from "react";

import { ethers } from "ethers";
import ReactBorderWrapper from "react-border-wrapper";

function StringComponent(props)
{
    let userAddress = props.addressData;  
    let signer = props.signerData;


    let smartContractAddress = "0x3f41CC659523392330AD67049D55973dAf142Ee7";
    let smartContractAbi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "contractString",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "neoString",
              "type": "string"
            }
          ],
          "name": "setString",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
    
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    
    let smartContractInstance = new ethers.Contract(smartContractAddress, smartContractAbi, provider);



    const [string, setString] = useState(null);
    const [newStringToSet, setNewStringToSet] = useState(0);

    async function getStringData()
    {
        let stringData = await smartContractInstance.contractString();
        setString(stringData);
        console.log(stringData);
    }

    async function setNewStringFunc()
    {
        const tx = await smartContractInstance.connect(signer).setString(newStringToSet);
        const txReceipt = await tx.wait();
        

        window.location.reload(false);
    }









    getStringData();

    return(
        <div>
            <ReactBorderWrapper>
                <div>
                    StringContract 
                </div>

                <div style={{paddingTop: '2rem'}}>
                    user: {userAddress}
                </div>

                <div style={{paddingTop: '3rem'}}>
                  This will always give error as long as is not on mumbaiTestnet since this contract is on that chain and right know metamask is on other chain.
                </div>

                <div style={{paddingTop: '2rem'}}>
                    stringData: {string}

                    <div>
                        <button onClick={getStringData}>getData</button>
                    </div>
                </div>

                <div>
                    <h4>setNewstring:</h4>
                    <input type="text" placeholder="newString" onChange={e => setNewStringToSet(e.target.value)}></input>
                    <button onClick={setNewStringFunc}>set</button>
                </div>
            </ReactBorderWrapper>
        </div>
    );
}

export default StringComponent;