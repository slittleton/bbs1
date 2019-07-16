const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const topics = require("./routes/topics");
const db = require("./config/keys").MongoURI;
const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(db, { useNewUrlParser: true })
  .then(console.log("connected to mongoDB..."))
  .catch(err => console.log(err));

app.use(express.json());

app.use("/api/users", users);
app.use("/api/topics", topics);


app.get("/", (req, res) => {
  res.send("HOME");
});

// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.send('POST');
// });

app.listen(PORT, console.log(`Listening on port ${PORT}`));
