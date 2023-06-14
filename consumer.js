const {Kafka} = require("kafkajs")

const groupId = process.argv[2];

run();
async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["localhost:29092"]
         })

        const consumer = kafka.consumer({"groupId": groupId})
        console.log("Connecting.....")
        await consumer.connect()
        console.log("Connected!")
        
        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })
        
        await consumer.run({
            "eachMessage": async result => {
                console.log(`RVD Msg ${result.message.value} on partition ${result.partition}`)
            }
        })
 

    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        
    }


}