import crypto from "crypto";
import secp256k1 from "secp256k1";
import createKeccakHash from "keccak";

const debug = false;

function Private_create() {
  let privateKey;
  do {
    privateKey = crypto.randomBytes(32);
  } while (secp256k1.privateKeyVerify(privateKey) === false);

  if (debug) {
    console.log(`PrivateKey : ${privateKey.toString("hex")}`);
  }
  return privateKey;
}



function Public_create(privateKey, compressed = false) {
  const publicKey = secp256k1.publicKeyCreate(privateKey, compressed);
  const buffer = Buffer.from(publicKey);

  if (debug) {
    console.log(`PublicKey :${buffer.toString("hex")}`);
  }

  return buffer;
}

function createAddress(publicKey) {
  const hash = createKeccakHash("keccak256")
    .update(publicKey.slice(1))
    .digest("hex");
  const address = "0x" + hash.slice(24);

  if (debug) {
    console.log(`Address:${address}`);
  }
  return address;
}

function toChecksumAddress (address) {
    address = address.toLowerCase().replace('0x', '')
    var hash = createKeccakHash('keccak256').update(address).digest('hex')
    var ret = '0x'

    for (var i = 0; i < address.length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        ret += address[i].toUpperCase()
      } else {
        ret += address[i]
      }
    }

    return ret
  }



const privateKey = Buffer.from(
  "feabfbeb81d7ddc11eb2bf348060e34d4ec340daf1188cfe5f3045c9db9afb10",
  "hex"
);
const publicKey = Public_create(privateKey);
const address = createAddress(publicKey);
const sum = toChecksumAddress(address);

if (address =="0x4C8E90b6d79f6fD77e68A02dc3407d232cf497ED".toLowerCase()) {
    console.log("\n Generating address is successful")
}
console.log(sum);
