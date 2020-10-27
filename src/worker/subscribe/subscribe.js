const Exchange = require("../channel/exchange");

const subscribe = async () => {
  const queue = "logss";
  const ch = await Exchange(queue, "fanout", {
    durable: false,
  });
  try {
    if (!ch) throw (err = "channel error");
    const q = await ch.assertQueue("", { exclusive: true });
    console.log(
      " [*] Waiting for messages in %s. To exit press CTRL+C",
      q.queue
    );
    await ch.bindQueue(q.queue, queue, "");
    await ch.consume(
      q.queue,
      (msg) => {
        const pesan = Buffer.from(msg.content.toString(), "base64").toString();
        console.log("[#] message : ", pesan);
      },
      {
        noAck: true,
      }
    );
  } catch (err) {
    console.log(err);
    conn.close();
  }
};

subscribe();
