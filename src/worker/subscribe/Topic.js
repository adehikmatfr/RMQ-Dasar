const Exchange = require("../channel/exchange");

const Topic = async () => {
  const queue = "topic logs";
  let args = process.argv.slice(2);
  if (args.length == 0) {
    console.log("Usage: receive_logs_topic.js <facility>.<severity>");
    process.exit(1);
  }
  const ch = await Exchange(queue, "topic", {
    durable: false,
  });
  try {
    if (!ch) throw (err = "channel error");
    const q = await ch.assertQueue("", { exclusive: true });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C");
    args.forEach((key) => {
      ch.bindQueue(q.queue, queue, key);
    });
    await ch.consume(
      q.queue,
      (msg) => {
        const pesan = Buffer.from(msg.content.toString(), "base64").toString();
        const route = msg.fields.routingKey;
        console.log("[#] %s : %s", route, pesan);
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

Topic();
