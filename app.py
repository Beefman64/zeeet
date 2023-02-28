import sys 
from flask import Flask, render_template
app = Flask(__name__)

#run by using command 'python -m flask run' in terminal

@app.route("/")
def home():
    return "Hello, Flask! This is the first file in this project!"
