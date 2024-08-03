const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const logRoutes = require('./routes/logRoute');
require("dotenv").config();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const cors = require('cors');
const { connectProducer } = require('./kafka/kafkaConfig');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
});

mongoose.connect(`${process.env.MONGODB_URI}`);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/logs', logRoutes);
app.set('io', io);

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

connectProducer().catch(console.error);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});