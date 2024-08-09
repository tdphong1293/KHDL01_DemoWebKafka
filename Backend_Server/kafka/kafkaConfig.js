const { Kafka } = require('kafkajs')

// Connect to Kafka broker
const kafka = new Kafka({
    clientId: 'tripleduck-app',
    brokers: ['kafka:9092'],
    connectionTimeout: 3000
})

// Create Producer
const producer = kafka.producer()

// Connect Producer to Kafka broker
const connectProducer = async () => {
    await producer.connect()
    console.log('Kafka producer connected')
}

// Producer function to send messages topics of Kafka broker
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