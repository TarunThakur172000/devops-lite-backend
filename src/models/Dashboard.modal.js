const mongoose = require('mongoose');
const { Schema } = mongoose;

const dashboardSchema = new Schema({
  // User
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true
  },

  // Plan info
  userPlan: { type: String, default: "Free" },

  // Total project stats
  totalProjects: { type: Number, default: 0 },
  activeProjects: { type: Number, default: 0 },
  downProjects: { type: Number, default: 0 },

  // Total API stats
  totalRequests: { type: Number, default: 0 },
  totalSuccess: { type: Number, default: 0 },
  totalErrors: { type: Number, default: 0 },
  errorRate: { type: Number, default: 0 },

  // Today stats
  requestsToday: { type: Number, default: 0 },
  successToday: { type: Number, default: 0 },
  errorsToday: { type: Number, default: 0 },
  incidentsToday: { type: Number, default: 0 },
  avgResponseTimeToday: { type: Number, default: 0 },
  todayResponseSamples: { type: [Number], default: [] }, // for p95/avg today

  // Response times
  avgResponseTime: { type: Number, default: 0 },
  p95ResponseTime: { type: Number, default: 0 },
  fastestResponseTime: { type: Number, default: 0 },
  slowestResponseTime: { type: Number, default: 0 },
  responseTimeSamples: { type: [Number], default: [] }, // for p95/avg total

  // Uptime / health
  uptimePercentage: { type: Number, default: 100 },
  currentlyDownCount: { type: Number, default: 0 },

  // Monthly quotas
  monthlyRequestLimit: { type: Number, default: 10000 },
  requestsUsedThisMonth: { type: Number, default: 0 },
  remainingRequests: { type: Number, default: 10000 },

  // Daily / monthly resets
  lastDailyReset: { type: Date, default: Date.now },
  lastMonthlyReset: { type: Date, default: Date.now },

}, { timestamps: true });

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;