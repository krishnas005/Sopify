import connect from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
})

export async function POST(req) {
    await connect();

    const {name,email,password,role} = await req.json();

    const {error} = schema.validate({name,email,password,role})

    if(error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: email.details[0].message,
        })
    }

    try {
        const userExists = await User.findOne({email});
        if(userExists) {
            return NextResponse.json({
                success: false,
                message: 'User already exists!'
            })
        } else {
            const hashPassword = await hash(password,12);
            const newUser = await User.create({
                name,
                email,
                password:hashPassword,
                role,
            })
            if(newUser) {
                return NextResponse.json({
                    success: true,
                    message: 'Account created successfully!'
                })
            }
        }
    } catch (error) {
        console.log('Error in new user registration')
        return NextResponse.json({
            success: false,
            message: 'Something went wrong!'
        })
    }

}