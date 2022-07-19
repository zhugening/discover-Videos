import Image from "next/image";
import { useState } from "react";
import styles from "./card.module.css";
import { motion } from "framer-motion";
import cls from "classnames";


const Card =(props) =>{
    const { imgUrl = "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
     size = "medium" , id } = props;

    const [imgSrc, setImgSrc] = useState(imgUrl);
    const classMap = {
        "large": styles.lgItem,
        "medium": styles.mdItem,
        "small":styles.smItem
    };

    const handleOnError =() =>{
        console.log("Hi Error")
        setImgSrc("https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    }

    const scale = id === 0 ? {scaleY: 1.1} : {
        scale: 1.1 };

    return (
        <div className={styles.container} >
            <motion.div className={cls(styles.imgMotionWrapper,classMap[size])} whileHover={{ ...scale }}>
            <Image src={imgUrl} alt="image" layout="fill" onError ={handleOnError} className={styles.cardImg}/>
        </motion.div>
    </div>
)};

export default Card;