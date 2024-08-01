const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'tripleduck-app',
    brokers: ['kafka:9092'], // Update this to your Kafka broker address
    connectionTimeout: 3000
})

const producer = kafka.producer()

// Connect the producer when your server starts
const connectProducer = async () => {
    await producer.connect()
    console.log('Kafka producer connected')
}

// Function to send events to Kafka
const sendEvent = async (topic, event) => {
    try {
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(event) }],
        })
    } catch (error) {
        console.error('Error sending event to Kafka:', error)
    }
}

module.exports = { connectProducer, sendEvent }