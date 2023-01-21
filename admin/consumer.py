import pika, json, os, django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "admin.settings")
django.setup()

from products.models import Product

params = pika.URLParameters('amqps://olrndrtz:ik9NeulCSDzVovbpx4O8g6s7Ty6BPjG9@puffin.rmq2.cloudamqp.com/olrndrtz')

connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='admin')

def callback(channel, method, properties, body):
    print('Received in admin', body)
    id = json.loads(body)
    product = Product.objects.get(id=id)
    product.likes += 1
    product.save()
    print('Product likes increased')

channel.basic_consume(queue='admin', on_message_callback=callback, auto_ack=True)

print("Start consuming")

channel.start_consuming()

channel.close()