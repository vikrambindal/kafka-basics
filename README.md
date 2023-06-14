# Basics of Kafka

The project aims to work with basics of kafka demonstrating following:

- Multiple partitions in a topic
- Multiple consumers in a single consumer group (acts like a queue)
- Multiple consumers in different consumer group (acts like pub/sub)

## About

- Application uses producer, consumer where producer published username and consumer(s) consumer that username
    - There are 2 partitions:
        - Partition 1: Contains username from A-M
        - Partition 2: Contains username from N-Z
- Files:
    - topic.js:     Creates a topic with 2 partitions
    - producer.js:  Produces a username to the topic
    - consumer.js:  Consumers a username from the topic partition
- Run:
    ```
        Basic setup:
        In Terminal 1:  node topic.js
        In Terminal 2:  node producer.js <USERNAME>: e.g: node poducer.js Batman
        In Terminal 3:  node consumer.js <CONSUMER-GROUP>: e.g: node consumer.js groupOne
    ```

## Consumer Use Cases

- Case 1: Single consumer in Single Group (demos consumer reading from both partition)
```
 Terminal 1: node producer.js Batman
 Terminal 1: node producer.js Superman
 Terminal 2: node consumer.js GroupOne

 Output: Both "Batman", "Superman" consumed in Terminal 2

```
- Case 2: Multiple consumer in Single Group (demos consumer reading from specific partition)
```
 Terminal 1: node producer.js Batman   
 Terminal 1: node producer.js Superman 
 Terminal 2: node consumer.js GroupOne (consumer 1 <- parition 0)
 Terminal 3: node consumer.js GroupTwo (consumer 2 <- partition 1)

 Output: 
    "Batman"   consumed by consumer 1
    "Superman" consumed by consumer 2
```
- Case 3: Multiple consumers in Multiple Groups (demos multiple consumers consuming message)
```
 Terminal 1: node producer.js Batman   
 Terminal 1: node producer.js Superman 
 Terminal 2: node consumer.js GroupOne (consumer 1 <- parition 0)
 Terminal 3: node consumer.js GroupTwo (consumer 2 <- partition 1)
 Terminal 4: node consumer.js NewGroup (consumer 3 <- partition 0 and 1)

 Output: 
    "Batman"   consumed by consumer 1, 3
    "Superman" consumed by consumer 2, 3
```
- Case 4: Multiple consumers in Multiple Groups (demos multiple consumers consuming message). Both consumers from each group to particular partition
```
 Terminal 1: node producer.js Batman  
 Terminal 1: node producer.js Superman
 Terminal 1: node producer.js Catwoman
 Terminal 1: node producer.js Joker
 Terminal 2: node consumer.js GroupOne (consumer 1 <- parition 0)
 Terminal 3: node consumer.js GroupTwo (consumer 2 <- partition 1)
 Terminal 4: node consumer.js NewGroup (consumer 3 <- partition 0)
 Terminal 5: node consumer.js NewGroup (consumer 4 <- partition 1)

 Output: 
    "Batman"   consumed by consumer 1, 3
    "Superman" consumed by consumer 2, 4
    "Catwoman" consumed by consumer 1, 3
    "Joker"    consumed by consumer 2, 4
```

## Ref: Hussein Naseer (Apache Kafka Course on youtube)