// import 
import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/index.js";

// configured
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`)
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err)
    process.exit(1)
  });
