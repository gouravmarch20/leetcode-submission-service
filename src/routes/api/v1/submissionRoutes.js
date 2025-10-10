const {
  createSubmission,
  updateSubmission,
  getAllSubmission,
} = require("../../../controllers/submissionController");

async function submissionRoutes(fastify, options) {
  fastify.post("/problem", getAllSubmission);
  fastify.post("/", createSubmission);
  fastify.put("/", updateSubmission);
}

module.exports = submissionRoutes;
