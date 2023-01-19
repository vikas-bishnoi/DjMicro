import pika, json

from main import Product, db


params = pika.URLParameters('amqps://olrndrtz:ik9NeulCSDzVovbpx4O8g6s7Ty6BPjG9@puffin.rmq2.cloudamqp.com/olrndrtz')

connection = pika.BlockingConnection(params)

channel = connection.channel()
channel.queue_declare(queue='main')

def callback(channel, method, properties, body):
    print('Received in main')
    data = json.loads(body)
    print(data)
    
    if properties.content_type == 'product_created':
        product = Product(id=data['id'], title=data['title'], image=data['image'])
        db.session.add(product)
        db.session.commit()
    
    elif properties.content_type == 'product_updated':
        product = Product.query.get(data['id'])
        product.title = data['title']
        product.image = data['image']
        db.session.commit()
    
    elif properties.content_type == 'product_deleted':
        product = Product.query.get(data['id'])
        db.session.delete(product)
        db.session.commit()

channel.basic_consume(queue='main', on_message_callback=callback, auto_ack=True)

print("Start consuming")

channel.start_consuming()

channel.close()