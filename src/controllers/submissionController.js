async function pingRequest(req, res) {
  console.log(this.testService);

  const response = await this.testService.pingCheck();
  return res.send({ data: response });
}

// TODO: Add validastion layer
async function createSubmission(req, res) {
  console.log(req.body);
  const response = await this.submissionService.addSubmission(req.body);
  return res.status(201).send({
    error: {},
    data: response,
    success: true,
    message: "Created submission successfully",
  });
}

async function updateSubmission(req, res) {
  const response = await this.submissionService.updateSubmission(req.body);
  return res.status(201).send({
    error: {},
    data: response,
    success: true,
    message: "Created submission successfully",
  });
}
async function getAllSubmission(req, res) {
  const response = await this.submissionService.getAllSubmission(req.body);
  return res.status(201).send({
    error: {},
    data: response,
    success: true,
    message: "fetch submission successfully",
  });
}

module.exports = {
  pingRequest,
  createSubmission,
  updateSubmission,
  getAllSubmission,
};
