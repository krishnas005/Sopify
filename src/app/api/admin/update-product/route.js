import { NextResponse } from "next/server";
import connect from '@/database'
import Product from "@/models/product";
import AuthUser from "@/middleware/AuthUser";

export const dynamic = "force-dynamic";

export async function PUT(req) {

    try {

        await connect();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser?.role === "admin") {

            const data = await req.json();

            const {
                _id,
                name,
                price,
                description,
                category,
                sizes,
                deliveryInfo,
                onSale,
                priceDrop,
                imageUrl
            } = data;

            const updatedProduct = await Product.findOneAndUpdate({
                _id: _id,
            },
                {
                    name,
                    price,
                    description,
                    category,
                    sizes,
                    deliveryInfo,
                    onSale,
                    priceDrop,
                    imageUrl
                },
                { new: true }
            );

            if (updatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product updated successfully!"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to update the product!"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated!"
            })
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}