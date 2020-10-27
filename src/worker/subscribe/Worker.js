const Assert = require("../channel/assert");

const worker = async () => {
  const queue = "taks queue";
  const ch = await Assert(queue, {
    durable: true,
  });
  try {
    if (!ch) throw (err = "channel error");
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    await ch.consume(
      queue,
      (msg) => {
        const pesan = Buffer.from(msg.content.toString(), "base64").toString();
        const sec = pesan.split(".").length - 1;
        console.log("[#] message : ", pesan);
        setTimeout(function () {
          console.log(" [x] Done");
        }, sec * 1000);
      },
      {
        noAck: false,
      }
    );
  } catch (err) {
    console.log(err);
    conn.close();
  }
};

worker();
