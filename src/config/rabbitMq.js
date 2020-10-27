dotenv = require("dotenv");
dotenv.config();

const amqp = require("amqplib");

const createConnection = async () => {
  try {
    console.log("rabbitmq running");
    return await amqp.connect(process.env.AMQ_URL);
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

module.exports = createConnection;
