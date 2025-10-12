const { Worker } = require("bullmq");
const redisConnection = require("../config/redisConfig");
const axios = require("axios");
const { SOCKET_SERVICE_URL } = require("../config/serverConfig");

const SOCKET_URL = `${SOCKET_SERVICE_URL}/sendPayload`;

function evaluationWorker(queue) {
  console.log(`evaluationWorker`);

  new Worker(
    "EvaluationQueue",
    async (job) => {
      if (job.name === "EvaluationJob") {
        try {
          console.log("hit websocket problem is solved");
          const response = await axios.post(SOCKET_URL, {
            userId: job.data.userId,
            payload: job.data,
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    {
      connection: redisConnection,
    }
  );
}

module.exports = evaluationWorker;
