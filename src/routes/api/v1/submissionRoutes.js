const { createSubmission } = require("../../../controllers/submissionController");

async function submissionRoutes(fastify, options) {
    fastify.post('/', createSubmission);
    fastify.get('/', (req , res) => {
        return res.status(201).send({
            error: {},
            data: "response",
            success: true,
            message: 'Created submission successfully'
        })
    });

}

module.exports = submissionRoutes;