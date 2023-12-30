import connect from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";


const AddNewAddress = Joi.object({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    userID: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export async function POST(req) {

    try {
        await connect();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const data = await req.json();
            const { fullName, address, city, country, postalCode, userID } = data;
            const { error } = AddNewAddress.validate({
                fullName, address, city, country, postalCode, userID
            })
            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                });
            }
            const newAddress = await Address.create(data);
            if (newAddress) {
                return NextResponse.json({
                    success: true,
                    message: "Details added successfully!"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to add details!"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "User is not authenticated!"
            })
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}