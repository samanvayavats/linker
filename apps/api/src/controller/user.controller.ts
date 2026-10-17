
import { UserRegister } from "@repo/types/user";
import { prisma } from "@repo/db"
import { Request, Response } from "express";
import bcrypt from "bcrypt";
export async function userRegister(req: Request, res: Response) {

    try {
        const body = req.body;
        const userValidation = UserRegister.safeParse(body)

        if (!userValidation.success) {
            return res.status(401).json({
                message: "vaildation failed"
            });
        }

        const hashPassword = await bcrypt.hash(userValidation.data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: userValidation.data.name,
                password: hashPassword,
                email: userValidation.data.email
            }, select: {
                id: true,
                name: true,
                email: true
            }
        });
     
        if (!user) {
            return res.status(500).json({
                message: "Registeration failed"
            });
        }

        return res.status(200).json({
            message: "User Registered ",
            data: user
        });

    } catch (error) {
        console.log("error at the time of the Registeration",error);
        return res.status(500).json({
            message: "Registeration failed"
        });
    }

}

export async function userLogin(req: Request, res: Response) {
    try {

    } catch (error) {

    }

}