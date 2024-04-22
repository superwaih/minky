"use client"
import React from 'react'
import { Button } from '../ui/button'
import Applogo from "@/components/icons/Logo.svg"
import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'








const Navbar = () => {

 
  return (
    <nav className='text-white flex justify-between  mx-auto w-[90%] py-4'>
      <div className='flex gap-4 items-center'>
        <Image
          src={Applogo}
          alt="app logo"
        />
        <h1 className='text-brand-purple aclonica-regular text-lg lg:text-[30px]'>MAGIK</h1>
      </div>
      <WalletMultiButton
        className='border-brand-cyan w-full  !rounded-[20px] bg hover:!bg-[#161b19] transition-all duration-200'
      />

    </nav>
  )
}

export default Navbar