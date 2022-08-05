import { useState } from "react";
import { useRouter }   from "next/router"; 
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import clsx from "classnames";
import { getYoutubeVideoById } from "../../lib/videos"
import NavBar from "../../components/nav/navbar"
import Like from "../../components/icons/like-icon";
import DisLike from "../../components/icons/dislike-icon";



Modal.setAppElement("#__next")

const handleToggleDisLike =() =>{
    console.log("handleToggleDislike");
    setToggleDisLike(!toggleDisLike);
    setToggleLike(!toggleLike);
};

const handleToggleLike =() =>{
    console.log("handleToggleLike");
    setToggleLike(!toggleLike);
    setToggleDisLike(!toggleDisLike);
};
// Get Static Prop
export async function getStaticProps(context) {
    //data to fetch from API
    // const video = {
    //     title: "Hi cute Dog",

    //     publishTime: "1990-01-01",
    //     description: "A big red dog that is super cute, can bla bla bla",
    //     channelTitle: "Paramount Picture",
    //     viewCount: 10000,
    // };
    // console.log({ context })

    const videoId = context.params.videoId;

    const videoArray = await getYoutubeVideoById(videoId); 
    // console.log({ video })

    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0]: {},
        },
        revalidate: 10,
    };
    };

// Get Staic path
export async function getStaticPaths() {
    const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo","KCPEHsAViiQ"];

    //Get the path we went t pre-render based on posts
    const paths = listOfVideos.map((videoId) => ({
        params: { videoId },
    }));

    // We'll pre-render only these paths at build time
    // { fallback: blocking } will server-render pages
    return { paths, fallback: "blocking"}
} 



// Get Server Side Prop
const Video = ({ video }) =>{
    const router = useRouter();

    //Toggle state
    const [toggleLike, setToggleLike] = useState(false);
    const [toggleDisLike, setToggleDisLike] = useState(false);
    // console.log({ router });
    const { title , publishTime , description , channelTitle, statistics:{ viewCount } = { viewCount:0 } } = video ;
    return (<div className={styles.container}>
        <NavBar />
        <Modal 
        isOpen={true} 
        contentLabel = "Watch the video" 
        onRequestClose={() => router.back()}
        className = {styles.modal}
        overlayClassName={styles.overlay}>
        
        <iframe id="ytplayer" type="text/html" width="100%" height="360"
        src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=1&origin=http://example.com&controls=0&rel=0`} frameborder="0"></iframe>
        

        <div className={styles.likeDislikeBtnWrapper}>
            <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
            <div className ={styles.btnWrapper}>
                <Like selected={toggleLike}/>
            </div>
            </button>
            </div>
            <button onClick={handleToggleDisLike}>
                <div className ={styles.btnWrapper}>
                <DisLike selected={toggleDisLike}/>
            </div>
            </button>
        </div>
       
        <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
                <div className={styles.col1}>
                    <p className={styles.publishTime}>{publishTime}</p>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>{description}</p>
                </div>
                <div className={styles.col2}>
                    <p className={clsx(styles.subText, styles.subTextWrapper)}>
                        <span className={styles.textColor}>Cast: </span>
                        <span className={styles.channelTitle}>{channelTitle}</span>
                    </p>

                    <p className={clsx(styles.subText, styles.subTextWrapper)}>
                        <span className={styles.textColor}>View Count: </span>
                        <span className={styles.channelTitle}>{viewCount}</span>
                    </p>
                </div>

            </div>
        </div>
        </Modal>
    </div>)
};

export default Video;