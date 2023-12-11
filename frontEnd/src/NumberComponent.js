import { useState } from "react";

import { ethers } from "ethers";
import ReactBorderWrapper from "react-border-wrapper";

function NumberComponent(props)
{
    let userAddress = props.addressData;  
    let signer = props.signerData;

    let smartContractAddress = "0x17D35b552A23d89458063A4161FB6E8b22e54545";
    let smartContractAbi = [
        {
          "inputs": [],
          "name": "contractNumber",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "neoNumber",
              "type": "uint8"
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



    const [number, setNumber] = useState(null);
    const [newNumberToSet, setNewNumberToSet] = useState(0);

    async function getNumberData()
    {
        let numberData = await smartContractInstance.contractNumber();
        setNumber(numberData);
        console.log(numberData);
    }

    async function setNewNumberFunc()
    {
        const tx = await smartContractInstance.connect(signer).setString(newNumberToSet);
        const txReceipt = await tx.wait();
        

        window.location.reload(false);
    }









    getNumberData();

    return(
        <div>
            <ReactBorderWrapper>
                <div>
                    helloNumber 
                </div>

                <div style={{paddingTop: '2rem'}}>
                    user: {userAddress}
                    signer:
                </div>

                <div style={{paddingTop: '2rem'}}>
                    numberData: {number}

                    <div>
                        <button onClick={getNumberData}>getData</button>
                    </div>
                </div>

                <div>
                    <h4>setNewNumber:</h4>
                    <input type="number" placeholder="newNumber" onChange={e => setNewNumberToSet(e.target.value)}></input>
                    <button onClick={setNewNumberFunc}>set</button>
                </div>
            </ReactBorderWrapper>
        </div>
    );
}

export default NumberComponent;