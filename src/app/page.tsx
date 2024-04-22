import Navbar from "@/components/shared/Navbar";
import Presale from "@/components/shared/Presale";
import WalletConnect from "@/components/shared/WalletConnect";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex bg-appBg bg-cover min-h-screen flex-col  justify-between">
      <Navbar />
      <div className="flex py-8 flex-col w-full h-full space-y-8 justify-center items-center">
        <div className="text-center">
          <h2 className="aclonica-regular text-white text-lg lg:text-[50px]"> <span className='text-brand-purple '>MAGIK</span>
            Presale Now Live</h2>
        </div>
       
        <Presale />
      </div>
      
      <footer>
        <h6 className="text-white aclonica-regular text-center py-3">Copyright 2024 | All rights reserved</h6>
      </footer>
    </main>
  );
}
