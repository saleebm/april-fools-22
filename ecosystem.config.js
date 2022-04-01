module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'CAT_SPAM_CRON',
      script: 'main.js',
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '0,30 * * * *',
      watch: false,
      autorestart: false
    }
  ]
}
