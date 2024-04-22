'use client'
import React from 'react'
import SolanaLogo from '../icons/SolanaLogo'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';


const TOKEN_ADDRESS = 'AJACqc19iQkvou7LiMGhpkiQ4MMKMZTpP5b7qAw4x7HY'
const SliderInfo = () => {
//   const { connection } = useConnection();
//   const { publicKey, sendTransaction } = useWallet()
//   const getTokenBalanceWeb3 = async(tokenAccount) => {
//     const info = await connection.getTokenAccountBalance(tokenAccount);
//     if (info.value.uiAmount == null) throw new Error('No balance found');
//     console.log('Balance (using Solana-Web3.js): ', info.value.uiAmount);
//     return info.value.uiAmount;
// }
// const addree = getTokenBalanceWeb3(TOKEN_ADDRESS) 
// console.log(addree)
  return (
    <div className='flex space-y-6 flex-col'>
         <h3 className='text-white text-center'>1 MGK = $0.0001</h3>
      <p className='text-white flex-col flex md:flex-row gap-2 items-center text-center  text-[25px]'><span className='text-brand-cyan font-bold'>Amount Raised :</span> <span>$500 / $5,000,000</span></p>
      <Slider defaultValue={[33]} max={100} step={1} />
      <div className='flex md:flex-row flex-col gap-4 items-center justify-center'>
        <Button
          variant={'secondary'}
          size={'sm'}
          className='text-white font-bold flex gap-4 '>
          <SolanaLogo />
          
          <div>
            <h3>Sol</h3>
            <p className='text-sm font-normal text-brand-gray'>Sol</p>
          </div>
        </Button>
        {/* <Button
          //  size={'sm'}
          className='!py-6 flex gap-4'
          variant={'secondary'}
        >
          <UsdtIcon />
          <div>
            <h3>USDT</h3>
            <p className='text-sm font-normal text-brand-gray'>USDT</p>
          </div>
        </Button> */}
      </div> 
    </div>
  )
}

export default SliderInfo