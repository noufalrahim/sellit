const { default: Home } = require("@/Components/Layouts/Home/Home");
const { default: Head } = require("next/head");
const { Fragment } = require("react");
import LoginPage from "@/Components/Layouts/Sign/SignIn";
import Navigation from "@/Components/UI/Navbar/Navigation";
import { MongoClient } from "mongodb";
import { useSession, signIn, getSession } from "next-auth/react"
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Sell It</title>
        <meta name="description"
          content="Sell Your Items from anywhere with us!" />
      </Head>
      <Navigation />
      {/* <button onClick={() => signOut()}>Sign out</button> */}
      <Home products={props.productData} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const client = await MongoClient.connect("mongodb+srv://projectmail0444:Project_Mail1@cluster0.tw00wpr.mongodb.net/sellIt_database")
  const db = client.db();
  const productCollection = db.collection("productdatas");
  const allProducts = await productCollection.find().toArray();
  client.close();
  return {
    props: {
      productData: allProducts.map(product => ({
        name: product.name,
        desc: product.desc,
        price: product.price,
        image: product.image,
        id: product._id.toString()
      }))
    },
    revalidate: 10
  }
}
export default HomePage;