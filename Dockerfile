# Select Node.js as base image
FROM node:16

# Create a new directory in our Docker image where our application will be placed
WORKDIR /app

# Copy package.json and package-lock.json files into the image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy hardhat.config.js and the rest of your application into our image
COPY . .

# Set environmental variables
ARG SEPOLIA_RPC_URL
ARG PRIVATE_KEY
ENV SEPOLIA_RPC_URL=$SEPOLIA_RPC_URL
ENV PRIVATE_KEY=$PRIVATE_KEY

# Compile and deploy the smart contract
CMD ["npx", "hardhat", "run", "--network", "sepolia", "scripts/deploy.js"]
