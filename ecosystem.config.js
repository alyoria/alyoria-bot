module.exports = {
  apps: [
    {
      name: "alyoria-bot",
      script: "npm",
      args: "run dev",
      interpreter: "none",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};