import Head from "next/head";
import { Fragment } from "react";

const { default: LoginPage } = require("@/Components/Layouts/Sign/SignIn");

function SignInPage() {
    return (
        <Fragment>
        <Head>
        <title>Sign In</title>
                <meta name="description"
                    content="Sign In with us" />
        </Head>
            <LoginPage />
        </Fragment>
    )
}

export default SignInPage;