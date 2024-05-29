'use client'
import React, { useMemo, useState, useEffect } from 'react'
import SolanaLogo from '../icons/SolanaLogo'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { Connection, PublicKey } from '@solana/web3.js';
import { Skeleton } from "@/components/ui/skeleton"


const TOKEN_ADDRESS = 'AJACqc19iQkvou7LiMGhpkiQ4MMKMZTpP5b7qAw4x7HY'
const SliderInfo = ({ walletBalance }: { walletBalance: number }) => {
  const QUICKNODE_RPC = 'https://solana-mainnet.g.alchemy.com/v2/z1PFeuw7Wp6LE8OUoJt2sR871gkmP0dw'; // 👈 Replace with your QuickNode Endpoint OR clusterApiUrl('mainnet-beta')
  // const SOLANA_CONNECTION =  new Connection(QUICKNODE_RPC);
  const SOLANA_CONNECTION = useMemo(() => new Connection(QUICKNODE_RPC), []);
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  async function getTokenBalanceWeb3(connection: Connection) {
    setLoading(true)
    const tokenAccountPubKey = new PublicKey('4aQ1FoSrFHApnuhYBgB9rYGmVFVU4FfWNNHRBKwASLX2');
    const info = await connection.getTokenAccountBalance(tokenAccountPubKey);
    if (info.value.uiAmount == null) {
      setLoading(false)
      throw new Error('No balance found');
    }
    setBalance(info.value.uiAmount)
    setLoading(false)

  }
  useEffect(() => {

    getTokenBalanceWeb3(SOLANA_CONNECTION)
      .then(balance => console.log(`Token balance: ${balance}`))
      .catch(err => console.error(err));
  }, [SOLANA_CONNECTION, walletBalance])
  const calculatePercent = useMemo(() => {
    if (!balance) return 0
    const percent = (((18546430203 - balance) / 18546430203) * 100)
    return percent
  }, [balance])

  const calulateAmountRaised = useMemo(() => {
    if (!balance) return 0
    const amountForSupply = 18546430203
    const presaleAmount = amountForSupply - balance
    const amountDollars = presaleAmount * 0.00001

    return amountDollars
  }, [balance])
  return (
    <div className='flex space-y-6 flex-col'>
      <span className='text-brand-cyan text-center  text-[25px] font-bold'>Presale Price</span>
      <h3 className='text-white text-center'>1 MGK = $0.0001</h3>
      {
        loading ? <div className='flex-col flex md:flex-row gap-2 items-center justify-center w-full'>
          <Skeleton className="h-4 text-white  text-center w-[250px]" />
        </div> :

          <p className='text-white flex-col flex md:flex-row gap-2 items-center text-center  text-[25px]'><span className='text-brand-cyan font-bold'>Amount Raised :</span> <span>${calulateAmountRaised.toFixed(1)} / $500,000</span></p>

      }
      <Slider disabled={true} value={[calculatePercent]} max={100} step={1} />
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

      </div>
    </div>
  )
}

export default SliderInfo