const Assert = require("../channel/assert");

const Taks = async () => {
  const queue = "taks queue";
  const msg = process.argv.slice(2).join(" ") || "Hello world ...";
  const encode = Buffer.from(msg).toString("base64");
  const ch = await Assert(queue, {
    durable: true, //pesan akan tahan lama
  });
  try {
    if (!ch) throw (err = "channel error");
    await ch.sendToQueue(queue, Buffer.from(encode), { persistent: true }); //pesan di simpan di disc
    console.log(" [x] Sent %s", msg);
    await ch.close();
    process.exit();
  } catch (err) {
    ch.close();
    console.log(err);
  }
};

Taks();
