# Smart Contract Development with Hardhat

This project is a basic smart contract development environment setup using [Hardhat](https://hardhat.org/), an Ethereum 
development environment for professionals. The project includes a simple smart contract which sets and retrieves data, tests the smart contract, and deploys it..

## Project Structure

- `contracts/`: Directory for smart contract code.
- `scripts/`: Directory for script files. Contains the deployment script.
- `test/`: Directory for test code.
- `Dockerfile`: Dockerfile for building a Docker image for the project.
- `hardhat.config.js`: Hardhat configuration file. The contract can be deployed either on Sepolia testnet
- `run.sh`: The bash script will create a docker image and run the docker container you can use `./run.sh`
- `.env`: RPC_URL and the private keys should be stored in this file locally.

or on local host

## Quick Start

In order to run the project you could execute the `./run.sh` script which will build the docker image
and run the container.In order to make the scirpt executable run first this command `chmod +x run.sh`. Inside the script there are environment variables which contain sensitive data
which will have to be encrypted or hidden, with docker secrets or attached in some secret file(out of scope).

## Contracts package

Inside contract package the GetterSetter contract is placed. [GetterSetter.sol](contracts%2FGetterSetter.sol)


## Scripts package

Inside the scripts package the deploy.js file exists which contains the setters and the getters for the smart contract. The setter data
has been randomized and not hard coded. The contract can be deployed on two separate networks:

- localhost with running the command `npx hardhat run --network localhost scripts/deploy.js`
- sepolia with running the command `npx hardhat run --network sepolia scripts/deploy.js`

Sepolia RPC URL is generated with Infura. For wallet, Metamask wallet is created with Sepolia Eth added.
For demonstration purposes those variables are placed and used in the `./run.sh` script. Of course, they should be hidden
or encrypted so they will not be visible for anyone beside the owner.

Testing
The test/ directory contains tests for the smart contract. The tests are written using the Mocha testing framework and 
the Chai assertion library. To run the tests, use the `npx hardhat test` command. I have tried to cover
one positive and one negative test case for each data type. Some negative tests will fail and that is expected.
For debugging purposes you could set Node runner configuration wher the mocha will be set as the JS file.

![Screenshot 2023-07-12 at 08.38.46.png](..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fqz%2Fjbdr7xwj2yd05ndyhsyf7kj40000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_o9zMLA%2FScreenshot%202023-07-12%20at%2008.38.46.png)

## Dockerfile

Inside the docker file all the necessary steps are listed so an image will be created and the proper commands to be executed.

## hardhat.config.js

The smart contract interaction can be run on Sepolia testnet which is generated via Infura and localhost for local deployment.