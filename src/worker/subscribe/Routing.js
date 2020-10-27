const Exchange = require("../channel/exchange");

const Routing = async () => {
  const queue = "direct logs";
  let args = process.argv.slice(2);
  if (args.length == 0) {
    console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
    process.exit(1);
  }
  const ch = await Exchange(queue, "direct", {
    durable: false,
  });
  try {
    if (!ch) throw (err = "channel error");
    const q = await ch.assertQueue("", { exclusive: true });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C");
    args.forEach((severity) => {
      ch.bindQueue(q.queue, queue, severity);
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

Routing();
