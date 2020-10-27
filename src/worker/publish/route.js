const Exchange = require("../channel/exchange");

const Route = async () => {
  queue = "direct logs";
  let args = process.argv.slice(2);
  let msg = args.slice(1).join(" ") || "Hello World!";
  const encode = Buffer.from(msg).toString("base64");
  let severity = args.length > 0 ? args[0] : "info";
  const ch = await Exchange(queue, "direct", { durable: false });
  try {
    if (!ch) throw (err = "channel error");
    await ch.publish(queue, severity, Buffer.from(encode));
    console.log(" [x] Sent %s: '%s'", severity, msg);
    await ch.close();
    process.exit();
  } catch (err) {
    ch.close();
    console.log(err);
  }
};

Route();
