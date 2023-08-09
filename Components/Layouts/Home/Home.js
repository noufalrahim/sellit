import Card from "@/Components/UI/Card/Card";
import styles from "./Home.module.css"
const { default: Head } = require("next/head");
const { Fragment } = require("react");

function Home(props){
    return(
        <Fragment>
            <h1 className={styles.title}>SELL WITH US</h1>
            <Card products = {props.products}/>
        </Fragment>
    )
}
export default Home;