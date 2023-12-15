'use client'

import { GlobalContext } from "@/context"
import { useContext } from "react"

export default function Home() {
  const {isAuthUser} = useContext(GlobalContext);
  return (
    <main>
      <div>
        
      </div>
    </main>
  )
}
