// create the zap
import { Request, Response } from "express";
import { CreateZapType } from "@repo/types"
import { prisma } from "@repo/db";

export async function createTheZap(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const body = req.body;

        const parsedUserId = typeof userId === "string" ? parseInt(userId, 10) : NaN;
        const zapValidation = CreateZapType.safeParse(body);
        
        if (!zapValidation.success || !Number.isInteger(parsedUserId)) {
            return res.status(401).json({
                message: "Invalid data"
            })
        }

        const zapId = await prisma.$transaction(async (tx ) => {

            const zap = await tx.zap.create({
                data: {
                    userId: parsedUserId,
                    triggerId: ""
                }
            });

            const trigger = await tx.trigger.create({
                data: {
                    zapId: zap.id,
                    triggerId: zapValidation.data.trigger.triggerId,
                    metadata: zapValidation.data.trigger.metadata || ""
                }
            });

            const action = zapValidation.data.actions.map(async (e, index) => {
                await tx.action.create({
                    data: {
                        zapId: zap.id,
                        actionId: e.actionId,
                        metadata: e.metadata || "",
                        sortingOrder: index
                    }
                });
            });

            await tx.zap.update({
                where: {
                    id: zap.id
                },
                data: {
                    triggerId: trigger.id
                }
            });

            return zap.id;

        })

        return res.status(200).json({
            message: "zap created",
            zapId:zapId
        });

    } catch (error) {
        console.log("creating zap failed " ,error);
        
        return res.status(500).json({
            message: "creating zap failed "
        });
    
    }
}
