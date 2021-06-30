const Web3 = require('web3')
var solc = require('solc');
const fs = require('fs');

const web3 = new Web3("http://localhost:7545")
const rootAddress = '0xfffaD83991A6F01d5596ff64038618d612660622';

const SOLC_TEST = false
const FILE_NAME = 'SimpleStorage.sol'
const RAW_FILE_NAME = FILE_NAME.split('.')[0]

sourceCode = fs.readFileSync(FILE_NAME).toString()

var input = {
    language: 'Solidity',
    sources: {
      'SimpleStorage.sol': {
        content: sourceCode
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

// Generate Bytecode, ABI, metadata
var output = JSON.parse(solc.compile(JSON.stringify(input)));
if (SOLC_TEST) {
  for (var contractName in output.contracts[FILE_NAME]) {
      console.log(
        contractName +
          ': ' +
          output.contracts[`${contractName}.sol`][contractName].evm.bytecode.object
      );
  }
}

fs.writeFileSync(`out/${RAW_FILE_NAME}.json`, JSON.stringify(output.contracts[FILE_NAME].SimpleStorage.abi))
const myBytecode = output.contracts[FILE_NAME][RAW_FILE_NAME].evm.bytecode.object
const myabi = output.contracts[FILE_NAME][RAW_FILE_NAME].abi
const myContract = new web3.eth.Contract(myabi)
myContract.deploy({data: myBytecode}).send({from: rootAddress, gas: 4700000})
