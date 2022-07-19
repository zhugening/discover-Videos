import Card from './card';
import styles from './section-cards.module.css'
import Link from "next/link";


const SectionCards = (props) =>{
    const { title , videos= [] , size } = props;
    // console.log({ videos });
    return (
    <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
            {videos.map((videos, idx) => {
                console.log({ video });
            return (
            <Link href={`/video/${videoId}`}>
            <Card id={idx} imgUrl={videos.imgUrl} size= {size}/>;
            </Link>)
            })};
        </div>
    </section>
)};

export default SectionCards;