
import { Kafka } from "kafkajs";
import { prisma } from "@repo/db";

const TOPIC_NAME = "linker-topic";

const kafka = new Kafka({
  clientId: "linker-producer-app",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  await producer.connect();

  while (true) {
    try {
      const pendingRows = await prisma.zapRunOutbox.findMany({
        take: 10,
        orderBy: { id: "asc" }
      });

      if (pendingRows.length === 0) {
        await sleep(1000);
        continue;
      }

      // Publish before deleting the database rows.
      await producer.send({
        topic: TOPIC_NAME,
        messages: pendingRows.map((row) => ({
          value: JSON.stringify({
            zapRunId: row.zapRunId,
            stage: 0
          })
        }))
      });

      await prisma.zapRunOutbox.deleteMany({
        where: {
          id: {
            in: pendingRows.map((row) => row.id)
          }
        }
      });
    } catch (error) {
      console.error("Outbox processing failed:", error);
      await sleep(3000);
    }
  }
}

main().catch(console.error);
