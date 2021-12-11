const main = async () => {
    const MyEpicNFTFactory = await hre.ethers.getContractFactory('MyEpicNFT');
    const nftContract = await MyEpicNFTFactory.deploy();
    await nftContract.deployed();
    console.log('contract address : ', nftContract.address);

    let txn = await nftContract.makeAnEpicNFT();
    await txn.wait();
    console.log('first one minted');



}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();