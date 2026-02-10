const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Monitoring Tool 🛠️",
      version: "1.0.0",
      description: `Our API Monitoring Tool is designed to help backend developers keep a close eye on their APIs’ health and performance. With this tool, you can:

Track API uptime and crashes – know exactly when and how often your APIs fail.

Monitor response times – see the average response time for each API call.

Identify slow endpoints – quickly find which endpoints are causing delays.

Gain actionable insights – make informed decisions to optimize your API performance.

Keep your APIs reliable, efficient, and user-friendly with real-time monitoring and detailed analytics.`,
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
