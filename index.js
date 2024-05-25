const express = require('express');
const fileRoutes = require('./routes/file');
const mongoose = require('mongoose');

const app = express();
app.use(fileRoutes);

mongoose.connect('mongodb://0.0.0.0:27017/filesharingapp')
.then(() => console.log('DB Connection established successfully'))
.catch((err) => console.log('Error while connecting database', err));

app.listen(8080, () => {
    console.log('Server is up and running on PORT 8080');
})
