const Exchange = require("../channel/exchange");

const HalloWorld = async () => {
  const queue = "logss";
  const msg = "Hello world";
  const encode = Buffer.from(msg).toString("base64");
  const ch = await Exchange(queue, "fanout", {
    durable: false,
  });
  try {
    if (!ch) throw (err = "channel error");
    await ch.publish(queue, "", Buffer.from(encode));
    console.log(" [x] Sent %s", msg);
    await ch.close();
    process.exit();
  } catch (err) {
    ch.close();
    console.log(err);
  }
};

HalloWorld();
