const crypto = require('crypto');
const projects = require('../models/projects.modal');

const generate_Api = () => {
  return crypto.randomBytes(32).toString("hex");
};

const updateApi = async (projectId) => {
  try {
    const api = generate_Api();

    // Update the project
    const updatedProject = await projects.findByIdAndUpdate(
      projectId,          // the ID of the project
      { apiKey: api },   // update object
      { new: true }       // return the updated document
    );

    return updatedProject;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { generate_Api, updateApi };
