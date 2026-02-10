const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend API",
      version: "1.0.0",
      description: "Auto-generated API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  // 🔥 ABSOLUTE PATH (this fixes your issue)
  apis: [path.join(__dirname, "./routes/**/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
