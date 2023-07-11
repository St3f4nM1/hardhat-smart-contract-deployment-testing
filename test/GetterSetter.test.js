const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("GetterSetter", function () {

    beforeEach(async () => {
        const GetterSetter = await ethers.getContractFactory("GetterSetter");
        getterSetter = await GetterSetter.deploy();
        await getterSetter.deployed();
    });

    it("should set and retrieve the bytes32 value correctly", async function () {
        const expectedValue = ethers.utils.formatBytes32String("Hello, World!");

        await getterSetter.setBytes32(expectedValue);
        const retrievedValue = await getterSetter.getBytes32();

        expect(retrievedValue).to.equal(expectedValue);
    });

    it("Should set the correct value for uint256", async function () {
        let valueToSet = ethers.BigNumber.from('1');
        await getterSetter.setUint256(valueToSet);
        let retrievedValue = await getterSetter.getUint256();
        expect(retrievedValue).to.equal(valueToSet);
    });

    it("Should set the correct value for bytes", async function () {
        let valueToSet = ethers.utils.randomBytes(10);
        await getterSetter.setBytes(valueToSet);
        let retrievedValue = await getterSetter.getBytes();
        expect(ethers.utils.hexlify(retrievedValue)).to.equal(ethers.utils.hexlify(valueToSet));
    });


    it("Should not allow setting bytes32 by non-owner", async function () {
        const signers = await ethers.getSigners();
        const nonOwner = signers[1];
        await expect(getterSetter.connect(nonOwner).setBytes32(ethers.utils.formatBytes32String("Test"))).to.be.reverted;
    });


// TODO better error message to be implemented
    it("Should fail when setting a negative value for uint256", async function () {
        let valueToSet = ethers.BigNumber.from('-1');
        await expect(getterSetter.setUint256(valueToSet)).to.be.revertedWith("");
    });


    it("Should fail when setting an empty value for bytes", async function () {
        let valueToSet = ethers.utils.randomBytes(0);
        await expect(getterSetter.setBytes(valueToSet)).to.be.reverted;
    });

    it("Should fail when setting value longer than 32 bytes for bytes32", async function () {
        let valueToSet = ethers.utils.formatBytes32String('This is a string that is longer than 32 bytes');
        await expect(getterSetter.setBytes32(valueToSet)).to.be.reverted;
    });

    it("Should fail when setting an empty value for bytes", async function() {
        let valueToSet = ethers.utils.randomBytes(0);
        // check if it was reverted without specifying the revert reason
        await expect(getterSetter.setBytes(valueToSet)).to.be.reverted;
    });

});
