const sha256 = require('js-sha256').sha256

class Message {
  constructor(from, to, text) {
    this.from = from
    this.to = to
    this.text = text
    this.timestamp = new Date()
  }
}

class Blockchain {
  constructor() {
    this.blocks = []
    this.createGenesisBlock()
  }

  createGenesisBlock() {
    const data = new Message('felipemfp', 'felipemfp', 'Hello, Blockchain!')
    const previousHash = 0
    const index = 0
    this.hashBlock(data, previousHash, index)
  }

  hashBlock(data, prevHash, index) {
    let hash = '', nonce = 0

    while( !this.isHashValid(hash) ){
      let input = `${JSON.stringify(data)}${prevHash}${index}${nonce}`
      hash = sha256(input)
      nonce += 1
    }
    console.log(nonce)
    this.blocks.push({
      hash, payload: data
    })
  }

  getLastHash(blocks) {
    return blocks.slice(-1)[0].hash
  }

  isHashValid(hash) {
    if (hash === '') return
    const table = hash.split('').reduce((prev, curr) => {
      if (prev[curr]) {
        prev[curr] += 1
      } else {
        prev[curr] = 1
      }
      return prev
    }, {})
    const values = Object.values(table)
    return values.every(v => v % 2 === 0) // Difficulty
  }

  addNewBlock(message) {
    const index = this.blocks.length
    const previousHash = this.getLastHash(this.blocks)
    this.hashBlock(message, previousHash, index)
  }

  getAllBlocks() {
    return this.blocks
  }
}

module.exports = {
  Blockchain,
  Message
}