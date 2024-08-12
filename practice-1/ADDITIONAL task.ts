import { Keypair } from "@solana/web3.js";
let keypair;
do {
    keypair = Keypair.generate();
} while(!keypair.publicKey.toBase58().includes('Yura'));



console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);
console.log(`✅ Finished!`);

