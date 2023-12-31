'use client'

import { GlobalContext } from "@/context"
import { useContext, useState } from "react"
import Banner from '../assets/banner_img.jpg';
import Image from "next/image";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);

  return (
    <main>
      <div className="bg-black">
      <div className="relative h-auto xl:h-[675px] opacity-90">
        <Image src={Banner} alt="Banner Image" className=" w-full h-full" />
      </div>
      </div>



    </main>
  )
}
