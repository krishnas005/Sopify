import { NextResponse } from "next/server";
import connect from '@/database'
import Product from "@/models/product";

export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {

        await connect();
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
            _id:_id,
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
        {new:true}
        );

        if(updatedProduct) {
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
    } catch(e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}