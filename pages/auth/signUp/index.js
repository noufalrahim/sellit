import Head from "next/head";
import { useRouter } from "next/router";

const { default: SignUp } = require("@/Components/Layouts/Sign/SignUp");
const { Fragment } = require("react");

function SignUpPage() {
    const router = useRouter();
    async function addUserHandler(enteredUser){
        const resp = await fetch("/api/new-user", {
            method: "POST",
            body: JSON.stringify(enteredUser),
            headers: {
                "Content-Type": "application/json"
            }   
        });
        const data = await resp.json();
        router.push("/")
    }
    return (
        <Fragment>
            <Head>
                <script src="https://cdn.tailwindcss.com"></script>
                <title>Sign Up</title>
                <meta name="description"
                    content="Sign Up with us" />
            </Head>
            <SignUp onAddUser={addUserHandler}/>
        </Fragment>
    )
}

export default SignUpPage;