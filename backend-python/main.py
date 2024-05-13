from flask import Flask, request, jsonify # pip install flask
import jwt

app = Flask(__name__)

# implement dotenv for this later
app.config['SECRET_KEY'] = 'yes'

# Simple dummy users, will need to be replaced with db implementation, check sqlite usage with python
users = { 
    'yes': '123',
    'no': '321'
}


# Full route for login (Doesnt work as of right now)
# Use thunder client extension to try and send json data in the body, see if you can fix the error
@app.route('/Login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    if username in users and users[username] == password:
        # Generate JWT token (DO THIS LATER, GET THE ROUTE TO WORK FIRST !! IMPORTANT)

        # token = jwt.encode({'username': username}, app.config['SECRET_KEY'])
        # return jsonify({'token': token.decode('utf-8')})

        print("Hi", username)

    # This is the current response I get when testing with username: yes, password: 123, can you try get it to work?
    return jsonify({'message': 'Invalid username or password'}), 401

# Run the app by: cd backend-python
# In terminal, run python main.py
if __name__ == '__main__':
    app.run(host='localhost', port=8080)

    print("Server is running on http://localhost:8080")
