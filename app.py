import sys 
from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)


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

#@app.route('/volume')
#def volume():
#    return render_template('volume.html')



is_paused = False

@app.route('/pause_game')
def pause_game():
    global is_paused
    is_paused = True
    return redirect(url_for('pause'))

@app.route('/resume_game')
def resume_game():
    global is_paused
    is_paused = False
    return redirect(url_for('game'))




if __name__ == '__main__':
  app.run(debug=True)