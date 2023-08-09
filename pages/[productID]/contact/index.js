const { default: Seller } = require("@/Components/Layouts/SellerProfile/Seller");
import Navigation from "@/Components/UI/Navbar/Navigation";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
function SellerProfile(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.seller.name}</title>
        <meta name="description"
          content="contact seller" />
      </Head>
      <Navigation />
      <Seller seller={props.seller} products={props.productData} />
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
  const foundAllProducts = await productCollection.find({
    sellerInfo: {
      image: selectedProduct.sellerInfo.image,
      email: selectedProduct.sellerInfo.email,
      name: selectedProduct.sellerInfo.name
    }
  }).toArray();
  client.close();
  return {
    props: {
      seller: {
        name: selectedProduct.sellerInfo.name,
        email: selectedProduct.sellerInfo.email,
        image: selectedProduct.sellerInfo.image
      },
      productData: foundAllProducts.map(product => ({
        name: product.name,
        price: product.price,
        image: product.image,
        id: product._id.toString()
      }))
    }
  }
}



export default SellerProfile;