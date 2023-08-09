import React, { Fragment, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

function LoginPage() {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [passwordType, setPasswordType] = useState("password");

    async function submitHandler(e) {
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: true,
            callbackUrl: "/"
        })
    }

    async function googleOauthLogin() {
        const result = await signIn("google", {callbackUrl: "http://localhost:3000"}
        )
    }

    async function githubOauthLogin(){
        const result = await signIn("github", {callbackUrl:"http://localhost:3000"})
    }

    function viewHandler(){
        if(passwordType === "password"){
            setPasswordType("text")
        }
        else{
            setPasswordType("password")
        }
    }


    return (
        <Fragment>
            <Head>
                <script src="https://cdn.tailwindcss.com"></script>
                <script src="https://kit.fontawesome.com/41a9f6434d.js" crossorigin="anonymous"></script>
            </Head>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-20 w-auto" src="https://i.postimg.cc/PqsFkc9p/sellit-3.png" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" ref={emailInputRef} name="email" type="email" autoComplete="email" required className="block w-full pl-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    <p onClick={viewHandler} className="font-semibold text-indigo-600 hover:text-indigo-500">View</p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" ref={passwordInputRef} type={passwordType} autoComplete="current-password" required className="block w-full pl-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>
                    <div>
                        <button onClick={googleOauthLogin} className="flex w-full justify-center mt-5 rounded-md bg-white px-3 py-1.5 border-2 border-solid text-sm font-semibold leading-6 text-black shadow-sm hover:bg-white-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><p><i className="fa-brands fa-google" style={{"color": "#0448e7;"}}></i>  Sign in with Google</p></button>
                    </div>
                    <div>
                        <button onClick={githubOauthLogin} className="flex w-full justify-center mt-5 rounded-md bg-black px-3 py-1.5 border-2 border-solid text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><p><i className="fa-brands fa-github"></i> Sign in with Github</p></button>
                    </div>
                    <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <Link href="/auth/signUp" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> SignUp with us</Link>
                </p>
                </div>
            </div>
        </Fragment>
    )
}

export default LoginPage;