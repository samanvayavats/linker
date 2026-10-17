import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('hello from hooks')
})

app.listen(3001, () => {
    console.log(`app running at ${3001}`)
})