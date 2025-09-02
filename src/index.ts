import express, { json } from "express";
import "dotenv/config";
import router from "./router.ts";

const app = express();
const port = process.env.SERVER_PORT;
app.use(json());
app.use(router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})