const rmqconn = require("../../config/rabbitMq");
const Assert = async (queue, config) => {
  const conn = await rmqconn();
  try {
    const ch = await conn.createChannel();
    await ch.assertQueue(queue, config);
    return ch;
  } catch (err) {
    conn.close();
    console.log(err);
    return false;
  }
};
module.exports = Assert;
