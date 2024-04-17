import React from 'react'
import { Button } from '../ui/button'
import { Slider } from "@/components/ui/slider"
import SolanaLogo from '../icons/SolanaLogo'
import UsdtIcon from '../icons/UsdtIcon'
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import Applogo from "@/components/icons/Logo.svg"
import Image from 'next/image'
const Presale = () => {
  return (
    <div className='py-12 px-[50px] shadow-md bg-brand-black max-w-[800px] w-full space-y-8 rounded-[50px] border-brand-cyan border'>
        <h3 className='text-white text-center'>1 MGK = $0.0001</h3>
        <p className='text-white text-center  text-[25px]'><span className='text-brand-cyan font-bold'>Amount Raised :</span> $500 / $5,000,000</p>
        <Slider defaultValue={[33]} max={100} step={1} />
        <div className='flex gap-4 items-center justify-center'>
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
            <Button
            //  size={'sm'}
             className='!py-6 flex gap-4'
             variant={'secondary'}
            >
                <UsdtIcon />
                <div>
                <h3>USDT</h3>
                <p className='text-sm font-normal text-brand-gray'>USDT</p>
                </div>
            </Button>
        </div>

        <div className='flex flex-col space-y-4'>
            <h3 className='text-white'>Amount you pay :</h3>
           <div className='w-full relative'>
           <Input type='number' placeholder='0' />
                <div className='absolute top-[20%] text-white right-2 z-50 bg-[#180A39]'>
                <Select>
  <SelectTrigger className="">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">
        <SolanaLogo />
    </SelectItem>
    <SelectItem value="dark">
        <UsdtIcon />
    </SelectItem>
  </SelectContent>
</Select>
                </div>
           </div>
        </div>
        <div className='flex flex-col space-y-4'>
            <h3 className='text-white'>Amount in $MGK you will receive :</h3>
           <div className='w-full relative'>
           <Input type='text' placeholder='0' />
               <div className='absolute top-[20%] right-2'>
               <Image 
      src={Applogo}
      width={50}
      height={50}
      alt="app logo"
      />
               </div>
           </div>
        </div>
    <Button className='w-full text-white py-6'>
        Connect Wallet
    </Button>
    </div>
  )
}

export default Presale