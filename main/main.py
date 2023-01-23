from dataclasses import dataclass
import requests
from flask import Flask, jsonify, abort
from flask_migrate import Migrate
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import UniqueConstraint
from producer import publish

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@db/main"
db = SQLAlchemy(app)
migrate = Migrate(app, db)

CORS(app)

@dataclass
class Product(db.Model):
    id:int
    title:str
    image:str

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    title = db.Column(db.String(255))
    image = db.Column(db.String(255))

@dataclass
class ProductUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product_id = db.Column(db.Integer)

    UniqueConstraint('user_id', 'product_id', name='user_product_unique')

@app.route('/api/products')
def index():
    products = Product.query.all()
    return jsonify(products)


@app.route('/api/products/<int:id>/like', methods=['POST'])
def like(id):
    req = requests.get('http://host.docker.internal:8000/api/user')
    json = req.json()
    try:
        product_user = ProductUser(user_id=json['id'], product_id=id)
        db.session.add(product_user)
        db.session.commit()
        # event
        publish('product_liked', id)
        print(product_user)

    except:
        abort(400, "you already liked this product")

    return jsonify({
        "messsage": "success"
    })


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")