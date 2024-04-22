import React from 'react'
import { Input } from '../ui/input'
import Applogo from "@/components/icons/Logo.svg"
import Image from 'next/image'

const RecieveTokens = ({amountTokens} : any) => {
  return (
    <div className='flex flex-col space-y-4'>
        <h3 className='text-white'>Amount in $MGK you will receive :</h3>
        <div className='w-full relative'>
          <Input value={amountTokens} disabled={true} type='text' placeholder='0' />
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
  )
}

export default RecieveTokens