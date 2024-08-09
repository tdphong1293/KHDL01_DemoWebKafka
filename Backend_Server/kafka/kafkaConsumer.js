const { Kafka } = require('kafkajs')
const Log = require('../models/Log');
const mongoose = require("mongoose");
const io = require('socket.io-client');
require('dotenv').config({ path: '../.env' });

const port = process.env.HOST || 8080;

// Connect to Kafka broker
const kafka = new Kafka({
    clientId: 'tripleduck-consumer',
    brokers: ['kafka:9092'], 
    connectionTimeout: 3000
})

// Create Consumer
const consumer = kafka.consumer({ groupId: 'tripleduck-activity-group' })

// Config to run Consumer
const runConsumer = async () => {
    if (mongoose.connection.readyState !== 1) {
        mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log('Connected to MongoDB from Consumer');
    }

    const socket = io(`http://localhost:${port}`);

    // Connect Consumer to Kafka broker
    await consumer.connect()
    // Subscribe to topics that Consumer want to consume
    await consumer.subscribe({ topic: 'user-activity', fromBeginning: true })

    // Run Consumer and process each message consumed from Kafka broker topics
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const event = JSON.parse(message.value.toString())
            console.log('Received event:', event)

            // Persist log to database
            await Log.create({
                type: event.type,
                userID: event.userID,
                postID: event.postID,
                timestamp: new Date(event.timestamp),
                text: event.text,
                details: event
            });

            socket.emit('newLog', event);
        },
    })
}

// Run Consumer
runConsumer().catch(console.error)