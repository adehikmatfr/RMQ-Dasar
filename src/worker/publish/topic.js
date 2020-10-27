const Exchange = require("../channel/exchange");

const Topic = async () => {
  queue = "topic logs";
  let args = process.argv.slice(2);
  const key = args.length > 0 ? args[0] : "anonymous.info";
  let msg = args.slice(1).join(" ") || "Hello World!";
  const encode = Buffer.from(msg).toString("base64");
  const ch = await Exchange(queue, "topic", { durable: false });
  try {
    if (!ch) throw (err = "channel error");
    await ch.publish(queue, key, Buffer.from(encode));
    console.log(" [x] Sent %s: '%s'", key, msg);
    await ch.close();
    process.exit();
  } catch (err) {
    ch.close();
    console.log(err);
  }
};

Topic();
