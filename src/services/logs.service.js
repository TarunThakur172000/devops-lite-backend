const Health = require('../models/Health.modal');
const Projects = require('../models/projects.modal');
const Dashboard = require('../models/Dashboard.modal');
const {
  isSameDay,
  isSameMonth,
  calculateP95
} = require('../utils/dashboard.utils');

const updateHealthLog = async (data, projectId, userId) => {
  try {
    const now = new Date();

    const dashboard = await Dashboard.findOne({ userId });
    if (!dashboard) throw new Error("Dashboard not found");

    // ==============================
    // 🔁 DAILY RESET
    // ==============================
    if (!isSameDay(dashboard.lastDailyReset, now)) {
      dashboard.requestsToday = 0;
      dashboard.errorsToday = 0;
      dashboard.successToday = 0;
      dashboard.avgResponseTimeToday = 0;
      dashboard.incidentsToday = 0;
      dashboard.todayResponseSamples = [];
      dashboard.lastDailyReset = now;
    }

    // ==============================
    // 🔁 MONTHLY RESET
    // ==============================
    if (!isSameMonth(dashboard.lastMonthlyReset, now)) {
      dashboard.requestsUsedThisMonth = 0;
      dashboard.remainingRequests = dashboard.monthlyRequestLimit;
      dashboard.lastMonthlyReset = now;
    }

    // ==============================
    // 🚫 QUOTA CHECK
    // ==============================
    if (dashboard.remainingRequests <= 0) {
      throw new Error("Monthly request limit reached");
    }

    // ==============================
    // 📊 TOTAL COUNTERS
    // ==============================
    dashboard.totalRequests += 1;
    dashboard.requestsUsedThisMonth += 1;
    dashboard.remainingRequests -= 1;

    if (data.success) {
      dashboard.totalSuccess += 1;
      dashboard.successToday += 1;
    } else {
      dashboard.totalErrors += 1;
      dashboard.errorsToday += 1;
      dashboard.incidentsToday += 1;
    }

    dashboard.requestsToday += 1;

    // ==============================
    // ⏱ RESPONSE TIMES
    // ==============================
    dashboard.responseTimeSamples.push(data.responseTimeMs);
    dashboard.todayResponseSamples.push(data.responseTimeMs);

    // Keep only last 1000 samples (performance protection)
    if (dashboard.responseTimeSamples.length > 1000) {
      dashboard.responseTimeSamples.shift();
    }

    if (dashboard.todayResponseSamples.length > 1000) {
      dashboard.todayResponseSamples.shift();
    }

    // Total avg
    dashboard.avgResponseTime =
      dashboard.responseTimeSamples.reduce((a, b) => a + b, 0) /
      dashboard.responseTimeSamples.length;

    // Today avg
    dashboard.avgResponseTimeToday =
      dashboard.todayResponseSamples.reduce((a, b) => a + b, 0) /
      dashboard.todayResponseSamples.length;

    // Fastest / Slowest
    dashboard.fastestResponseTime = Math.min(...dashboard.responseTimeSamples);
    dashboard.slowestResponseTime = Math.max(...dashboard.responseTimeSamples);

    // P95
    dashboard.p95ResponseTime = calculateP95(
      dashboard.responseTimeSamples
    );

    // ==============================
    // 📉 ERROR RATE
    // ==============================
    dashboard.errorRate =
      dashboard.totalRequests > 0
        ? Math.round(
            (dashboard.totalErrors / dashboard.totalRequests) * 100
          )
        : 0;

    // ==============================
    // 📈 UPTIME
    // ==============================
    dashboard.uptimePercentage =
      dashboard.totalRequests > 0
        ? Math.round(
            (dashboard.totalSuccess / dashboard.totalRequests) * 100
          )
        : 100;

    await dashboard.save();

    // ==============================
    // 📝 SAVE HEALTH LOG
    // ==============================
    const healthLog = await Health.create({
      projectId,
      timestamp: data.timestamp,
      responseTimeMs: data.responseTimeMs,
      endpoint: data.endpoint,
      statusCode: data.statusCode,
      method: data.Method,
      errorMessage: data.errorMessage,
      success: data.success,
      ip: data.ip,
      userAgent: data.userAgent
    });

    // ==============================
    // 📦 UPDATE PROJECT
    // ==============================
    await Projects.updateOne(
      { _id: projectId },
      {
        $inc: {
          totalApiCalls: 1,
          totalResponseTime: data.responseTimeMs,
          ...(data.success
            ? { totalSuccess: 1 }
            : { totalErrors: 1 })
        }
      }
    );

    return healthLog._id;

  } catch (err) {
    console.error("Dashboard update error:", err);
    throw err;
  }
};

module.exports = { updateHealthLog };

module.exports = { updateHealthLog };
