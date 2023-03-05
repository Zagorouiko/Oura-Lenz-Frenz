import { useWalletLogin } from '@lens-protocol/react';
import { useDefaultProfileQuery } from 'graphql/generated';
import { useSigner } from 'wagmi'
import { useState } from 'react';
import Link from "next/link";
import CreateAccountForm from './CreateAccountForm';

type Props = {address: string}

export default function LoginLensButton({address}: Props) {

  const { login, error: loginError, isPending: isLoginPending } = useWalletLogin();
  const { data: signer, isError, isLoading } = useSigner()


  const [userName, setUserName] = useState("")
  const [isLensAccountAvailable, setIsLensAccountAvailable] = useState(true)
  const [isSignedIntoLens, setisSignedIntoLens] = useState(false)

        // Need to actually run the wallet login first, output the address,
        const { data, isLoading: queryIsLoading, error } = useDefaultProfileQuery(
          {
            request: {
              ethereumAddress: address
            },
          },
        )

  const onLoginClick = async () => {
    console.log(data?.defaultProfile)

      if (data?.defaultProfile !== null && signer) {
        console.log("account exists")
        await login(signer)
        setisSignedIntoLens(true)
        setIsLensAccountAvailable(true)
        console.log("name: " + data?.defaultProfile?.handle)
        if(data?.defaultProfile?.handle) {
          console.log("setting username in header")
          setUserName(data?.defaultProfile?.handle)
        }
        
        console.log("Signed into Lens!")
      } else {
        console.log("Lens account doesn't exist, please create one")
        setIsLensAccountAvailable(false)
      }
    };

  return (
    <div>
      <Link href={`/profile/${userName}`}>{userName}</Link>
      {!isLensAccountAvailable && !isSignedIntoLens ? (<div><CreateAccountForm address={address}/></div>) : (<div><button className="" disabled={isLoginPending} onClick={onLoginClick}>Log into Lens</button></div>)}
    </div>
  );
}