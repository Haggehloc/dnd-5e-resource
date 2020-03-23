const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const monsters = require("./routes/api/monsters");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys.js").mongoURI;

//Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true, useFindAndModify: false }
    )
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/api/monsters", monsters);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
