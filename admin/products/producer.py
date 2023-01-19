import pika

params = pika.URLParameters('amqps://olrndrtz:ik9NeulCSDzVovbpx4O8g6s7Ty6BPjG9@puffin.rmq2.cloudamqp.com/olrndrtz')

connection = pika.BlockingConnection(params)
channel = connection.channel()

def publish():
    channel.basic_publish(exchange='', routing_key='main', body='hello')