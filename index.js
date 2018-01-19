const {Blockchain, Message} = require('./blockchain')

const blockchain = new Blockchain()

blockchain.addNewBlock(new Message('felipemfp', 'felipemfp', 'First new block'))
blockchain.addNewBlock(new Message('felipemfp', 'felipemfp', 'I love blockchains'))
blockchain.addNewBlock(new Message('felipemfp', 'felipemfp', 'Make me a new hash!!'))

console.log(blockchain.getAllBlocks())