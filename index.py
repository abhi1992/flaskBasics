from flask import Flask, url_for, render_template, request, send_from_directory
from werkzeug.utils import secure_filename
import os


app = Flask(__name__)

uploads_dir = os.path.join(os.getcwd(), 'static/upload')
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)


@app.route("/")
def home():
    url_for('static', filename='index.css')
    url_for('static', filename='index.js')
    url_for('static', filename='bootstrap.bundle.min.js')
    url_for('static', filename='bootstrap.min.css')
    return render_template('index.html')


@app.route('/upload/image', methods = ['POST'])
def upload_file():
    import random
    f = request.files['photo']
    file_name = f.filename
    # file_name[0:3]
    new_file_name = "image"+str(int(random.uniform(1000000, 1000000000))) + file_name[file_name.rindex("."):]
    f.save(os.path.join(uploads_dir, secure_filename(new_file_name)))
    return new_file_name


@app.route('/img/<path:filename>') 
def send_file(filename):
    return send_from_directory(uploads_dir, filename)