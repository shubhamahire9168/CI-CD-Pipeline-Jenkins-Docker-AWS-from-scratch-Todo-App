const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const useDBAuth = process.env.USE_DB_AUTH || false;

  if (useDBAuth) {
    connectionParams.user = process.env.MONGO_USERNAME;
    connectionParams.pass = process.env.MONGO_PASSWORD;
  }

  const connectWithRetry = async () => {
    try {
      if (!process.env.MONGO_CONN_STR) {
        throw new Error("MONGO_CONN_STR is not defined");
      }

      await mongoose.connect(process.env.MONGO_CONN_STR, connectionParams);

      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.log("❌ MongoDB not ready, retrying in 5 sec...");
      setTimeout(connectWithRetry, 5000);
    }
  };

  connectWithRetry();
};
