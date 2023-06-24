import pkg from 'crypto-js';
const { SHA256 } = pkg;

class Block {
  constructor(index, timestamp, data, prevHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.Hash = this.calculateBlock();
  }
  calculateBlock() {
    return SHA256(
      this.index + this.timestamp + this.prevhash + JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new Block(0, "01/01/2023", "Genesis Block", "0");
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().Hash;
    newBlock.Hash = newBlock.calculateBlock();
    this.chain.push(newBlock);
  }
}

let HarshCoin = new Blockchain();
HarshCoin.addBlock(new Block(1, "11/01/2023", { amount: "2" }));
HarshCoin.addBlock(new Block(2, "12/01/2023", { amount: "5" }));

console.log(JSON.stringify(HarshCoin, null, 4));
