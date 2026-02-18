const mongoose = require('mongoose');
const {Schema} = mongoose;

const dashboardSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true
  },

  userPlan: { type: String, default: "Free" },

  totalProjects: { type: Number, default: 0 },
  activeProjects: { type: Number, default: 0 },
  downProjects: { type: Number, default: 0 },

 
  totalRequests: { type: Number, default: 0 },
  totalSuccess: { type: Number, default: 0 },
  totalErrors: { type: Number, default: 0 },
  errorRate: { type: Number, default: 0 },

 
  requestsToday: { type: Number, default: 0 },
  errorsToday: { type: Number, default: 0 },
  successToday: { type: Number, default: 0 },
  avgResponseTimeToday: { type: Number, default: 0 },


  avgResponseTime: { type: Number, default: 0 },
  p95ResponseTime: { type: Number },
  fastestResponseTime: { type: Number },
  slowestResponseTime: { type: Number },


  uptimePercentage: { type: Number, default: 100 },
  incidentsToday: { type: Number, default: 0 },
  currentlyDownCount: { type: Number, default: 0 },

 
  monthlyRequestLimit: { type: Number, default: 10000 },
  requestsUsedThisMonth: { type: Number, default: 0 },
  remainingRequests: { type: Number, default: 10000 }

}, { timestamps: true });

const Dashboard = mongoose.model('Dashboard',dashboardSchema);

module.exports = Dashboard;
