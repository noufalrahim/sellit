import { useRef, useState } from "react";
import Link from "next/link";
function SignUp(props) {
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [nameIsValid, setnameIsValid] = useState(true);
    const [image1, setImage1] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const nameInputRef = useRef();

    async function ImageHandler(event) {
        const [file] = event.target.files;
        if (file) {
            const base64 = await convertToBase64(file);
            setImage1(base64)
        }
    }
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    function submitHandler(e) {
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const name = nameInputRef.current.value;
        if (email.trim() === "") {
            setEmailIsValid(false);
        }
        if (password.trim().length < 6 || password.trim() === "") {
            setPasswordIsValid(false);
        }
        if (name.trim().length < 4 || name.trim() === "") {
            setnameIsValid(false);
        }

        if (emailIsValid && passwordIsValid && nameIsValid) {
            const data = {
                name: name,
                email: email,
                password: password,
                image: image1
            }

            props.onAddUser(data);
        }
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
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-20 w-auto" src="https://i.postimg.cc/PqsFkc9p/sellit-3.png" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={submitHandler}>
                    <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <div className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <img src={image1 ? image1 : "https://i.postimg.cc/dtyHwxxK/profile.png"} className="rounded-full" />
                            </div>
                            <div className="text-center">
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Upload a Photo</span>
                                    </label>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={event => ImageHandler(event)} />
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10KB</p>
                            </div>
                            {/* <input id="button" ref={photoInputRef} name="photo" type="file" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"/> */}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" ref={emailInputRef} name="email" type="email" autoComplete="email" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                            <input id="password" ref={passwordInputRef} name="password" type={passwordType} autoComplete="current-password" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                            <input id="name" ref={nameInputRef} name="name" type="text" autoComplete="name" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                    <p className="mt-10 text-center text-sm text-gray-500">
                    Already has an account?
                    <Link href="/auth/signIn" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign In</Link>
                </p>                
                </form>
            </div>
        </div>
    )
}

export default SignUp;