#!/bin/bash

# image name
IMAGE_NAME="smart-contract-setter"

# Build the Docker image
docker build --build-arg SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/a4fc5d0566664aafac5277561df638d2" --build-arg PRIVATE_KEY="9bd25e6a011bcf9c554d963f0f04a21f267ebff6ae3fb1b5f837b9ef45687b09" -t $IMAGE_NAME .

# Run the Docker container
docker run $IMAGE_NAME
