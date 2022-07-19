import { useEffect } from 'react'
import { magic } from '../lib/magic-client'
import '../styles/globals.css'
import { useRouter} from "next/router";
import { useState } from "react";
import Loading from '../components/loading/loading';


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)

  useEffect( async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if(isLoggedIn){
      // route to /
      setIsLoading(false);
      router.push("/");
    } else {
      setIsLoading(false);
      // route to /login
      router.push("/login");
    }
  }, [])


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

  

  return isLoading ? <Loading/> : <Component {...pageProps} />
};

export default MyApp




