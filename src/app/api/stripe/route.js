import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";


const stripe = require('stripe')(
    "sk_test_51ORGemSE6m9hYGP4qTSwo31ud6JfZuoWhxXwQWJOYRALuC5WB5eQIwyjdOEujEDvmx8LSsp34Fz4xNYUaHpQtw9v00RpjjSxgT"
);

export const dynamic = 'force-dynamic';

export async function POST(req) {

    try {
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const res = await req.json();
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: res,
                mode: "payment",
                success_url: "http://localhost:3000/checkout" + "?status=success",
                cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
            });
            return NextResponse.json({
                success: true,
                id: session.id,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated!"
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            success: false,
            message: 'Something went wrong!'
        });
    }
}