import app from "./app/app.js";
import config from "./config/config.js";
import { connectDB } from "./config/db.js";

await connectDB();

app.listen(config.PORT,(req,res) =>{
    console.log("Server running on port 3000");
});


