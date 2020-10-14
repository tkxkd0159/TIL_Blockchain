/* eslint-disable no-unused-vars */

class BlockHeader {
  constructor(version, index, previousHash, timestamp, merkleRoot) {
    this.version = version;
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.merkleRoot = merkleRoot;
  }
}

class Block {
    constructor(header, data) {
        this.header = header;
        this.data = data;
    }
}

var blockchain = [];

function getBlockchain() { return blockchain; }
function getLatestBlock() { return blockchain[blockchain.length - 1]; }

// Calculate block hash value
const CryptoJS = require("crypto-js");

function calculateHash(version, index, previousHash, timestamp, merkleRoot){
    return CryptoJS.SHA256(version + index + previousHash + timestamp + merkleRoot).toString().toUpperCase();
}

function calculateHashForBlock(block) {
    return calculateHash(
        block.header.version,
        block.header.index,
        block.header.previousHash,
        block.header.timestamp,
        block.header.merkleRoot
    );
}

const merkle = require("merkle");

function getGenesisBlock(){
    const version = "1.0.0";
    const index = 0;
    const previousHash ='0'.repeat(64);
}