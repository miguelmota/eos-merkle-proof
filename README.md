# EOS Merkle Proof

> EOS smart contract to verify merkle proofs

## Usage

Action signature

```cpp
void verify(const vector<std::string>& proof, const vector<std::uint8_t>& positions, std::string root, std::string leaf)
```

Required parameters
- **proof** - array of proofs in hex
- **positions** - array of proof positions (0 = left, 1 = right)
- **root** - merkle root in hex
- **leaf** - leaf in hex

## Example

Generating merkle tree and merkle proofs in JavaScript

```js
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
```

Submitting EOS `verify` action to the merkle smart contract

```bash
root@af6ddce1086e:/# cleos push action merkleproof1 verify '[["3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d","bffe0b34dba16bc6fac17c08bac55d676cded5a4ade41fe2c9924a5dde8f3e5b"],[1,1],"14ede5e8e97ad9372327728f5099b95604a39593cac3bd38a343ad76205213e7","ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb"]' -p myaccount123@active
executed transaction: 5b3429ae2f49199f0d1ea7fb90e6a2aa295f428beae0ce39386f034db768af26  360 bytes  17504 us
#  merkleproof1 <= merkleproof1::verify         {"proof":["3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d","bffe0b34dba16bc6fac17c...
>> VALID: true
```

## License

[MIT](LICENSE)
