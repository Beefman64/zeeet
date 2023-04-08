import sys, os 
from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)
app.debug = True


@app.route("/gamePage")
def home():
    return render_template('gamepage.html')

@app.route('/')
def game_menu():
    # return HTML and CSS for game menu
    #return '<h1>Welcome to my game menu!</h1>'
    return render_template('menu.html')

@app.route('/highscorePage')
def highscorePage():
   return render_template('scorepage.html')




@app.route('/exit_game')
def exit_game():
    return redirect("https://www.google.com")


if __name__ == '__main__':
  app.run(debug=True)