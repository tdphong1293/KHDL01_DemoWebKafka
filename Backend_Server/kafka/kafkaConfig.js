const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'tripleduck-app',
    brokers: ['kafka:9092'],
    connectionTimeout: 3000
})

const producer = kafka.producer()

const connectProducer = async () => {
    await producer.connect()
    console.log('Kafka producer connected')
}

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