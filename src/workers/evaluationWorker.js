const { Worker } = require("bullmq");
const redisConnection = require("../config/redisConfig");
const axios = require("axios");
const { SOCKET_SERVICE_URL } = require("../config/serverConfig");

// const PROBLEM_ADMIN_API_URL = SOCKET_SERVICE_URL.concat("/sendPayload");
const PROBLEM_ADMIN_API_URL = `${SOCKET_SERVICE_URL}/sendPayload`;

function evaluationWorker(queue) {
  console.log(`evaluationWorker`);

  new Worker(
    "EvaluationQueue",
    async (job) => {
      if (job.name === "EvaluationJob") {
        try {
          console.log("pre_hit", {
            userId: job.data.userId,
            payload: job.data,
          });
          const response = await axios.post(PROBLEM_ADMIN_API_URL, {
            userId: job.data.userId,
            payload: job.data,
          });
          console.log("post_hit", response);
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
