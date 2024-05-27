"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import * as web3 from '@solana/web3.js';

import { Input } from "@/components/ui/input"

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useToast } from "@/components/ui/use-toast"
import { BASE_URL, fetcher } from '../../../utils/fetcher'
import useSWR from 'swr'
import { calculateTokens } from '../../../utils/helper'
import useSendTokens from '@/contracts/useSendTokens'
import { Shell } from 'lucide-react'
import SliderInfo from '../presale-components/SliderInfo'
import RecieveTokens from '../presale-components/receive-tokens'
import ShowSuccessModal from '../presale-components/show-success';
import ShowErrorModal from '../presale-components/show-error';

const Presale = () => {
  const { data, error, isLoading } = useSWR(`${BASE_URL}/price?ids=SOL`, fetcher)
  const { sendTokens, loading, isOpen, setIsOpen, transactionUrl, errorMessage, success, } = useSendTokens()

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet()
  const [amount, setAmount] = useState<number>(null)
  const { toast } = useToast()
  const [balance, setBalance] = useState(0);

  const [txSig, setTxSig] = useState('');
  const [amountTokens, setAmountTokens] = useState(null)
  //@ts-ignore
  const TokenAddress: web3.PublicKey = `GyVn9eqqZ7X2Xucir4ZhmvUQMN2J6AJJo3Wo7YuVFMTH`
  useEffect(() => {
    const getInfo = async () => {
        if (connection && publicKey) {
            const info = await connection.getAccountInfo(publicKey);
            setBalance(info.lamports / web3.LAMPORTS_PER_SOL);
        }
    };
    getInfo();
}, [connection, publicKey]);
  
  const handleTransaction = async () => {
    if (!connection || !publicKey) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please Connect your wallet and try again",
      })
      return;
    }

    if (amount < 0.01 || amount === 0 || amount === null) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid amount. Minimum Purchase is 0.01 SOl",
      })
      return;
    }
    if(balance < amount || balance === 0 || balance === amount ){
      toast({
        variant: "destructive",
        title: "Insufficient Balance",
        description: `Your ${balance} Sol is currently insufficent. Top up your balance to purchase presale`,
      })
      return
    }
    const transaction = new web3.Transaction();
    const instruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      lamports: amount * web3.LAMPORTS_PER_SOL,
      toPubkey: TokenAddress,
    });

    transaction.add(instruction);
   
    try {
      const signature = await sendTransaction(transaction, connection);
      setTxSig(signature)
      console.log()
      sendTokens(amountTokens, publicKey)
      toast({
        title: "Deposit Successful!",
        description: "Your token will appear in your wallet soon..",
      })
    }
    catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: "There was a problem with your request.",
      })
    }
  };
 

  const handleAmountChange = (e: any) => {
    const tokens = calculateTokens(e.target.value, data?.data?.SOL.price);
    setAmountTokens(tokens)
    setAmount(e.target.value)
  }

  return (
    <div className='p-8 m-9  md:py-12 px-[20px] md:px-[50px] shadow-md bg-brand-black max-w-[800px] w-full space-y-8 rounded-[50px] border-brand-cyan border'>
      <SliderInfo />

      <div className='flex flex-col space-y-4'>
        <h3 className='text-white'>Amount you pay :</h3>
        <div className='w-full relative'>
          <Input type='number' value={amount} onChange={handleAmountChange} placeholder='0' />

        </div>
      </div>
      <RecieveTokens amountTokens={amountTokens} />
      <Button
        disabled={loading}
        onClick={handleTransaction}
        className='w-full flex gap-4 text-white py-6'>
        {loading && <Shell color='#00F5FF' className='animate-spin' />}

        Buy MAGIK
      </Button>

      {
        isOpen && success && (
          <ShowSuccessModal url={transactionUrl} amountTokens={amountTokens} isOpen={isOpen} setIsOpen={setIsOpen} />

        )
      }

      {
        isOpen && errorMessage && (
          <ShowErrorModal isOpen={isOpen} setIsOpen={setIsOpen} />

        )
      }
    </div>
  )
}

export default Presale