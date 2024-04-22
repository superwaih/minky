"use client"
import React, { useState } from 'react'
import { Connection, Keypair, ParsedAccountData, PublicKey, PublicKeyInitData, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from "@solana/spl-token";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';


// const DESTINATION_WALLET = '9rh2xdaq364PTgUuxdkVTLJZbq4fxzSCySFSjBvj8JPA';
const MINT_ADDRESS = 'AJACqc19iQkvou7LiMGhpkiQ4MMKMZTpP5b7qAw4x7HY'; //You must change this value!
// const TRANSFER_AMOUNT = 1000;


const secret = [203, 62, 227, 2, 35, 104, 140, 200, 107, 54, 196, 228, 250, 76, 168, 162, 157, 132, 23, 190, 241, 189, 166, 193, 134, 9, 236, 30, 175, 214, 229, 120, 149, 118, 85, 23, 130, 64, 80, 228, 71, 194, 222, 179, 213, 145, 30, 129, 36, 154, 239, 44, 249, 231, 22, 156, 194, 208, 15, 132, 102, 202, 123, 81]
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

      const sendTokens = async (TRANSFER_AMOUNT: any,  DESTINATION_WALLET: any) => {
        setLoading(true)
      try {
        console.log(`Sending ${TRANSFER_AMOUNT} ${(MINT_ADDRESS)} from ${(FROM_KEYPAIR.publicKey.toString())} to ${(DESTINATION_WALLET)}.`)
        //Step 1
        console.log(`1 - Getting Source Token Account`);
          let sourceAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            FROM_KEYPAIR,
            new PublicKey(MINT_ADDRESS),
            FROM_KEYPAIR.publicKey
          );
          console.log(`Source Account: ${sourceAccount.address.toString()}`);
    
        //   //Step 2
          console.log(`2 - Getting Destination Token Account`);
          let destinationAccount = await getOrCreateAssociatedTokenAccount(
             connection, 
              FROM_KEYPAIR,
              new PublicKey(MINT_ADDRESS),
              new PublicKey(DESTINATION_WALLET)
          );
          console.log(`    Destination Account: ${destinationAccount.address.toString()}`);
    
        //       //Step 3
              console.log(`3 - Fetching Number of Decimals for Mint: ${MINT_ADDRESS}`);
              const numberDecimals = await getNumberDecimals(MINT_ADDRESS);
              console.log(`    Number of Decimals: ${numberDecimals}`);
         //Step 4
         const tx = new Transaction();
         tx.add(createTransferInstruction(
             sourceAccount.address,
             destinationAccount.address,
             FROM_KEYPAIR.publicKey,
             TRANSFER_AMOUNT * Math.pow(10, numberDecimals)
         ))
    
         const latestBlockHash = await connection.getLatestBlockhash('confirmed');
         tx.recentBlockhash = await latestBlockHash.blockhash;    
         const signature = await sendAndConfirmTransaction(connection,tx,[FROM_KEYPAIR]);
       
         setLoading(false)
         setIsOpen(true)
         setTransfactionUrl(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
         setSuccess(true)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setIsOpen(true)
        setErrorMessage(true)
    }
        
      }
    return {sendTokens, loading, isOpen, errorMessage, success, setIsOpen, transactionUrl}
}

export default useSendTokens