from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///budget.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    budget = db.relationship('Budget', backref='owner', uselist=False, primaryjoin="User.username == Budget.username")

class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), db.ForeignKey('user.username'), unique=True, nullable=False)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    total = db.Column(db.Numeric(10, 2), default=0.00)
    needs = db.Column(db.Numeric(10, 2), default=0.00)
    wants = db.Column(db.Numeric(10, 2), default=0.00)
    savings = db.Column(db.Numeric(10, 2), default=0.00)

@app.route('/', methods=['POST'])
def home():
    return "Welcome to the Budget App!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    if user and user.password==password:
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Username or password is incorrect"}), 401

if __name__ == '__main__':
    app.run(debug=True)
