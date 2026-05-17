module.exports = {
  apps: [
    {
      name: 'brill-studio',
      script: './backend/src/server.js',
      cwd: __dirname,
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
