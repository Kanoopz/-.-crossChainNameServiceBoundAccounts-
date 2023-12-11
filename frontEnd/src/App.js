import logo from './logo.svg';
import './App.css';

import { useState } from 'react';
import { ethers } from 'ethers';

import NFTicketComponent from './NFTicketComponent';
import StringComponent from './StringComponent';
import NumberComponent from './NumberComponent';
import RegistryComponent from './RegistryComponent';
import AccountComponent from './AccountComponent';

import ReactBorderWrapper from 'react-border-wrapper';

function App() {
  const [userConnected, setUserConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);





  let provider = new ethers.providers.Web3Provider(window.ethereum);





  async function requestAccount() 
  {
    if(window.ethereum)
    {
      let accounts = await window.ethereum.request({ method: "eth_requestAccounts", });

      const _signer = await provider.getSigner();
      const _address = accounts[0];

      setAddress(_address);
      setSigner(_signer);
      setUserConnected(true);

      console.log("signer");
      console.log(_signer);
      console.log("address:");
      console.log(_address);


      setUserConnected(true);
    }
    else
    {
      console.log("Metamask isnt installed.");
    }

    console.log("userObject:");
    console.log(signer);
  }







  return (
    <div className="App">
      <header className="App-header">
        <h1>chainlinkConstellation Hackthon project:</h1>
        <h2>crossChainNameServiceBoundAccounts</h2>
      </header>


      <body style={{paddingTop: '10rem'}}>
      {
        userConnected ?
            <div>
              <div>
                <ReactBorderWrapper>
                  <div>
                    <h2>userConnected: {address}</h2>
                  </div>
                </ReactBorderWrapper>
              </div>

              <div style={{paddingTop: '2rem'}}>
                <StringComponent addressData={address} signerData={signer}/>
              </div>

              <div>
                <RegistryComponent addressData={address} signerData={signer}/>
              </div>

              <div>
                <AccountComponent addressData={address} signerData={signer}/>
              </div>
            </div>
        :
            <div>
              <button onClick={requestAccount}>connectWallet</button>
            </div>
      }
      </body>
    </div>
  );
}

export default App;
