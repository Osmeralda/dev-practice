const express = require('express');

const app = express();
const port = 3001;
const bikeDataRouter = require("./routes/bikeData");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true,
})
);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/bikedata", bikeDataRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`Server running fine on port ${port}`);
});