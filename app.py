from flask import Flask, render_template, redirect, url_for, session, request, flash
import os, sqlite3, random
from utils import auth, score, user

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
@app.route("/tetris")
def tetris():
    if 'username' in session:
        return render_template("tetris.html", logged=True)
    else:
        return render_template("tetris.html")

@app.route("/snake")
def snek():
    if 'username' in session:
        return render_template("snake.html", logged=True)
    else:
        return render_template("snake.html")


@app.route("/profile")
def profile():
    current_user = False
    if 'user' in request.args:
        username = request.args['user']
        if 'username' in session:
            if username == session['username']:
                current_user = True
    elif 'username' in session:
        username = session['username']
        current_user = True
    else:
        return redirect(url_for ('login') )
    if not auth.user_exists(username):
        flash("User does not exist")
        return redirect( url_for('root'))
    else:
        return render_template("profile.html", user=username, image=user.get_avatar(username),
                    latest=score.get_scores(username), highscore=score.get_highscore(username),
                    average=score.get_average(username), numplayed=score.get_numplayed(username),
                    logged=True, current_user=current_user)

@app.route("/leaderboard")
def leaderboard():
    if 'username' in session:
        logged = True
    else:
        logged = False
    return render_template("leaderboard.html", logged=logged,
                           highscores = score.get_highscores(),
                           averages = score.get_averages())

@app.route("/update", methods=['POST'])
def update():
    if 'username' in session:
        if 'score' in request.form:
            score.add_score(session['username'], request.form['score'])
            return '0'
    return '-1'


@app.route("/avatar", methods=['POST'])
def avatar():
    if 'username' in session:
        if 'image' in request.files:
            image = request.files['image']
            if image.content_type[:image.content_type.find('/')] == "image":
                user.set_avatar(session['username'], image.stream.read().encode('base64').replace('\n',''))
                flash("Avatar Sucessfully updated")
            else:
                flash("Upload Failed, provide an image file")
    else:
        flash("Upload failed")
    return redirect(url_for ('profile') )

if __name__ == "__main__":
    db = sqlite3.connect('data/database.db')
    db.cursor().execute("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, hashed_pass TEXT, scores TEXT, average REAL, highscore NUMERIC, numplayed NUMERIC, avatar BLOB);")
    db.commit()
    db.close()
    app.debug = True
    app.run()
