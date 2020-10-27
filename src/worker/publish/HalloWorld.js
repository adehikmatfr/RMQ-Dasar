const Assert = require("../channel/assert");

const HalloWorld = async () => {
  const queue = "hallo";
  const msg = "Hello world";
  const encode = Buffer.from(msg).toString("base64");
  const ch = await Assert(queue, {
    durable: false,
  });
  try {
    if (!ch) throw (err = "channel error");
    await ch.sendToQueue(queue, Buffer.from(encode));
    console.log(" [x] Sent %s", msg);
    await ch.close();
    process.exit();
  } catch (err) {
    ch.close();
    console.log(err);
  }
};

HalloWorld();
