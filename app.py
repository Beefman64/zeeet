import sys 
from flask import Flask, render_template
app = Flask(__name__)


@app.route("/gamePage")
def home():
    return render_template('homepage.html')

@app.route('/')
def game_menu():
    # return HTML and CSS for game menu
    #return '<h1>Welcome to my game menu!</h1>'
    return render_template('menu.html')



if __name__ == '__main__':
  app.run(debug=True)