import { Fragment, useRef, useState } from "react";
import styles from "./compose.module.css"
import Head from "next/head";
import { useSession } from "next-auth/react";
function Compose(props) {
    const nameInputRef = useRef();
    const descInputRef = useRef();
    const priceInputRef = useRef();
    const urlInputRef = useRef();

    const [image1, setImage1] = useState("");
    const [nameIsValid, setNameIsValid] = useState(true);
    const [descIsValid, setDescIsValid] = useState(true);
    const [photoIsValid, setPhotoIsValid] = useState(true);
    const { data: session } = useSession();



    async function ImageHandler1(event) {
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
        const productName = nameInputRef.current.value;
        const desc = descInputRef.current.value;
        const price = priceInputRef.current.value;
        const userName = session.user.name;
        const userEmail = session.user.email;
        const userImg = session.user.image;

        if (productName.trim() === "" || productName.trim().length < 4) {
            setNameIsValid(false);
        }
        else{
            setNameIsValid(true);
        }
        if (desc.trim() === "" || desc.trim().length < 8) {
            setDescIsValid(false);
        }
        else{
            setDescIsValid(true);
        }
        if (image1 === "") {
            setPhotoIsValid(false);
        }else{
            setPhotoIsValid(true);
        }

        if (nameIsValid && descIsValid && image1 !== "") {
            const data = {
                name: productName,
                desc: desc,
                price: price,
                image: image1,
                sellerInfo: {
                    image: userImg,
                    email: userEmail,
                    name: userName
                }
            }

            props.onAddProduct(data);
        }

    }
    return (
        <Fragment>
            <Head>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>
            <form onSubmit={submitHandler}>
                <div className={styles.flex}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <h1 className={styles.heading}>Sell With Us</h1>
                            <h5 className={styles.subheading}>Details</h5>
                            <div className={`form-floating mb-3 ${styles.mb3}`}>
                                <input type="text" className="form-control" ref={nameInputRef} id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Product Name</label>
                                {(!nameIsValid) && <p className={styles.invalid}>Please enter your product name with more than 4 characters.</p>}
                            </div>
                            <div className={`mb-3 ${styles.mb3}`}>
                                <label htmlFor="exampleInputdesc" className="form-label">Description</label>
                                <textarea type="text" rows={"5"} ref={descInputRef} className="form-control" id="exampleInputdesc" />
                                {(!descIsValid) &&<p className={styles.invalid}>Please enter your product description with more than 4 characters.</p>}
                            </div>
                            <label className="form-label">Price</label>
                            <div className={`input-group mb-3 ${styles.mb3}`}>
                                <span className="input-group-text">₹</span>
                                <input type="number" className="form-control" ref={priceInputRef} aria-label="Amount (to the nearest dollar)" />
                            </div>
                            <button className={styles.submitBtn} type="submit">Submit</button>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h1 className={styles.title}>Upload Photo</h1>
                        <div className={styles.flex}>
                            <div className={styles.previewImg}>
                                <img src={image1 ? image1 : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Color_icon_Light_Cornflower_blue.svg/1024px-Color_icon_Light_Cornflower_blue.svg.png"} />
                                <label htmlFor="formFile1-1" className={styles.inpImgLabel}>Click Here to {image1 ? "Change" : "Upload"}</label>
                                <input className={styles.inpImg} type="file" id="formFile1-1" accept=".jpg, .png, .jpeg" onChange={event => ImageHandler1(event)} />
                                {(!photoIsValid) &&<p className={`${styles.invalid} ${styles.invalidimg}`}>Please upload a photo.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}
export default Compose;