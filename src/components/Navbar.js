"use client"

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModel from "./CommonModel";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CartModal from "./CartModal";
import { FaCartShopping } from "react-icons/fa6";




function NavItems({ isModalView = false, isAdminView }) {
    const path = usePathname();
    const router = useRouter();
    return (
        <div className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"}`} id="nav-items">
            <ul className={`flex flex-col gap-0 lg:gap-3 mt-4 xl:ml-8 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${isModalView ? "border-none" : "border border-gray-100"}`}>
                {
                    isAdminView ? adminNavOptions.map(items =>
                        <li
                            className={`cursor-pointer block py-2 pl-3 pr-4 text-gray-700 rounded md:p-0 ${path === items.path ? "text-bold" : " "} ${isModalView ? "hover:bg-slate-400" : ""} `}
                            key={items.id}
                            onClick={() => router.push(items.path)}
                        >
                            {items.label}
                        </li>) :
                        navOptions.map(items =>
                            <li className={`cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 ${path === items.path ? "underline" : " "} ${isModalView ? "hover:bg-slate-400" : ""}`}
                                key={items.id}
                                onClick={() => router.push(items.path)}
                            >
                                {items.label}
                            </li>)
                }
            </ul>
        </div>
    )
}

export default function Navbar() {
    const { showNavModal, setShowNavModal } = useContext(GlobalContext)
    const { user, isAuthUser, setIsAuthUser, setUser, currentUpdatedProduct, setCurrentUpdatedProduct, showCartModal, setShowCartModal } = useContext(GlobalContext)
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (path !== '/admin-view/add-product' && currentUpdatedProduct !== null) { setCurrentUpdatedProduct(null) }
    }, [path])

    const isAdminView = path.includes('admin-view');

    function handleLogout() {
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove('token');
        localStorage.clear();
        router.push('/');
    }

    return (
        <>
            <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center cursor-pointer">
                        <span className="self-center text-2xl font-bold whitespace-nowrap">
                            <Link href="/">Sopify</Link>
                        </span>
                    </div>
                    <div className="flex md:order-2 lg:gap-5 gap-3 text-[12px] md:px-5 md:py-3 md:text-[16px]">
                        {
                            user?.role === 'admin' ?
                                isAdminView ? <button onClick={() => router.push('/')}>Client View</button> : <button onClick={() => router.push('/admin-view')}>Admin View</button>
                                : null
                        }
                        {!isAdminView && isAuthUser ?
                            <Fragment>
                                <button onClick={() => router.push('/account')}>Account</button>
                                <button onClick={() => setShowCartModal(true)}><FaCartShopping size={26} /></button>
                            </Fragment>
                            : null}

                        {
                            isAuthUser ? <button
                                className=" inline-block bg-black px-3 py-1  text-[10px] md:px-5 md:py-3 lg:text-xs font-medium uppercase tracking-wide text-white "
                                onClick={handleLogout}>
                                Logout
                            </button>
                                :
                                <button
                                    className=" inline-block bg-black px-3  text-[10px] md:px-5 md:py-3 lg:text-xs font-medium uppercase tracking-wide text-white"
                                    onClick={() => router.push('/login')}>
                                    Login
                                </button>
                        }
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                            onClick={() => setShowNavModal(!showNavModal)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <NavItems isAdminView={isAdminView} />
                </div>
            </nav>
            <CommonModel
                showModalTitle={false}
                mainContent={<NavItems isModalView={true}
                    isAdminView={isAdminView} />}
                show={showNavModal}
                setShow={setShowNavModal} />
            {
                showCartModal &&
                <CartModal
                />
            }
        </>
    )
}

