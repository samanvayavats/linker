import {  email, z } from "zod";
export const UserRegisterType = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string()
})

export const UserLoginType = z.object({
    email : z.string(),
    password : z.string()
})