const { default: Compose } = require("@/Components/Layouts/compose/compose");
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
function ComposePage(){
    const router = useRouter();
    async function addProductHandler(enteredProduct){
        const resp = await fetch("/api/new-product", {
            method: "POST",
            body: JSON.stringify(enteredProduct),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await resp.json();
        router.push("/")
    }
    return(
        <Fragment>
        <Head>
        <title>Add your product</title>
                <meta name="description"
                    content="Sell with us" />
        </Head>
        <Compose onAddProduct={addProductHandler}/>
        </Fragment>
    )
}

export async function getServerSideProps({req}){
    const session = await getSession({req})
    if(!session){
        return{
            redirect: {
                destination: "/auth/signIn",
                permanent: false
            }
        }
    }
    return{
        props: {
            session
        }
    }
}

export default ComposePage;