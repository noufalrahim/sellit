import Head from "next/head";
import styles from "./ProductDetails.module.css"
import { Fragment } from "react";
import Link from "next/link";
function ItemDetails(props) {
    return (
        <Fragment>
            <Head>
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>
            <div className={styles.flex}>
                <div className={styles.left}>
                    <div className={styles.imgMain}>
                        <img className={styles.contrast}
                            src={props.foundProduct.image} />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.details}>
                        <h1 className={styles.title}>{props.foundProduct.name}</h1>
                        <h2 className={styles.price}>₹{props.foundProduct.price}</h2>
                        <h4 className={styles.desc}>{props.foundProduct.desc}</h4>
                        <div className={styles.btnLink}>
                        <Link href={`/${props.foundProduct.id}/contact`} className={styles.btn}>BUY NOW</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ItemDetails;