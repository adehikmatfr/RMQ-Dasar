const rmqconn = require("../../config/rabbitMq");
const Exchange = async (queue, type, config) => {
  const conn = await rmqconn();
  try {
    const ch = await conn.createChannel();
    await ch.assertExchange(queue, type, config);
    return ch;
  } catch (err) {
    conn.close();
    console.log(err);
    return false;
  }
};
module.exports = Exchange;
