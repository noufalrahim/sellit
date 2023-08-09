const { default: Head } = require("next/head");
const { default: Link } = require("next/link");
const { Fragment } = require("react");
import styles from "./Seller.module.css"
function Seller(props) {
    return (
        <Fragment>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>
            <div className={styles.flex}>
                <div className={styles.left}>
                    <div className={styles.content}>
                        <div className="container mt-5">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-7">
                                    <div className={styles.card}>
                                        <div className={styles.height}>
                                            <div className={styles.imgCenter}>
                                                <img src={props.seller.image} width="100" className={styles.rounded} />
                                            </div>
                                            <div className="text-center mt-3">
                                                <span className="bg-secondary p-1 px-4 rounded text-white">{props.seller.name}</span>
                                                <h5 className="mt-2 mb-0">{props.seller.email}</h5>
                                                <div className="buttons mt-4">
                                                    <Link href="/" className={styles.btn}>Chat With Seller</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.mainHead}>
                        <h1>Other Products of {props.seller.name}</h1>
                        <div className="bg-white">
                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                    {props.products.map((product) => (
                                        <Link href={`/${product.id}`} className="group">
                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                <img src={product.image} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75" />
                                            </div>
                                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Seller;