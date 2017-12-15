from flask import Flask, render_template, redirect, url_for, session, request, flash
import os, sqlite3

app = Flask(__name__)

@app.route("/")
def root():
    return "root"

if __name__ == "__main__":
    app.debug = True
    app.run()
