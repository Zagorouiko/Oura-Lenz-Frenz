import { isValidHandle, useCreateProfile } from '@lens-protocol/react';
import { useState, FormEvent } from 'react';

type Props = {address: string}

export default function CreateAccountForm({ address }: Props) {

  const { create, error, isPending } = useCreateProfile();

    const [handle, setHandle] = useState<string | null>(null);

  
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!handle) return;

        console.log("wallet is connected, running CreateProfile")
        try {
          await create(handle);
        } catch (error) {
          console.log(error)
        }     
      };

      
    return (
        <form onSubmit={onSubmit}>
        <input
          minLength={5}
          maxLength={31}
          required
          type="text"
          onChange={(e) => {
            if (isValidHandle(e.target.value)) {
              setHandle(e.target.value);
            } else {
              setHandle(null);
            }
          }}
        />
        
        <button type="submit">Create</button>
      </form>     
    )   
}