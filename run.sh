#!/bin/bash

# image name
IMAGE_NAME="smart-contract-setter"

# Build the Docker image
# DISCLAIMER: Private key should not be exposed here since it is sensitive data
docker build --build-arg SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/a4fc5d0566664aafac5277561df638d2" --build-arg PRIVATE_KEY="your-private-key" -t $IMAGE_NAME .

# Run the Docker container
docker run $IMAGE_NAME
