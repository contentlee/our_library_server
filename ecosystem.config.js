module.exports = {
  apps: [
    {
      name: "app",
      script: "./server-register.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};
