import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';
import Card from '../components/card/card';
import SectionCards from "../components/card/section-cards"
import { getPopularVideos, getVideos } from "../lib/videos";
// import { magic } from "../lib/magic-client";
// import { startFetchMyQuery } from '../lib/db/hasura';

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailer");
  const travelVideos = await getVideos("travel");
  const marvelVideos = await getVideos("marvel trailer");
  const popularVideos = await getPopularVideos();

  return { props: { disneyVideos , travelVideos , marvelVideos , popularVideos }}
}

export default function Home({ disneyVideos , travelVideos , marvelVideos , popularVideos  }) {
  // startFetchMyQuery();
  
  // console.log({ magic })
  
  return (
    <div className= {styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar username = "Wutthipan@hotmail.com"/>
      <Banner videoId = "4zH5iYM4wJo" title = "clifford the red dog" subTitle=" a very cute dog" imgUrl ="/static/clifford.webp" />

      <dic className= {styles.sectionWrapper}>
        <SectionCards title= "Disney" videos = {disneyVideos} size= "large" />
        <SectionCards title= "Travel" videos = {travelVideos} size= "small" />   
        <SectionCards title="Marvel Universe" videos={marvelVideos} size="medium"/>  
        <SectionCards title="Popular" videos={popularVideos} size="small"/>     
      </dic>
    </div>
  )
}