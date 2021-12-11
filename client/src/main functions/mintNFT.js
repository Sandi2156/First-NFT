import {ethers} from 'ethers'
const mintNFT = async(contractAddress, abi)=>{
  try{
    const {ethereum} = window;
    if(!ethereum){
      alert('make sure you have metamask');
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(contractAddress, abi, signer);

    console.log('asking for gas');
    let txn = await connectedContract.makeAnEpicNFT();
    console.log('mining');
    await txn.wait();
    console.log('mining complete', txn.hash);

  }catch(error){
    alert('Error occured while minting NFT');
    console.log(error);
  }
}

export default mintNFT;