// Create a new file: kafkaConsumer.js

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'tripleduck-consumer',
    brokers: ['kafka:9092'], // Update this to your Kafka broker address
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

            // Here you can process the event, e.g., store it in a database
            // or trigger other actions based on the event type
            switch (event.type) {
                case 'user_signup':
                    // Handle user signup event
                    break
                case 'user_login':
                    // Handle user login event
                    break
                case 'post_created':
                    // Handle post creation event
                    break
                case 'post_liked':
                    // Handle post like event
                    break
                case 'post_commented':
                    
                    break
                // Add more cases as needed
            }
        },
    })
}

runConsumer().catch(console.error)