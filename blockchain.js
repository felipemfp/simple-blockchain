const sha256 = require('js-sha256').sha256

class Blockchain {
  constructor() {
    this.blocks = []
    this.createGenesisBlock()
  }

  createGenesisBlock() {
    const data = 'Hello World!'
    const timestamp = new Date()
    const previousHash = 0
    const index = 0
    this.hashBlock(data, timestamp, previousHash, index)
  }

  hashBlock(data, timestamp, prevHash, index) {
    let hash = '', nonce = 0

    while( !this.isHashValid(hash) ){
      let input = `${data}${timestamp}${prevHash}${index}${nonce}`
      hash = sha256(input)
      nonce += 1
    }
    console.log(nonce)
    this.blocks.push(hash)
  }

  getLastHash(blocks) {
    return blocks.slice(-1)[0]
  }

  isHashValid(hash) {
    return hash.startsWith('0000') // Difficulty
  }

  addNewBlock(data) {
    const index = this.blocks.length
    const previousHash = this.getLastHash(this.blocks)
    this.hashBlock(data, new Date(), previousHash, index)
  }

  getAllBlocks() {
    return this.blocks
  }
}

module.exports = Blockchain