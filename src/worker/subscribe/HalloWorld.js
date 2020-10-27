const Assert = require("../channel/assert");

const reciver = async () => {
  const queue = "hallo";
  const ch = await Assert(queue, {
    durable: false,
  });
  try {
    if (!ch) throw (err = "channel error");
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    await ch.consume(
      queue,
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

reciver();
