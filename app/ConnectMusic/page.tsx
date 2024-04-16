import ConnectMusic from '@/components/ConnectMusic'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function page() {
  return (
    <div>
        <ConnectMusic/>
    </div>
  )
}
