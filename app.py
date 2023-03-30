import sys 
from flask import Flask, render_template
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

#@app.route('/quit')
#def quit_game():
#    global is_paused

@app.route('/pause')
def pause():
    return render_template('pause.html')

@app.route('/resume', methods=['POST'])
def resume():
    return "Game resumed successfully"


if __name__ == '__main__':
  app.run(debug=True)