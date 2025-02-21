from flask import Flask, jsonify, send_from_directory
from flask_httpauth import HTTPBasicAuth
import requests
import os

app = Flask(__name__, static_folder='static')
auth = HTTPBasicAuth()

# Definice konstanty pro vzdálený server
remote_server = 'ADD_REMOTE_SERVER_HERE'

# Definice konstanty pro API URL
ALBILAB_INFO_API_URL = 'http://ADD_ALBILAB_LOCAL_ADDRESS_HERE/info'

# Definice uživatelských dat
users = {
    "albilab": "ADD_PASSWORD_HERE"
}

@auth.get_password
def get_pw(username):
    if username in users:
        return users.get(username)
    return None

@app.route('/')
@auth.login_required
def serve_index():
    # Přidání logování pro ladění
    index_path = os.path.join(app.root_path, 'templates', 'index.html')
    print(f"Serving index from: {index_path}")
    
    # Vrátí index.html ze složky 'templates'
    return send_from_directory(os.path.join(app.root_path, 'templates'), 'index.html')

@app.route('/<path:filename>')
@auth.login_required
def serve_static(filename):
    # Obslouží statické soubory ze složky 'templates'
    return send_from_directory(os.path.join(app.root_path, 'templates'), filename)

@app.route('/info', methods=['GET'])
@auth.login_required
def get_info():
    response = requests.get(ALBILAB_INFO_API_URL)
    data = response.json()
    
    # Odstranit citlivé informace o WiFi
    if 'WiFi' in data:
        del data['WiFi']
    
    return jsonify(data)

# Přidání nových rout pro přesměrování
@app.route('/run-stop', methods=['GET'])
@auth.login_required
def run_stop():
    response = requests.get(f'{remote_server}/run-stop')
    return response.content

@app.route('/right', methods=['GET'])
@auth.login_required
def right():
    response = requests.get(f'{remote_server}/right')
    return response.content

@app.route('/left', methods=['GET'])
@auth.login_required
def left():
    response = requests.get(f'{remote_server}/left')
    return response.content

@app.route('/up', methods=['GET'])
@auth.login_required
def up():
    response = requests.get(f'{remote_server}/up')
    return response.content

@app.route('/down', methods=['GET'])
@auth.login_required
def down():
    response = requests.get(f'{remote_server}/down')
    return response.content

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
