const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

var Template = require('./templateModel');
var Deployment = require('./deploymentModel');

const mongoose = require("mongoose"),
  ObjectId = mongoose.Types.ObjectId;

/* Mongoose Connection */
mongoose.connect("mongodb://localhost:27017/testdb", {useNewUrlParser: "true"});

mongoose.connection.on("error", (err) => {
  console.log("err", err);

});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

/* Routes */

app.get('/api/v1/deployments', (req, res) => {
  const {query = '{}'} = req;
  let q = {match: {}, select: {url: 1, versions: 1, deployedAt:1}};

  Deployment.list(q).then((deployments = []) => {
    res.status(200).json({deployments})
  }).catch(e => {
    console.log(e);
  })
});

app.post('/api/v1/deployments', (req, res) => {
  const {body: {deployment = {}}} = req;
  if (!deployment.url && !deployment.url.length) {
    res.status(400).json({msg: "Error, url not found"})
    return;
  }

  if (!deployment.templateId && !deployment.templateId.length) {
    res.status(400).json({msg: "Error, templateId not found"})
    return;
  }

  if (!deployment.version && !deployment.version.length) {
    res.status(400).json({msg: "Error, version not found"})
    return;
  }

  new Deployment({...deployment, deployedAt: new Date().toISOString()}).save().then(result => {
    res.status(200).json({msg: "Deployment added", result})
  }).catch(err => {
    console.log(err)
    res.status(501).json({msg: "error"})
  });
});


app.delete('/api/v1/deployments', (req, res) => {
  const {query} = req;

  if(!query._id){
    res.status(400).json({msg: "Error, deployment _id not found"})
    return;
  }
  Deployment.deleteOne({_id: ObjectId(query._id)}).then((deployment) => {
    res.status(200).json({deployment})
  }).catch(e => {
    console.log(e);
  })
});

app.get('/api/v1/templates', (req, res) => {
  const {query = '{}'} = req;
    let q = {match: {}, select: {name: 1, versions: 1}};

  Template.list(q).then((templates = []) => {
    res.status(200).json({templates})

  })
});

app.post('/api/v1/templates', (req, res) => {
  const {body: {template = {}}} = req;
  if (!template.name && !template.name.length) {
    res.status(400).json({msg: "error, name not found"})
    return;
  }

  if (!template.versions && !template.versions.length) {
    res.status(400).json({msg: "error, version not found"})
    return;
  }

  new Template(template).save().then(result => {
    res.status(200).json({msg: "Template added", result})
  }).catch(err => {
    console.log(err)
    res.status(501).json({msg: "error"})
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
