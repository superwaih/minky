"use client"
import  { useState } from 'react'
import { Keypair, ParsedAccountData, PublicKey, PublicKeyInitData, sendAndConfirmTransaction, Transaction, TransactionExpiredBlockheightExceededError } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from "@solana/spl-token";
import { useConnection } from '@solana/wallet-adapter-react';

const MINT_ADDRESS = 'Czaes1jRAWrhJhNhkNQm3Zj4FmeErosomAXcTzJ116PX'; //You must change this value!



const secret = [158,189,169,85,74,130,242,211,49,123,5,204,68,3,152,120,111,133,138,182,57,96,168,206,250,45,82,183,193,10,141,200,237,88,94,124,52,86,121,110,129,122,53,139,177,207,87,100,199,240,166,193,70,75,109,226,149,232,46,199,0,153,213,244]
const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret))

const useSendTokens = () => {
    const { connection } = useConnection()

    let [isOpen, setIsOpen] = useState(false)
    const [transactionUrl, setTransfactionUrl] = useState('')
    const [success, setSuccess] = useState(false)
    const[errorMessage, setErrorMessage]= useState(false)
    const [loading, setLoading] = useState(false)
    async function getNumberDecimals(mintAddress: string): Promise<number> {
        const info = await connection.getParsedAccountInfo(new PublicKey(MINT_ADDRESS));
        const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
        return result;
      }

      const sendTokens = async (TRANSFER_AMOUNT, DESTINATION_WALLET) => {
        setLoading(true);
        try {
          console.log(`Sending ${TRANSFER_AMOUNT} ${(MINT_ADDRESS)} from ${(FROM_KEYPAIR.publicKey.toString())} to ${(DESTINATION_WALLET)}.`);
      
          // Step 1: Get Source Token Account
          console.log(`1 - Getting Source Token Account`);
          let sourceAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            FROM_KEYPAIR,
            new PublicKey(MINT_ADDRESS),
            FROM_KEYPAIR.publicKey
          );
          console.log(`Source Account: ${sourceAccount.address.toString()}`);
      
          // Step 2: Get Destination Token Account
          console.log(`2 - Getting Destination Token Account`);
          let destinationAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            FROM_KEYPAIR,
            new PublicKey(MINT_ADDRESS),
            new PublicKey(DESTINATION_WALLET)
          );
          console.log(`Destination Account: ${destinationAccount.address.toString()}`);
      
          // Step 3: Fetch Number of Decimals for Mint
          console.log(`3 - Fetching Number of Decimals for Mint: ${MINT_ADDRESS}`);
          const numberDecimals = await getNumberDecimals(MINT_ADDRESS);
          console.log(`Number of Decimals: ${numberDecimals}`);
      
          // Step 4: Create and Send Transaction
          const sendTransaction = async () => {
            const tx = new Transaction();
            tx.add(createTransferInstruction(
              sourceAccount.address,
              destinationAccount.address,
              FROM_KEYPAIR.publicKey,
              TRANSFER_AMOUNT * Math.pow(10, numberDecimals)
            ));
      
            const latestBlockHash = await connection.getLatestBlockhash('confirmed');
            tx.recentBlockhash = latestBlockHash.blockhash;
            tx.feePayer = FROM_KEYPAIR.publicKey;
      
            try {
              const signature = await sendAndConfirmTransaction(connection, tx, [FROM_KEYPAIR]);
              return signature;
            } catch (error) {
              console.error('Transaction failed:', error);
              throw error;
            }
          };
      
          let signature;
          try {
            signature = await sendTransaction();
          } catch (error) {
            if (error instanceof TransactionExpiredBlockheightExceededError) {
              console.log('Transaction expired, retrying...');
              signature = await sendTransaction(); // Retry sending the transaction
            } else {
              throw error;
            }
          }
      
          setLoading(false);
          setIsOpen(true);
          setTransfactionUrl(`https://explorer.solana.com/tx/${signature}`);
          setSuccess(true);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setIsOpen(true);
          setErrorMessage(true);
        }
      };
      
    return {sendTokens, loading, isOpen, errorMessage, success, setIsOpen, transactionUrl}
}

export default useSendTokens