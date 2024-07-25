const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");
const cors = require('cors');

mongoose.connect(`${process.env.MONGODB_URI}`);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});