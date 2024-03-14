import axios from "axios";
import path from "node:path";
import querystring from "node:querystring";
import express from "express";
import bodyParser from "body-parser";

const port = process.env.PORT || 8080;
const apiKey = process.env.SENIVERSE_API_KEY || "";

const app = express();

app.get("/", (_, res) => {
    res.redirect("/static/index.html");
});

app.use("/static", express.static(path.resolve(__dirname, '../dist')));

const apiRoute = express.Router();

apiRoute.use(bodyParser.json());

apiRoute.post("/weather", async (req, res, next) => {
    const { location, date } = req.body;
    const qs = querystring.encode({
        key: apiKey,
        location,
        language: 'zh-Hans',
        unit: 'c',
        start: 0,
        days: 1
    });

    const url = `https://api.seniverse.com/v3/weather/daily.json?${qs}`;

    console.log(url);

    axios.get(url).then((r) => {
        res.status(200).json(r.data);
    });
});

app.use("/api", apiRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const str =
    querystring.encode({
        key: apiKey,
        location: 'Beijing',
        language: 'en-US',
        unit: 'c',
        start: 0,
        days: 1
    });

console.log(str);
