import CommonList from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";



export default async function AllProduct() {
    const getAllProducts = await getAllAdminProducts();
    return(
        <CommonList data={getAllProducts && getAllProducts.data}/>
    )
}