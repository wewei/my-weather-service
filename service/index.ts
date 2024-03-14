import path from "node:path";
import express from "express";
import bodyParser from "body-parser";

const port = process.env.PORT || 8080;

const app = express();

app.get("/", (_, res) => {
    res.redirect("/static/index.html");
});

app.use("/static", express.static(path.resolve(__dirname, '../dist')));

const apiRoute = express.Router();

apiRoute.use(bodyParser.json());

apiRoute.post("/weather", async (req, res, next) => {
    const { location, date } = req.body;
});

app.use("/api", apiRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
