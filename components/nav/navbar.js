import styles from './navbar.module.css';
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { magic } from '../../lib/magic-client';;


// Before Link Username //////////////
// const NavBar = (props) => {      //
//     const { username } = props;  //
//////////////////////////////////////


const NavBar = () => {
    // const { username } = props;
    
    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState("");
    const router = useRouter();

    // Option1 - it can't define async function within a useEffect
    // useEffect(async () => {
    //     // Assumes a user is already logged in
    //     try {
    //         const { email, publicAddress } = await magic.user.getMetadata();
    //         if (email) {
    //             setUsername(email);
    //         }
    //     } catch (error) {
    //         // Handle errors if required
    //         console.error("Error retriving email", error)
    //     }
    //     } , []);
    
    // Option2
    useEffect(() => {
        async function getUsername() {
            try {
                const { email, issuer } = await magic.user.getMetadata();
                const didToken = await magic.user.getIdToken();
                console.log({ didToken })
                if (email) {
                    console.log(email);
                    setUsername(email);
                }
            } catch (error) {
                console.log("Error retriving email", error);
            }
        }
        getUsername();
    }, []);


    const handleOnClickHome =(e) =>{
        e.preventDefault();
        router.push("/");
    };

    const handleOnClickMyList =(e) =>{
        e.preventDefault();
        router.push("/browse/my-list");
    };

    const handleShowDropdown =(e) =>{
        e.preventDefault();
        setShowDropdown(!showDropdown);
    };

    const handleSignout = async (e) =>{
        e.preventDefault();
        // use this when sign out of this website 
        try {
            await magic.user.logout();
            console.log(await magic.user.isLoggedIn());
            router.push("/login")
        } catch (error) {
            console.error("Error logging out", error)
            router.push("/login");
        }
    };

    return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <a className={styles.logoLink} href="/">
                <div className={styles.logoWrapper}>
                    <Image src ={'/static/netflix.svg'} 
                    alt ="Netflix logo"
                    width="128px" 
                    height="34px" />
                </div>
            </a>
        
        <ul className={styles.navItems}>
            <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
            <li className={styles.navItem2} onClick={handleOnClickMyList}>My list</li>
        </ul>
        -
        <nav clasName={styles.container}>
            <div>
                <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                <p className={styles.username}>{username}</p>
                {/* Expand more Icon */}
                <Image 
                src ={'/static/expand_more.svg'} 
                alt ="Expand dropdown" 
                width="24px" 
                height="24px" />
                </button>

                {/* show dropdown ทำให้ tag นี้หายทั้งหมด */}
                {showDropdown && (
                <div className={styles.navDropdown}>
                <div>
                    {/* <Link href="/login"> */}
                    <a className={styles.linkName} onClick={handleSignout}>
                        Sign out
                    </a>
                    {/* /</Link> */}
                    <div className={styles.lineWrapper}></div>
                </div>
            </div>
            )}
        </div>
        </nav>
        
        </div>
    </div>
)};

export default NavBar;