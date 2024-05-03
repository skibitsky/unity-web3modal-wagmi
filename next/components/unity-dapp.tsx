'use client'

import React, {useEffect, useState} from 'react'
import {Unity, useUnityContext} from 'react-unity-webgl'
import {useWeb3Modal, useWeb3ModalState} from '@web3modal/wagmi/react'
import {useAccount, useSignMessage} from 'wagmi'
import {toast} from 'sonner'

export default function UnityDapp() {
  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    sendMessage,
    isLoaded,
    requestFullscreen
  } = useUnityContext({
    loaderUrl: 'unity/Build/unity.loader.js',
    dataUrl: 'unity/Build/unity.data',
    frameworkUrl: 'unity/Build/unity.framework.js',
    codeUrl: 'unity/Build/unity.wasm'
  })

  const {open} = useWeb3Modal()
  const {open: openState} = useWeb3ModalState()

  const {status} = useAccount()
  const isConnected = status === 'connected'
  const {signMessageAsync} = useSignMessage()

  const [devicePixelRatio, setDevicePixelRatio] = useState(0)

  useEffect(() => {
    sendMessage('Scripts', 'SetModalOpenState', String(openState))
  }, [openState]);

  useEffect(
    function () {
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio)
      }
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(`screen and (resolution: ${devicePixelRatio}dppx)`)
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener('change', updateDevicePixelRatio)
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener('change', updateDevicePixelRatio)
      }
    },
    [devicePixelRatio]
  )

  const handleFullScreenEvent = () => {
    const canvas = document.querySelector('canvas')
    if (document.fullscreenElement) {
      if (!canvas?.classList.contains('canvas-active')) {
        canvas?.classList.add('canvas-active')
      }
    } else {
      if (canvas?.classList.contains('canvas-active')) {
        canvas?.classList.remove('canvas-active')
      }
    }
  }

  useEffect(() => {
    const html = document.querySelector('html')
    html?.addEventListener('fullscreenchange', handleFullScreenEvent)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    const isConnectedStr = isConnected ? 'true' : 'false'
    sendMessage('Scripts', 'SetConnectedState', isConnectedStr)
  }, [isConnected, isLoaded])

  const handleConnectWallet = () => {
    open().catch(console.error)
  }

  const handleSignMessage = () => {
    const async = async () => {
      try {
        toast.message('Signing message...')
        const signature = await signMessageAsync({message: 'Hello Web3Modal!'})
        toast.success('Message signed')
      } catch {
        toast.error('Failed to sign message')
      }
    }

    async().catch(console.error)
  }

  useEffect(() => {
    addEventListener('ConnectWallet', handleConnectWallet)
    addEventListener('SignMessage', handleSignMessage)
    return () => {
      removeEventListener('ConnectWallet', handleConnectWallet)
      removeEventListener('SignMessage', handleSignMessage)
    }
  }, [addEventListener, removeEventListener])

  return (
    <div className="flex flex-col justify-items-center">
      <Unity
        unityProvider={unityProvider}
        style={{width: 300, height: 400}}
        devicePixelRatio={devicePixelRatio}
      />
      <button
        className="text-gray-400 hover:underline hover:text-gray-300 text-sm"
        onClick={() => {
          const html = document.querySelector('html')
          html?.requestFullscreen()
        }}
      >
        enter fullscreen
      </button>
    </div>
  )
}
