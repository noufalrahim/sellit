const { default: ItemDetails } = require("@/Components/Layouts/Details/ProductDetails");
import Navigation from "@/Components/UI/Navbar/Navigation";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
function ItemOverview(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.productData.name}</title>
        <meta name="description"
          content={props.productData.desc} />
      </Head>
      <Navigation />
      <ItemDetails foundProduct={props.productData} />
    </Fragment>
  )
}

export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb+srv://projectmail0444:Project_Mail1@cluster0.tw00wpr.mongodb.net/sellIt_database")
  const db = client.db();
  const productCollection = db.collection("productdatas");
  const allProducts = await productCollection.find().toArray();
  client.close();
  return {
    fallback: "blocking",
    paths: allProducts.map(product => ({
      params: { productID: product._id.toString() }
    }))
  }
}

export async function getStaticProps(context) {
  const productID = context.params.productID
  const client = await MongoClient.connect("mongodb+srv://projectmail0444:Project_Mail1@cluster0.tw00wpr.mongodb.net/sellIt_database")
  const db = client.db();
  const productCollection = db.collection("productdatas");
  const selectedProduct = await productCollection.findOne({
    _id: new ObjectId(productID)
  });
  client.close();

  return {
    props: {
      productData: {
        id: selectedProduct._id.toString(),
        name: selectedProduct.name,
        desc: selectedProduct.desc,
        price: selectedProduct.price,
        image: selectedProduct.image
      }
    }
  }
}

export default ItemOverview; 