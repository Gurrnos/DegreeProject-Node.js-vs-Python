import os
from flask import Flask, request, jsonify, g
import jwt
from dotenv import load_dotenv
import datetime
import sqlite3
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Secret key for JWT
app.config['SECRET_KEY'] = os.getenv("JWT_SECRET")

def get_db():
    if 'db' not in g:
        db_path = os.path.join(os.path.dirname(__file__))
        g.db = sqlite3.connect(db_path + '/python-database.db')
        g.db.row_factory = sqlite3.Row
        create_tables(g.db)
    return g.db

def create_tables(db):
    cursor = db.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)')
    db.commit()

@app.teardown_appcontext
def close_db(error):
    if 'db' in g:
        g.db.commit()
        g.db.close()


# Login route
@app.route('/Login', methods=['POST'])
def Login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Get the database connection from g
    db = get_db()
    cursor = db.cursor()

    # Query the database for the user's credentials
    cursor.execute('SELECT password FROM Users WHERE username = ?', (username,))

    result = cursor.fetchone()

    if result:
        stored_password = result[0]

        # Verify the password
        if password == stored_password:
            token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
            if isinstance(token, bytes):
                return jsonify({'token': token.decode('utf-8')}), 200
            else:
                return jsonify({'token': token}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401
    else:
        return jsonify({'message': 'User not found'}), 404

    
@app.route('/Signup', methods=['OPTIONS'])
def Signup_preflight():
    response = jsonify({'message': 'Preflight request accepted'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

@app.route('/Login', methods=['OPTIONS'])
def Login_preflight():
    response = jsonify({'message': 'Preflight request accepted'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

# Signup route
@app.route('/Signup', methods=['GET', 'POST'])
def Signup():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        db = get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO Users (username, password) VALUES (?, ?)", (username, password))

        return jsonify({"message": "User created successfully"})

    return jsonify({"message": "Use POST method to sign up"})

# Protected route example
@app.route('/protected')
def protected():
    # Get token from request headers
    token = request.headers.get('Authorization')

    # Check if token is provided
    if not token:
        return jsonify({'message': 'Token is missing'}), 401

    try:
        # Decode token
        payload = jwt.decode(token, app.config['SECRET_KEY'])
        return jsonify({'message': 'Hello, {}! This is a protected resource.'.format(payload['username'])}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=False)

    print("Server is running on http://localhost:8080")
