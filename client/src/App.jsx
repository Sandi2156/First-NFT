import React,{useEffect, useState} from 'react';
import {ethers} from 'ethers';
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import isConnected  from './main functions/isConnected'
import connectWallet from './main functions/connectWallet'
import abiNFT from './utils/abiNFT.json'
import mintNFT from './main functions/mintNFT'

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const SANDIPAN_TWITTER_LINK = `https://twitter.com/_SandipanMahata`;

const TOTAL_MINT_COUNT = 50;

const App = () => {
  // Render Methods
  const contractAddress = '0xe3De391D95150da8970BEe21ab02b873de4af8cB';
  const [options, setOptions] = useState({
    connected : false,
    walletNo : null,
    id : null
  })
  const OPENSEA_LINK = 'https://testnets.opensea.io/assets/'+contractAddress+'/'+options.id;
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={()=>{
      if(!options.connected)
        connectWallet(options, setOptions);
      else
        mintNFT(contractAddress, abiNFT.abi);
    }}>
      {options.connected ? 'Start Mining' : 'Connect to Wallet'}
    </button>
  );

  useEffect(()=>{
    isConnected(options,setOptions);

    const newMint = (from, id)=>{
      console.log('getting - ',from, id.toNumber());
      setOptions({...options, id : id.toNumber()});
    }

    let mintContract;
    if(window.ethereum)
    {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      mintContract = new ethers.Contract(contractAddress, abiNFT.abi, signer);
      mintContract.on('NewMint', newMint);
    }

    return ()=>{
      if(window.ethereum)
        mintContract.off('NewMint', newMint);
    }
  },[])  

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My Super NFT</p>
          <p className="sub-text">
            Hi Everyone I am Sandipan. A curious Developer. 'll be Happy to Connect with You 
            <a
            className="sandipan-twitter"
            href={SANDIPAN_TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{` @_Sandipan`}</a>
          </p>
          {renderNotConnectedContainer()}
        </div>
        <div className="yourNFT">
          {
            options.id && <a href={OPENSEA_LINK} target='_blank'>
            YOUR NFT
          </a>

          }
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;