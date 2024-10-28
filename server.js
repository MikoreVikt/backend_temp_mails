require("dotenv").config();

const { app } = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 5500;

(async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
})();
