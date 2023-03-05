import { InjectedConnector } from 'wagmi/connectors/injected'
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains'
import LoginLensButton from './LoginLensButton';
import { useState } from 'react';

export default function LoginWalletButton() {

  const [userAddress, setUserAddress] = useState("")

  const { isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()

  const { connectAsync } = useConnect({
    connector: new InjectedConnector({chains: [polygonMumbai]}),
  });

  const onWalletClickLogin = async () => {
    if (isConnected) {
      await disconnectAsync()
    }
    const { connector } = await connectAsync()

    if (connector instanceof InjectedConnector) {
    const signer = await connector.getSigner();
    setUserAddress(signer._address)
    }
  }
 
  return (
    <div>     
      {userAddress ? (<div><LoginLensButton address={userAddress}/></div>) : (<button type="button" className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white" onClick={onWalletClickLogin}>Connect Wallet</button>)}
    </div>
  )
}