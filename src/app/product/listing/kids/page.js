import CommonList from "@/components/CommonListing";
import { productByCategory } from "@/services/product";


export default async function KidsProducts() {

    const getAllProducts = await productByCategory('kids')

    return (
        <CommonList data={getAllProducts && getAllProducts.data}/>
    )
}