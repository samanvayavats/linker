import {  z } from "zod";
export const UserRegister = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string()
})