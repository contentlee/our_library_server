const config = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};

export default config;
