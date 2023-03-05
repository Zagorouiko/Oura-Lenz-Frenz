import { useMutation } from "@tanstack/react-query";
// import { useAddress, useSDK } from "@thirdweb-dev/react";
import { MockProfileCreationProxy_ABI, MockProfileCreationProxy_ADDRESS } from "../../constants/contracts";
// import { getContract } from '@wagmi/core'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
// import { useCreateProfileMutation } from "../../graphql/generated";

export async function CreateProfile( address: string, handle: string ) {
//   const { mutateAsync: requestTypedData } = useCreateProfileMutation();
//   const sdk = useSDK();
//   const address = useAddress();

  // async function createProfile() {
    console.log("Creating profile with: " + address + " " + handle)

    // 1. Use the auto generated mutation called "useCreateProfileMutation"
    // to get the typed data for the user to create an account

    // ** I don't think I need to get the typed data since I don't need to authenticate (get signature with the typed data)
    // I'm only generating an account, the user doesn't need to be signed
    // Go directly to the contract call on the MockProfileCreationProxy
    // const createProfileMutation = await requestTypedData({
    //   request: {
    //       handle: "test",
    //   },
    // });

    // if (!sdk) return;


    //  3. Send the typed data to the smart contract to perform the
    // write operation on the blockchain

    const { config } = usePrepareContractWrite({
      address: MockProfileCreationProxy_ADDRESS,
      abi: MockProfileCreationProxy_ABI,
      functionName: 'proxyCreateProfile',
      args: [{
        to: address,
        handle: handle,
        imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
        followModule: "0x0000000000000000000000000000000000000000",
        followModuleInitData: [],
        followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS'
      }]
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)
    console.log(data)

    const result = write?.()
    console.log(result);
    


    // const MockProfileCreationProxyContract = useContract({
    //   address: MockProfileCreationProxy_ADDRESS,
    //   abi: MockProfileCreationProxy_ABI
    // });
    // console.log("address: " + MockProfileCreationProxyContract.functions)

    // Call the smart contract function called "followWithSig"
    // followWithSig function comes from Lenshub.sol contract which takes a Datatype.FollowWithSigData(a struct) parameter. Check the Datatypes.sol file on what the struct takes in
    // the last paramter in the struct is of type EIP712Signature (another struct) which requires (uint8 - v, bytes 32 - r, bytes32 - s, uint256 - deadline )
    // Which are values for a tx signature
    // We use this signature method instead of calling the follow function directly on the contract because if we did we would have to the encoding/validation ourselves
    //(See Lens API -> dispatcher docs - "Hooking in without using the type data")
    // const result = await MockProfileCreationProxyContract.call("proxyCreateProfile", {
    //     to: address,
    //     handle: handle,
    //     imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
    //     followModule: "0x0000000000000000000000000000000000000000",
    //     followModuleInitData: [],
    //     followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
    // });
  }

  // return useMutation(createProfile);
// }