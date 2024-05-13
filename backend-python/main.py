from flask import Flask, request, jsonify
import jwt

app = Flask(__name__)

app.config['SECRET_KEY'] = 'yes'

users = {
    'yes': '123',
    'no': '321'
}

@app.route('/Login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    if username in users and users[username] == password:
        # Generate JWT token
        token = jwt.encode({'username': username}, app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('utf-8')})

    return jsonify({'message': 'Invalid username or password'}), 401

