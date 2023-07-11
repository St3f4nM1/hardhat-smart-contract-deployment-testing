const fs = require('fs');
const { ethers, upgrades } = require("hardhat");

// Create a function to generate random uint256
function getRandomUint256() {
    let randomNumber = ethers.BigNumber.from(
        ethers.utils.hexlify(
            ethers.utils.randomBytes(32)
        )
    );
    // Make sure the number is non-negative
    if(randomNumber.isNegative()) {
        randomNumber = randomNumber.mul(-1);
    }
    return randomNumber;
}

async function main() {
    const GetterSetter = await ethers.getContractFactory("GetterSetter");
    const getterSetter = await GetterSetter.deploy();

    console.log("Contract deployed to address:", getterSetter.address);


    // Set value to the contract
    let valueToSet = getRandomUint256();
    let tx = await getterSetter.setUint256(valueToSet);
    console.log("Value set to the contract:", valueToSet.toString());

    await tx.wait();


    // Retreive value from the contract
    let value = await getterSetter.getUint256();
    console.log("Value retrieved from the contract:", value.toString());

    let dataToSave = {
        contractAddress: getterSetter.address,
        deployerAddress: (await ethers.getSigners())[0].address,
        valueSet: value.toString(),
    };

    fs.writeFileSync("output.json", JSON.stringify(dataToSave, null, 2));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
