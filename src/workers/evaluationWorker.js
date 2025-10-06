const { Worker } = require("bullmq");
const redisConnection = require("../config/redisConfig");
const axios = require("axios");
const { PROBLEM_ADMIN_SERVICE_URL } = require("../config/serverConfig");

const PROBLEM_ADMIN_API_URL = `${PROBLEM_ADMIN_SERVICE_URL}/sendPayload`;

function evaluationWorker(queue) {
  console.log(`evaluationWorker`);

  new Worker(
    "EvaluationQueue",
    async (job) => {
      if (job.name === "EvaluationJob") {
        console.log(`evaluationWorker_1`, job);

        try {
          const response = await axios.post(PROBLEM_ADMIN_API_URL, {
            userId: job.data.userId,
            payload: job.data,
          });
          console.log(response);
          console.log(job.data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    {
      connection: redisConnection,
    }
  );
}

module.exports = evaluationWorker;
