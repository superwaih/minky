import React from 'react'
import { Button } from '../ui/button'
import Applogo from "@/components/icons/Logo.svg"
import Image from 'next/image'
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
<Button>
  Connect Walet
  </Button>
    </nav>
  )
}

export default Navbar