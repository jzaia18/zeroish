from flask import Flask, render_template, redirect, url_for, session, request, flash
import os, sqlite3, random
import utils.data as users

app = Flask(__name__)

@app.route("/")
def root():
    if 'username' in session:
        return redirect(url_for('/profile'))
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        if(user_exist(username)):
            if password == user_pass(username):
                session['username'] = username
                return redirect(url_for ('home'))
            else:
                flash("incorrect Password")
        else:
            flash("incorrect Username/Password")
    return render_template('login.html')

#temp for testing
@app.route("/playgame")
def tetris():
    return render_template("playgame.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/acc")
def acc():
    return render_template("createacc.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/highscores")
def high():
    return render_template("highscores.html")


if __name__ == "__main__":
    app.debug = True
    app.run()
