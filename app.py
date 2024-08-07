from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from decimal import Decimal
import logging

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///budget.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    firstname = data.get('firstname')
    lastname = data.get('lastname')

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    new_user = User(username=username, password=hashed_password)
    new_budget = Budget(username=username, firstname=firstname, lastname=lastname)
    db.session.add(new_user)
    db.session.add(new_budget)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({"message": "Login successful"}), 200

@app.route('/budget', methods=['GET'])
def get_budget():
    username = request.args.get('username')
    logging.info(f"GET /budget called with username: {username}")

    if not username:
        logging.error("No username provided in request")
        return jsonify({"error": "Username is required"}), 400

    budget = Budget.query.filter_by(username=username).first()

    if not budget:
        logging.error(f"Budget not found for user: {username}")
        return jsonify({"error": "Budget not found"}), 404

    return jsonify({
        "total": str(budget.total),
        "needs": str(budget.needs),
        "wants": str(budget.wants),
        "savings": str(budget.savings)
    }), 200

@app.route('/budget/deposit', methods=['POST'])
def deposit():
    data = request.get_json()
    username = data.get('username')
    amount = data.get('amount')

    logging.info(f"Deposit called with username: {username}, amount: {amount}")

    if not username:
        logging.error("No username provided in the request")
        return jsonify({"error": "Username is required"}), 400

    budget = Budget.query.filter_by(username=username).first()

    if not budget:
        logging.error(f"Budget not found for user: {username}")
        return jsonify({"error": "Budget not found"}), 404

    amount = Decimal(amount)  
    budget.total += amount
    budget.needs += amount * Decimal('0.5')
    budget.wants += amount * Decimal('0.3')
    budget.savings += amount * Decimal('0.2')

    db.session.commit()

    logging.info(f"Deposit successful for user: {username}")

    return jsonify({"message": "Deposit successful"}), 200

@app.route('/budget/withdraw', methods=['POST'])
def withdraw():
    data = request.get_json()
    username = data.get('username')
    category = data.get('category')
    amount = data.get('amount')

    if not username:
        return jsonify({"error": "Username is required"}), 400

    budget = Budget.query.filter_by(username=username).first()

    if not budget:
        return jsonify({"error": "Budget not found"}), 404

    amount = Decimal(amount)

    if category == "needs" and budget.needs >= amount:
        budget.needs -= amount
    elif category == "wants" and budget.wants >= amount:
        budget.wants -= amount
    elif category == "savings" and budget.savings >= amount:
        budget.savings -= amount
    else:
        return jsonify({"error": "Insufficient funds or invalid category"}), 400

    budget.total -= amount
    db.session.commit()

    return jsonify({"message": "Withdrawal successful"}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
