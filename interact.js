// Import Hardhat's ethers.js
const ethers = require('hardhat').ethers;

async function main() {
    // Get the contract factory
    const GetterSetter = await ethers.getContractFactory("GetterSetter");

    // Get the contract instance at the deployed address
    const contractAddress = "0xA2cabAc6fB492536afC0e24C1D30400E42b5034B";
    const getterSetter = GetterSetter.attach(contractAddress);

    // Now, you can interact with the contract

    // // Let's set a new value
    // let valueToSet = ethers.BigNumber.from("234");
    //
    // await getterSetter.setUint256(valueToSet);
    // console.log("Value set to the contract:", valueToSet.toString());


    // Now let's retrieve the value we just set
    let value = await getterSetter.getUint256();
    console.log("Value retrieved from the contract:", value.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
