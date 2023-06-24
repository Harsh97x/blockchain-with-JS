import pkg from "crypto-js";
const { SHA256 } = pkg;

class Block {
  constructor(index, timestamp, data, prevHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.Hash = this.calculateHash();
  }
  calculateHash() {
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
    newBlock.Hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previouBlock = this.chain[this.chain.length - 1];

      if (currentBlock.Hash != previouBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.prevHash != previouBlock.Hash) {
        return false
      }
    }
  }
}

let HarshCoin = new Blockchain();
HarshCoin.addBlock(new Block(1, "11/01/2023", { amount: "2" }));
HarshCoin.addBlock(new Block(2, "12/01/2023", { amount: "5" }));

console.log(JSON.stringify(HarshCoin, null, 4));
