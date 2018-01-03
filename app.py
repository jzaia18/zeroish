from flask import Flask, render_template, redirect, url_for, session, request, flash
import os, sqlite3

app = Flask(__name__)

@app.route("/")
def root():
    return "root"

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
def acc():
    return render_template("profile.html")

@app.route("/highscores")
def high():
    return render_template("highscores.html")


if __name__ == "__main__":
    app.debug = True
    app.run()
