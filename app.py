from flask import Flask, render_template, redirect, url_for, session, request, flash
import os, sqlite3, random
from utils import auth, user, tetris, snek

app = Flask(__name__)
app.secret_key = os.urandom(16)

def is_logged():
    return 'username' in session

@app.route("/")
def root():
    return render_template('home.html', logged=is_logged())

@app.route("/login", methods = ["GET", "POST"])
def login():
    if request.method == "POST":
        if auth.authenticate(request.form['user'], request.form['password']):
            session['username'] = request.form['user']
            flash("Login Successful")
        else:
            flash("Invalid username or password.")
            return redirect(url_for ('login') )
    if 'username' in session:
        return redirect(url_for ('root') )
    return render_template("login.html", facebook_link=auth.get_facebook_link(), logged=is_logged())

@app.route("/register", methods = ["GET", "POST"])
def register():
    if request.method == "POST":
        if auth.register(request.form['user'], request.form['password']):
            flash("Successful Registration")
            return redirect(url_for ('login') )
        else:
            flash("Username already in use.")
            return redirect(url_for ('register') )
    if 'username' in session:
        return redirect(url_for ('root') )
    return render_template("register.html", logged=is_logged())

@app.route('/logout')
def logout():
    if 'username' in session:
        session.pop('username');
    return redirect( url_for('root'))

#temp for testing
@app.route("/tetris")
def tetrisgame():
    return render_template("tetris.html", logged=is_logged())

@app.route("/snake")
def snake():
    return render_template("snake.html", logged=is_logged())

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
                    tetris_latest=tetris.get_scores(username), tetris_highscore=tetris.get_highscore(username),
                    tetris_average=tetris.get_average(username), tetris_numplayed=tetris.get_numplayed(username),
                    snek_latest=snek.get_scores(username), snek_highscore=snek.get_highscore(username),
                    snek_average=snek.get_average(username), snek_numplayed=snek.get_numplayed(username),
                    logged=is_logged(), current_user=current_user)

@app.route("/tetris/leaderboard")
def tetris_leaderboard():
    return render_template("leaderboard.html", logged=is_logged(), game="Tetris",
                           highscores = tetris.get_highscores(),
                           averages = tetris.get_averages())

@app.route("/snake/leaderboard")
def snake_leaderboard():
    return render_template("leaderboard.html", logged=is_logged(), game="Snek",
                           highscores = snek.get_highscores(),
                           averages = snek.get_averages())

@app.route("/tetris/update", methods=['POST'])
def tetris_update():
    if is_logged():
        if 'score' in request.form:
            tetris.add_score(session['username'], request.form['score'])
            return '0'
    return redirect(url_for ('root') )

@app.route("/snake/update", methods=['POST'])
def snake_update():
    if is_logged():
        if 'score' in request.form:
            snek.add_score(session['username'], request.form['score'])
            return '0'
    return redirect(url_for ('root') )

@app.route("/avatar", methods=['POST'])
def avatar():
    if is_logged():
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

@app.route("/search")
def search():
  return render_template('search.html', logged=is_logged())

@app.route("/results", methods=['POST'])
def results():
  if 'query' in request.form:
    query = request.form['query']
    return render_template('results.html', query=query, results=user.search(query), logged=is_logged())
  else:
    return redirect(url_for ('root') )

@app.route("/facebook")
def facebook():
    if "code" in request.args:
        token = auth.get_access_token(request.args["code"])
        name = auth.get_facebook_data(token)["name"]
        if not auth.user_exists(name):
            auth.register(name, str(int(random.random() * 10000000000)))
            user.set_avatar(name, auth.get_facebook_pic(token))
        session["username"] = name
    return redirect(url_for ('root') )

if __name__ == "__main__":
    db = sqlite3.connect('data/database.db')
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, hashed_pass TEXT, avatar BLOB);")
    c.execute("CREATE TABLE IF NOT EXISTS tetris (username TEXT PRIMARY KEY, scores TEXT, average REAL, highscore NUMERIC, numplayed NUMERIC);")
    c.execute("CREATE TABLE IF NOT EXISTS snek (username TEXT PRIMARY KEY, scores TEXT, average REAL, highscore NUMERIC, numplayed NUMERIC);")
    db.commit()
    db.close()
    app.debug = True
    app.run()
