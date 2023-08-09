import Link from "next/link"
import styles from "./Navigation.module.css"
import { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
function Navigation(props) {
    const { data: session } = useSession();
    return (
        <Fragment>
            <Head>
                <script src="https://kit.fontawesome.com/41a9f6434d.js" crossorigin="anonymous"></script>
            </Head>
            <nav>
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="checkbtn">
                    <i aria-hidden>≡ </i>
                </label>
                <label className="logo">SELL IT</label>
                <ul>
                    <li><Link className="active link-1" href={"/compose-post"}>SELL</Link></li>
                    {session ?
                        session.user.image !== "" ? <li><Link href={"/profile"}><img src={session.user.image} className={styles.img} /></Link></li>
                            : <li><Link href={"/profile"}><img src="https://i.postimg.cc/dtyHwxxK/profile.png" className={styles.img} /></Link></li> : <li></li>}
                </ul>
            </nav>
        </Fragment>
    )
}

export default Navigation;