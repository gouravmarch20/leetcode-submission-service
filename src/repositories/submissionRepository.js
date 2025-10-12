// const { createSubmission } = require("../controllers/submissionController");
const Submission = require("../models/submissionModel");

class SubmissionRepository {
  constructor() {
    this.submissionModel = Submission;
  }

  async createSubmission(submission) {
    const response = await this.submissionModel.create(submission);
    return response;
  }

  async updateSubmissionById(submissionId, updatePayload) {
    // Update only fields provided in the payload
    return this.submissionModel.findByIdAndUpdate(submissionId, updatePayload, {
      new: true,
    });
  }

  async getSubmission(problemId , userId) {
    return this.submissionModel.find({ problemId , userId });
  }
}

module.exports = SubmissionRepository;
