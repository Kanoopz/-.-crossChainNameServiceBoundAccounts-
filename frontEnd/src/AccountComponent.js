import { useState } from "react";

import { ethers } from "ethers";
import ReactBorderWrapper from "react-border-wrapper";

function AccountComponent(props)
{
    let userAddress = props.addressData;  
    let signer = props.signerData;

    let smartContractAddress = "0xfBE166F3237FcE584F38E842694d06Dcd7728715";
    let smartContractAbi = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "NotAuthorized",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "OwnershipCycle",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "TransactionExecuted",
        "type": "event"
      },
      {
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [],
        "name": "erc6551RegistryAddress",
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
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "executeCall",
        "outputs": [
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "stateMutability": "payable",
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
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "executeCrossChainOrderCall",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getContratAddress",
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
            "internalType": "bytes32",
            "name": "hash",
            "type": "bytes32"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "name": "isValidSignature",
        "outputs": [
          {
            "internalType": "bytes4",
            "name": "magicValue",
            "type": "bytes4"
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
        "name": "token",
        "outputs": [
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
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ];
    
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    
    let smartContractInstance = new ethers.Contract(smartContractAddress, smartContractAbi, provider);



    ////////////////////////////////////////////
    //  bytesDataPayload setUp             /////
    ////////////////////////////////////////////
    const [functionAbiArray, setFunctionAbiArray] = useState([]);
    const [functionSigForDataPayload, setFunctionSigForDataPayload] = useState("");
    const [paramsForDataPayloadArray, setParamsForDataPayloadArray] = useState([]);

    const [inputFunctionAbiToAdd, setInputFunctionAbiToAdd] = useState("");
 
    const [generatedBytesDataPayload, setGeneratedBytesDataPayload] = useState("");

    ////////////////////////////////////////////
    //  createTxParams                     /////
    ////////////////////////////////////////////
    const [createTxParamTo, setCreateTxParamTo] = useState("");
    const [createTxParamData, setCreateTxParamData] = useState("");
    const [createTxParamValue, setCreateTxParamValue] = useState("");

    const [selectedTypeParam, setSelectedTypeParam] = useState("");
    const [inputParamToAdd, setInputParamToAdd] = useState("");



    const [registryAddress, setRegistryAddress] = useState("");







    function addParamToParamArray()
    {
      console.log("hello");
      console.log(selectedTypeParam);
      console.log("TYPE OF");
      console.log(typeof(selectedTypeParam));

      let type = selectedTypeParam;

      console.log("Type:");
      console.log(type);

      if(type == "uint256")
      {
        let numberParam = Number(inputParamToAdd);

        console.log("---------------------");

        console.log("preArray:");
        console.log(paramsForDataPayloadArray);

        console.log("//////////////////////");
        console.log("selectedTypeParam:");
        console.log(selectedTypeParam);

        console.log("typeOf selectedTypeParam:");
        console.log(typeof(selectedTypeParam));

        console.log("=====================");

        console.log("inputParamToAdd:");
        console.log(numberParam);

        console.log("typeOf inputParamToAdd:");
        console.log(typeof(numberParam));

        //paramsForDataPayloadArray.push(valueToAdd);
        setParamsForDataPayloadArray(prevValues => [...prevValues, numberParam]);

        console.log("=====================")

        console.log("postArray:");
        console.log(paramsForDataPayloadArray);

        console.log("//////////////////////");
      }
      else if(type == "bool")
      {
        if(inputParamToAdd == "true")
        {
          let booleanParam = true;

          console.log("---------------------");

          console.log("preArray:");
          console.log(paramsForDataPayloadArray);

          console.log("//////////////////////");
          console.log("selectedTypeParam:");
          console.log(selectedTypeParam);

          console.log("typeOf selectedTypeParam:");
          console.log(typeof(selectedTypeParam));

          console.log("=====================");

          console.log("inputParamToAdd:");
          console.log(booleanParam);

          console.log("typeOf inputParamToAdd:");
          console.log(typeof(booleanParam));

          //paramsForDataPayloadArray.push(valueToAdd);
          setParamsForDataPayloadArray(prevValues => [...prevValues, booleanParam]);

          console.log("=====================")

          console.log("postArray:");
          console.log(paramsForDataPayloadArray);

          console.log("//////////////////////");
        }
        else if(inputParamToAdd == "false")
        {
          let booleanParam = false;

          console.log("---------------------");

          console.log("preArray:");
          console.log(paramsForDataPayloadArray);

          console.log("//////////////////////");
          console.log("selectedTypeParam:");
          console.log(selectedTypeParam);

          console.log("typeOf selectedTypeParam:");
          console.log(typeof(selectedTypeParam));

          console.log("=====================");

          console.log("inputParamToAdd:");
          console.log(booleanParam);

          console.log("typeOf inputParamToAdd:");
          console.log(typeof(booleanParam));

          //paramsForDataPayloadArray.push(valueToAdd);
          setParamsForDataPayloadArray(prevValues => [...prevValues, booleanParam]);

          console.log("=====================")

          console.log("postArray:");
          console.log(paramsForDataPayloadArray);

          console.log("//////////////////////");
        }
        else
        {
          console.log("ERROR; BOOLEAN VALUE INCORRECT.");
        }
      }
      else if(type == "address" || type == "bytes" || type == "bytes32" || type == "string")
      {
        console.log("---------------------");

        console.log("preArray:");
        console.log(paramsForDataPayloadArray);

        console.log("//////////////////////");
        console.log("selectedTypeParam:");
        console.log(selectedTypeParam);

        console.log("typeOf selectedTypeParam:");
        console.log(typeof(selectedTypeParam));

        console.log("=====================");

        console.log("inputParamToAdd:");
        console.log(inputParamToAdd);

        console.log("typeOf inputParamToAdd:");
        console.log(typeof(inputParamToAdd));

        //paramsForDataPayloadArray.push(valueToAdd);
        setParamsForDataPayloadArray(prevValues => [...prevValues, inputParamToAdd]);

        console.log("=====================")

        console.log("postArray:");
        console.log(paramsForDataPayloadArray);

        console.log("//////////////////////");
      }
    }

    function getFunctionsAbiArray()
    {
      console.log(functionAbiArray);
    }

    function getDataPayloadParams()
    {
      console.log(paramsForDataPayloadArray);
    }

    function getFunctionSigString()
    {
      console.log(functionSigForDataPayload);
    }

    function generateBytesDataPayload()
    {
      let ABI = functionAbiArray;
      let abiInterface = new ethers.utils.Interface(ABI);
      let bytesData = abiInterface.encodeFunctionData(functionSigForDataPayload, paramsForDataPayloadArray);

      console.log("bytesData");
      console.log(bytesData);

      //setTxBytesData(bytesData);
      setGeneratedBytesDataPayload(bytesData);
    }



    function getToValueFunc()
    {
      console.log(createTxParamTo);
    }

    function getDataValueFunc()
    {
      console.log(createTxParamData);
    }

    function getValueValueFunc()
    {
      console.log(createTxParamValue);
    }


    function getParamsArray()
    {
      console.log(paramsForDataPayloadArray);
    }



    async function getRegistryData()
    {
      let _registryAddress = await smartContractInstance.erc6551RegistryAddress();
      setRegistryAddress(_registryAddress);
    }

    async function execute6551Tx()
    {
      const tx = await smartContractInstance.connect(signer).executeCall(createTxParamTo, createTxParamValue, createTxParamData);
      const txReceipt = await tx.wait();
        

      window.location.reload(false);
    }

    async function executeCrossChain6551Tx()
    {
      const tx = await smartContractInstance.connect(signer).executeCrossChainOrderCall(createTxParamTo, createTxParamValue, createTxParamData);
      const txReceipt = await tx.wait();
        

      window.location.reload(false);
    }


    getRegistryData();









    return(
        <div>
            <ReactBorderWrapper>
                <div>
                    AccountComponent
                </div>

                <div style={{paddingTop: '2rem'}}>
                    user: {userAddress}
                    erc6551Account: {smartContractAddress}
                </div>

                <div style={{paddingTop: '4rem'}}>
                  <div>
                  <ReactBorderWrapper>
                    <h3>functionAbi for txDataPayload:</h3>
                    <input type="text" placeholder="functionAbi" onChange={e => setInputFunctionAbiToAdd(e.target.value)}></input>
                    <button onClick={() => setFunctionAbiArray(prevValues => [...prevValues, inputFunctionAbiToAdd])}>setFunctionAbi</button>

                    <div style={{paddingTop: '1rem'}}><button onClick={getFunctionsAbiArray}>getFunctionAbiArray</button></div>
                  </ReactBorderWrapper>
                </div>

                <div style={{ paddingTop: '1rem' ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <ReactBorderWrapper>
                    <h3>functionSignatureString for txDataPayload:</h3>
                    <input type="text" placeholder="functionSigString" onChange={e => setFunctionSigForDataPayload(e.target.value)}></input>
                  </ReactBorderWrapper>
                </div>

                  <div style={{ paddingTop: '1rem' ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ReactBorderWrapper>
                      <h3>Parameters for txDataPayload:</h3>
                      <input type="text" placeholder="paramToAdd" onChange={e => setInputParamToAdd(e.target.value)}></input>
                      <button onClick={addParamToParamArray}>addToParamArray</button>

                      <div>
                        <select onChange={event => setSelectedTypeParam(event.target.value)} defaultValue={selectedTypeParam}>
                          <option value ="noValue">selectTypeOfValue</option>
                          <option value="address">address</option>
                          <option value="uint256">uint256</option>
                          <option value="bytes">bytes</option>
                          <option value="bytes32">bytes32</option>
                          <option value="string">string</option>
                          <option value="bool">bool</option>
                        </select>
                      </div>

                      <div style={{paddingTop: '1rem'}}><button onClick={getParamsArray}>getArray</button></div>
                    </ReactBorderWrapper>
                  </div>

                  <div style={{ paddingTop: '1rem' ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ReactBorderWrapper>
                      <div>
                        <button onClick={getFunctionsAbiArray}>getFunctionAbiArray</button>
                        <button onClick={getDataPayloadParams}>getDataPayloadParams</button>
                        <button onClick={getFunctionSigString}>getFunctionSigString</button>
                      </div>
                      <h2>Generate bytesDataPayload:</h2>
                      <h3>genetatedBytesDataPayload: {generatedBytesDataPayload}</h3>
                      <div onClick={generateBytesDataPayload} style={{ paddingTop: '0.5rem' ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}><button>generate</button></div>
                    </ReactBorderWrapper>
                  </div>



                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem'}}>
                    <ReactBorderWrapper>
                      <div>
                        <button onClick={getToValueFunc}>getToValue</button>
                        <button onClick={getDataValueFunc}>getDataValue</button>
                        <button onClick={getValueValueFunc}>getValueValue</button>   
                      </div>
                      
                      <h3>createTx:</h3>
                      
                      <h3 style={{paddingTop: '1.5rem'}}>To:</h3>
                      <input type="text" placeholder="paramToAdd" onChange={e => setCreateTxParamTo(e.target.value)}></input>

                      <h3>Data:</h3>
                      <input type="text" placeholder="paramToAdd" onChange={e => setCreateTxParamData(e.target.value)}></input>

                      <h3>Value:</h3>
                      <input type="number" placeholder="paramToAdd" onChange={e => setCreateTxParamValue(e.target.value)}></input>

                      <div style={{paddingTop: '1rem'}}><button onClick={execute6551Tx}>createTx</button></div>
                    </ReactBorderWrapper>
                  </div>


                  <div>
                    <ReactBorderWrapper>
                      <div>
                        <button onClick={getToValueFunc}>getToValue</button>
                        <button onClick={getDataValueFunc}>getDataValue</button>
                        <button onClick={getValueValueFunc}>getValueValue</button>   
                      </div>
                      
                      <h3>createCrossChainOrderTx:</h3>
                      
                      <h3 style={{paddingTop: '1.5rem'}}>To:</h3>
                      <input type="text" placeholder="paramToAdd" onChange={e => setCreateTxParamTo(e.target.value)}></input>

                      <h3>Data:</h3>
                      <input type="text" placeholder="paramToAdd" onChange={e => setCreateTxParamData(e.target.value)}></input>

                      <h3>Value:</h3>
                      <input type="number" placeholder="paramToAdd" onChange={e => setCreateTxParamValue(e.target.value)}></input>

                      <div style={{paddingTop: '1rem'}}><button onClick={executeCrossChain6551Tx}>createCrossChainTx</button></div>
                    </ReactBorderWrapper>
                  </div>
                </div>
            </ReactBorderWrapper>
        </div>
    );
}

export default AccountComponent;