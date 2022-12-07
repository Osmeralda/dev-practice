const express = require('express');

const app = express();
const port = 2600;
const bikeDataRouter = require("./routes/bikeData");

app.use(express.json());
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