import express, { Request, Response } from "express";
import { prisma, Prisma } from "@repo/db";
const app = express();
app.use(express.json());

app.post('/hook/catch/:userId/:zapId', async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const zapId = Array.isArray(req.params.zapId) ? req.params.zapId[0] : req.params.zapId
        const body = req.body

        if (!userId || !zapId || !body) {
            return res.status(400).json({
                message: "Invalid Data"
            });
        }
        

        const tx = await prisma.$transaction(async (tx) => {
            const zapRun = await tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metadata: body.metadata
                }
            })

            const zapRunOutbox = await tx.zapRunOutbox.create({
                data: {
                    zapRunId: zapRun.id
                }
            });
        });

         return res.status(200).json({
                message: "Webhook received"
            });

    } catch (error) {
        console.log("error while catching the webhook",error)
        return res.status(500).json({
                message: "webhook failed"
            });
    }


})

app.listen(3002, () => {
    console.log(`app running at ${3002}`)
})