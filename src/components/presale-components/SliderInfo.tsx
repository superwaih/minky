'use client'
import React, { useMemo, useState, useEffect } from 'react'
import SolanaLogo from '../icons/SolanaLogo'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { Connection, PublicKey } from '@solana/web3.js';


const TOKEN_ADDRESS = 'AJACqc19iQkvou7LiMGhpkiQ4MMKMZTpP5b7qAw4x7HY'
const SliderInfo = () => {
  const QUICKNODE_RPC = 'https://wiser-quick-breeze.solana-mainnet.quiknode.pro/57f11f6c08d1cff24525eeea61023cde215a90df/'; // 👈 Replace with your QuickNode Endpoint OR clusterApiUrl('mainnet-beta')
  const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
const [balance, setBalance] = useState(0)
  async function getTokenBalanceWeb3(connection) {
    const tokenAccountPubKey = new PublicKey('4aQ1FoSrFHApnuhYBgB9rYGmVFVU4FfWNNHRBKwASLX2');
    const info = await connection.getTokenAccountBalance(tokenAccountPubKey);
    if (info.value.uiAmount == null) throw new Error('No balance found');
   setBalance(info.value.uiAmount)
    
}
useEffect(() => {
        getTokenBalanceWeb3(SOLANA_CONNECTION)
            .then(balance => console.log(`Token balance: ${balance}`))
            .catch(err => console.error(err));
}, [])
const calculatePercent = useMemo(() => {
  const percent = balance /18500000000 * 100
  return percent
}, [])
  return (
    <div className='flex space-y-6 flex-col'>
      <span className='text-brand-cyan text-center  text-[25px] font-bold'>Presale Price</span>
         <h3 className='text-white text-center'>1 MGK = $0.0001</h3>
      <p className='text-white flex-col flex md:flex-row gap-2 items-center text-center  text-[25px]'><span className='text-brand-cyan font-bold'>Amount Raised :</span> <span>$5000 / $500,000</span></p>
      <Slider disabled={true} value={[calculatePercent]}  max={100} step={1} />
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