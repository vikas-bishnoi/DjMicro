import pika, json

from main import Product, app, db


params = pika.URLParameters('amqps://olrndrtz:ik9NeulCSDzVovbpx4O8g6s7Ty6BPjG9@puffin.rmq2.cloudamqp.com/olrndrtz')

connection = pika.BlockingConnection(params)

channel = connection.channel()
channel.queue_declare(queue='main')

def callback(channel, method, properties, body):
    print('Received in main')
    data = json.loads(body)
    
    if properties.content_type == 'product_created':
        with app.app_context():
            product = Product(id=data['id'], title=data['title'], image=data['image'])
            db.session.add(product)
            print('Created a new product')
            db.session.commit()
    
    elif properties.content_type == 'product_updated':
        with app.app_context():
            product = Product.session.get(data['id'])
            product.title = data['title']
            product.image = data['image']
            print('updated product')
            db.session.commit()
    
    elif properties.content_type == 'product_deleted':
        with app.app_context():
            product = Product.session.get(data['id'])
            db.session.delete(product)
            print('deleted product')
            db.session.commit()

channel.basic_consume(queue='main', on_message_callback=callback, auto_ack=True)

print("Start consuming")
channel.start_consuming()
channel.close()