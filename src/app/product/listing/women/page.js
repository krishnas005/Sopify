import CommonList from "@/components/CommonListing";
import { productByCategory } from "@/services/product";


export default async function WomenProducts() {

    const getAllProducts = await productByCategory('women')

    return (
        <CommonList data={getAllProducts && getAllProducts.data}/>
    )
}