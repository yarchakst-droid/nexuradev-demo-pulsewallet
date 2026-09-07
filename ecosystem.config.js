module.exports = {
  apps: [
    {
      name: "demo-pulsewallet",
      cwd: __dirname,
      script: "node_modules/.bin/next",
      args: "start -p 3214 -H 127.0.0.1",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
