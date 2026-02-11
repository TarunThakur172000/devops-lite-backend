# health-monitor-middleware

[![npm version](https://img.shields.io/npm/v/health-monitor-middleware)](https://www.npmjs.com/package/health-monitor-middleware)
[![License](https://img.shields.io/npm/l/health-monitor-middleware)](LICENSE)
[![Downloads](https://img.shields.io/npm/dt/health-monitor-middleware)](https://www.npmjs.com/package/health-monitor-middleware)

A lightweight **Express middleware** to automatically monitor API health.  
It tracks requests, responses, errors, response time, and uptime, sending logs to your dashboard using an API key.

This package is plug-and-play — just install it, provide your API key, and it works out-of-the-box.

---

## Features

- Automatic logging of all API requests
- Tracks:
  - Endpoint (`/api/users`, `/login`, etc.)
  - HTTP method (GET, POST, PUT, DELETE)
  - Status code (200, 404, 500, etc.)
  - Response time in milliseconds
  - Success / error messages
  - IP address and User-Agent
- Dashboard integration via API key
- Supports multiple environments (`production`, `staging`, `development`)
- Optional route ignoring
- Works with Express 4.x and above

---

## Installation

```bash
npm install health-monitor-middleware

Usage
1. Import and Initialize Middleware
const express = require('express');
const app = express();

// Import health monitor middleware
const healthMonitor = require('health-monitor-middleware');

// Use middleware globally
app.use(
  healthMonitor({
    apiKey: 'YOUR_DASHBOARD_API_KEY', // Required
    environment: 'production',        // Optional, default: 'production'
    ignoreRoutes: ['/health']         // Optional, array of routes to ignore
  })
);

app.get('/api/users', (req, res) => {
  res.json({ message: 'Hello users' });
});

app.listen(3000, () => console.log('Server running on port 3000'));

2. How It Works

Middleware intercepts every request and response.

Captures metrics: endpoint, method, status, response time, IP, User-Agent.

Sends logs asynchronously to your monitoring dashboard using the API key.

Your dashboard aggregates metrics per project, showing:

Total API calls

Error count

Average response time

Uptime percentage

3. Middleware Configuration Options
Option	Type	Required	Default	Description
apiKey	string	✅ Yes	—	API key generated from your dashboard for authentication
environment	string	❌ No	production	Environment name for metrics (production, staging, dev)
ignoreRoutes	string[]	❌ No	[]	Array of routes to ignore from logging
batchInterval	number	❌ No	5000	Interval in ms to batch and send logs (optional optimization)
Example Log Object Sent to Dashboard
{
  "timestamp": "2026-02-11T16:24:00.123Z",
  "method": "GET",
  "endpoint": "/api/users",
  "fullUrl": "/api/users",
  "statusCode": 200,
  "responseTimeMs": 123,
  "success": true,
  "errorMessage": null,
  "ip": "192.168.0.1",
  "userAgent": "PostmanRuntime/7.28.4",
  "environment": "production",
  "projectId": "623d2f6b9e1b0a0012345678"
}

Example Metrics from Dashboard

Total API calls: 120

Error count: 5

Average response time: 135 ms

Uptime: 95.83%

Best Practices

Async logging – middleware sends logs asynchronously to avoid blocking API responses.

Ignore routes – don’t log health checks or static files.

Use environments – differentiate production, staging, or development metrics.

Batch logs – optionally batch logs to reduce network calls.

Secure API key – never commit it publicly.

Contributing

We welcome contributions!

Fork the repo

Create a new branch (feature/my-feature)

Run tests:

npm test


Submit a pull request

License

MIT © Your Name

Acknowledgements

Inspired by Postman Monitors and lightweight API monitoring systems.


---

✅ This README is **ready for npm**, **doesn’t mention Yarn**, and clearly explains:

- Installation  
- Setup  
- Configuration  
- Logging and metrics  
- Best practices  


