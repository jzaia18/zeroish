from flask import Flask, render_template, redirect, url_for, session, request, flash
import os, sqlite3, random
from utils import auth, user

app = Flask(__name__)
app.secret_key = os.urandom(16)
@app.route("/")
def root():
    if 'username' in session:
        return render_template('home.html', logged=True)
    else:
        return render_template('home.html')

@app.route("/login", methods = ["GET", "POST"])
def login():
    if 'username' in session:
        return redirect(url_for ('root') )
    if request.method == "POST":
        if auth.authenticate(request.form['user'], request.form['password']):
            session['username'] = request.form['user']
            flash("Login Successful")
            return redirect(url_for ('root') )
        else:
            flash("Invalid username or password.")
            return redirect(url_for ('login') )
    return render_template("login.html")

@app.route("/register", methods = ["GET", "POST"])
def register():
    if 'username' in session:
        return redirect(url_for ('root') )
    if request.method == "POST":
        if auth.register(request.form['user'], request.form['password']):
            flash("Successful Registration")
            return redirect(url_for ('login') )
        else:
            flash("Username already in use.")
            return redirect(url_for ('regiser') )
    return render_template("register.html")

@app.route('/logout')
def logout():
    if 'username' in session:
        session.pop('username');
    return redirect( url_for('root'))

#temp for testing
@app.route("/playgame")
def tetris():
    if 'username' in session:
        return render_template("playgame.html", logged=True)
    else:
        return render_template("playgame.html")

@app.route("/profile")
def profile():
    if 'username' in session:
        return render_template("profile.html", user=session['username'], image=user.get_avatar(session['username']), logged=True)
    else:
        return redirect(url_for ('login') )

@app.route("/highscores")
def highscores():
    if 'username' in session:
        return render_template("highscores.html", logged=True)
    else:
        return render_template("highscores.html")

@app.route("/update", methods=['POST'])
def update():
    if 'username' in session:
        return user.add_score(request.form['score'])
    return False

if __name__ == "__main__":
    db = sqlite3.connect('data/database.db')
    db.cursor().execute("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, hashed_pass TEXT, scores TEXT, average NUMERIC, highscore NUMERIC, numplayed NUMERIC, avatar BLOB);")
    db.commit()
    db.close()
    app.debug = True
    app.run()
