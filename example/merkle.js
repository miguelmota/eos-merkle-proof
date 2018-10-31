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
console.log('ROOT:\n', hexroot)
console.log('LEAF:\n', hexroot, '\n')

console.log('EOS PAYLOAD:',)
console.log(JSON.stringify([hexproof, pos, hexroot, hexleaf]))
