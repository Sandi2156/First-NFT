const main = async () => {
    const MyEpicNFTFactory = await hre.ethers.getContractFactory('MyEpicNFT');
    const nftContract = await MyEpicNFTFactory.deploy();
    await nftContract.deployed();
    console.log('contract address : ', nftContract.address);

    let txn = await nftContract.makeAnEpicNFT();
    let Txn = await txn.wait();
    console.log('first one minted');
    console.log(Txn);


}

const runMain = async () => {
    try {
        await main();
    } catch (error) {
        console.error(error);
    }
}

runMain();