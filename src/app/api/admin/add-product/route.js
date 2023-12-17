import connect from "@/database";
import { NextResponse } from "next/server";
import Product from "@/models/product";
import Joi from "joi";

const AddNewProductSchema = Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().required(),
    category:Joi.string().required(),
    sizes:Joi.array().required(),
    deliveryInfo:Joi.string().required(),
    onSale:Joi.string().required(),
    priceDrop:Joi.number().required(),
    imageUrl:Joi.string().required()
})

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connect();
        const user = "admin";

        if(user==='admin') {
            const data = await req.json();

            const {
                name,
                description,
                price,
                imageUrl,
                category,sizes,
                deliveryInfo,
                onSale,
                priceDrop
            } = data;

            const {error} = AddNewProductSchema.validate({
                name,description,price,imageUrl,category,sizes,deliveryInfo,onSale,priceDrop
            });
            if(error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message
                });
            }

            const newlyCreateProduct = await Product.create(data);

            if(newlyCreateProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product added successfully"
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to add the product"
                });
            }
            
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authorized!"
            });
        }
    } catch(err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: `Error: ${err}`
        });
    }
}