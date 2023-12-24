import connect from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddToCart = Joi.object({
    userID: Joi.string().required(),
    productID: Joi.string().required()
})

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connect();
        const isAuthUser = await AuthUser(req);
        if(isAuthUser) {
            const data = await req.json();
            const { productID, userID } = data;

            const {error} = AddToCart.validate({userID,productID});
            if(error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message
                })
            }

            const isCurrentCartItemAlreadyExists = await Cart.find({
                productID: productID,
                userID: userID,
            })

            if(isCurrentCartItemAlreadyExists?.length > 0) {
                return NextResponse.json({
                    success: false,
                    message: "Product is already in cart!"
                })
            }

            const saveProductToCart = await Cart.create(data);

            if(saveProductToCart) {
                return NextResponse.json({
                    success: true,
                    message: "Product is added to cart"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to add product to cart!"
                })
            }

        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated!"
            })
        }
    } catch(e) {
        console.lgo(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}