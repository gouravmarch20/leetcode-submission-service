const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');
const axios = require('axios');

function evaluationWorker(queue) {
    console.log(`evaluationWorker` )
    
    new Worker('EvaluationQueue', async job => {
        if (job.name === 'EvaluationJob') {
            console.log(`evaluationWorker_1` , job )

            try {
                const response = await axios.post('http://localhost:4004/sendPayload', {
                    userId: job.data.userId,
                    payload: job.data
                })
                console.log(response);
              console.log(job.data);
            } catch(error) {
                console.log(error)
            }
        }
    }, {
        connection: redisConnection
    });
}

module.exports = evaluationWorker;