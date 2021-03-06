module.exports = () => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri: process.env.DATABASE_URI,
      },
      options: {
        ssl: true,
      },
    },
  },
});
