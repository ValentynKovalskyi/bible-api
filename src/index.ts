import express, { json } from "express";
import "dotenv/config";
import router from "./router.ts";
import { errorHandler } from "./middleware/errorHandler.middleware.ts";

const app = express();
const port = process.env.SERVER_PORT;
app.use(json());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})