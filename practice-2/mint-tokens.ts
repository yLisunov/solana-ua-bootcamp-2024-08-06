import "dotenv/config";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey(
  "55mApPVmcKfYFWvCHbTSfdsH9NYffx8FsttdPA54X72s"
);

const recipientAssociatedTokenAccount = new PublicKey(
    "CvyE7ZfFtJkVGVq87LsgpZfbbFszZXogBBXG9LXX6Nho"
  );
  
  const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );
  
  const link = getExplorerLink("transaction", transactionSignature, "devnet");
  
  console.log(`✅ Success! Mint Token Transaction: ${link}`);