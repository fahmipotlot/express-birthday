const CronJob = require("node-cron");
const getUserBirthday = require('./getUserBirthday');

exports.initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule("* * * * *", () => {
    getUserBirthday.getUserBirthday();
  });

  scheduledJobFunction.start();
}