'use client';

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { getAllCartItems, deleteFromCart } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";


export default function Cart() {

    const { user, setCartItems, cartItems, pageLevelLoader, setPageLevelLoader, setComponentLevelLoader, componentLevelLoader } = useContext(GlobalContext)

    async function extractAllCartItems() {

        setPageLevelLoader(true);
        const res = await getAllCartItems(user?._id);

        if (res.success) {
            setPageLevelLoader(false);
            const updatedData =
                res.data && res.data.length
                    ? res.data.map((item) => ({
                        ...item,
                        prod̥uctID: {
                            ...item.productID,
                            price:
                                item.productID.onSale === "yes"
                                    ? parseInt(
                                        (
                                            item.productID.price -
                                            item.productID.price * (item.productID.priceDrop / 100)
                                        ).toFixed(2)
                                    )
                                    : item.productID.price,
                        },
                    }))
                    : [];
            setCartItems(updatedData);
            localStorage.setItem("cartItems", JSON.stringify(updatedData));
        }

        // console.log(res);
    }

    async function handleDeleteCartItem(getCartItemID) {
        setComponentLevelLoader({ loading: true, id: getCartItemID });
        const res = await deleteFromCart(getCartItemID);

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });

            extractAllCartItems();
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: getCartItemID });
        }
    }

    useEffect(() => {
        if (user !== null) extractAllCartItems();
    }, [user]);


    if (pageLevelLoader) {
        return (
            <div className='w-full min-h-screen flex justify-center items-center -mt-14'>
                <PulseLoader
                    color={'#000000'}
                    loading={pageLevelLoader}
                    size={30}
                    data-testid="loader"
                />
            </div>
        )
    }

    return (

        <>
            <CommonCart componentLevelLoader={componentLevelLoader} handleDeleteCartItem={handleDeleteCartItem} cartItems={cartItems} />
        </>
    )
}