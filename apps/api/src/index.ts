import express from "express"
import dotenv from 'dotenv';
import cors from "cors"
dotenv.config({ path: './.env'});

const app = express()
import userRouter from "./router/user.route";
import zapRouter from "./router/zap.route"
app.use(express.json());
app.use(cors())

app.use("/api/v1/user" , userRouter)
app.use("/api/v1/zap" , zapRouter)

app.listen(process.env.PORT , ()=>{
    console.log(`app runing at ${process.env.PORT}`)
})