const isWalletConnected = async(options,setOptions)=>{
  try{
    const {ethereum} = window;
    if(ethereum)
    {
      console.log('Ethereum present');

      const accounts = await ethereum.request({method : 'eth_accounts'});
      if(accounts.length != 0){
        setOptions({...options, connected : true, walletNo : accounts[0]});
        console.log(accounts[0]);
      }  
    }
    else
    {
      alert('Make sure you have metamask');
    }
  }catch(error){
    alert('error occured in isWalletConnected function');
    console.log(error);
  }
}

export default isWalletConnected;