## Executing and Accessing Smart Contract without Truffle
Write a simple smart contract in Solidity and make calls to it directly via Web3

# Step 1: Settings

## 1-1) Add package
```bash
npm install -g truffle
npm install web3 solc
```

## 1-2) Launch Ganache
```bash
chmod +x ganache_bin
./ganache_bin
```

## 1-3) Launch NodeJS console
`$ node`

# Step 2: Deploy

## 2-1) Write sol file
## 2-2) Make js file for deploying
1. Add web3 instance
2. solc compile and then get ABI, bytecode
3. Make contract instance with ABI
4. Deploy contract on the chain

# Step 3: Use contract
1. Make contract instance with ABI, Contract's address
2. Send(or Call) contract's function