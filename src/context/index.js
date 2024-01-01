"use client"

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

export const GlobalContext = createContext(null);

export const initialCheckoutFormData = {
    shippingAddress: {},
    paymentMethod: '',
    totalPrice: '',
    isPaid: false,
    paidAt: new Date(),
    isProcessing: true
}

const protectedRoutes = [
    'cart',
    'checkout',
    'account',
    'order',
    'admin-view',
]

const protectedAdminRoutes = [
    '/admin-view',
    '/admin-view/add-product',
    '/admin-view/all-products'
]

export default function GlobalState({ children }) {
    const [showNavModal, setShowNavModal] = useState(false);
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [pageLevelLoader, setPageLevelLoader] = useState(false);
    const [componentLevelLoader, setComponentLevelLoader] = useState({ loading: false, id: "" });
    const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [addresses, setAddresses] = useState([])
    const [addressFormData, setAddressFormData] = useState({
        fullName: '',
        city: '',
        country: '',
        postalCode: '',
        address: ''
    })
    const [checkoutFormData, setCheckoutFormData] = useState(initialCheckoutFormData);
    const [allOrdersForUser, setAllOrdersForUser] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);

    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        // console.log(Cookies.get('token'))
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            const getCartItems = JSON.parse(localStorage.getItem('cartItems')) || []
            setUser(userData);
            setCartItems(getCartItems);
        } else {
            setIsAuthUser(false);
            setUser({}); //unauthenticated user
        }
    }, [Cookies])

    useEffect(() => {
        if (
            path !== "/signup" &&
            !path.includes("product") &&
            path !== "/" &&
            user &&
            Object.keys(user).length === 0 &&
            protectedRoutes.includes(path) > -1
        )
            router.push("/login");
    }, [user, path])

    useEffect(() => {
        if (user !== null && user && Object.keys(user).length > 0 && user?.role !== 'admin' && protectedAdminRoutes.indexOf(path) > -1) router.push('/unauthorized-page')
    }, [user, path])

    return (
        <GlobalContext.Provider value={{
            showNavModal, setShowNavModal, isAuthUser, setIsAuthUser, user, setUser, pageLevelLoader, setPageLevelLoader, componentLevelLoader, setComponentLevelLoader, currentUpdatedProduct, setCurrentUpdatedProduct, showCartModal, setShowCartModal, cartItems, setCartItems, addresses, setAddresses, addressFormData, setAddressFormData, checkoutFormData, setCheckoutFormData, allOrdersForUser,
            setAllOrdersForUser,
            orderDetails,
            setOrderDetails,
            allOrdersForAllUsers,
            setAllOrdersForAllUsers,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}