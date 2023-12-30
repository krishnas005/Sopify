'use client'

import { GlobalContext } from "@/context"
import { useContext, useState } from "react"

export default function Home() {
  const {isAuthUser} = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  
  return (
    <main>
      <div>
        Hello World!
      </div>
    </main>
  )
}
