import CommonList from "@/components/CommonListing";
import { productByCategory } from "@/services/product";


export default async function MenProducts() {

    const getAllProducts = await productByCategory('men')

    return (
        <CommonList data={getAllProducts && getAllProducts.data}/>
    )
}