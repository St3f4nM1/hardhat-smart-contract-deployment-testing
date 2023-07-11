const fs = require('fs');
const {ethers, upgrades} = require("hardhat");

// Create a function to generate random uint256
function getRandomUint256() {
    let randomNumber = ethers.BigNumber.from(ethers.utils.hexlify(ethers.utils.randomBytes(32)));
    // Make sure the number is non-negative
    if (randomNumber.isNegative()) {
        randomNumber = randomNumber.mul(-1);
    }
    return randomNumber;
}

function getRandomBytes32() {
    return ethers.utils.hexlify(ethers.utils.randomBytes(32));
}

// Create a function to generate random bytes32
function getRandomBytes() {
    return ethers.utils.randomBytes(10); // generates 10 random bytes
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

    // Set bytes32 to the contract
    let bytes32ToSet = getRandomBytes32();
    let tx32Bytes = await getterSetter.setBytes32(bytes32ToSet);
    console.log("Bytes32 set to the contract:", bytes32ToSet);

    await tx32Bytes.wait();


    let bytesToSet = getRandomBytes();
    let txBytes = await getterSetter.setBytes(bytesToSet);
    console.log("Bytes set to the contract:", ethers.utils.hexlify(bytesToSet));

    await txBytes.wait();


    // Retreive value from the contract
    let value = await getterSetter.getUint256();
    console.log("Value retrieved from the contract:", value.toString());

    // Retrieve bytes32 from the contract
    let bytes32 = await getterSetter.getBytes32();
    console.log("Bytes32 retrieved from the contract:", bytes32);

    // Retrieve bytes from the contract
    let bytes = await getterSetter.getBytes();
    console.log("Bytes retrieved from the contract:", ethers.utils.hexlify(bytes));

    let dataToSave = {
        contractAddress: getterSetter.address,
        deployerAddress: (await ethers.getSigners())[0].address,
        valueSet: value.toString(),
        bytes32Set: bytes32,
        bytesSet: ethers.utils.hexlify(bytes)
    };

    fs.writeFileSync("output.json", JSON.stringify(dataToSave, null, 2));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
