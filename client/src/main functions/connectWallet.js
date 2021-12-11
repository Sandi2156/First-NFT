const connectWallet = async(options, setOptions)=>{
  const {ethereum} = window;
  if(!ethereum){
    alert('Make sure you have metamask');
    return;
  }
  const accounts = await ethereum.request({method : 'eth_requestAccounts'});
  console.log(accounts[0])
  setOptions({...options, connected : true, walletNo : accounts[0]});
}

export default connectWallet;