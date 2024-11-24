from flask import Flask, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

# Chemin du fichier de logs
LOG_FILE = 'logs.txt'

# Fonction pour créer le fichier de logs si il n'existe pas
def create_log_file():
    if not os.path.exists(LOG_FILE):
        with open(LOG_FILE, 'w') as log_file:
            log_file.write("=== Log file created ===\n")

# Route pour recevoir les logs du client
@app.route('/logs', methods=['POST'])
def log_message():
    data = request.get_json()  # Récupère les données envoyées en JSON par le client
    message = data.get('message')
    message_class = data.get('class', 'info')  # Si 'class' n'est pas fourni, utiliser 'info' par défaut
    timestamp = data.get('timestamp', datetime.now().isoformat())

    # Créer le fichier de logs s'il n'existe pas
    create_log_file()

    # Enregistrement du log dans un fichier texte
    with open(LOG_FILE, 'a') as log_file:
        log_file.write(f"{timestamp} - {message_class.upper()} - {message}\n")

    # Retourner une réponse JSON pour confirmer que le log a été enregistré
    return jsonify({'status': 'success', 'message': 'Log recorded'}), 200

# Démarrer l'application Flask
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
