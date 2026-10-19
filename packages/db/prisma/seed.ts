import { prisma } from "../src/index"

const ACTIONS = [
    {
        id: "email",
        name: "Send Email",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s"
    },
    {
        id: "whatsapp",
        name: "Send Whatsapp ",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/960px-WhatsApp.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail"
    }
];

const TRIGGERS = [
    {
        id: "webhook",
        name: "Webhook",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",

    }
];

async function main() {
    ACTIONS.map(async (e) => {
        await prisma.availableAction.create({
            data: {
                id: e.id,
                name: e.name,
                image: e.image
            }
        })
    })
    TRIGGERS.map(async (e) => {
        await prisma.availableTrigger.create({
            data: {
                id: e.id,
                name: e.name,
                image: e.image
            }
        })
    })
}
main().then(()=>{
    console.log("db seeded")
}).catch(()=>{
    console.log("db seed failed")
})