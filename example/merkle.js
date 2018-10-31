const ecc = require('eosjs-ecc')
const MerkleTree = require('merkletreejs')

const buf2hex = x => x.toString('hex')
const sha256 = x => Buffer.from(ecc.sha256(x), 'hex')

const leaves = ['a', 'b', 'c', 'd'].map(x => sha256(x))
const tree = new MerkleTree(leaves, sha256)
const hexroot = buf2hex(tree.getRoot())
const hexleaf = buf2hex(tree.getLeaves()[0])
const proof = tree.getProof(leaves[0])
const hexproof = proof.map(x => buf2hex(x.data))
const pos = proof.map(x => (x.position === 'right')>>>0)

console.log('PROOF:\n', JSON.stringify(hexproof, null, 2))
/*
 [
  "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d",
  "bffe0b34dba16bc6fac17c08bac55d676cded5a4ade41fe2c9924a5dde8f3e5b"
]
*/

console.log('ROOT:\n', hexroot)
// 14ede5e8e97ad9372327728f5099b95604a39593cac3bd38a343ad76205213e7
console.log('LEAF:\n', hexleaf, '\n')
// ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb

console.log('EOS PAYLOAD:',)
console.log(JSON.stringify([hexproof, pos, hexroot, hexleaf]))
/*
[["3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d","bffe0b34dba16bc6fac17c08bac55d676cded5a4ade41fe2c9924a5dde8f3e5b"],[1,1],"14ede5e8e97ad9372327728f5099b95604a39593cac3bd38a343ad76205213e7","ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb"]
*/
