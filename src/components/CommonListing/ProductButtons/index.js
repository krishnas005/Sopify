"use client";

import { GlobalContext } from "@/context";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { deleteAProduct } from "@/services/product";
import { toast } from "react-toastify";
import ComponentLevelLoader from "@/components/ComponentLoader";
import { addToCart } from "@/services/cart";

export default function ProductButton({ item }) {
    const path = usePathname();
    const { setCurrentUpdatedProduct, setComponentLevelLoader, user, componentLevelLoader, showCartModal,setShowCartModal } = useContext(GlobalContext);
    const router = useRouter();

    async function handleDeleteProduct(item) {
        setComponentLevelLoader({ loading: true, id: "item._id" });
        const res = await deleteAProduct(item._id)
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            router.refresh()
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: "" });
        }
    }


    const isAdminView = path.includes("admin-view");

    async function handleAddToCart(getItem) {
        setComponentLevelLoader({ loading: true, id: getItem._id })
        const res = await addToCart({ productID: getItem._id, userID: user._id })
        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: '' })
            setShowCartModal(true)
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: '' })
            setShowCartModal(true)
        }
    }

    return isAdminView ? (
        <>
            <button
                onClick={() => {
                    setCurrentUpdatedProduct(item)
                    router.push('/admin-view/add-product')
                }}
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                update
            </button>
            <button
                onClick={() => {
                    handleDeleteProduct(item)
                }}
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                {
                    componentLevelLoader && componentLevelLoader.loading && item._id === componentLevelLoader.id ? <ComponentLevelLoader
                        text={'Deleting Product'}
                        color={"#ffffff"}
                        loading={componentLevelLoader && componentLevelLoader.loading}
                    /> : 'Delete'
                }
            </button>
        </>
    ) : (
        <button
            onClick={() => handleAddToCart(item)}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
            {
                componentLevelLoader && componentLevelLoader.loading && item._id === componentLevelLoader.id ? <ComponentLevelLoader
                    text={'Adding to cart'}
                    color={"#ffffff"}
                    loading={componentLevelLoader && componentLevelLoader.loading}
                /> : 'Add to cart'
            }
        </button>
    );
}
