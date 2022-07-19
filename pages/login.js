import Head from 'next/head'
import styles from '../styles/login.module.css';
import Image from "next/Image";
import { useEffect, useState } from 'react';
import Router, { useRouter } from "next/router"
import { magic } from "../lib/magic-client";

const Login = () => {

    const [email, setEmail] = useState("");
    const [userMsg, setUserMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();


    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false);
        };
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routerCahngeComplete",handleComplete)
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    const handleOnChangeEmail = (e) => {
        setUserMsg("");
        // console.log("event",e)
        const email = e.target.value;
        setEmail(email);
    };

    const handleLoginWithEmail = async (e) => {
        // console.log("hi button");
        e.preventDefault();

        if (email) {
            // log in a user by their email
            if (email == "Wutthipan.p@gmail.com"){
                // log in a user by their email
                try {
                    setIsLoading(true);
                    // keep token when login 
                    const didToken = await magic.auth.loginWithMagicLink({ email });
                    // console.log({didToken});
                    if (didToken) {
                        // setIsLoading(false);
                        router.push("/")
                    }
                } catch (error) {
                    // handle errors if required
                    console.error("Somthing went wrong loggin in", error)
                    setIsLoading(false);
                };
            } else {
                setIsLoading(false);
                setUserMsg("Something went wrong logging in");
            }
        } else {
            setIsLoading(false);
            setUserMsg("Enter a valid email address")
        }
    };

    return (
    <div className={styles.container}>
        <Head>
            <title>Netflix SignIn</title>
        </Head>

        <header className={styles.header}>
            <div className = {styles.headerWrapper}>
                <a className={styles.logoLink} href="/">
                <div className={styles.logoWrapper}>       
                    <Image src ={'/static/netflix.svg'} alt ="Netflix logo" width="111px"  height="30px" />
                </div>
                </a>
            </div>
        </header>

        <main className={styles.main}>
            <div className={styles.mainWrapper}>
                <h1 className={styles.signinHeader}>Sign In</h1>
                <input type="text" placeholder='Email address'  className={styles.emailInput} onChange={handleOnChangeEmail}/>
                <p className={styles.userMsg}>{userMsg}</p>
                <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
                    {isLoading ? "Loading........." : "Sign In"}</button>
            </div>
        </main>

        
    </div>);
};

export default Login;