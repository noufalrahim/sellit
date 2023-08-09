const { default: User } = require("@/Components/Layouts/UserProfile/User");
const { default: Navigation } = require("@/Components/UI/Navbar/Navigation");
const { Fragment } = require("react");
import { getSession, useSession } from "next-auth/react";
import { MongoClient } from "mongodb";
function UserPage(props){
    const {data: session} = useSession();
    return(
        <Fragment>
        <Navigation />
        <User products={props.productData}/>
        </Fragment>
    )
}

export async function getServerSideProps({req}){
    const session = await getSession({ req })
    const client = await MongoClient.connect("mongodb+srv://projectmail0444:Project_Mail1@cluster0.tw00wpr.mongodb.net/sellIt_database")
    const db = client.db();
    const productCollection = db.collection("productdatas");
    if (!session) {
        return {
            redirect: {
                destination: "/auth/signIn",
                permanent: false
            }
        }
    }
    if(session){
        const allProductsByUser = await productCollection.find({
            sellerInfo: {
                image: session.user.image,
                email: session.user.email,
                name: session.user.name
              }
        }).toArray();
        return{
            props: {
                session,
                productData: allProductsByUser.map(product => ({
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    id: product._id.toString()
                  }))
            }
        }
    }
    client.close();
    

    return{
        props: {
            session
        }
    }
    
}

export default UserPage;