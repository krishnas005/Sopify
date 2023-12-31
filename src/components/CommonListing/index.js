"use client"

import Notification from "../Notification"
import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";


export default function CommonList({ data }) {
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, [router]);
    return (
        <section className='bg-white py-12 sm:py-16'>
            <div className="mx-auto max-w-screen-xll px-4 sm:px-6 lg:px-8">
                <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                    {
                        data && data.length ?
                            data.map((item) => (
                                <article className="relative flex flex-col  cursor-pointer overflow-hidden"
                                key={item._id}
                                >
                                    <ProductTile item={item} />
                                    <ProductButton item={item} />
                                </article>
                            )) : null
                    }
                </div>
            </div>
            <Notification />
        </section>
    )
}