import connect from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connect();
        const extractProducts = await Product.find({});
        
            if (extractProducts) {
                return NextResponse.json({
                    success: true,
                    data: extractProducts
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "No products found!",
                })
            }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!",
        })
    }
}