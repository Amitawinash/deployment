const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

/* Mongoose Connection */
mongoose.connect("mongodb://localhost:27017/testdb", {useNewUrlParser: "true"});

mongoose.connection.on("error", (err) => {
  console.log("err", err);

});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

/* Routes */
app.use('/api/v1/product', require('./modules/product/index'))
app.use('/api/v1/rule', require('./modules/rule/index'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
