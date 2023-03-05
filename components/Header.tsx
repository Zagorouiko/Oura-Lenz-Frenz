import Link from "next/link"
import LoginWalletButton from 'components/LoginWalletButton'

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">Oura Lens Friends</h1>
            <div className="flex flex-row items-center">
                      <LoginWalletButton/>
                    <Link href="/sell-nft">
                        <div className="mr-4 p-6">Connect Oura</div>
                     </Link>                 
            </div>
        </nav>      
    )
}
