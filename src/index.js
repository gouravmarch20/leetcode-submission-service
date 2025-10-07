const fastify = require("fastify")({ logger: true }); // calling the fastify constructor
const app = require("./app");
const connectToDB = require("./config/dbConfig");
const serverConfig = require("./config/serverConfig");
const errorHandler = require("./utils/errorHandler");
const evaluationWorker = require("./workers/evaluationWorker");
const { FRONTEND_URL } = require("./config/serverConfig");
const fastifyCors = require("@fastify/cors");

console.log("FRONTEND_URL", FRONTEND_URL);


fastify.register(fastifyCors, {
  origin: [FRONTEND_URL, "http://localhost:5173"], // allow your React dev server
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

fastify.register(app);
fastify.setErrorHandler(errorHandler);



fastify.listen({ port: serverConfig.PORT, host: "0.0.0.0" }, async (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  await connectToDB();

  evaluationWorker("EvaluationQueue");
  console.log(`Server up at port ${serverConfig.PORT}`);
});
