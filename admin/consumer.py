import pika

params = pika.URLParameters('amqps://olrndrtz:ik9NeulCSDzVovbpx4O8g6s7Ty6BPjG9@puffin.rmq2.cloudamqp.com/olrndrtz')

connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='admin')

def callback(channel, method, properties, body):
    print('Received in admin')
    print(body)

channel.basic_consume(queue='admin', on_message_callback=callback)

print("Start consuming")

channel.start_consuming()

channel.close()