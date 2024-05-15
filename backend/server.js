const mongoose = require('mongoose');
const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

let app = express();

app.use(cors());

mongoose
  .connect(process.env.mongo_URI)
  .then(() => {
    console.log('DB is connected');
  })
  .catch((error) => {
    console.log(error);
  });

const Schema = new mongoose.Schema({
  tasks: String,
});

const Model = mongoose.model('location', Schema);

app.get('/page', (req, res) => {
  Model.find({})
    .then((data) => {
      const tasksArray = data.map((item) => ({ tasks: item.tasks }));
      res.send(tasksArray);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
});    

app.post('/page', async (req, res) => {
  await Model.create(req.body);
  res.send(req.body);
});

app.put('/page/:id', async (req, res) => {
  await Model.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.send('put is working');
});

app.delete('/page/:id', async (req, res) => {
  await Model.findByIdAndDelete(req.params.id);
  res.send('delete is done');
});

app.listen(4567, () => {
  console.log('port is running on 4567');
});
