'use client'

import {useAccount, useSignMessage} from "wagmi";
import {toast} from "sonner";

export default function SignButton() {
  const {signMessageAsync} = useSignMessage()
  const {status} = useAccount()
  const isConnected = status === 'connected'

  async function onSignMessage() {
    try {
      toast.message('Signing message...')
      const signature = await signMessageAsync({message: 'Hello Web3Modal!'})
      toast.success('Message signed')
    } catch {
      toast.error('Failed to sign message')
    }
  }

  return (
    <button onClick={onSignMessage}
            disabled={!isConnected}
            className="flex-grow-0 rounded-full bg-[#47A1FF] hover:bg-[#59AAFF] disabled:bg-gray-500 disabled:text-gray-400 px-[16px] py-[9px] text-white text-sm font-medium">
      Sign Message
    </button>
  )
}