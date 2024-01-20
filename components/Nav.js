"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProvider] = useState("")
    const [toggleDropdown, settoggleDropdown] = useState(false);
    const containerRef = useRef()
    const {data:session}=useSession()

    const handleClickAway = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            settoggleDropdown(false)

        }
    }
 

    useEffect(() => {
        document.addEventListener("click", handleClickAway)
        const fetchProviders = async () => {
            const response = await getProviders()
            setProvider(response)
        }
        return () => {
            document.removeEventListener('click', handleClickAway)
            fetchProviders()
        }
    }, []);
    console.log(providers);

    return (
        <nav className="flex justify-between w-full mb-16 pt-3">
            <Link href={'/'} className="flex gap-2 flex-center">
                <Image src={"/assets/images/logo.svg"} alt="Promptopia" width={30} className="object-contain" height={30} />
                <h4>Promptopia</h4>
                <p>{providers.google.name}</p>
            </Link>
            <div className="sm:flex hidden relative">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href={"/create-prompt"} className="black_btn">Create Post</Link>
                        <button onClick={signOut} className="outline_btn"> Sign Out </button>
                        <Link href={"profile"}>
                            <Image className="rounded-full" alt="profile Photo" src={session?.user.image} width={30} height={30} />
                        </Link>
                    </div>

                ) : (
                    <div>
                       {providers && Object.values(providers).map((provider) => (
    <div key={provider.id}>
        <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
            Sign In with {provider.name}
        </button>
    </div>
))}
                    </div>
                )
                }
            </div>
            {/*  mobile navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex ">

                        <Image className="rounded-full" alt="profile Photo" src={session?.user.image} width={30} height={30} ref={containerRef} onClick={() => settoggleDropdown((prev) => !prev)} />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link href={"/profile"} className="dropdown_link" onClick={() => settoggleDropdown(false)}>My Profile</Link>
                                <Link href={"/create-prompt"} className="dropdown_link" onClick={() => settoggleDropdown(false)}>Create Prompt</Link>
                                <button type="button" className="black_btn" onClick={(() => { settoggleDropdown(false); signOut() })}>Sign Out</button>
                            </div>
                        )}
                    </div>

                ) : (
                    <div>
                    {providers && Object.values(providers).map((provider) => (
                        <div key={provider.id}>
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="btn_black">
                                Sign In with {provider.name}
                            </button>
                        </div>
                        
                    ))}
                    </div>
                  
                )
                }
            </div>


        </nav>
    )
}

export default Nav
