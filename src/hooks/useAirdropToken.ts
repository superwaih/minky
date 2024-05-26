import { Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet, Wallet } from "@solana/wallet-adapter-base";

async function airdropTokens(
  connection: Connection,
  fromPublicKey: PublicKey, // Sender address (your wallet)
  toPublicKey: PublicKey, // Recipient address
  amount: number, // Amount of tokens to airdrop (in lamports)
  tokenMint: PublicKey // Public key of the token to airdrop
) {
  const wallet = useWallet();

  // Check if user is connected
  if (!wallet.connected) {
    throw new Error("Please connect your wallet");
  }

  const transaction = new Transaction();

  // Add instruction to transfer lamports to cover fees
  transaction.add(
    SystemProgram.transfer({
      fromPublicKey: wallet.publicKey,
      toPublicKey: connection.sysvar.recentBlockhash.feePayer,
      lamports: await connection.getMinimumBalanceForRentExemptAccount(0),
    })
  );

  // Add instruction to transfer tokens
  transaction.add(
    SPLToken.createTransferInstruction(
      tokenMint,
      fromPublicKey,
      toPublicKey,
      wallet.publicKey,
      [],
      amount
    )
  );

  // Sign the transaction with the connected wallet
  await transaction.partialSign(wallet.publicKey);

  // Send the transaction to the network
  const signature = await connection.sendTransaction(transaction);

  console.log("Transaction signature:", signature);

  return signature;
}
