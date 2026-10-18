
import { UserRegisterType, UserLoginType } from "@repo/types/user";
import { prisma } from "@repo/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function userRegister(req: Request, res: Response) {
    try {
        const body = req.body;
        const userValidation = UserRegisterType.safeParse(body);

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
            },
            select: {
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
        console.log("error at the time of the Registeration", error);
        return res.status(500).json({
            message: "Registeration failed"
        });
    }
}

export async function userLogin(req: Request, res: Response) {
    try {
        const body = req.body;
        const userValidation = UserLoginType.safeParse(body);

        if (!userValidation.success) {
            return res.status(401).json({
                message: "vaildation failed"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: userValidation.data.email
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const isPasswordVerified = await bcrypt.compare(userValidation.data.password, user.password);

        if (!isPasswordVerified) {
            return res.status(401).json({
                message: "password incorrect"
            });
        }

        const payload = { userId: user.id, email: user.email };
        const secretKey = process.env.JWT_SECRET || "secret";
        const token = jwt.sign(payload, secretKey, { expiresIn: "15d" });

        return res.status(200).cookie("token", token).json({
            message: "User logged in",
            token,
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });


    } catch (error) {
        console.log("error at the time of the login", error);
        return res.status(500).json({
            message: "Login failed"
        });
    }
}