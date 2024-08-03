const { Kafka } = require('kafkajs')
const Log = require('../models/Log');

const kafka = new Kafka({
    clientId: 'tripleduck-consumer',
    brokers: ['kafka:9092'], 
    connectionTimeout: 3000
})

const consumer = kafka.consumer({ groupId: 'tripleduck-activity-group' })

const runConsumer = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'user-activity', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const event = JSON.parse(message.value.toString())
            console.log('Received event:', event)

            await Log.create({
                type: event.type,
                userID: event.userID,
                postID: event.postID,
                timestamp: new Date(event.timestamp),
                text: event.text,
                details: event
            });

            // io.to('admin').emit('newLog', event);
        },
    })
}

runConsumer().catch(console.error)